const loadData = async (search_item) => {
    const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search_item}`)
    const data = await res.json();
    displayData(data);
}
document.getElementById('search-btn').addEventListener('click', (event) => {
    const search_item = document.getElementById('search-box').value;
    loadData(search_item);
});

const displayData = (data) => {
    const allData = data.drinks;
    const card_container = document.getElementById('card-container');
    card_container.innerHTML=" ";

    if (!Array.isArray(allData)) {
        console.log("Data is not founded");
        return;
    }

    allData.forEach((drink) => {
        console.log(drink);
        const div = document.createElement('div');
        div.classList.add('card','p-2');
        div.style.width="18rem";

        div.innerHTML = `
            <div>
                <img src="${drink.strDrinkThumb}" class="card-img-top" alt="">
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <h5>Category:</h5>
                    <p>Instruction: </p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
                 </div>
            </div>
            `;
            card_container.appendChild(div);
    })
};