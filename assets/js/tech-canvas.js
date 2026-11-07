/**
 * DXSL Tech Canvas Animation
 * High-performance interactive cybernetic particle network & data flow
 */

(function () {
  'use strict';

  const canvas = document.getElementById('tech-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height, dpr;
  let particles = [];
  let packets = [];
  let animationId = null;

  // Configuration
  const isMobile = window.innerWidth < 768;
  const PARTICLE_COUNT = isMobile ? 45 : 95;
  const CONNECT_DISTANCE = isMobile ? 110 : 160;
  const MOUSE_RADIUS = isMobile ? 120 : 180;

  const mouse = {
    x: null,
    y: null,
    active: false,
    radius: MOUSE_RADIUS
  };

  // Resize handler with High-DPI support
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    ctx.scale(dpr, dpr);
  }

  // Particle Class
  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = initial ? Math.random() * width : (Math.random() > 0.5 ? 0 : width);
      this.y = initial ? Math.random() * height : Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 2 + 1;
      this.baseAlpha = Math.random() * 0.5 + 0.3;
      this.alpha = this.baseAlpha;
      // Color palette: Cyan, Blue, Violet
      const colors = ['#00f0ff', '#38bdf8', '#818cf8', '#a855f7'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.pulseSpeed = Math.random() * 0.02 + 0.01;
      this.pulseVal = Math.random() * Math.PI;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Pulse alpha
      this.pulseVal += this.pulseSpeed;
      this.alpha = this.baseAlpha + Math.sin(this.pulseVal) * 0.2;

      // Mouse interaction (gentle attraction & push)
      if (mouse.active && mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);

        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 1.5;
          const angle = Math.atan2(dy, dx);
          // Push away slightly
          this.x -= Math.cos(angle) * force;
          this.y -= Math.sin(angle) * force;
          this.alpha = Math.min(1, this.alpha + 0.3);
        }
      }

      // Screen wrap / bounce
      if (this.x < -20) this.x = width + 20;
      if (this.x > width + 20) this.x = -20;
      if (this.y < -20) this.y = height + 20;
      if (this.y > height + 20) this.y = -20;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = Math.max(0.1, Math.min(1, this.alpha));
      ctx.fill();

      // Subtle glow for larger nodes
      if (this.radius > 2.2) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha * 0.25;
        ctx.fill();
      }
    }
  }

  // Data Packet Class (energy pulse flowing through network lines)
  class Packet {
    constructor(p1, p2) {
      this.p1 = p1;
      this.p2 = p2;
      this.progress = 0;
      this.speed = Math.random() * 0.025 + 0.015;
      this.size = Math.random() * 1.8 + 1.2;
    }

    update() {
      this.progress += this.speed;
      return this.progress <= 1;
    }

    draw() {
      const x = this.p1.x + (this.p2.x - this.p1.x) * this.progress;
      const y = this.p1.y + (this.p2.y - this.p1.y) * this.progress;

      ctx.beginPath();
      ctx.arc(x, y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = '#00f0ff';
      ctx.globalAlpha = 0.9;
      ctx.fill();

      // Packet trail
      ctx.beginPath();
      ctx.arc(x, y, this.size * 2, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.globalAlpha = 0.35;
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    packets = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }
  }

  function renderGrid() {
    // Subtle digital matrix background grid
    const gridSize = 60;
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.03)';
    ctx.globalAlpha = 1;

    ctx.beginPath();
    for (let x = 0; x < width; x += gridSize) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();

    // Ambient radial glow in center
    const radial = ctx.createRadialGradient(
      width / 2, height / 2, 10,
      width / 2, height / 2, Math.max(width, height) * 0.6
    );
    radial.addColorStop(0, 'rgba(15, 23, 42, 0.4)');
    radial.addColorStop(0.5, 'rgba(11, 15, 25, 0.8)');
    radial.addColorStop(1, 'rgba(5, 8, 15, 0.98)');

    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, width, height);
  }

  function connectParticles() {
    const len = particles.length;

    for (let i = 0; i < len; i++) {
      const p1 = particles[i];
      for (let j = i + 1; j < len; j++) {
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.hypot(dx, dy);

        if (dist < CONNECT_DISTANCE) {
          const alpha = (1 - dist / CONNECT_DISTANCE) * 0.22;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);

          // Line gradient between two particle colors
          const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
          grad.addColorStop(0, p1.color);
          grad.addColorStop(1, p2.color);

          ctx.strokeStyle = grad;
          ctx.globalAlpha = alpha;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Spawn occasional data packet between connected nodes
          if (Math.random() < 0.0006 && packets.length < 15) {
            packets.push(new Packet(p1, p2));
          }
        }
      }

      // Connect to mouse if active
      if (mouse.active && mouse.x !== null) {
        const mdx = mouse.x - p1.x;
        const mdy = mouse.y - p1.y;
        const mdist = Math.hypot(mdx, mdy);
        if (mdist < mouse.radius) {
          const mAlpha = (1 - mdist / mouse.radius) * 0.45;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = '#00f0ff';
          ctx.globalAlpha = mAlpha;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    renderGrid();

    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    connectParticles();

    // Update and draw data packets
    for (let i = packets.length - 1; i >= 0; i--) {
      const alive = packets[i].update();
      if (alive) {
        packets[i].draw();
      } else {
        packets.splice(i, 1);
      }
    }

    ctx.globalAlpha = 1;
    animationId = requestAnimationFrame(animate);
  }

  // Event Listeners
  window.addEventListener('resize', () => {
    resize();
    initParticles();
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  });

  window.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
      mouse.active = true;
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    mouse.active = false;
  });

  // Pause when tab not visible to save battery
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (animationId) cancelAnimationFrame(animationId);
    } else {
      animationId = requestAnimationFrame(animate);
    }
  });

  // Start
  resize();
  initParticles();
  animate();
})();
