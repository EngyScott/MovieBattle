//CUSTMISING THE AUTOCOMPLETE FUNCTION & RUN IT
createAutocomplete({
    //CUSTMISE ROOT
    root: document.querySelector('.autocomplete'),
    //CUSTMISE SEARCH LIST DISPLAY
    renderOption(movie){
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
        return `
            <img src="${imgSrc}"/>
            ${movie.Title} (${movie.Year})
        `
    },
    //CUSTMISE SEARCH LIST CLICK EVENT LISTENER RESPONSE
    onOptionSelect(movie){
        movieSelect(movie)
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
});
//RESPONSE TO CICK EVENT LISTENER ON DROPDOWN ITEM
const movieSelect = async (movie) => {
    const response = await axios.get('http://www.omdbapi.com/',{
        params: {
            apikey:'458aad73',
            i: movie.imdbID
        }
    })
    //CUSTMISE LOCATION OF DISPLAY
    document.querySelector('#summary').innerHTML = movieTemplate(response.data);
}
//CUSTMISE SELECTION DISPLAY
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