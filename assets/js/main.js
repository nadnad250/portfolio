/* ============================================================
   Nadir Merouani — Portfolio · interactions
   ============================================================ */
(function () {
  'use strict';

  /* ── Nav : ombre / bordure au scroll ─────── */
  var nav = document.getElementById('nav');
  var onScroll = function () {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 24);
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
    burger.addEventListener('click', function () {
      setMenu(!burger.classList.contains('on'));
    });
    navMobile.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && burger.classList.contains('on')) {
        setMenu(false);
        burger.focus();
      }
    });
  }

  /* ── Apparition au scroll ────────────────── */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ── Scrollspy : lien de nav actif ───────── */
  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));
  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navLinks.forEach(function (a) {
            a.classList.toggle('active', a.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }
})();
