console.log("testing");
//------To display all products data

let productelement = document.getElementById('itemdata-container');
const getData = async () => {
    let itemdata = await fetch(`/items`);
    let parseditemData = await itemdata.json();
    console.log(parseditemData);     
    
    //map through products data and get it on html
    parseditemData.forEach(object => {                
        
        let itemcontainerelem = document.createElement('div');
        itemcontainerelem.className = 'items-container';        

        let h2Tag = document.createElement("h2");
        h2Tag.textContent = object.name;
        console.log("ProductId:"+object._id);
        /* h2Tag.databaseId=object._id;
        h2Tag.addEventListener('click',(event) =>{
            console.log(event.target);
            console.log(event.target.databaseId);//make a call to the server giving the id of the product
            //to change
        }); */
        let pPrice = document.createElement("p");
        pPrice.textContent = "Price:"+object.price;
        //let pDescription = document.createElement("p");
       // pPrice.textContent = object.description;
        //create image
        let productImage = document.createElement("img");
        console.log(object.image);
        let productImageSrc = object.image;
        productImage.src = productImageSrc;              
        //productImage.id=object._id;
        productImage.addEventListener('click',async (event)=>{
            console.log(event.target);
            console.log(event.target.id);
            /* let productdata = await fetch(`/get_specific_product/${event.target.id}`);
            let parseditemData = await productdata.json();
            console.log(parseditemData); */
            //window.location.href=`../get_specific_product/?Productid=${event.target.id}`;
            window.location.href=`../get_specific_product/?Productid=${object._id}`;
        });
        //let itemcontainerelem = document.getElementById('items-container');
        itemcontainerelem.appendChild(h2Tag);            
        itemcontainerelem.appendChild(productImage);
        itemcontainerelem.appendChild(pPrice);
       // itemcontainerelem.appendChild(pDescription);    
        productelement.appendChild(itemcontainerelem);
        

    });
}

getData();

//-------------------------------------
/* //if product is clicked
productelement.addEventListener('click',(event) =>{
    console.log(event.target);
    console.log(event.target.databaseId);//make a call to the server giving the id of the product
    //to change
}); */


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
        }
    }
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

/* let inventoryButton = document.getElementById('inventory-btn');
inventoryButton.addEventListener('click', () => {
    //window.location.href = "/incdecInventory";    
    window.open(window.location.href = "/incdecInventory","bfs","fullscreen,scrollbars")
}); */