document.addEventListener('DOMContentLoaded', () => {
  const nowDate = new Date();

  const day = nowDate.getDate();
  const month = nowDate.getMonth() + 1;
  const year = nowDate.getFullYear();
  const momentDate = moment(nowDate).format('DD - MMM - YYYY');

  document.querySelector('#day').innerHTML = day;
  document.querySelector('#month').innerHTML = month;
  document.querySelector('#year').innerHTML = year;
  document.querySelector('#moment').innerHTML = momentDate;

  const countryInput = document.querySelector('#country-input');
  const countryForm = document.querySelector('#form');
  const content = document.querySelector('.content');
  let valueInput;
  const localData = localStorage.getItem('countries');
  let arrayData = localData ? JSON.parse(localData) : [];

  async function getCountries(url) {
    const response = await fetch(url);
    const data = await response.json();

    return data;
  }

  countryInput.addEventListener('change', (e) => {
    valueInput = e.target.value;
  });

  countryForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (valueInput && valueInput !== '') {
      const data = await getCountries(`https://restcountries.com/v3.1/name/${valueInput}`);

      data.map((item) => {
        arrayData.push(item);
      });

      localStorage.setItem('countries', JSON.stringify(arrayData));

      renderData(arrayData);

      countryInput.value = '';
    }
  });

  function renderData(data) {
    content.innerHTML = '';

    if (data.length !== 0) {
      data.map((item) => {
        const country = document.createElement('p');
        country.innerHTML = item.name.common;
        content.appendChild(country);
      });
    }
  }

  renderData(arrayData);

  // sessionStorage.setItem('Hello', valueEl);

  sessionStorage.getItem('Hello');
});
