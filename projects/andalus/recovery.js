const brand = '<div class="screen-brand"><span class="brand-mark">a.</span> ANDALUS SMART WAY</div>';
const trip = '<div class="saved-trip"><small>SAVED SEARCH · ROUND TRIP</small><h4>Algiers <span aria-hidden="true">→</span> London</h4><p>18–25 November · 1 adult · Economy</p></div>';
const action = (label) => '<button class="primary" data-resume>' + label + '<span aria-hidden="true">→</span></button>';
const channels = {
  web: {
    name: 'Web', title: 'Remember the trip.<br>Remove the repetition.',
    description: 'A quiet saved-search card meets the returning traveler where they already are.',
    eligibility: 'Same-device saved search, or a recognized account.',
    purpose: 'Restore route, dates, and travelers. Check current results before offering a flight.',
    screen: window.recoveryScreens.web
  },
  app: {
    name: 'App', title: 'A familiar trip.<br>A shorter way back.',
    description: 'A permitted push opens the trip, with an equivalent web destination when the app cannot open.',
    eligibility: 'Recognized traveler, push permission, valid trip state.',
    purpose: 'Resume the same trip across devices. Never send the traveler to an unrelated home screen.',
    screen: window.recoveryScreens.app
  },
  email: {
    name: 'Email', title: 'An invitation.<br>With useful context.',
    description: 'The email helps the traveler recognize the trip and understand the next step.',
    eligibility: 'Eligible email permission, fresh intent, no completed booking.',
    purpose: 'Use a secure return link. Avoid exposing passenger details or promising the old fare.',
    screen: window.recoveryScreens.email
  }
};
const showcase = document.querySelector('#design-screens');
const screenNotes = {
  web: ['Saved search / Web', 'Recognize the trip immediately.', 'Route, dates, and travelers stay together in a quiet return card.'],
  app: ['Trip continuation / App', 'Take the same trip across devices.', 'A relevant notification leads into the saved trip with a clear next action.'],
  email: ['Recovery invitation / Email', 'Give the reminder a purpose.', 'A recognizable itinerary and honest fare language create a useful return path.']
};
showcase.innerHTML = Object.entries(screenNotes).map(([key, [label, title, description]]) => {
  const preview = channels[key].screen
    .replace(/<button([^>]*)>/g, '<span $1>')
    .replaceAll('</button>', '</span>');
  return '<figure class="design-shot design-shot-' + key + '"><div class="design-shot-stage">' + preview + '</div><figcaption><small>' + label + '</small><h3>' + title + '</h3><p>' + description + '</p></figcaption></figure>';
}).join('');
const panel = document.querySelector('#channel-panel');
const tabs = [...document.querySelectorAll('[data-channel]')];
function selectChannel(key, focus = false) {
  const item = channels[key];
  tabs.forEach(tab => {
    const selected = tab.dataset.channel === key;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    if (selected && focus) tab.focus();
  });
  panel.setAttribute('aria-labelledby', 'tab-' + key);
  panel.dataset.channel = key;
  panel.innerHTML = item.screen + '<div class="channel-copy"><p class="eyebrow">' + item.name + ' / Channel role</p><h3>' + item.title + '</h3><p>' + item.description + '</p><dl><dt>WHEN</dt><dd>' + item.eligibility + '</dd><dt>DESIGN INTENT</dt><dd>' + item.purpose + '</dd></dl></div>';
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectChannel(tab.dataset.channel));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    selectChannel(tabs[next].dataset.channel, true);
  });
});
const returnScreen = document.querySelector('#return-screen');
const states = {
  available: {status:'Tarif actualisé',title:'Votre voyage est prêt à être vérifié.',copy:'Vos dates et votre itinéraire sont conservés. Vérifiez votre vol avant de poursuivre la réservation.',label:'Total · 1 adulte',price:'85 000 DZD',action:'Vérifier mon vol',result:'Aperçu du parcours : votre sélection est conservée. Aucun paiement ni réservation ne sont effectués dans cette démonstration.'},
  changed: {status:'Le tarif a évolué',title:'Un nouveau tarif, à vous de choisir.',copy:'Le prix a changé depuis votre dernière visite. Consultez le tarif actualisé ou recherchez un autre vol.',label:'Total · 1 adulte',price:'<del>85 000 DZD</del> 90 000 DZD',action:'Consulter le nouveau tarif',result:'Le nouveau total doit être accepté avant de continuer. Vous pouvez aussi modifier votre sélection.'},
  soldout: {status:'Vol indisponible',title:'D’autres possibilités pour votre voyage.',copy:'Ce vol n’est plus disponible. Vos dates sont conservées pour rechercher les autres possibilités.',label:'Recherche conservée',price:'ALG → LHR',action:'Voir les autres vols',result:'Recherche : Alger–Londres, du 18 au 25 novembre, pour 1 adulte. Aucun vol de remplacement n’est sélectionné automatiquement.'}
};
function selectState(key) {
  const state = states[key];
  document.querySelectorAll('[data-state]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.state === key)));
  returnScreen.innerHTML = '<div class="return-status ' + (key === 'available' ? '' : 'warning') + '">' + state.status + '</div><h4>' + state.title + '</h4><p>' + state.copy + '</p><div class="fare-line"><span>' + state.label + '</span><b>' + state.price + '</b></div><button class="primary" data-review="' + key + '">' + state.action + '<span aria-hidden="true">→</span></button>';
}
document.querySelectorAll('[data-state]').forEach(button => button.addEventListener('click', () => selectState(button.dataset.state)));
document.addEventListener('click', event => {
  const edit = event.target.closest('button[data-edit-trip]');
  if (edit) {
    edit.outerHTML = '<p class="asw-mobile-notice" role="status">Vos dates : du 18 au 25 novembre. La modification des dates sera disponible dans le parcours de réservation.</p>';
  }
  if (event.target.closest('button[data-resume]')) {
    selectState('available');
    const lab = document.querySelector('.return-lab');
    lab.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',block:'center'});
    returnScreen.querySelector('button').focus({preventScroll:true});
  }
  const review = event.target.closest('[data-review]');
  if (review && !returnScreen.querySelector('.demo-result')) {
    const result = document.createElement('p');
    result.className = 'demo-result';
    result.textContent = states[review.dataset.review].result;
    returnScreen.append(result);
  }
  const dismiss = event.target.closest('[data-dismiss]');
  if (dismiss) {
    const body = dismiss.closest('.screen-body');
    body.innerHTML = brand + '<h4>Search dismissed.</h4><p>Recovery for this saved trip stops. Start again whenever you are ready.</p><button class="primary" data-reset>Reset prototype <span>↻</span></button>';
  }
  if (event.target.closest('[data-reset]')) selectChannel('web');
});
selectChannel('web');
selectState('available');
// The same case study works as a standalone page and inside the portfolio dialog.
if (window.parent !== window) document.documentElement.classList.add('embedded');
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && window.parent !== window) window.parent.postMessage({type:'close-andalus-case'}, location.origin);
});
