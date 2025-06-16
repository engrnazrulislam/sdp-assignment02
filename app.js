const loadData = async (search_item="Margarita") => {
    const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search_item}`)
    const data = await res.json();
    displayData(data);
};
document.getElementById('search-btn').addEventListener('click', (event) => {
    const search_item = document.getElementById('search-box').value;
    loadData(search_item);
});

const displayData = (data) => {
    const allData = data.drinks;
    const card_container = document.getElementById('card-container');
    card_container.innerHTML=" ";

    if (!Array.isArray(allData)) {
        const h2=document.createElement('h2');
        h2.classList.add('text-center');
        h2.innerHTML="Your searched drink is not found";
        card_container.appendChild(h2);
        return;
    }

    allData.forEach((drinkItem) => {
        const div = document.createElement('div');
        div.classList.add('card','p-2','border','border-rounded','shadow');
        div.style.width="18rem";

        div.innerHTML = `
            <div>
                <img src="${drinkItem.strDrinkThumb}" class="card-img-top" alt="">
                <div class="card-body">
                    <h5 class="card-title">${drinkItem.strGlass}</h5>
                    <h5>Category: ${drinkItem.strCategory}</h5>
                    <p>Instruction: ${drinkItem.strInstructions.substring(0,15)}</p>
                    <button type="button" class="btn btn-outline-secondary" onclick="getCardID('${drinkItem.idDrink}',this)">Add to card</button>
                    <button type="button" class="btn btn-outline-primary" id="details" data-bs-toggle="modal" data-bs-target="#card-details" onclick="getCardID('${drinkItem.idDrink}',this)">Details</button>
                 </div>
            </div>
            `;
            card_container.appendChild(div);
    })
};
const getCardID=(id,button)=>{
    getDataByID(id,button);
}
// const getDetailsCartID=(id)=>{
//     getDetailsDataByID(id);
// }

const getDataByID=async(id,button)=>{
    const res=await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    const data=await res.json();
    if(button.innerText==="Add to card"){
        addToCard(data.drinks);
    }else{
        cartDetails(data.drinks);
    }
};

const added_cards=[];
const addToCard=(data)=>{
    const add_to_card=document.getElementById('add-to-cards');  
    const total_cart=document.getElementById('total-cart');
    data.forEach((c_data)=>{
        if(added_cards.length > 6){
            alert("You can not add more than 7 cart!!");
            return;
        }
       if(!added_cards.includes(c_data.idDrink)){
        let sl=added_cards.length+1;
        const tr=document.createElement('tr');
        tr.innerHTML=`
        <th class="text-center" scope="row">${sl}</th>
        <td class="text-center"><img src="${c_data.strDrinkThumb}" class="img-fluid rounded-circle w-25 mx-auto d-block"></td>
        <td class="text-center">${c_data.strGlass}</td>
        `;
        add_to_card.appendChild(tr); 
        added_cards.push(c_data.idDrink);
       }else{
        alert(`${c_data.strGlass} is already exists in the cart`);
        return;
       }
    })
    
        total_cart.innerText = added_cards.length;
};

const cartDetails=(cart_data)=>{
   const modal_content=document.getElementById('modal-content');
   modal_content.innerHTML=" ";
   cart_data.forEach((drink)=>{
        const modal_header=document.createElement('div');
        modal_header.classList.add('modal-header');
        modal_header.innerHTML=`
        <h1 class="modal-title fs-5" id="exampleModalLabel">${drink.strGlass}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        `;
        const modal_body=document.createElement('div');
        modal_body.classList.add('modal-body');
        modal_body.innerHTML=`
            <img src="${drink.strDrinkThumb}" class="img-fluid card-img-top rounded mx-auto">
            <div class="mt-3">
                <h3>Details</h3>
                <p>Category: <b>${drink.strCategory}</b></p>
                <p>Alcoholic: <b>${drink.strAlcoholic}</b></p>
                <p class="text-justify">${drink.strInstructions}</p>
            </div>
        `;
        const modal_footer=document.createElement('div');
        modal_footer.classList.add('modal-footer');
        modal_footer.innerHTML=`
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        `;
        modal_content.append(modal_header,modal_body,modal_footer);
   })
};

window.addEventListener('DOMContentLoaded',()=>{
    loadData();
})