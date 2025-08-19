function fillCaptcha() {
    console.log("[GITAM AutoFill] Trying to fill captcha...");

    const captchaEls = document.querySelectorAll(".preview span");
    const inputEl    = document.querySelector("#captcha_form");

    console.log("[GITAM AutoFill] Found captcha spans:", captchaEls.length);
    console.log("[GITAM AutoFill] Found input:", !!inputEl);

    if (captchaEls.length > 0 && inputEl) {
        let captchaValue = "";
        captchaEls.forEach(span => {
            captchaValue += span.textContent.trim();
        });

        inputEl.value = captchaValue;
        console.log("[GITAM AutoFill] Captcha filled with:", captchaValue);
        return true;
    }
    return false;
}

// MutationObserver keeps watching until captcha is ready
const observer = new MutationObserver(() => {
    if (fillCaptcha()) {
        observer.disconnect();
    }
});

observer.observe(document.body, { childList: true, subtree: true });

// Also run once after page load
window.addEventListener("load", () => {
    setTimeout(() => {
        console.log("[GITAM AutoFill] Running after page load...");
        fillCaptcha();
    }, 1500);
});
