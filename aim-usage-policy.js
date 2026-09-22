(function () {
  "use strict";

  function setLanguage(lang) {
    var en = document.getElementById("panel-en");
    var id = document.getElementById("panel-id");
    if (!en || !id) return;

    var isID = lang === "id";
    en.hidden = isID;
    id.hidden = !isID;

    document.querySelectorAll('[data-lang-btn="en"]').forEach(function (button) {
      button.classList.toggle("active", !isID);
    });

    document.querySelectorAll('[data-lang-btn="id"]').forEach(function (button) {
      button.classList.toggle("active", isID);
    });

    document.documentElement.lang = lang;

    try {
      localStorage.setItem("aim-language", lang);
    } catch (e) {}

    window.scrollTo({ top: 0, behavior: "auto" });
  }

  window.setLanguage = setLanguage;

  window.copyText = function (id, button) {
    var source = document.getElementById(id);
    if (!source) return;

    var text = source.innerText || source.textContent || "";

    function copied() {
      if (!button) return;
      var original = button.innerText;
      button.innerText = "Copied ✓";
      setTimeout(function () {
        button.innerText = original;
      }, 1400);
    }

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(copied).catch(function () {
        fallbackCopy(text);
        copied();
      });
    } else {
      fallbackCopy(text);
      copied();
    }
  };

  function fallbackCopy(text) {
    var area = document.createElement("textarea");
    area.value = text;
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    try { document.execCommand("copy"); } catch (e) {}
    document.body.removeChild(area);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var saved = "id";
    try {
      saved = localStorage.getItem("aim-language") || "id";
    } catch (e) {}

    setLanguage(saved === "en" ? "en" : "id");
  });
})();
