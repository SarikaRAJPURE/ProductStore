console.log("Edit page");

// get the id from the URL
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
// Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
let id = params.Productid;
console.log("Product Id: " + id);

// use that ID to get info from collection
const getProduct = async () => {
    let response = await fetch(`http://localhost:5000/edit_Product/${id}`);
    let parseditemData = await response.json();
    console.log(parseditemData);

    let containerelem = document.getElementById('container');

    let productName = document.getElementById('name-input');
    productName.value = parseditemData.name;
    console.log(productName.textContent);

    let productInventory = document.getElementById('inventory-input');
    productInventory.value = parseditemData.inventory;
    console.log(productInventory.textContent);

    let productImage = document.getElementById('image-input');
    productImage.value = parseditemData.image;
    console.log(productImage.textContent);

    let productPrice = document.getElementById('price-input');
    productPrice.value = parseditemData.price;
    console.log(productPrice.textContent);

    let productDescription = document.getElementById('description-input');
    productDescription.value = parseditemData.description;
    console.log(productDescription.textContent);
}

getProduct();

//Submit changes button
let submitButton = document.getElementById('submit-item');
submitButton.addEventListener('click', async () => {

    let nameString = document.getElementById('name-input').value;
    let priceString = document.getElementById('price-input').value;
    let inventoryNumber = +document.getElementById('inventory-input').value; //+convert string to number
    let imageString = document.getElementById('image-input').value;
    let descriptionString = document.getElementById('description-input').value;

    const item = {
        nameString,
        priceString,
        inventoryNumber,
        imageString,
        descriptionString
    }
    console.log(JSON.stringify(item));

    console.log("Checking id:" + id);

    let response = await fetch(`http://localhost:5000/update_by_id/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)   //stringify js value to json        
    });

    //after Product gets updated redirect it to that specific page id to show updated values
    window.location.href=`../get_specific_product/?Productid=${id}`;

    /* let updateStatusTag = document.getElementById("item-update-status");

    if (response.status == 200) {
        console.log(response);
        updateStatusTag.textContent = "Product update completed successfully!"
        updateStatusTag.style.color = "green";
        console.log("Update complete!");
    } else {
        console.log(response);
        updateStatusTag.textContent = "Update failed!"
        updateStatusTag.style.color = "red";
        console.log("Update failed!");
    }  */
});

let homeButton = document.getElementById('home-btn');
homeButton.addEventListener('click', () => {
    window.location.href = "/";
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