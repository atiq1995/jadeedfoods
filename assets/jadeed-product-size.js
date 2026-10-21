(() => {
  const init = () => {
    document.querySelectorAll('variant-selects').forEach((root) => {
      const sizeFieldset = root.querySelector('.jf-size-picker--required');
      if (!sizeFieldset) return;

      const radios = [...sizeFieldset.querySelectorAll('input[type="radio"]')];
      if (!radios.length) return;

      const formId = radios[0].getAttribute('form');
      const form = formId
        ? document.getElementById(formId)
        : root.closest('form') || document.querySelector('form[action*="/cart/add"]');
      const productForm = form ? form.closest('product-form') || form.parentElement : null;
      const submitButtons = productForm
        ? productForm.querySelectorAll('button[type="submit"], button[name="add"]')
        : document.querySelectorAll('product-form button[type="submit"], product-form button[name="add"]');
      const hint = sizeFieldset.querySelector('[data-size-hint]');

      const setEnabled = (enabled) => {
        submitButtons.forEach((btn) => {
          btn.disabled = !enabled;
          btn.setAttribute('aria-disabled', enabled ? 'false' : 'true');
        });
        if (hint) hint.hidden = enabled;
      };

      const selectRadio = (radio) => {
        if (!radio || radio.checked) {
          setEnabled(Boolean(sizeFieldset.querySelector('input[type="radio"]:checked')));
          return;
        }
        radio.checked = true;
        radio.dispatchEvent(new Event('change', { bubbles: true }));
        setEnabled(true);
      };

      const pickLowestAvailable = () => {
        const available = radios.filter((radio) => !radio.classList.contains('disabled') && !radio.disabled);
        if (!available.length) return null;

        const priced = available.filter((radio) => {
          const price = Number(radio.dataset.variantPrice);
          return !Number.isNaN(price) && price > 0;
        });
        const pool = priced.length ? priced : available;

        let best = pool[0];
        let bestPrice = Number(best.dataset.variantPrice || Number.POSITIVE_INFINITY);
        pool.forEach((radio) => {
          const price = Number(radio.dataset.variantPrice);
          if (!Number.isNaN(price) && price < bestPrice) {
            best = radio;
            bestPrice = price;
          }
        });
        return best;
      };

      const alreadySelected = sizeFieldset.querySelector('input[type="radio"]:checked');

      if (alreadySelected) {
        // Re-emit so Dawn syncs price / variant id when Size was preselected in Liquid.
        alreadySelected.dispatchEvent(new Event('change', { bubbles: true }));
        setEnabled(true);
      } else {
        selectRadio(pickLowestAvailable());
      }

      radios.forEach((radio) => {
        radio.addEventListener('change', () => {
          if (radio.checked) setEnabled(true);
        });
      });

      if (form) {
        form.addEventListener(
          'submit',
          (event) => {
            const selected = sizeFieldset.querySelector('input[type="radio"]:checked');
            if (!selected) {
              event.preventDefault();
              event.stopPropagation();
              selectRadio(pickLowestAvailable());
              if (!sizeFieldset.querySelector('input[type="radio"]:checked')) {
                setEnabled(false);
                if (hint) {
                  hint.hidden = false;
                  hint.focus?.();
                }
              }
            }
          },
          true
        );
      }
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
