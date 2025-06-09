function selectProModel() {
  const modelButton = document.querySelector(
    '[data-test-id="bard-mode-menu-button"]'
  );
  if (!modelButton) {
    return;
  }

  const currentModelSpan = modelButton.querySelector(
    ".logo-pill-label-container span"
  );
  if (!currentModelSpan) {
    return;
  }

  const currentModelName = currentModelSpan.textContent.trim();
  const targetModelName = "2.5 Pro (preview)";

  if (currentModelName !== targetModelName) {
    console.log(
      `[Gemini Pro Setter] Current model is "${currentModelName}". Switching to "${targetModelName}".`
    );

    modelButton.click();

    setTimeout(() => {
      const menuItems = document.querySelectorAll(
        'div[role="menu"] button.mat-mdc-menu-item'
      );
      for (const item of menuItems) {
        const modelNameSpan = item.querySelector(".mode-title");
        if (
          modelNameSpan &&
          modelNameSpan.textContent.trim() === targetModelName
        ) {
          console.log(
            `[Gemini Pro Setter] Found "${targetModelName}" option. Clicking.`
          );
          item.click();
          break;
        }
      }
    }, 200);
  }
}

const observer = new MutationObserver((mutations) => {
  clearTimeout(observer.debounce);
  observer.debounce = setTimeout(() => {
    selectProModel();
  }, 500);
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
