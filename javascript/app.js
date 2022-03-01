
 const clearPhoneDetail =phoneDetail =>{
    phoneDetail.textContent = '';
 }


// search phone by phone name from input field
const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    //to clear privious data from search field
    console.log(searchText);
    searchField.value = '';

    // get phones' url using phone name
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    console.log(url);
    fetch(url)
        .then(response => response.json())
        .then(data => displayPhoneBySearch(data.data));
}

// this function show phone data
const displayPhoneBySearch = (phones) => {
    
    console.log(phones);

    // show error message when don't find data by search
    if(phones.length == 0){
        document.getElementById('err-msg').style.display = 'block';
        // clearPhoneDetail();
    }

    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    phones.forEach(phone => {
        // console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col');
        // we push/inject phone data in div 
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

// this function load phone details
const loadPhoneDetail = phoneID => {
    // get phone's url using phone slug/id
    const url = `https://openapi.programming-hero.com/api/phone/${phoneID}`;
    console.log(url);
    fetch(url)
        .then(response => response.json())
        .then(data => displayPhoneDetail(data.data));
}

// this function display phone details
const displayPhoneDetail = phone => {
    const phoneDetail = document.getElementById('phone-details');
    //to clear privious phone details from window
    phoneDetail.textContent = '';
    // clearPhoneDetail(phoneDetail);

    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${phone.image}" class="card-img-top" alt="...">
    <div class="card-body text-center">
        <h5 class="card-title">${phone.name}</h5>
        <p class="card-text">${phone.releaseDate ? phone.releaseDate: 'No release Date found'}</p>
        <p class="card-text">${phone.mainFeatures.storage}</p>
        <p class="card-text">${phone.mainFeatures.displaySize}</p>
        <p class="card-text">${phone.mainFeatures.chipSet}</p>
        <p class="card-text">${phone.mainFeatures.memory}</p>
        <p class="card-text">${phone.mainFeatures.sensors}</p>
    </div>
    `;
    phoneDetail.appendChild(div);
}
