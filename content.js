let hasAttemptedSwitch = false;

function selectProModel() {
  if (hasAttemptedSwitch) {
    return;
  }

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
  const targetModelNames = ["2.5 Pro (preview)", "2.5 Pro"];

  if (targetModelNames.includes(currentModelName)) {
    hasAttemptedSwitch = true;
    console.log(
      `[Gemini Pro Setter] "${currentModelName}" is already selected. Observer disconnected.`
    );
    observer.disconnect();
    return;
  }

  hasAttemptedSwitch = true;
  console.log(
    `[Gemini Pro Setter] Current model: "${currentModelName}". Attempting to switch to a Pro model.`
  );

  modelButton.click();

  setTimeout(() => {
    const menuItems = document.querySelectorAll(
      'div[role="menu"] button.mat-mdc-menu-item, .bard-mode-bottom-sheet button.bard-mode-list-button'
    );

    let bestOptionToClick = null;
    let foundModelName = "";

    for (const targetName of targetModelNames) {
      for (const item of menuItems) {
        const modelNameSpan = item.querySelector(
          ".mode-title, .title-and-description > .gds-label-l"
        );
        if (modelNameSpan && modelNameSpan.textContent.trim() === targetName) {
          bestOptionToClick = item;
          foundModelName = targetName;
          break;
        }
      }
      if (bestOptionToClick) {
        break;
      }
    }

    if (bestOptionToClick) {
      console.log(
        `[Gemini Pro Setter] Found "${foundModelName}" option in the menu. Clicking.`
      );
      bestOptionToClick.click();
      observer.disconnect();
      console.log(
        "[Gemini Pro Setter] Successfully switched model. Observer disconnected."
      );
    } else {
      console.log(
        `[Gemini Pro Setter] Could not find any suitable Pro model. No further attempts will be made on this page.`
      );
      if (document.querySelector('div[role="menu"]')) {
        modelButton.click();
      }
    }
  }, 500);
}

const observer = new MutationObserver(() => {
  clearTimeout(observer.debounce);
  observer.debounce = setTimeout(selectProModel, 500);
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

selectProModel();
