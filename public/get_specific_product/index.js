console.log("Product Page");
// get the id from the URL
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
// Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
let id = params.Productid;
console.log(id);

// use that ID to get info from collection
const getSingleProduct = async () => {
    let response = await fetch(`http://localhost:5000/get_specific_product/${id}`);

    let parseditemData = await response.json();

    console.log(parseditemData);
    let containerelem = document.getElementById('container');

    let h2Name = document.getElementById('product-name');
    h2Name.textContent = parseditemData.name;

    let imgProduct = document.getElementById('product-image');
    imgProduct.src = parseditemData.image;

    let pDescription = document.getElementById('product-description');
    pDescription.textContent = parseditemData.description;

    let pPrice = document.getElementById('product-price');
    pPrice.textContent = "Price: " + parseditemData.price;

    let buybtn = document.getElementById('buy-btn');
    let pInventory = document.getElementById('product-inventory');
    if (parseditemData.inventory == 0) {
        buybtn.disabled = true;
        pInventory.style.color = "red";
        pInventory.textContent = `Out of stock`;
    } else {
        pInventory.textContent = `Only ${parseditemData.inventory} left in stock - order soon.`;
    }


    buybtn.addEventListener('click', async () => {//changed async 

        parseditemData.inventory = parseditemData.inventory - 1;

        if (parseditemData.inventory <= 0) {
            buybtn.disabled = true;
            pInventory.style.color = "red";
            pInventory.textContent = `Out of stock`;
        } else {
            //parseditemData.inventory--;
            pInventory.textContent = parseditemData.inventory;
            pInventory.textContent = `Only ${parseditemData.inventory} left in stock - order soon.`;

        }
        //console.log(JSON.stringify({inventory : parseditemData.inventory}));
        //console.log(JSON.stringify({inventory : parseditemData._id}));
        //changed
        //let inventoryNumber = +document.getElementById('inventory-input').value; changed 
        let response = await fetch(`http://localhost:5000/buy_product/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ inventory: parseditemData.inventory })   //stringify js value to json        
        });

        //alert("Thanks for shopping with us!");
        console.log("Thanks for shopping with us!");
    });

}

getSingleProduct();

let containerelem = document.getElementById('item-data');
let searchButton = document.getElementById('search-btn');
searchButton.addEventListener('click', async () => {
    let userItem = document.getElementById('search-item').value;
    console.log(userItem);
    if (userItem === "") {
        containerelem.textContent = "Please Enter Item you are looking for"
    } else {
        try {
            let itemData = await fetch(`http://localhost:5000/search/${userItem}`);
            let parsedData = await itemData.json();
            console.log(parsedData);
            console.log("Product Id:"+parsedData[0]._id);
            //console.log("Product Id:"+parsedData[0].name);
            // To redirect page to searhe product
            window.location.href=`../get_specific_product/?Productid=${parsedData[0]._id}`;

           /*  //To display searched Product
            containerelem.innerHTML = `<p>The ${parsedData[0].name} is available.</p>
            <p>Name:${parsedData[0].name}</p>
            <p>Price:${parsedData[0].price}</p>
            <p>Inventory:${parsedData[0].inventory}</p>
            <p>Next Delivery Date:${parsedData[0].nextDelivery}</p>
            <p>Quantity to deliver:${parsedData[0].deliveryAmt}</p>
            <button>Buy</button>`;  */
        }
        catch(err){
            containerelem.textContent = "Sorry, Item you are looking for is not available right now";
            
            //`No search results for ${userItem},Please check your spelling or try different keywords`;
           
        }
    }
});


/* let homeButton = document.getElementById('home-btn');
homeButton.addEventListener('click', () => {
    window.location.href = "/";
}); */

let editButton = document.getElementById('edit-btn');
editButton.addEventListener('click', () => {
    window.location.href = `../edit_Product/?Productid=${id}`;
});

let deleteButton = document.getElementById('delete-btn');
deleteButton.addEventListener('click', async () => {
    let response = await fetch(`http://localhost:5000/delete_product_data/${id}`, {
        method: "DELETE"
    });
    // console.log(response);
    let parsedData = await response.json();
    console.log("deleted item" + parsedData.name);
    window.location.href = "/";
});

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













const getData = () => {
    // Code to grab params/queries from URL:

    //let productdata = fetch(`/get_specific_product/${event.target.databaseId}`);
    //let productdata = fetch(`/get_specific_product/${event.target.databaseId}`);
    //let parseditemData = await productdata.json();
    //console.log(parseditemData);

    //map through veggie data and get it on html
    //parseditemData.forEach(object => {
    // let pTag = document.createElement("p");
    //console.log("ProductId:"+object._id);
    // pTag.databaseId = object._id;

    /* //if not ready red text
    if(object.inventory <= 0){
        pTag.style.color="red";
    }else{
        pTag.style.color="green";
    } */
    // pTag.textContent = object.name;
    //  let itemcontainerelem = document.getElementById('items-container');
    // itemcontainerelem.appendChild(pTag);
    //});
    // let buybtn = document.getElementById('buy-btn');
    //buybtn.addEventListener('click',()=>{
    // console.log("Thanks for shopping with us");
    //If inventory is 0 then display out of stock and disable buy button.
    //}); 

}

getData();