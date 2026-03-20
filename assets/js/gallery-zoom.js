// Gallery Zoom on Hover - Fravega style (overlay on image)
document.addEventListener('DOMContentLoaded', function () {
  // Only enable zoom on desktop (>768px)
  if (window.innerWidth <= 768) return;

  // Create a single shared zoom result panel appended to body
  var zoomResult = document.createElement('div');
  zoomResult.className = 'zoom-result';
  document.body.appendChild(zoomResult);

  function initZoom(gallerySelector) {
    var gallery = document.querySelector(gallerySelector);
    if (!gallery) return;

    var galleryItems = gallery.querySelectorAll('.gallery-item');

    galleryItems.forEach(function (item) {
      var img = item.querySelector('img');
      if (!img) return;

      var zoomFactor = 2.5;
      var isActive = false;

      function moveZoom(e) {
        if (!isActive) return;

        var imgRect = img.getBoundingClientRect();

        // Mouse position relative to the displayed image
        var x = e.clientX - imgRect.left;
        var y = e.clientY - imgRect.top;

        // Check if mouse is over the image
        if (x < 0 || y < 0 || x > imgRect.width || y > imgRect.height) {
          zoomResult.style.display = 'none';
          return;
        }

        zoomResult.style.display = 'block';

        // Position zoom panel exactly on top of the image
        zoomResult.style.top = imgRect.top + 'px';
        zoomResult.style.left = imgRect.left + 'px';
        zoomResult.style.width = imgRect.width + 'px';
        zoomResult.style.height = imgRect.height + 'px';

        // Natural image size for high-quality zoom
        var natW = img.naturalWidth;
        var natH = img.naturalHeight;
        var scaleX = natW / imgRect.width;
        var scaleY = natH / imgRect.height;

        var bgW = natW * zoomFactor;
        var bgH = natH * zoomFactor;

        zoomResult.style.backgroundImage = 'url("' + img.src + '")';
        zoomResult.style.backgroundSize = bgW + 'px ' + bgH + 'px';

        // Map cursor position to zoomed background position
        var bgX = -(x * scaleX * zoomFactor - zoomResult.offsetWidth / 2);
        var bgY = -(y * scaleY * zoomFactor - zoomResult.offsetHeight / 2);
        zoomResult.style.backgroundPosition = bgX + 'px ' + bgY + 'px';
      }

      item.addEventListener('mouseenter', function () {
        isActive = true;
      });

      item.addEventListener('mouseleave', function () {
        isActive = false;
        zoomResult.style.display = 'none';
      });

      item.addEventListener('mousemove', moveZoom);
    });
  }

  // Initialize zoom for both mobile and desktop galleries
  initZoom('#product-gallery');
  initZoom('#product-gallery-desktop');
});
