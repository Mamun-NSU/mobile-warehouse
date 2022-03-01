
const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    console.log(url);
    fetch(url)
        .then(response => response.json())
        .then(data => displayPhoneBySearch(data.data));
}

const displayPhoneBySearch = (phones) => {
    
    console.log(phones);
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    phones.forEach(phone => {
        // console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">${phone.brand}</p>
                <p onclick="loadPhoneDetail('${phone.slug}')" class="btn btn-primary">Go for details</p>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    });
}

const loadPhoneDetail = phoneID => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneID}`;
    console.log(url);
    fetch(url)
        .then(response => response.json())
        .then(data => displayPhoneDetail(data.data));
        // displayPhoneDetail(data.meals[0]))
}

const displayPhoneDetail = phone => {
    const phoneDetail = document.getElementById('phone-details');
    phoneDetail.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${phone.image}" class="card-img-top" alt="...">
    <div class="card-body text-center">
        <h5 class="card-title">${phone.name}</h5>
        <p class="card-text">${phone.releaseDate}</p>
        <p class="card-text">${phone.mainFeatures.storage}</p>
        <p class="card-text">${phone.mainFeatures.displaySize}</p>
        <p class="card-text">${phone.mainFeatures.chipSet}</p>
        <p class="card-text">${phone.mainFeatures.memory}</p>
    </div>
    `;
    phoneDetail.appendChild(div);
}