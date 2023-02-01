console.log("Display Page");

const getData = async () => {
    let itemdata = await fetch(`/items`);
    let parseditemData = await itemdata.json();
    console.log(parseditemData);

    //map through veggie data and get it on html
    parseditemData.forEach(object => {
        let pTag = document.createElement("p");
        //console.log("ProductId:"+object._id);
        pTag.id = object._id;
        pTag.addEventListener('click', async (event) => {
            console.log(event.target);
            console.log(event.target.id);//make a call to the server giving the id of the product
                      
            let productdata = await fetch(`/get_specific_product/${event.target.id}`);
            let parseditemData = await productdata.json();
            console.log(parseditemData);
            /* 
            let containerelem= document.getElementById('container');
            containerelem.innerHTML=`<a>Home</a>
            <h2> ${parseditemData[0].name}</h2>
            <p>Price:${parseditemData[0].price}</p>
            <p>Inventory:${parseditemData[0].inventory}</p>
            <p>Next Delivery Date:${parseditemData[0].image}</p>
            <p>Quantity to deliver:${parseditemData[0].description}</p>
            <button>Buy</button>`; */
        
        });
        //if not ready red text
        if(object.inventory <= 0){
            pTag.style.color="red";
        }else{
            pTag.style.color="green";
        } 
        pTag.textContent = object.name + ` (${object.inventory})`;
        let itemcontainerelem = document.getElementById('items-container');
        itemcontainerelem.appendChild(pTag);
    });
}

getData();

let homeButton = document.getElementById('home');
homeButton.addEventListener('click', () => {
    window.location.href = "/";
});
let createItemButton = document.getElementById('create-item-btn');
createItemButton.addEventListener('click', () => {
    window.location.href = "/createItem";   //TO acess create item folder for index.html
});

let displayItemsButton = document.getElementById('dispaly-item-btn');
displayItemsButton.addEventListener('click', () => {
    window.location.href = "/displayItem";
});

