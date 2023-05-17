const range = document.querySelector('#range');
const inputDp3 = document.querySelector('#dp3');
const loaders = document.querySelectorAll('.loader');
const pAngle = document.querySelector('#angle code');
const pSize = document.querySelector('#initial-size code');
const pTrackSize = document.querySelector('#track-size code');
const pPercent = document.querySelector('#percent code');
const nav = document.querySelector('nav');
const toggleButton = document.querySelector('#toggle-nav');

const toggleNav = () => {  
  toggleButton.addEventListener('click', () => {
    nav.classList.toggle('open');
    if (toggleButton.textContent === "Open") {
      toggleButton.textContent = "Close"
    } else {
      toggleButton.textContent = "Open"
    }
  });
}

const updateContent = () => {
  if (CSS.supports('color', 'color(display-p3 0 0 0)')) {
    console.log('Display-P3 compatible');
    inputDp3.checked = true;
    loaders.forEach(loader => loader.classList.add('dp3-colors'));
  } else {
    // Browser does not support display-P3
    console.log('Not Display-P3 compatible');
    inputDp3.checked = false;
    loaders.forEach(loader => loader.classList.remove('dp3-colors'));
  }

  const angle = range.value + 'deg';
  const percent = (range.value / 360 * 100).toFixed(2) + '%';
  const size = getComputedStyle(loaders[0]).getPropertyValue('--init-size');
  const trackSize = getComputedStyle(loaders[0]).getPropertyValue('--track-size');

  loaders.forEach(loader => {
    loader.style.setProperty('--angle', angle);
    loader.style.setProperty('--percent', percent);

    pAngle.innerHTML = angle;
    pPercent.innerHTML = percent;
    pSize.innerHTML = size;
    pTrackSize.innerHTML = trackSize;
  });
}

// Event listener for the range input
range.addEventListener('input', updateContent);

// Event listener for the dp3 checkbox
inputDp3.addEventListener('click', () => {
  loaders.forEach(loader => loader.classList.toggle('dp3-colors'));
});

// Event listener for the "DOMContentLoaded" event
window.addEventListener('DOMContentLoaded', () => {
  updateContent() 
  toggleNav()
});

// Event listeners for editable elements
pAngle.addEventListener('input', () => {
  const angle = pAngle.textContent.trim();
  range.value = parseFloat(angle);
  updateContent();
});

pSize.addEventListener('input', () => {
  const size = pSize.textContent.trim();
  loaders.forEach(loader => {
    loader.style.setProperty('--init-size', size);
  });
  updateContent();
});

pTrackSize.addEventListener('input', () => {
  const trackSize = pTrackSize.textContent.trim();
  loaders.forEach(loader => {
    loader.style.setProperty('--track-size', trackSize);
  });
  updateContent();
});

pPercent.addEventListener('input', () => {
  const percent = pPercent.textContent.trim();
  const value = parseFloat(percent) * 360 / 100;
  range.value = value;
  updateContent();
});

