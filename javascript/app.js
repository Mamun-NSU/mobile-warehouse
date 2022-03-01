//  common function for div toggle (hide/show)
const toggleDiv = (divId, displayStyle) => {
    document.getElementById(divId).style.display = displayStyle;
};
// Firstly hide 'moreBtn' to load more data
toggleDiv("moreBtn", "none");

const clearPhoneDetail = () => {
    const phoneDetail = document.getElementById("phone-details");
    //to clear privious phone details from window
    phoneDetail.textContent = "";
};

// search phone by phone name from input field
const searchPhone = () => {
    // when searchPhone start, then the loading gif show
    toggleDiv("lodding-img", "block");
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    //to clear privious data from search field

    searchField.value = "";
    // error message hide fistly
    toggleDiv("err-msg", "none");
    // phone details hide here
    clearPhoneDetail();

    // get phones' url using phone name
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => displayPhoneBySearch(data.data));
};

// this function show phone data
const displayPhoneBySearch = (phones) => {

    // show error message when don't find data by search
    if (phones.length == 0) {
        //    error message show here
        toggleDiv("err-msg", "block");
        // phone details hide here
        toggleDiv("phone-details", "none");
        //    hide 'moreBtn' to load more data
        toggleDiv("moreBtn", "none");
    }

    const searchResult = document.getElementById("search-result");
    searchResult.textContent = "";

    /***************************************************** 
      This function load more phone data after 20 start here
      *******************************************************/
    const loadMoreData = () => {
        const moreBtn = document.getElementById("moreBtn");

        moreBtn.addEventListener("click", () => {
            //    hide 'moreBtn' to load more data
            toggleDiv("moreBtn", "none");
            phones.slice(20).forEach((phone) => {
                const div = document.createElement("div");
                div.classList.add("col");
                // we push/inject phone data in div
                div.innerHTML = `
                <div class="card text-center">
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
        });
    };

    /*******************************************************
     The function of load more phone data after 20 ends here 
     *******************************************************/

    phones.slice(0, 20).forEach((phone) => {
        // console.log(phone);
        const div = document.createElement("div");
        div.classList.add("col");
        // we push/inject phone data in div
        div.innerHTML = `
        <div class="card text-center">
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
    if (phones.length > 20) {
        toggleDiv("moreBtn", "block");
        loadMoreData();
    }
    // when all phones displayed, then the loading gif hide
    toggleDiv("lodding-img", "none");
};

// this function load phone details
const loadPhoneDetail = (phoneID) => {
    // get phone's url using phone slug/id
    const url = `https://openapi.programming-hero.com/api/phone/${phoneID}`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => displayPhoneDetail(data.data));
};

// this function display phone details
const displayPhoneDetail = (phone) => {
    // this function bring top left coner after display phone details
    window.scrollTo(0, 0);
    const phoneDetail = document.getElementById("phone-details");
    //to clear privious phone details from window
    clearPhoneDetail();

    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
    <img src="${phone.image}" class="card-img-top" alt="...">
    <div class="card-body text-center">
        <h3 class="card-title fw-bold">${phone.name}</h3>
        <p class="card-text"><b>Release Date:</b> ${phone.releaseDate ? phone.releaseDate : "No release Date found"
        }</p>
        <p class="card-text"><b>Storage:</b> ${phone.mainFeatures.storage}</p>
        <p class="card-text"><b>Display size:</b> ${phone.mainFeatures.displaySize}</p>
        <p class="card-text"><b>Chip set:</b> ${phone.mainFeatures.chipSet}</p>
        <p class="card-text"><b>Memory:</b> ${phone.mainFeatures.memory}</p>
        <p class="card-text"><b>Sensors:</b> ${phone.mainFeatures.sensors}</p>
    `;
    phoneDetail.appendChild(div);
};
