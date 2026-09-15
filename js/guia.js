(function () {
  'use strict';

  function toggleContent(id) {
    var content = document.getElementById(id);
    if (!content) return;

    var allGuides = document.querySelectorAll('.guia');
    var isOpen = window.getComputedStyle(content).display === 'block';

    allGuides.forEach(function (guide) {
      if (guide !== content && window.getComputedStyle(guide).display === 'block') {
        guide.style.opacity = '0';
        guide.style.maxHeight = '0';
        guide.style.overflow = 'hidden';

        setTimeout(function () {
          guide.style.display = 'none';
          guide.style.opacity = '';
          guide.style.maxHeight = '';
          guide.style.overflow = '';
        }, 250);
      }
    });

    if (isOpen) {
      content.style.opacity = '0';
      content.style.maxHeight = '0';
      content.style.overflow = 'hidden';

      setTimeout(function () {
        content.style.display = 'none';
        content.style.opacity = '';
        content.style.maxHeight = '';
        content.style.overflow = '';
      }, 250);
    } else {
      content.style.display = 'block';
      content.style.maxHeight = content.scrollHeight + 'px';
      content.style.opacity = '0';
      content.style.overflow = 'hidden';

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          content.style.opacity = '1';
          content.style.maxHeight = content.scrollHeight + 100 + 'px';
        });
      });

      setTimeout(function () {
        content.style.opacity = '';
        content.style.maxHeight = '';
        content.style.overflow = '';
      }, 300);

      var items = content.querySelectorAll('a, p');
      items.forEach(function (item, index) {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-8px)';
        item.style.transition = 'none';

        requestAnimationFrame(function () {
          item.style.transition = 'opacity 300ms cubic-bezier(0.25, 1, 0.5, 1), transform 300ms cubic-bezier(0.25, 1, 0.5, 1)';
          item.style.transitionDelay = (index * 50 + 100) + 'ms';

          requestAnimationFrame(function () {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
          });
        });
      });
    }
  }

  window.toggleContent = toggleContent;

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.link-guia[data-guia]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var guiaId = this.getAttribute('data-guia');
        toggleContent(guiaId);
      });
    });

    var searchInput = document.getElementById('guia-search');
    if (searchInput) {
      searchInput.addEventListener('input', function () {
        var query = this.value.toLowerCase().trim();
        var links = document.querySelectorAll('.link-guia[data-guia]');

        links.forEach(function (link) {
          var text = link.textContent.toLowerCase();
          var guiaId = link.getAttribute('data-guia');
          var panel = document.getElementById(guiaId);
          var wrapper = link.parentNode;

          if (!query || text.indexOf(query) !== -1) {
            link.style.display = '';
            if (link.nextSibling && link.nextSibling.tagName === 'BR') {
              link.nextSibling.style.display = '';
            }
            if (panel) panel.style.display = '';
          } else {
            link.style.display = 'none';
            if (link.nextSibling && link.nextSibling.tagName === 'BR') {
              link.nextSibling.style.display = 'none';
            }
            if (panel) panel.style.display = 'none';
          }
        });
      });
    }
  });
})();
