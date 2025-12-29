import { useEffect } from 'react';

export default function UnicornLabelPatch() {
  useEffect(() => {
    const targetClass = '.background';
    const appliedFlag = 'data-label-patched';

    const applyPatch = (root = document) => {
      const wrapper = root.querySelector(targetClass);
      if (!wrapper) return false;

      const anchor = wrapper.querySelector('a');
      const img = anchor?.querySelector('img');

      if (!img || !anchor) return false;

      // Не повторять ненужные операции
      if (img.getAttribute(appliedFlag) === 'true') return true;

      // Твой патч
      anchor.href = '#';
      img.src = '/one-fine-day/label.svg';

      // Помечаем, что применено
      img.setAttribute(appliedFlag, 'true');

      // Если Unicorn может использовать srcset — чтобы не переопределялось обратно
      // img.removeAttribute('srcset');

      return true;
    };

    applyPatch();

    // Наблюдаем за будущими вставками/перерисовками
    const observer = new MutationObserver(mutations => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (!(node instanceof HTMLElement)) continue;
          // Если добавился сам wrapper или его потомки — пробуем применить
          if (node.matches?.(targetClass) || node.querySelector?.(targetClass)) {
            applyPatch(node);
          }
        }
      }
      // Подстраховка: иногда изменения происходят без добавления узлов
      applyPatch();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  // Компонент не рендерит UI
  return null;
}
