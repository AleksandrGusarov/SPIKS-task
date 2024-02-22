'use strict';

class RangeSlider {
  constructor(containerSelector) {
    const container = document.querySelector(containerSelector);
    this.range = container.querySelectorAll('.range-slider input');
    this.progress = container.querySelector('.range-slider .progress');
    this.inputValue = container.querySelectorAll('.numberVal input');
    this.tooltipMin = container.querySelector('.tooltip-min');
    this.tooltipMax = container.querySelector('.tooltip-max');
    this.gap = 1000;

    this.updateSliderValues = this.updateSliderValues.bind(this);

    this.range.forEach(input => {
      input.addEventListener('input', this.updateSliderValues);
    });

    this.inputValue.forEach(input => {
      input.addEventListener('input', () => {
        this.range[0].value = parseInt(this.inputValue[0].value);
        this.range[1].value = parseInt(this.inputValue[1].value);
        this.updateSliderValues();
      });
    });
    this.updateSliderValues();
  }

  updateSliderValues() {
    const minrange = parseInt(this.range[0].value);
    const maxrange = parseInt(this.range[1].value);
    if (maxrange - minrange < this.gap) {
      this.range[0].value = maxrange - this.gap;
      this.range[1].value = minrange + this.gap;
    } else {
      this.progress.style.left = (minrange / this.range[0].max) * 100 + '%';
      this.progress.style.right = 100 - (maxrange / this.range[1].max) * 100 + '%';
      this.inputValue[0].value = minrange;
      this.inputValue[1].value = maxrange;
      const minPosition = (minrange / this.range[0].max) * 95;
      const maxPosition = (maxrange / this.range[1].max) * 95;
      this.tooltipMin.innerText = `${minrange} $`;
      this.tooltipMin.style.left = `calc(${minPosition}% - 20px)`;
      this.tooltipMin.style.display = 'block';
      this.tooltipMax.innerText = `${maxrange} $`;
      this.tooltipMax.style.left = `calc(${maxPosition}% - 20px)`;
      this.tooltipMax.style.display = 'block';
    }
  }
}

// Инициализация для первого слайдера
const priceSlider = new RangeSlider('.container__slider:nth-child(1)');

// Инициализация для второго слайдера
class THCSlider extends RangeSlider {
  constructor(containerSelector) {
    super(containerSelector);
  }

  updateSliderValues() {
    const maxTHC = parseInt(this.range[0].value);
    this.progress.style.width = (maxTHC / this.range[0].max) * 100 + '%';
    this.inputValue[0].value = maxTHC;

    const maxPositionTHC = (maxTHC / this.range[0].max) * 95;

    this.tooltipMax.innerText = `${maxTHC} %`;
    this.tooltipMax.style.left = `calc(${maxPositionTHC}% - 20px)`;
    this.tooltipMax.style.display = 'block';
  }
}

// Инициализация для второго слайдера
const thcSlider = new THCSlider('.container__slider:nth-child(2)');


// Инициализация для третьего слайдера
class CBDSlider extends RangeSlider {
  constructor(containerSelector) {
    super(containerSelector);
  }

  updateSliderValues() {
    const maxCBD = parseInt(this.range[0].value);
    this.progress.style.width = (maxCBD / this.range[0].max) * 100 + '%';
    this.inputValue[0].value = maxCBD;

    const maxPositionCBD = (maxCBD / this.range[0].max) * 95;

    this.tooltipMax.innerText = `${maxCBD} %`;
    this.tooltipMax.style.left = `calc(${maxPositionCBD}% - 20px)`;
    this.tooltipMax.style.display = 'block';
  }
}


// Инициализация для третьего слайдера
const cbdSlider = new CBDSlider('.container__slider:nth-child(3)');

function toggleCheckbox(checkbox) {
  const label = checkbox.closest('.checkbox-group__label');
  label.classList.toggle('checkbox-active');
}

document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('.sort__button');
  const wrapper = document.querySelector('.sort__wrapper');

  button.addEventListener('click', () => {
    wrapper.classList.toggle('sort__wrapper--inactive');
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const icons = document.querySelectorAll('.parameters__icon');

  icons.forEach((icon) => {
    icon.addEventListener('click', () => {
      const targetId = icon.getAttribute('data-target');
      const wrapperList = document.querySelector(`.parameters__list[data-id="${targetId}"]`);

      wrapperList.classList.toggle('parameters__list--inactive');
      icon.classList.toggle('parameters__icon--rotated');
    });
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const descriptions = document.querySelectorAll('.parameters__description');
  const parametersItem = document.querySelectorAll('.parameters__item');

  descriptions.forEach(description => {
    description.addEventListener('click', () => {
      if (description.classList.contains('description--active')) {
        description.classList.remove('description--active');
        description.classList.add('description--inactive');
      } else {
        description.classList.remove('description--inactive');
        description.classList.add('description--active');
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const descriptions = document.querySelectorAll('.parameters__description');
  const buttons = document.querySelectorAll('.result__button');
  const parametersItems = document.querySelectorAll('.parameters__item');
  const checkboxes = document.querySelectorAll('.parameters__checkbox');

  if (descriptions.length > 0 && buttons.length > 0 && parametersItems.length > 0 && checkboxes.length > 0) {
    descriptions.forEach((description, index) => {
      const isInactive = description.classList.contains('description--inactive');
      buttons[index].classList.toggle('result__button--hidden', isInactive);

      description.addEventListener('click', () => {
        buttons[index].classList.toggle('result__button--hidden');
        toggleDescriptionState(description, checkboxes[index]);
      });

      const closeButton = buttons[index].querySelector('img');
      if (closeButton) {
        closeButton.addEventListener('click', (event) => {
          event.stopPropagation();
          buttons[index].classList.add('result__button--hidden');
          toggleDescriptionState(description, checkboxes[index]);
        });
      }

      const parametersItem = parametersItems[index];
      if (parametersItem) {
        parametersItem.addEventListener('click', () => {
          toggleDescriptionState(description, checkboxes[index]);
        });
      }

      description.addEventListener('click', () => {
        toggleDescriptionState(description, checkboxes[index]);
      });
    });

    checkboxes.forEach((checkbox, index) => {
      checkbox.addEventListener('change', () => {
        toggleButtonVisibility(checkbox, buttons[index]);
      });
    });
  }

  function toggleDescriptionState(description, checkbox) {
    description.classList.toggle('description--active');
    description.classList.toggle('description--inactive');

    checkbox.checked = description.classList.contains('description--active');
  }

  function toggleButtonVisibility(checkbox, button) {
    button.classList.toggle('result__button--hidden', !checkbox.checked);
  }
});
