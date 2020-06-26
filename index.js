const root = document.querySelector('.autocomlete');
root.innerHTML =`
    <label><b>Search A Movie</b></label>
    <input class="input"/>
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results">

            </div>
        </div>
    </div>
`;
const input = document.querySelector('.input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.dropdown-content');

const fetchData = async (searchTerm)=>{
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

const onInput = async (event)=>{

    const movies = await fetchData(event.target.value);
    resultsWrapper.innerHTML = "";

    if(movies.length){
        dropdown.classList.add('is-active');
    }

    for(let movie of movies){
        const option = document.createElement('a');
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster

        option.classList.add('dropdown-item')
        option.innerHTML = `
            <img src="${imgSrc}"/>
            ${movie.Title}
        `;
        resultsWrapper.appendChild(option);

        option.addEventListener('click', ()=>{
            input.value = movie.Title;
            dropdown.classList.remove('is-active');
            movieSelect(movie);
        })
        
    }
}
input.addEventListener('input', debounce(onInput, 500))

document.addEventListener('click', event =>{
    if(!root.contains(event.target)){
        dropdown.classList.remove('is-active')
    }
})

const movieSelect = async (movie) => {
    const response = await axios.get('http://www.omdbapi.com/',{
        params: {
            apikey:'458aad73',
            i: movie.imdbID
        }
    })
    document.querySelector('#summary').innerHTML = movieTemplate(response.data);

}

const movieTemplate = (movieDetail)=>{
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
        <article>
    `
}