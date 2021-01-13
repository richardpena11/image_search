// DOM Resources
const searchButtonDOM = document.getElementById("searchButton")
const searchboxDOM = document.getElementById("searchbox")
const resultTitleDOM = document.querySelector(".results__title")
const resultListDOM = document.querySelector(".results__list")

// Display results list in DOM 
const displayResults = (query, data) => {

  searchboxDOM.value = ""
  resultListDOM.innerHTML = ""

  // Display query as title of results
  resultTitleDOM.innerHTML = query

  for (const [i, result] of data.results.entries()){

    console.log(i+ 1)

    // Formate dates to American dates
    const formatDateArr = (result.created_at.split('T')[0]).split("-").reverse()
    const formatDate = `${formatDateArr[1]} / ${formatDateArr[0]} / ${formatDateArr[1]}`

    // Create Markup and add it to DOM
    const markup = `        
    <div class="results__result grid-item" id="${result.id}">

      <a href="${result.links.html}" target="_blank" class="results__result__img">
        <img src=${result.urls.thumb} alt="${result.alt_description}">
      </a>

      <div class="results__result__extra">
        <span class="results__result__extra__date">${formatDate}</span>
      </div>

      <div class="results__result__info">
        <span class="results__result__info__user">${result.user.username}</span>
        <span class="results__result__info__likes"><i class="fas fa-heart"></i> ${result.likes}</span>
      </div>
      
    </div>`
      
    resultListDOM.insertAdjacentHTML("beforeend", markup)
      
    gsap.to(resultListDOM.lastChild, {duration: .2, delay: i / 20, opacity: 1, y: -20})
  }
}

// Request a photo list from unsplash API using query from input
const search = async (query) => {
  const api = {
    base: "https://api.unsplash.com/search/photos",
    query,
    perPage: "20",
    contentFilter: "high",
    clientId: "Ysi_xViBnzo2NbRkzjdNSHVZjQD1NIWLWEjk9zHxAPY"
  }

  let response = fetch(`
  ${api.base}?query=${api.query}&per_page=${api.perPage}&content_filter=${api.contentFilter}&client_id=${api.clientId}
  `)
  const data = await (await response).json()

  displayResults(query, data)
}

// Check if the key pressed was enter or was a click in search button
const checkKeyPress = e => {
  if(e.keyCode === 13 || e.key === undefined){
    if (!searchbox.value == "") {
      search(searchbox.value)
    } else {
      searchbox.classList.add("header__search__searchbox__input--invalid");
      setTimeout(() => { searchbox.classList.remove("header__search__searchbox__input--invalid"); }, 1000);
    }
  } 
}


// Events Listener
searchButtonDOM.addEventListener("click", checkKeyPress)
searchboxDOM.addEventListener("keypress", checkKeyPress)

search("hello");