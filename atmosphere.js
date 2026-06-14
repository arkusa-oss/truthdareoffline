// ============================================================
// ATMOSPHERE.JS — Cosmic Visual Engine for Lyra's Orb
// Canvas-based particle system, nebula effects, stage-aware
// atmosphere that evolves from cool cosmic → hot velvet
// ============================================================

(function() {
  "use strict";

  // ============================
  // ATMOSPHERE STAGE PROFILES
  // ============================
  // Each stage defines the visual personality: particle colors,
  // density, speed, fog, nebula intensity, and special effects.

  var STAGE_PROFILES = {
    playful: {
      // Cool cosmic blue — starfield, gentle dust
      particles: { count: 60, speed: 0.3, sizeRange: [0.5, 2.5], drift: 0.15 },
      colors: {
        primary: [70, 130, 255],    // blue
        secondary: [140, 180, 255], // light blue
        accent: [200, 220, 255],    // white-blue
        nebula: [30, 60, 180, 0.04]
      },
      fog: { enabled: false },
      tendrils: { enabled: false },
      nebula: { enabled: true, intensity: 0.3, clouds: 3 },
      orbPull: 0,    // particles don't react to orb
      sparkle: 0.02, // tiny chance of sparkle
      haze: 0
    },

    personal: {
      // Deep indigo-violet — more introspective, slower movement
      particles: { count: 70, speed: 0.25, sizeRange: [0.5, 3], drift: 0.2 },
      colors: {
        primary: [120, 70, 255],
        secondary: [170, 130, 255],
        accent: [210, 180, 255],
        nebula: [60, 25, 150, 0.05]
      },
      fog: { enabled: false },
      tendrils: { enabled: false },
      nebula: { enabled: true, intensity: 0.4, clouds: 4 },
      orbPull: 0.1,
      sparkle: 0.03,
      haze: 0
    },

    flirty: {
      // Purple-magenta — particles start swirling, nebula deepens
      particles: { count: 85, speed: 0.35, sizeRange: [0.6, 3.5], drift: 0.3 },
      colors: {
        primary: [180, 60, 255],
        secondary: [220, 120, 255],
        accent: [255, 160, 240],
        nebula: [100, 20, 160, 0.06]
      },
      fog: { enabled: true, opacity: 0.03, speed: 0.2 },
      tendrils: { enabled: false },
      nebula: { enabled: true, intensity: 0.5, clouds: 5 },
      orbPull: 0.2,
      sparkle: 0.04,
      haze: 0.02
    },

    suggestive: {
      // Hot pink — energy tendrils appear, fog thickens, particles pulse
      particles: { count: 100, speed: 0.4, sizeRange: [0.6, 4], drift: 0.35 },
      colors: {
        primary: [220, 40, 180],
        secondary: [255, 80, 200],
        accent: [255, 140, 220],
        nebula: [140, 15, 80, 0.07]
      },
      fog: { enabled: true, opacity: 0.05, speed: 0.3 },
      tendrils: { enabled: true, count: 3, opacity: 0.12 },
      nebula: { enabled: true, intensity: 0.6, clouds: 5 },
      orbPull: 0.35,
      sparkle: 0.05,
      haze: 0.04
    },

    intimate: {
      // Deep crimson-rose — velvet fog, slow sensual movement
      particles: { count: 90, speed: 0.3, sizeRange: [0.8, 4.5], drift: 0.25 },
      colors: {
        primary: [200, 30, 70],
        secondary: [240, 60, 100],
        accent: [255, 120, 140],
        nebula: [140, 10, 40, 0.08]
      },
      fog: { enabled: true, opacity: 0.08, speed: 0.2 },
      tendrils: { enabled: true, count: 5, opacity: 0.18 },
      nebula: { enabled: true, intensity: 0.7, clouds: 6 },
      orbPull: 0.4,
      sparkle: 0.03,
      haze: 0.08
    },

    erotic: {
      // Burning red — heavy fog, strong tendrils, particles drawn to orb
      particles: { count: 110, speed: 0.45, sizeRange: [0.8, 5], drift: 0.4 },
      colors: {
        primary: [255, 20, 45],
        secondary: [255, 60, 75],
        accent: [255, 110, 90],
        nebula: [160, 8, 30, 0.10]
      },
      fog: { enabled: true, opacity: 0.12, speed: 0.25 },
      tendrils: { enabled: true, count: 7, opacity: 0.25 },
      nebula: { enabled: true, intensity: 0.8, clouds: 7 },
      orbPull: 0.55,
      sparkle: 0.06,
      haze: 0.14
    },

    taboo: {
      // Ember/fire — maximum intensity, smoke, swirling energy
      particles: { count: 130, speed: 0.5, sizeRange: [1, 5.5], drift: 0.5 },
      colors: {
        primary: [255, 60, 20],
        secondary: [255, 120, 40],
        accent: [255, 180, 80],
        nebula: [150, 20, 5, 0.12]
      },
      fog: { enabled: true, opacity: 0.16, speed: 0.3 },
      tendrils: { enabled: true, count: 9, opacity: 0.3 },
      nebula: { enabled: true, intensity: 0.9, clouds: 8 },
      orbPull: 0.7,
      sparkle: 0.08,
      haze: 0.2
    }
  };

  // ============================
  // CANVAS SETUP
  // ============================

  var canvas, ctx;
  var W, H;
  var orbX, orbY;  // orb center in canvas coordinates
  var particles = [];
  var nebulaClouds = [];
  var tendrils = [];
  var fogLayers = [];
  var currentProfile = STAGE_PROFILES.personal;
  var targetProfile = null;
  var transitionProgress = 1; // 0 = transitioning, 1 = complete
  var transitionSpeed = 0.008; // ~2 seconds for a stage transition
  var animFrame = null;
  var time = 0;

  function init() {
    // Create canvas behind everything
    canvas = document.createElement("canvas");
    canvas.id = "atmosphereCanvas";
    canvas.style.cssText = "position:fixed;inset:0;z-index:0;pointer-events:none;";
    // Insert as first child of body
    document.body.insertBefore(canvas, document.body.firstChild);
    ctx = canvas.getContext("2d");

    resize();
    window.addEventListener("resize", resize);

    // Initialize particles for the starting profile
    rebuildParticles(currentProfile);
    rebuildNebula(currentProfile);
    rebuildTendrils(currentProfile);
    rebuildFog(currentProfile);

    // Start render loop
    loop();
  }

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
    // Orb is centered horizontally, ~30-38% from top
    orbX = W / 2;
    orbY = H * 0.32;
  }

  // ============================
  // PARTICLE SYSTEM
  // ============================

  function createParticle(profile, forceNew) {
    var p = profile.particles;
    var c = profile.colors;
    var colorArr = Math.random() < 0.5 ? c.primary :
                   Math.random() < 0.7 ? c.secondary : c.accent;

    var particle = {
      x: forceNew ? (Math.random() < 0.5 ? -10 : W + 10) : Math.random() * W,
      y: forceNew ? Math.random() * H : Math.random() * H,
      size: p.sizeRange[0] + Math.random() * (p.sizeRange[1] - p.sizeRange[0]),
      speedX: (Math.random() - 0.5) * p.speed,
      speedY: (Math.random() - 0.5) * p.speed * 0.6 - 0.1, // slight upward drift
      color: colorArr,
      alpha: 0.15 + Math.random() * 0.45,
      baseAlpha: 0.15 + Math.random() * 0.45,
      drift: p.drift,
      phase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.5 + Math.random() * 1.5,
      life: forceNew ? 0 : Math.random(), // 0-1, fades in/out at edges
      sparkleTimer: 0
    };
    return particle;
  }

  function rebuildParticles(profile) {
    var count = profile.particles.count;
    // Reuse existing particles where possible
    while (particles.length > count) particles.pop();
    while (particles.length < count) particles.push(createParticle(profile, false));
  }

  function updateParticle(p, dt) {
    // Drift movement
    p.x += p.speedX + Math.sin(time * p.pulseSpeed + p.phase) * p.drift * 0.3;
    p.y += p.speedY + Math.cos(time * p.pulseSpeed * 0.7 + p.phase) * p.drift * 0.2;

    // Orb gravitational pull
    if (currentProfile.orbPull > 0) {
      var dx = orbX - p.x;
      var dy = orbY - p.y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 20 && dist < 400) {
        var force = currentProfile.orbPull * 0.15 / (dist * 0.02);
        p.x += dx / dist * force;
        p.y += dy / dist * force;
      }
    }

    // Pulse alpha
    p.alpha = p.baseAlpha * (0.6 + 0.4 * Math.sin(time * p.pulseSpeed + p.phase));

    // Sparkle
    if (Math.random() < currentProfile.sparkle * 0.1) {
      p.sparkleTimer = 0.3;
    }
    if (p.sparkleTimer > 0) {
      p.sparkleTimer -= dt;
      p.alpha = Math.min(1, p.baseAlpha * 2.5);
      p.size *= 1.01;
    }

    // Wrap around edges with fade
    if (p.x < -20) p.x = W + 10;
    if (p.x > W + 20) p.x = -10;
    if (p.y < -20) p.y = H + 10;
    if (p.y > H + 20) p.y = -10;
  }

  function drawParticle(p) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

    // Glow effect for larger particles
    if (p.size > 2) {
      var grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
      grad.addColorStop(0, "rgba(" + p.color[0] + "," + p.color[1] + "," + p.color[2] + "," + (p.alpha * 0.8) + ")");
      grad.addColorStop(0.4, "rgba(" + p.color[0] + "," + p.color[1] + "," + p.color[2] + "," + (p.alpha * 0.3) + ")");
      grad.addColorStop(1, "rgba(" + p.color[0] + "," + p.color[1] + "," + p.color[2] + ",0)");
      ctx.fillStyle = grad;
      ctx.fill();
    } else {
      ctx.fillStyle = "rgba(" + p.color[0] + "," + p.color[1] + "," + p.color[2] + "," + p.alpha + ")";
      ctx.fill();
    }
  }

  // ============================
  // NEBULA CLOUDS
  // ============================

  function createNebulaCloud(profile) {
    var c = profile.colors.nebula;
    return {
      x: Math.random() * W,
      y: Math.random() * H * 0.8,
      radius: 100 + Math.random() * 250,
      color: [c[0], c[1], c[2]],
      alpha: c[3] * profile.nebula.intensity,
      speedX: (Math.random() - 0.5) * 0.08,
      speedY: (Math.random() - 0.5) * 0.04,
      phase: Math.random() * Math.PI * 2,
      breathSpeed: 0.2 + Math.random() * 0.3
    };
  }

  function rebuildNebula(profile) {
    if (!profile.nebula.enabled) { nebulaClouds = []; return; }
    var count = profile.nebula.clouds;
    while (nebulaClouds.length > count) nebulaClouds.pop();
    while (nebulaClouds.length < count) nebulaClouds.push(createNebulaCloud(profile));
  }

  function drawNebula() {
    nebulaClouds.forEach(function(cloud) {
      cloud.x += cloud.speedX;
      cloud.y += cloud.speedY;
      if (cloud.x < -cloud.radius) cloud.x = W + cloud.radius;
      if (cloud.x > W + cloud.radius) cloud.x = -cloud.radius;

      var breathScale = 1 + 0.15 * Math.sin(time * cloud.breathSpeed + cloud.phase);
      var r = cloud.radius * breathScale;
      var a = cloud.alpha * (0.7 + 0.3 * Math.sin(time * cloud.breathSpeed * 0.5 + cloud.phase));

      var grad = ctx.createRadialGradient(cloud.x, cloud.y, 0, cloud.x, cloud.y, r);
      grad.addColorStop(0, "rgba(" + cloud.color[0] + "," + cloud.color[1] + "," + cloud.color[2] + "," + a + ")");
      grad.addColorStop(0.5, "rgba(" + cloud.color[0] + "," + cloud.color[1] + "," + cloud.color[2] + "," + (a * 0.4) + ")");
      grad.addColorStop(1, "rgba(" + cloud.color[0] + "," + cloud.color[1] + "," + cloud.color[2] + ",0)");

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cloud.x, cloud.y, r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  // ============================
  // ENERGY TENDRILS
  // ============================
  // Sinuous energy lines that emanate from the orb area

  function createTendril(profile) {
    var angle = Math.random() * Math.PI * 2;
    return {
      angle: angle,
      length: 120 + Math.random() * 200,
      width: 1 + Math.random() * 2.5,
      speed: 0.1 + Math.random() * 0.3,
      phase: Math.random() * Math.PI * 2,
      waveAmp: 15 + Math.random() * 35,
      waveFreq: 2 + Math.random() * 3,
      opacity: profile.tendrils.opacity * (0.5 + Math.random() * 0.5),
      color: Math.random() < 0.6 ? profile.colors.primary : profile.colors.secondary
    };
  }

  function rebuildTendrils(profile) {
    if (!profile.tendrils.enabled) { tendrils = []; return; }
    var count = profile.tendrils.count;
    while (tendrils.length > count) tendrils.pop();
    while (tendrils.length < count) tendrils.push(createTendril(profile));
  }

  function drawTendrils() {
    tendrils.forEach(function(t) {
      t.angle += t.speed * 0.005;

      ctx.save();
      ctx.translate(orbX, orbY);
      ctx.rotate(t.angle);

      var segments = 20;
      var segLen = t.length / segments;

      ctx.beginPath();
      ctx.moveTo(0, 0);

      for (var i = 1; i <= segments; i++) {
        var dist = i * segLen;
        var wave = Math.sin(time * t.speed * 3 + t.phase + i * 0.5) * t.waveAmp * (i / segments);
        var fadeAlpha = 1 - (i / segments);
        ctx.lineTo(dist, wave);
      }

      ctx.strokeStyle = "rgba(" + t.color[0] + "," + t.color[1] + "," + t.color[2] + "," + (t.opacity * 0.6) + ")";
      ctx.lineWidth = t.width;
      ctx.lineCap = "round";
      ctx.filter = "blur(2px)";
      ctx.stroke();

      // Glow pass
      ctx.strokeStyle = "rgba(" + t.color[0] + "," + t.color[1] + "," + t.color[2] + "," + (t.opacity * 0.2) + ")";
      ctx.lineWidth = t.width * 4;
      ctx.filter = "blur(6px)";
      ctx.stroke();

      ctx.filter = "none";
      ctx.restore();
    });
  }

  // ============================
  // FOG / VELVET HAZE
  // ============================

  function createFogLayer(profile) {
    return {
      x: Math.random() * W,
      y: H * 0.4 + Math.random() * H * 0.5,
      width: 300 + Math.random() * 500,
      height: 100 + Math.random() * 200,
      speed: (Math.random() - 0.5) * profile.fog.speed,
      opacity: profile.fog.opacity * (0.4 + Math.random() * 0.6),
      phase: Math.random() * Math.PI * 2
    };
  }

  function rebuildFog(profile) {
    if (!profile.fog.enabled) { fogLayers = []; return; }
    var count = 4 + Math.floor(Math.random() * 3);
    while (fogLayers.length > count) fogLayers.pop();
    while (fogLayers.length < count) fogLayers.push(createFogLayer(profile));
  }

  function drawFog() {
    var c = currentProfile.colors.primary;
    fogLayers.forEach(function(f) {
      f.x += f.speed;
      if (f.x < -f.width) f.x = W + f.width * 0.5;
      if (f.x > W + f.width) f.x = -f.width * 0.5;

      var breathAlpha = f.opacity * (0.6 + 0.4 * Math.sin(time * 0.3 + f.phase));

      var grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.width * 0.5);
      grad.addColorStop(0, "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + breathAlpha + ")");
      grad.addColorStop(0.6, "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + (breathAlpha * 0.3) + ")");
      grad.addColorStop(1, "rgba(" + c[0] + "," + c[1] + "," + c[2] + ",0)");

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(f.x, f.y, f.width * 0.5, f.height * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  // ============================
  // HAZE OVERLAY (velvet warmth)
  // ============================

  function drawHaze() {
    if (currentProfile.haze <= 0) return;
    var c = currentProfile.colors.primary;
    var a = currentProfile.haze * (0.7 + 0.3 * Math.sin(time * 0.15));

    // Vignette-style warm haze from edges
    var grad = ctx.createRadialGradient(orbX, orbY, H * 0.15, orbX, orbY, H * 0.8);
    grad.addColorStop(0, "rgba(0,0,0,0)");
    grad.addColorStop(0.5, "rgba(" + Math.floor(c[0] * 0.3) + "," + Math.floor(c[1] * 0.2) + "," + Math.floor(c[2] * 0.2) + "," + (a * 0.3) + ")");
    grad.addColorStop(1, "rgba(" + Math.floor(c[0] * 0.4) + "," + Math.floor(c[1] * 0.15) + "," + Math.floor(c[2] * 0.15) + "," + a + ")");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
  }

  // ============================
  // ORB AURA (radial energy burst)
  // ============================

  function drawOrbAura() {
    var c = currentProfile.colors.primary;
    var intensity = currentProfile.orbPull;
    if (intensity <= 0) return;

    // Pulsing aura ring
    var pulseSize = 130 + 30 * Math.sin(time * 1.2);
    var a = intensity * 0.12 * (0.6 + 0.4 * Math.sin(time * 1.5));

    var grad = ctx.createRadialGradient(orbX, orbY, 60, orbX, orbY, pulseSize);
    grad.addColorStop(0, "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + a + ")");
    grad.addColorStop(0.6, "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + (a * 0.3) + ")");
    grad.addColorStop(1, "rgba(" + c[0] + "," + c[1] + "," + c[2] + ",0)");

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(orbX, orbY, pulseSize, 0, Math.PI * 2);
    ctx.fill();

    // Secondary pulse wave (offset timing)
    var pulse2 = 160 + 40 * Math.sin(time * 0.8 + 1.2);
    var a2 = intensity * 0.06 * (0.5 + 0.5 * Math.sin(time * 0.9 + 2));

    var grad2 = ctx.createRadialGradient(orbX, orbY, 80, orbX, orbY, pulse2);
    grad2.addColorStop(0, "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + a2 + ")");
    grad2.addColorStop(1, "rgba(" + c[0] + "," + c[1] + "," + c[2] + ",0)");

    ctx.fillStyle = grad2;
    ctx.beginPath();
    ctx.arc(orbX, orbY, pulse2, 0, Math.PI * 2);
    ctx.fill();
  }

  // ============================
  // MAIN RENDER LOOP
  // ============================

  function loop() {
    time += 0.016; // ~60fps timing
    ctx.clearRect(0, 0, W, H);

    // Handle stage transition interpolation
    if (targetProfile && transitionProgress < 1) {
      transitionProgress += transitionSpeed;
      if (transitionProgress >= 1) {
        transitionProgress = 1;
        currentProfile = targetProfile;
        targetProfile = null;
      }
    }

    // Draw layers back-to-front
    drawNebula();
    drawFog();
    drawOrbAura();
    drawTendrils();

    // Particles
    for (var i = 0; i < particles.length; i++) {
      updateParticle(particles[i], 0.016);
      drawParticle(particles[i]);
    }

    // Haze on top (velvet warmth)
    drawHaze();

    animFrame = requestAnimationFrame(loop);
  }

  // ============================
  // STAGE TRANSITION API
  // ============================

  function transitionToStage(stageName) {
    var profile = STAGE_PROFILES[stageName];
    if (!profile) return;

    targetProfile = profile;
    transitionProgress = 0;

    // Immediately rebuild visual elements for the new stage
    rebuildParticles(profile);
    rebuildNebula(profile);
    rebuildTendrils(profile);
    rebuildFog(profile);

    // Update particle colors gradually
    particles.forEach(function(p) {
      var c = profile.colors;
      var colorArr = Math.random() < 0.5 ? c.primary :
                     Math.random() < 0.7 ? c.secondary : c.accent;
      p.color = colorArr;
      p.baseAlpha = 0.15 + Math.random() * 0.45;
    });

    currentProfile = profile;
  }

  // ============================
  // INIT ON DOM READY
  // ============================

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Expose API
  window.LyraAtmosphere = {
    transitionToStage: transitionToStage,
    getProfile: function() { return currentProfile; },
    profiles: STAGE_PROFILES
  };

})();
