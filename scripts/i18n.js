/* Simple i18n loader
   - Detects language from <html lang="..."> (first two letters: 'pt' or 'en')
   - Loads `${lang}.json`
   - Applies translations to elements with:
       - data-i18n -> textContent
       - data-i18n-html -> innerHTML
       - data-i18n-alt -> alt attribute
       - data-i18n-title -> title attribute
   - Sets document.title and meta description / og:description if present in JSON
*/
(function () {
  function getLangCode() {
    var stored = null;
    try {
      stored = localStorage.getItem('siteLang');
    } catch (e) {
      /* ignore */
    }
    var lang = stored || document.documentElement.lang || navigator.language || 'pt';
    return lang.split('-')[0];
  }

  function applyTranslations(trans) {
    // plain text
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var value = trans[key];
      if (value !== undefined) {
        // keep HTML structure for headings that might contain tags? we use textContent
        el.textContent = value;
      }
    });

    // html content
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      var value = trans[key];
      if (value !== undefined)
        el.innerHTML = value;
    });

    // alt attributes
    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-alt');
      var value = trans[key];
      if (value !== undefined)
        el.setAttribute('alt', value);
    });

    // title attributes
    document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-title');
      var value = trans[key];
      if (value !== undefined)
        el.setAttribute('title', value);
    });

    // special meta/title
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && trans['meta.description'])
      metaDesc.setAttribute('content', trans['meta.description']);

    var ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && trans['meta.ogDescription'])
      ogDesc.setAttribute('content', trans['meta.ogDescription']);

  }

  function load() {
    var lang = getLangCode();
    var path = (lang === 'pt') ? '../lang/pt.json' : '../lang/en.json';
    fetch(path)
      .then(function (r) { if (!r.ok) throw new Error('Failed to load ' + path); return r.json(); })
      .then(function (trans) { applyTranslations(trans); })
      .catch(function (err) { console.warn('i18n:', err); });
  }

  function setLang(lang) {
    if (!lang) return;
    lang = lang.split('-')[0];
    try {
      localStorage.setItem('siteLang', lang);
    } catch (e) {
      /* ignore */
    }
    document.documentElement.lang = (lang === 'pt') ? 'pt-BR' : 'en';
    load();
  }

  function getLang() {
    return getLangCode();
  }

  // expose a small API for runtime language changes
  window.i18n = {
    setLang: setLang,
    getLang: getLang,
    load: load
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', load);
  } else {
    load();
  }
})();
