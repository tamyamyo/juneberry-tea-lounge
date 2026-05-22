/* =====================================================
   JUNEBERRY TEA LOUNGE — TEST GATE
   Simple shared-password overlay for /test/ area.

   HOW TO CHANGE THE PASSWORD:
   1. Pick a new password (e.g. "newpassword2026")
   2. Open a terminal and run:
        printf 'newpassword2026' | sha256sum
      (or use any SHA-256 tool — https://emn178.github.io/online-tools/sha256.html)
   3. Replace the PASSWORD_HASH value below with the new hash
   4. Tell your testers the new password
   5. Commit and push — Vercel auto-deploys

   Note: this is a courtesy gate. The hash is in client-side JS,
   so a determined developer could brute-force a weak password.
   For a tea-shop test environment with friends/family, this is fine.
   For anything sensitive, upgrade to Cloudflare Access (email allowlist)
   or Vercel Pro's built-in password protection.
   ===================================================== */

(function () {
    'use strict';

    // SHA-256 of "tealounge2026" — change this to rotate the password.
    const PASSWORD_HASH = 'c858248385f2dd1bbcb332ab671359ba14e81390e332329fadc19805a74e794f';

    const AUTH_KEY = 'juneberry-test-auth-v1';

    // If already authenticated this session, skip the gate entirely.
    if (sessionStorage.getItem(AUTH_KEY) === 'ok') return;

    // Hide page content immediately so it never flashes through.
    const hideStyle = document.createElement('style');
    hideStyle.id = 'juneberry-gate-hide';
    hideStyle.textContent = 'body > *:not(#juneberry-gate) { visibility: hidden !important; }';
    (document.head || document.documentElement).appendChild(hideStyle);

    // SHA-256 helper using Web Crypto API.
    async function sha256(text) {
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        const buf = await crypto.subtle.digest('SHA-256', data);
        return Array.from(new Uint8Array(buf))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    }

    function injectGate() {
        const gate = document.createElement('div');
        gate.id = 'juneberry-gate';
        gate.innerHTML = `
            <style>
                #juneberry-gate {
                    position: fixed;
                    inset: 0;
                    z-index: 99999;
                    background:
                        radial-gradient(ellipse at top, rgba(201, 169, 97, 0.08) 0%, transparent 50%),
                        linear-gradient(135deg, #1a3a2a 0%, #0f2817 100%);
                    color: #f5f3f0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                    font-weight: 300;
                }
                #juneberry-gate .gate-card {
                    max-width: 460px;
                    width: 100%;
                    text-align: center;
                }
                #juneberry-gate .gate-eyebrow {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 1rem;
                    margin-bottom: 2rem;
                }
                #juneberry-gate .gate-eyebrow span {
                    height: 1px;
                    width: 30px;
                    background: #c9a961;
                    opacity: 0.6;
                }
                #juneberry-gate .gate-eyebrow em {
                    font-style: normal;
                    font-size: 0.72rem;
                    letter-spacing: 3px;
                    text-transform: uppercase;
                    color: #c9a961;
                }
                #juneberry-gate h1 {
                    font-family: 'Playfair Display', Georgia, serif;
                    font-weight: 400;
                    font-style: italic;
                    font-size: 2.2rem;
                    margin: 0 0 1rem;
                    line-height: 1.3;
                    letter-spacing: -0.5px;
                }
                #juneberry-gate p {
                    font-size: 0.95rem;
                    opacity: 0.8;
                    line-height: 1.6;
                    margin: 0 0 2rem;
                }
                #juneberry-gate form {
                    display: flex;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                }
                #juneberry-gate input[type="password"] {
                    flex: 1;
                    min-width: 200px;
                    padding: 0.9rem 1.2rem;
                    border: 1px solid rgba(201, 169, 97, 0.4);
                    background: rgba(255, 255, 255, 0.05);
                    color: #f5f3f0;
                    font-family: inherit;
                    font-size: 0.95rem;
                    letter-spacing: 0.5px;
                    border-radius: 1px;
                }
                #juneberry-gate input[type="password"]::placeholder {
                    color: rgba(245, 243, 240, 0.4);
                }
                #juneberry-gate input[type="password"]:focus {
                    outline: none;
                    border-color: #c9a961;
                    background: rgba(255, 255, 255, 0.08);
                }
                #juneberry-gate button {
                    padding: 0.9rem 2rem;
                    border: 1.5px solid #c9a961;
                    background: #c9a961;
                    color: #0f2817;
                    font-family: inherit;
                    font-size: 0.85rem;
                    font-weight: 500;
                    letter-spacing: 1.5px;
                    text-transform: uppercase;
                    cursor: pointer;
                    border-radius: 1px;
                    transition: all 0.3s ease;
                }
                #juneberry-gate button:hover {
                    background: #d4b876;
                    border-color: #d4b876;
                }
                #juneberry-gate .gate-error {
                    color: #e89f9f;
                    font-size: 0.85rem;
                    margin-top: 1rem;
                    min-height: 1.2em;
                    letter-spacing: 0.3px;
                }
                #juneberry-gate.shake .gate-card {
                    animation: gate-shake 0.4s;
                }
                @keyframes gate-shake {
                    0%, 100% { transform: translateX(0); }
                    20%, 60% { transform: translateX(-6px); }
                    40%, 80% { transform: translateX(6px); }
                }
                #juneberry-gate .gate-footer {
                    margin-top: 2.5rem;
                    font-size: 0.7rem;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    color: rgba(245, 243, 240, 0.4);
                }
            </style>
            <div class="gate-card">
                <div class="gate-eyebrow">
                    <span></span><em>Private Preview</em><span></span>
                </div>
                <h1>Juneberry &mdash; Test Environment</h1>
                <p>This area is for invited testers. Enter the access password to continue.</p>
                <form id="juneberry-gate-form">
                    <input type="password" id="juneberry-gate-input" placeholder="Password" autocomplete="off" autofocus required>
                    <button type="submit">Enter</button>
                </form>
                <div class="gate-error" id="juneberry-gate-error"></div>
                <div class="gate-footer">Juneberry Tea Lounge</div>
            </div>
        `;

        // Defer body manipulation until body exists.
        function attach() {
            document.body.appendChild(gate);
            const form = gate.querySelector('#juneberry-gate-form');
            const input = gate.querySelector('#juneberry-gate-input');
            const errorEl = gate.querySelector('#juneberry-gate-error');

            form.addEventListener('submit', async function (e) {
                e.preventDefault();
                errorEl.textContent = '';
                const attempted = input.value;
                const hash = await sha256(attempted);
                if (hash === PASSWORD_HASH) {
                    sessionStorage.setItem(AUTH_KEY, 'ok');
                    const styleEl = document.getElementById('juneberry-gate-hide');
                    if (styleEl) styleEl.remove();
                    gate.remove();
                } else {
                    errorEl.textContent = 'Incorrect password. Please try again.';
                    gate.classList.add('shake');
                    setTimeout(() => gate.classList.remove('shake'), 500);
                    input.select();
                }
            });

            input.focus();
        }

        if (document.body) {
            attach();
        } else {
            document.addEventListener('DOMContentLoaded', attach, { once: true });
        }
    }

    injectGate();
})();
