class SiteNav extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="ft-nav-wrap">
        <div class="ft-nav">
          <a class="ft-brand" href="/">
            <img class="ft-pick" src="/logo.png" alt="FretTracks logo">
            <img class="ft-wordmark" src="/trial/frettracks.png" alt="FretTracks">
          </a>
          ${this.getAttribute('subtitle') ? `<span class="ft-nav-subtitle">${this.getAttribute('subtitle')}</span>` : ''}
          <button class="ft-hamburger" aria-label="Menu" onclick="this.closest('site-nav').querySelector('.ft-links').classList.toggle('open')">
            <span></span><span></span><span></span>
          </button>
          <div class="ft-links">
            <a href="/scalefacts.html">Scales</a>
            <a href="/support.html">Support</a>
            <a href="/privacy.html">Privacy</a>
            <a href="/tos.html">Terms</a>
          </div>
        </div>
      </div>
    `;

    // Inject styles once into the document head
    if (!document.getElementById('ft-nav-styles')) {
      const style = document.createElement('style');
      style.id = 'ft-nav-styles';
      style.textContent = `
        site-nav {
          display: block;
          position: sticky;
          top: 0;
          z-index: 20;
        }
        .ft-nav-wrap {
          background: #fff;
          border-bottom: 1px solid #E0E0E0;
        }
        .ft-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 20px;
          max-width: 1150px;
          margin: 0 auto;
          gap: 12px;
        }
        .ft-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }
        .ft-pick {
          width: 40px;
          height: 40px;
          border-radius: 9px;
          box-shadow: 0 1px 2px rgba(9,30,66,.08), 0 2px 8px rgba(9,30,66,.06);
        }
        .ft-wordmark {
          height: 28px;
          width: auto;
        }
        .ft-nav-subtitle {
          font-size: 14px;
          font-weight: 600;
          color: #667085;
          border-left: 1px solid #E0E0E0;
          padding-left: 14px;
          margin-left: 2px;
        }
        @media (max-width: 600px) {
          .ft-nav-subtitle { display: none; }
        }
        .ft-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
        }
        .ft-hamburger span {
          display: block;
          width: 24px;
          height: 2px;
          background: #212121;
          border-radius: 2px;
          transition: all 0.2s;
        }
        .ft-links {
          display: flex;
          align-items: center;
          gap: 4px;
          flex-wrap: wrap;
        }
        .ft-links a {
          display: inline-block;
          padding: 7px 11px;
          border-radius: 10px;
          text-decoration: none;
          color: #212121;
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
          font-size: 15px;
          white-space: nowrap;
        }
        .ft-links a:hover {
          background: #E9F0FF;
        }
        .ft-links a.active {
          background: #EEF4FC;
          color: #3A7BC8;
          font-weight: 600;
        }
        @media (max-width: 600px) {
          .ft-hamburger { display: flex; }
          .ft-links {
            display: none;
            flex-direction: column;
            align-items: flex-start;
            position: absolute;
            top: 62px;
            left: 0;
            right: 0;
            background: #fff;
            border-bottom: 1px solid #E0E0E0;
            padding: 8px 16px 16px;
            gap: 2px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          }
          .ft-links.open { display: flex; }
          .ft-links a { width: 100%; padding: 10px 12px; font-size: 16px; }
        }
      `;
      document.head.appendChild(style);
    }

    // Highlight the active page link
    const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
    this.querySelectorAll('.ft-links a').forEach(link => {
      const linkPath = new URL(link.href).pathname.replace(/\/$/, '') || '/';
      if (linkPath === currentPath) {
        link.classList.add('active');
      }
    });
  }
}

customElements.define('site-nav', SiteNav);

class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="ft-footer">
        © 2026 FretTracks Labs LLC ·
        <a href="/privacy.html">Privacy</a> ·
        <a href="/tos.html">Terms</a> ·
        <a href="/support.html">Support</a> ·
        <a href="https://www.instagram.com/frettracks/" target="_blank" rel="noopener" class="ft-ig-link">
          <svg class="ft-ig-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <circle cx="12" cy="12" r="4"/>
            <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
          </svg>
          @frettracks
        </a>
      </div>
    `;

    if (!document.getElementById('ft-footer-styles')) {
      const style = document.createElement('style');
      style.id = 'ft-footer-styles';
      style.textContent = `
        site-footer { display: block; }
        .ft-footer {
          margin: 36px 0 20px;
          text-align: center;
          color: #667085;
          font-size: 14px;
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
        }
        .ft-footer a {
          color: #667085;
          text-decoration: underline;
        }
        .ft-footer a:hover { color: #3A7BC8; }
        .ft-ig-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          text-decoration: none !important;
          color: #667085;
          font-weight: 500;
        }
        .ft-ig-link:hover { color: #C13584 !important; }
        .ft-ig-icon {
          width: 15px;
          height: 15px;
          vertical-align: middle;
        }
      `;
      document.head.appendChild(style);
    }
  }
}

customElements.define('site-footer', SiteFooter);
