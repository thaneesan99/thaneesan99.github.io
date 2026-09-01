(function() {
    function openGallery(button) {
        const images = (button.dataset.images || '').split('|').filter(Boolean);
        const title = button.dataset.title || 'Image Gallery';
        const backdrop = document.createElement('div');
        backdrop.className = 'gallery-backdrop';
        backdrop.setAttribute('role', 'dialog');
        backdrop.setAttribute('aria-modal', 'true');
        backdrop.innerHTML = '<div class="gallery-modal"><div class="gallery-heading"><h2></h2><button aria-label="Close gallery">×</button></div><div class="gallery-grid"></div></div>';
        backdrop.querySelector('h2').textContent = title;
        const grid = backdrop.querySelector('.gallery-grid');
        images.forEach(function(src, i) {
            const fig = document.createElement('figure');
            const img = document.createElement('img');
            img.src = src;
            img.alt = title + ' image ' + (i + 1);
            img.loading = 'lazy';
            img.decoding = 'async';
            fig.appendChild(img);
            grid.appendChild(fig)
        });

        function close() {
            backdrop.remove();
            document.removeEventListener('keydown', esc)
        }

        function esc(e) {
            if (e.key === 'Escape') close()
        }
        backdrop.querySelector('button').onclick = close;
        backdrop.addEventListener('click', function(e) {
            if (e.target === backdrop) close()
        });
        document.addEventListener('keydown', esc);
        document.body.appendChild(backdrop);
    }
    document.addEventListener('click', function(e) {
        const b = e.target.closest('[data-gallery]');
        if (b) openGallery(b)
    });
})();