const createAutocomplete = ({ root })=>{
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
    const input = root.querySelector('.input');
    const dropdown = root.querySelector('.dropdown');
    const resultsWrapper = root.querySelector('.dropdown-content');

    const onInput = async (event)=>{
        const movies = await fetchData(event.target.value);

        if(movies.length){
            dropdown.classList.add('is-active');
        }
        
        resultsWrapper.innerHTML = "";

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
}


