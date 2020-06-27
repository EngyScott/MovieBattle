const createAutocomplete = ({ root, renderOption, onOptionSelect, inputValue, fetchData })=>{
    //BUILD HTML ELEMENTS TO HOUSE THE SEARCH RESULTS
    root.innerHTML =`
        <label><b>Search</b></label>
        <input class="input"/>
        <div class="dropdown">
            <div class="dropdown-menu">
                <div class="dropdown-content results">

                </div>
            </div>
        </div>
    `;
    //INDENTIFY THE ELEMENTS
    const input = root.querySelector('.input');
    const dropdown = root.querySelector('.dropdown');
    const resultsWrapper = root.querySelector('.results');
    //SHOWING THE SEARCH RESULTS
    const onInput = async (event)=>{
        //WAITING FOR DATA
        const items = await fetchData(event.target.value);
        // HIDING THE LIST IF NO RESULTS
        if (!items.length) {
            dropdown.classList.remove('is-active');
            return;
          }
      
          resultsWrapper.innerHTML = '';
        //OPENING THE DROPDOWN MENUE IN CASE OF RESULTS
          dropdown.classList.add('is-active');
        //SHOWING THE SEARCH ITEMS
        for(let item of items){
            const option = document.createElement('a');
            option.classList.add('dropdown-item')
            //HOW TO DISPLAY ON THE LIST
            option.innerHTML = renderOption(item);
            resultsWrapper.appendChild(option);
            //CLICKING ON AN ITEM OF THE LIST
            option.addEventListener('click', ()=>{
                input.value = inputValue(item);
                dropdown.classList.remove('is-active');
                onOptionSelect(item);
            })
        }
    }
    //DEBOUNCING THE RESULT SHOW ON LIST UNTILL FINISH WRITING
    input.addEventListener('input', debounce(onInput, 1000))
    //CLOSING THE LIST IF CLICKING OUT RANGE
    document.addEventListener('click', event =>{
        if(!root.contains(event.target)){
            dropdown.classList.remove('is-active')
        }
    })
}


