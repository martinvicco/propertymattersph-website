/* Property Matters PH — shared scripts */

/* Filter property cards by data-status ("sale" | "lease" | "all") */
function filterProps(status, scroll) {
  document.querySelectorAll('.filter-btn').forEach(function (b) {
    b.classList.toggle('active', b.dataset.filter === status);
  });
  var visible = 0;
  document.querySelectorAll('.prop').forEach(function (p) {
    var show = (status === 'all' || p.dataset.status === status);
    p.classList.toggle('hide', !show);
    if (show) visible++;
  });
  var empty = document.getElementById('no-results');
  if (empty) empty.style.display = visible ? 'none' : 'block';
  if (scroll) {
    var target = document.getElementById('properties');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  }
}

/* On page load: apply ?filter=sale / ?filter=lease from the URL
   (lets other pages link to properties.html?filter=sale),
   and ?intent=sell on the contact page. */
document.addEventListener('DOMContentLoaded', function () {
  var params = new URLSearchParams(window.location.search);

  var filter = params.get('filter');
  if (filter && document.querySelector('.filter-bar')) {
    filterProps(filter);
  }

  var intent = params.get('intent');
  var sel = document.getElementById('f-intent');
  if (intent && sel) {
    if (intent === 'sell') sel.value = 'Sell my property';
    if (intent === 'buy') sel.value = 'Buy a property';
    if (intent === 'lease') sel.value = 'Lease / Rent';
  }
});
