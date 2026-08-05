(function () {
  function initHorizontalSlider(track, prevBtn, nextBtn, slideSelector) {
    if (!track) return;
    var slides = track.querySelectorAll(slideSelector);
    if (!slides.length) return;

    function scrollBySlide(direction) {
      var slide = slides[0];
      var gap = parseFloat(getComputedStyle(track).gap || 0) || 16;
      var amount = slide.offsetWidth + gap;
      track.scrollBy({ left: direction * amount, behavior: 'smooth' });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        scrollBySlide(-1);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        scrollBySlide(1);
      });
    }
  }

  function initRelatedProducts() {
    document.querySelectorAll('[data-jf-pdp-related-track]').forEach(function (track) {
      var wrap = track.closest('.jf-pdp-related');
      if (!wrap) return;
      var arrows = wrap.querySelector('[data-jf-pdp-related-arrows]');
      var prev = arrows ? arrows.querySelector('[data-dir="prev"]') : null;
      var next = arrows ? arrows.querySelector('[data-dir="next"]') : null;
      initHorizontalSlider(track, prev, next, '.jf-pdp-related__slide');
    });
  }

  function initReviewsCarousel() {
    document.querySelectorAll('[data-jf-pdp-reviews-carousel]').forEach(function (stage) {
      var cards = Array.prototype.slice.call(stage.querySelectorAll('.jf-pdp-review-card'));
      if (!cards.length) return;

      var section = stage.closest('.jf-pdp-reviews');
      var dots = section ? section.querySelectorAll('.jf-pdp-reviews__dot') : [];
      var arrows = section ? section.querySelector('[data-jf-pdp-reviews-arrows]') : null;
      var active = Math.min(1, cards.length - 1);

      function render() {
        cards.forEach(function (card, index) {
          card.classList.toggle('is-center', index === active);
          card.hidden = cards.length > 3 && Math.abs(index - active) > 1;
        });
        dots.forEach(function (dot, index) {
          dot.classList.toggle('is-active', index === active);
        });
      }

      function move(delta) {
        active = (active + delta + cards.length) % cards.length;
        render();
      }

      dots.forEach(function (dot) {
        dot.addEventListener('click', function () {
          active = parseInt(dot.getAttribute('data-dot'), 10) || 0;
          render();
        });
      });

      if (arrows) {
        arrows.querySelector('[data-dir="prev"]').addEventListener('click', function () {
          move(-1);
        });
        arrows.querySelector('[data-dir="next"]').addEventListener('click', function () {
          move(1);
        });
      }

      render();
    });
  }

  function init() {
    initRelatedProducts();
    initReviewsCarousel();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  document.addEventListener('shopify:section:load', init);
})();
