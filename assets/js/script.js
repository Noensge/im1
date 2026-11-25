/* Volleyball – kleine Interaktionen */
(function () {
    'use strict';

    var root = document.documentElement;

    /* ---------- Hell / Dunkel ---------- */
    var toggle = document.querySelector('.theme-toggle');
    if (toggle) {
        var updateLabel = function () {
            var dark = root.getAttribute('data-theme') === 'dark';
            toggle.setAttribute('aria-pressed', dark ? 'true' : 'false');
            toggle.setAttribute('title', dark ? 'Zu hell wechseln' : 'Zu dunkel wechseln');
        };
        updateLabel();

        toggle.addEventListener('click', function () {
            var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', next);
            try { localStorage.setItem('theme', next); } catch (e) {}
            updateLabel();
        });
    }

    /* ---------- E-Mail-Adresse kopieren ---------- */
    document.querySelectorAll('[data-copy]').forEach(function (button) {
        var original = button.textContent;

        button.addEventListener('click', function () {
            var source = document.querySelector(button.getAttribute('data-copy'));
            if (!source) return;
            var text = source.textContent.trim();

            var done = function () {
                button.textContent = 'Kopiert ✓';
                button.classList.add('is-done');
                setTimeout(function () {
                    button.textContent = original;
                    button.classList.remove('is-done');
                }, 1800);
            };

            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(text).then(done);
            } else {
                // Fallback, wenn die Seite direkt als Datei geöffnet wird
                var helper = document.createElement('textarea');
                helper.value = text;
                helper.setAttribute('readonly', '');
                helper.style.position = 'absolute';
                helper.style.left = '-9999px';
                document.body.appendChild(helper);
                helper.select();
                try { document.execCommand('copy'); done(); } catch (e) {}
                document.body.removeChild(helper);
            }
        });
    });
})();