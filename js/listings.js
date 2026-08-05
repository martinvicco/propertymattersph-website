/* Property Matters PH — renders listings from data/listings.json
   Add/edit listings via the admin panel at /admin/ (or edit the JSON directly). */

(function () {
  var GRADIENTS = ['g1', 'g2', 'g3', 'g4'];
  var HOUSE_SVG =
    '<svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#bcd8e0" stroke-width="1">' +
    '<path d="M3 13 L9 7 L13 11 M9 20 V13 M13 20 V11 L17 7 L21 11 V20"/></svg>';

  function esc(s) {
    var d = document.createElement('div');
    d.textContent = s || '';
    return d.innerHTML;
  }

  function card(l, i) {
    var hasPhoto = l.image && l.image.trim() !== '';
    var imgDiv = hasPhoto
      ? '<div class="prop-img" style="background-image:url(\'' + esc(l.image) + '\')">'
      : '<div class="prop-img ' + GRADIENTS[i % GRADIENTS.length] + '">' + HOUSE_SVG;
    var tag = l.status === 'lease' ? 'For Lease' : 'For Sale';
    return (
      '<div class="prop" data-status="' + esc(l.status) + '">' +
      imgDiv +
      '<span class="tag">' + tag + '</span></div>' +
      '<div class="prop-body">' +
      '<span class="loc">' + esc(l.location) + '</span>' +
      '<h3>' + esc(l.title) + '</h3>' +
      '<p>' + esc(l.description) + '</p>' +
      '<div class="price">' + esc(l.price || '₱ — Inquire for price') + '</div>' +
      '</div></div>'
    );
  }

  function render(listings) {
    var grid = document.getElementById('listings-grid');
    if (grid) {
      grid.innerHTML = listings.map(card).join('');
    }
    var featured = document.getElementById('featured-grid');
    if (featured) {
      featured.innerHTML = listings.slice(0, 3).map(card).join('');
    }
    // Re-apply URL filter (?filter=sale) now that cards exist
    var params = new URLSearchParams(window.location.search);
    var filter = params.get('filter');
    if (filter && typeof filterProps === 'function' && document.querySelector('.filter-bar')) {
      filterProps(filter);
    }
  }

  fetch('data/listings.json')
    .then(function (r) { return r.json(); })
    .then(function (data) { render(data.listings || []); })
    .catch(function (e) {
      console.error('Could not load listings:', e);
    });
})();
