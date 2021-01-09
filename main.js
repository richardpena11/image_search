// DOM Resources
const searchButtonDOM = document.getElementById("searchButton")
const searchboxDOM = document.getElementById("searchbox")
const resultTitleDOM = document.querySelector(".results__title")
const resultListDOM = document.querySelector(".results__list")

// Display results list in DOM 

const displayResults = (query, data) => {

  // Display query as title of results
  resultTitleDOM.innerHTML = query

  // Display results
  for (const result of data.results){

    // Formate dates to American dates
    const formatDateArr = (result.created_at.split('T')[0]).split("-").reverse()
    const formatDate = `${formatDateArr[1]} / ${formatDateArr[0]} / ${formatDateArr[1]}`

    // Display results
    const markup = `        
    <div class="results__result">
      <div class="results__result__img">
        <img src=${result.urls.thumb} alt="">
      </div>
      <div class="results__result__info">
        <span class="results__result__info__user">${result.user.username}</span>
        <span class="results__result__info__date">${formatDate}</span>
        <span class="results__result__info__likes"><i class="fas fa-heart"></i> ${result.likes}</span>
      </div>
    </div>`
    resultListDOM.insertAdjacentHTML("beforeend", markup)
  }
}

// Requesty a photo list from unsplash API using query from input
const search = async (query) => {
  let response = fetch(`
  https://api.unsplash.com//search/photos?query=${query}&per_page=20&content_filter=high&client_id=Ysi_xViBnzo2NbRkzjdNSHVZjQD1NIWLWEjk9zHxAPY
  `)
  const data = await (await response).json()

  displayResults(query, data)
}

// Check if the key pressed was enter or click in search button
const checkKeyPress = e => {
  if(e.keyCode === 13 || e.key === undefined){
    search(searchbox.value)
  } 
}

// Events Listener
searchButtonDOM.addEventListener("click", checkKeyPress)
searchboxDOM.addEventListener("keypress", checkKeyPress)