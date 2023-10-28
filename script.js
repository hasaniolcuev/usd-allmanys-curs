const apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD';
const table = document.getElementById('exchange-rates');
const refreshInterval = 1000; // Yenileme süresi (milisaniye cinsinden), burada 1 saniye olarak ayarlanmıştır

function fetchExchangeRates() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const rates = data.rates;
      let html = '';
      Object.keys(rates).forEach(currency => {
        const rate = rates[currency];
        const flag = getCountryFlag(currency);
        const change = getRateChange(currency, rate);
        const changeIcon = change >= 0 ? '<i class="fas fa-arrow-up increase-icon"></i>' : '<i class="fas fa-arrow-down decrease-icon"></i>';
        html += `<tr><td><img class="flag-img" src="${flag}" alt="${currency}"></td><td>${currency}</td><td>${rate}</td><td>${changeIcon} ${Math.abs(change)}</td></tr>`;
      });
      table.innerHTML = html;
    })
    .catch(error => {
      console.error('API isteği başarısız oldu:', error);
      table.innerHTML = '<tr><td colspan="4">Hata oluştu</td></tr>';
    });
}

function getCountryFlag(currency) {
  // Bayrakları temsil eden resimlerin dosya yolunu döndürmek için bir fonksiyon
  // Örnek olarak, bayrak resimlerini 'flags' adlı bir klasörde sakladığınızı varsayalım
  // Bu fonksiyonu, kendi bayrak resimlerinizin dosya yollarını döndürecek şekilde güncellemeniz gerekmektedir
  switch (currency) {
    case 'USD':
      return 'https://img.icons8.com/color/48/usa-circular.png';
    case 'EUR':
      return 'https://img.icons8.com/color/48/evrope-circular.png';
    case 'GBP':
      return 'https://img.icons8.com/color/48/great-britain-circular.png';

      case 'AZN':
        return 'https://img.icons8.com/color/48/azerbaijan-circular.png';

        case 'AZN':
          return 'https://img.icons8.com/color/48/azerbaijan-circular.png';

    // Diğer ülkeler ve bayraklar buraya eklenebilir
    default:
      return ''; // Bayrak bulunamadığında boş bir değer döndürülür
  }
}

function getRateChange(currency, rate) {
  // Kurlardaki değişimi simüle etmek için bir fonksiyon
  // Gerçek bir API kullanılmadığı için rastgele bir artış/azalış değeri döndürülür
  // Bu fonksiyonu, gerçek bir değişim hesaplama mantığıyla güncellemeniz gerekmektedir
  const randomChange = Math.random() * 0.1; // Rastgele bir değer (0 ile 0.1 arasında)
  return currency === 'USD' ? randomChange : -randomChange;
}

// İlk kez çalıştır
fetchExchangeRates();

// Belirli bir süre aralığında yenileme işlemini gerçekleştir
setInterval(fetchExchangeRates, refreshInterval);



// arama motoru  


const searchInput = document.querySelector('input[type="text"]');
const searchButton = document.getElementById('search-button');

searchButton.addEventListener('click', () => {
  const searchText = searchInput.value;
  searchCurrency(searchText);
});

function searchCurrency(searchText) {
  const currencyRows = table.getElementsByTagName('tr');

  for (let i = 0; i < currencyRows.length; i++) {
    const currencyCell = currencyRows[i].getElementsByTagName('td')[1];
    const currency = currencyCell.textContent || currencyCell.innerText;

    if (currency.toLowerCase().includes(searchText.toLowerCase())) {
      currencyRows[i].style.display = '';
    } else {
      currencyRows[i].style.display = 'none';
    }
  }
}


//yeni arama 




searchButton.addEventListener('click', () => {
  const searchText = searchInput.value;
  searchCurrency(searchText);

  localStorage.setItem('lastSearch', searchText);
});

// Sayfa yüklendiğinde son arama sorgusunu geri yükle
window.addEventListener('load', () => {
  const lastSearch = localStorage.getItem('lastSearch');
  if (lastSearch) {
    searchCurrency(lastSearch);
  }
});