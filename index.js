//AUTOCOMPLETE DUBLICATED CONFIG
const autocompleteConfig = {
    //CUSTMISE SEARCH LIST DISPLAY
    renderOption(movie){
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
        return `
            <img src="${imgSrc}"/>
            ${movie.Title} (${movie.Year})
        `
    },
    //CUSTMISE THE INPUT VALUE
    inputValue(movie){
        return movie.Title;
    },
    //CUSTMISE FETCHDATA FUNC
    async fetchData(searchTerm){
        const response = await axios.get('http://www.omdbapi.com/',{
            params: {
                apikey:'458aad73',
                s: searchTerm
            }
        })
        if(response.data.Error){
            return [];
        }
        return response.data.Search;
    }
}

//CUSTMISING THE AUTOCOMPLETE FUNCTION (1) & RUN IT
createAutocomplete({
    //AUTOCOMPLETE DUBLICATED CONFIG
    ...autocompleteConfig,
    //CUSTMISE ROOT
    root: document.querySelector('#left-autocomplete'),
    //CUSTMISE SEARCH LIST CLICK EVENT LISTENER RESPONSE
    onOptionSelect(movie){
        document.querySelector(".tutorial").classList.add('is-hidden')
        movieSelect(movie, document.querySelector('#left-summary'), 'left')
    }
});

//CUSTMISING THE AUTOCOMPLETE FUNCTION (2) & RUN IT
createAutocomplete({
    //AUTOCOMPLETE DUBLICATED CONFIG
    ...autocompleteConfig,
    //CUSTMISE ROOT
    root: document.querySelector('#right-autocomplete'),
    //CUSTMISE SEARCH LIST CLICK EVENT LISTENER RESPONSE
    onOptionSelect(movie){
        document.querySelector(".tutorial").classList.add('is-hidden')
        movieSelect(movie, document.querySelector('#right-summary'), 'right')
    },
})

let movieLeft;
let movieRight;
//RESPONSE TO CICK EVENT LISTENER ON DROPDOWN ITEM
const movieSelect = async (movie, displayLocation, side) => {
    const response = await axios.get('http://www.omdbapi.com/',{
        params: {
            apikey:'458aad73',
            i: movie.imdbID
        }
    });
    //CUSTMISE LOCATION OF DISPLAY
    displayLocation.innerHTML = movieTemplate(response.data);

    if(side === 'left'){
        movieLeft = response.data;
    }else{
        movieRight = response.data
    }
    if(movieLeft && movieRight){
        runComparison();
    }
}
const runComparison = ()=>{
    const leftStats = document.querySelectorAll('#left-summary .notification');
    const rightStats = document.querySelectorAll('#right-summary .notification');
    leftStats.forEach((leftStat, index)=>{
        const rightStat = rightStats[index];
        
        const leftSideValue = parseInt(leftStat.dataset.value);
        const rightSideValue = parseInt(rightStat.dataset.value);

        if(leftSideValue > rightSideValue){
            rightStat.classList.remove('is-primary');
            rightStat.classList.add('is-warning');
        }else{
            leftStat.classList.remove('is-primary');
            leftStat.classList.add('is-warning');
        }
    })
}


//CUSTMISE SELECTION DISPLAY
const movieTemplate = (movieDetail)=>{
    const dollars = parseInt(movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, ''));
    const metascore = parseInt(movieDetail.Metascore);
    const rating = parseFloat(movieDetail.imdbRating);
    const votes = parseInt(movieDetail.imdbVotes.replace(/,/g, ''));
    
    const awards = movieDetail.Awards.split(' ').reduce((prev, word)=>{
        const value = parseInt(word);
        if(isNaN(value)){
            return prev;}else{
            return prev + value;
        }
    }, 0);
    

    return `
        <article class="media">
            <figure class="media-left">
                <p class="image">
                    <img src="${movieDetail.Poster}"/>
                </p>
            </figure>

            <div class="media-content">
                <div class="content">
                    <h1>${movieDetail.Title}</h1>
                    <h4>${movieDetail.Genre}</h4>
                    <p>${movieDetail.Plot}</p>

                </div>
            </div>
        </article>
       
        <article data-value=${awards} class="notification is-primary">
            <p class="title">${movieDetail.Awards}</p>
            <p class="subtitle">Awards</p>
        </article>
        <article data-value=${dollars} class="notification is-primary">
            <p class="title">${movieDetail.BoxOffice}</p>
            <p class="subtitle">Box Office</p>
        </article>
        <article data-value=${metascore} class="notification is-primary">
            <p class="title">${movieDetail.Metascore}</p>
            <p class="subtitle">Metascore</p>
        </article>
        <article data-value=${rating} class="notification is-primary">
            <p class="title">${movieDetail.imdbRating}</p>
            <p class="subtitle">IMDB Rating</p>
        </article>
        <article data-value=${votes} class="notification is-primary">
            <p class="title">${movieDetail.imdbVotes}</p>
            <p class="subtitle">IMDB Votes</p>
        </article>
    `
}