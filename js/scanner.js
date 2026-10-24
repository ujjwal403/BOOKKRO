/**
 * BOOKKRO - Gate Camera Scanner Engine
 * Features:
 * - HTML5 Camera Access (navigator.mediaDevices.getUserMedia)
 * - Environment (rear) camera default with flip support
 * - Flashlight/Torch toggle (on supported devices)
 * - Native BarcodeDetector + embedded fallback QR decoder
 * - Audio Chimes & Haptics
 * - Manual Ticket ID input fallback
 */

(function(window) {
  // Web Audio Synthesizer for instant audible feedback
  var audioCtx = null;
  function getAudioContext() {
    if (!audioCtx) {
      var AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playSuccessSound() {
    try {
      var ctx = getAudioContext();
      if (!ctx) return;
      var now = ctx.currentTime;
      var osc1 = ctx.createOscillator();
      var osc2 = ctx.createOscillator();
      var gain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(587.33, now); // D5
      osc1.frequency.exponentialRampToValueAtTime(880, now + 0.12); // A5

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(880, now + 0.12);
      osc2.frequency.exponentialRampToValueAtTime(1174.66, now + 0.28); // D6

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc1.stop(now + 0.15);
      osc2.start(now + 0.12);
      osc2.stop(now + 0.35);

      if (navigator.vibrate) navigator.vibrate([80, 40, 100]);
    } catch (e) {
      console.warn("Audio feedback error:", e);
    }
  }

  function playErrorSound() {
    try {
      var ctx = getAudioContext();
      if (!ctx) return;
      var now = ctx.currentTime;
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now); // A3
      osc.frequency.setValueAtTime(164.81, now + 0.15); // E3

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.4);

      if (navigator.vibrate) navigator.vibrate([250, 100, 250]);
    } catch (e) {
      console.warn("Audio feedback error:", e);
    }
  }

  // Scanner State Manager
  function GateScanner(options) {
    this.videoElem = options.videoElem;
    this.canvasElem = options.canvasElem || document.createElement('canvas');
    this.onScan = options.onScan || function() {};
    this.stream = null;
    this.track = null;
    this.isScanning = false;
    this.facingMode = 'environment';
    this.torchEnabled = false;
    this.lastScannedText = null;
    this.lastScanTime = 0;
    this.scanCooldownMs = 1800;
    this.animationFrameId = null;

    // Detect native BarcodeDetector
    this.barcodeDetector = null;
    if ('BarcodeDetector' in window) {
      try {
        this.barcodeDetector = new window.BarcodeDetector({ formats: ['qr_code'] });
      } catch (e) {
        this.barcodeDetector = null;
      }
    }
  }

  GateScanner.prototype.start = async function() {
    this.stop();
    this.isScanning = true;
    try {
      var constraints = {
        video: {
          facingMode: { ideal: this.facingMode },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      };

      this.stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.videoElem.srcObject = this.stream;
      this.videoElem.setAttribute('playsinline', 'true');
      await this.videoElem.play();

      this.track = this.stream.getVideoTracks()[0];
      this._scanLoop();
      return true;
    } catch (err) {
      console.error("Camera access error:", err);
      this.stop();
      throw err;
    }
  };

  GateScanner.prototype.stop = function() {
    this.isScanning = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    if (this.stream) {
      this.stream.getTracks().forEach(function(t) { t.stop(); });
      this.stream = null;
      this.track = null;
    }
    if (this.videoElem) {
      this.videoElem.srcObject = null;
    }
  };

  GateScanner.prototype.toggleCamera = async function() {
    this.facingMode = (this.facingMode === 'environment') ? 'user' : 'environment';
    return await this.start();
  };

  GateScanner.prototype.toggleTorch = async function() {
    if (!this.track) return false;
    var caps = this.track.getCapabilities ? this.track.getCapabilities() : {};
    if (!caps.torch) {
      return false;
    }
    try {
      this.torchEnabled = !this.torchEnabled;
      await this.track.applyConstraints({
        advanced: [{ torch: this.torchEnabled }]
      });
      return this.torchEnabled;
    } catch (e) {
      console.warn("Torch failed:", e);
      return false;
    }
  };

  GateScanner.prototype._scanLoop = async function() {
    if (!this.isScanning) return;

    if (this.videoElem.readyState >= this.videoElem.HAVE_CURRENT_DATA) {
      var vw = this.videoElem.videoWidth;
      var vh = this.videoElem.videoHeight;

      if (vw && vh) {
        var now = Date.now();
        var canProcess = (now - this.lastScanTime) > this.scanCooldownMs;

        if (canProcess) {
          var detectedCode = null;

          // 1. Try native BarcodeDetector if available
          if (this.barcodeDetector) {
            try {
              var barcodes = await this.barcodeDetector.detect(this.videoElem);
              if (barcodes && barcodes.length > 0) {
                detectedCode = barcodes[0].rawValue;
              }
            } catch (e) {
              // fallback
            }
          }

          // 2. If not detected and jsQR is present, use canvas analysis
          if (!detectedCode && window.jsQR) {
            this.canvasElem.width = vw;
            this.canvasElem.height = vh;
            var ctx = this.canvasElem.getContext('2d');
            ctx.drawImage(this.videoElem, 0, 0, vw, vh);
            var imgData = ctx.getImageData(0, 0, vw, vh);
            var code = window.jsQR(imgData.data, imgData.width, imgData.height, {
              inversionAttempts: 'dontInvert'
            });
            if (code && code.data) {
              detectedCode = code.data;
            }
          }

          if (detectedCode) {
            var trimmed = detectedCode.trim();
            if (trimmed) {
              this.lastScanTime = now;
              this.lastScannedText = trimmed;
              this.onScan(trimmed);
            }
          }
        }
      }
    }

    if (this.isScanning) {
      this.animationFrameId = requestAnimationFrame(this._scanLoop.bind(this));
    }
  };

  window.GateScanner = GateScanner;
  window.playSuccessSound = playSuccessSound;
  window.playErrorSound = playErrorSound;
})(window);
