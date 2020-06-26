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

createAutocomplete({
    root: document.querySelector('.autocomplete')
});

creatAutocomplete({
    root: document.querySelector('.autocomplete-two')
});

createAutocomplete({
    root: document.querySelector('.autocomplete-three')
});

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