
//  to create fruit
let itemButton = document.getElementById('submit-item');
itemButton.addEventListener('click', async () => {

    let nameString = document.getElementById('name-input').value;
    let priceString = document.getElementById('price-input').value;//+convert string to number
    let inventoryNumber = +document.getElementById('inventory-input').value;
    let imageString = document.getElementById('image-input').value;
    let descriptionString = document.getElementById('description-input').value;
    // console.log(nameString,ageNumber,colorString,readytoeatBool);    

    const item = {
        nameString,
        priceString,
        inventoryNumber,
        imageString,
        descriptionString
    }
    console.log(JSON.stringify({}));
    // google for fetch options
    //So to not get empty object ,we have to stringfy our data. 
    //We put it in the body. 
    //We have to set our headers
    //we have to have our express.Json() here, so that we can accept stringified Json 
    //and be able to convert it back into an actual object.
    //And we also need this URL encoded.
    let response = await fetch('http://localhost:5000/create_item', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)   //stringify js value to json         
    })

    window.location.href = "/";
    
    /* let uploadStatusTag = document.getElementById('item-upload-status');

    if (response.status == 200) {
        console.log(response);
        uploadStatusTag.textContent = "Product upload completed successfully!"
        uploadStatusTag.style.color = "green";
        console.log("Upload complete!");
    } else {
        console.log(response);
        uploadStatusTag.textContent = "Upload failed!"
        uploadStatusTag.style.color = "red";
        console.log("Upload failed!");
    }

    setTimeout(() => {
        window.location.href = "/";
    }, "5000"); */
})


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