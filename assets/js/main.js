/* ============================================================
   Nadir Merouani — Portfolio · DARK TECH · interactions
   ============================================================ */
(function () {
  'use strict';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Nav scrolled + barre de progression ── */
  var nav = document.getElementById('nav');
  var progress = document.getElementById('scrollProgress');
  var onScroll = function () {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 24);
    if (progress) {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      progress.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
    }
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Menu mobile ─────────────────────────── */
  var burger = document.getElementById('burger');
  var navMobile = document.getElementById('navMobile');
  if (burger && navMobile) {
    var setMenu = function (on) {
      burger.classList.toggle('on', on);
      navMobile.classList.toggle('on', on);
      burger.setAttribute('aria-expanded', String(on));
      burger.setAttribute('aria-label', on ? 'Fermer le menu' : 'Ouvrir le menu');
      navMobile.setAttribute('aria-hidden', String(!on));
      document.body.style.overflow = on ? 'hidden' : '';
    };
    burger.addEventListener('click', function () { setMenu(!burger.classList.contains('on')); });
    navMobile.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && burger.classList.contains('on')) { setMenu(false); burger.focus(); }
    });
  }

  /* ── Effet de frappe (terminal) ──────────── */
  var rotator = document.getElementById('rotator');
  if (rotator) {
    var words = ['maître_gestionnaire', 'reporting_data', 'finance_opérationnelle', 'excel_power_bi'];
    if (reduceMotion) {
      rotator.textContent = words[0];
    } else {
      var wi = 0, ci = 0, deleting = false;
      var tick = function () {
        var w = words[wi];
        if (!deleting) {
          ci++;
          rotator.textContent = w.slice(0, ci);
          if (ci === w.length) { deleting = true; setTimeout(tick, 1500); return; }
          setTimeout(tick, 72);
        } else {
          ci--;
          rotator.textContent = w.slice(0, ci);
          if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; setTimeout(tick, 260); return; }
          setTimeout(tick, 36);
        }
      };
      setTimeout(tick, 650);
    }
  }

  /* ── Halo qui suit la souris sur les cartes ── */
  if (!reduceMotion && window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.project-card').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
        card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
      });
    });
  }

  /* ── Apparition au scroll ────────────────── */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ── Scrollspy ───────────────────────────── */
  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));
  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navLinks.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + id); });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ── Bouton retour en haut ───────────────── */
  var toTop = document.getElementById('toTop');
  if (toTop) {
    window.addEventListener('scroll', function () {
      toTop.classList.toggle('show', window.scrollY > 600);
    }, { passive: true });
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  var finePointer = !reduceMotion && window.matchMedia('(pointer: fine)').matches;

  /* ── Tilt 3D de la photo ─────────────────── */
  var frame = document.querySelector('.photo-frame');
  if (frame && finePointer) {
    var area = frame.parentElement || frame;
    frame.style.transition = 'transform .25s cubic-bezier(.16,1,.3,1)';
    area.addEventListener('pointermove', function (e) {
      var r = frame.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - 0.5;
      var py = (e.clientY - r.top) / r.height - 0.5;
      frame.style.transform = 'perspective(900px) rotateY(' + (px * 7).toFixed(2) + 'deg) rotateX(' + (-py * 7).toFixed(2) + 'deg)';
    });
    area.addEventListener('pointerleave', function () { frame.style.transform = ''; });
  }

  /* ── Boutons magnétiques ─────────────────── */
  if (finePointer) {
    document.querySelectorAll('.hero-cta .btn, .contact-actions .btn').forEach(function (btn) {
      btn.addEventListener('pointermove', function (e) {
        var r = btn.getBoundingClientRect();
        var mx = e.clientX - r.left - r.width / 2;
        var my = e.clientY - r.top - r.height / 2;
        btn.style.transform = 'translate(' + (mx * 0.18).toFixed(1) + 'px,' + (my * 0.22).toFixed(1) + 'px)';
      });
      btn.addEventListener('pointerleave', function () { btn.style.transform = ''; });
    });
  }
})();
