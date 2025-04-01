const searchInput = document.getElementById("search");
const suggestionsBox = document.getElementById("suggestions");
let words = [];
const items = document.getElementsByClassName("items")
const Name = document.getElementsByClassName("name")
const Price = document.getElementsByClassName("price")
const Img = document.getElementsByClassName("img")
let img
let name
let price
let itemDiv
let buyButton



document.addEventListener('DOMContentLoaded', function () {
    fetch("https://sandip.space/all/data/mongo/db/fetch")
        .then(response => response.json()) // Convert response to JSON
        .then(data => {
            words = data.map(item => ({itemname: item.itemname, img: item.img, price: item.price, quantity: item.quantity})).reverse();
            
        words.forEach(word => {
    itemDiv = document.createElement("div");
        itemDiv.classList.add("items");
    img = document.createElement("img");
        img.src ="/uploads/"+ word.img;
        img.alt = word.itemname;
        itemDiv.appendChild(img);
    name = document.createElement("h3");
        name.classList.add("name");
        name.textContent = word.itemname;
        itemDiv.appendChild(name);
    price = document.createElement("h3");
        price.classList.add("price");
        price.textContent = "रु"+word.price;
        itemDiv.appendChild(price);
    buyButton = document.createElement("button");
        buyButton.textContent = "Buy";
        itemDiv.appendChild(buyButton);
        document.querySelector(".items-cart").appendChild(itemDiv);
        });
        })
        .catch(error => console.error("Error fetching data:", error));
});


searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase();
    suggestionsBox.innerHTML = "";
    if (!query) {
        suggestionsBox.style.display = "none";
        return;
    }

    const filteredWords = words.filter(word => word.itemname.toLowerCase().includes(query));

    if (filteredWords.length > 0) {
        suggestionsBox.style.display = "block";
        filteredWords.forEach(word => {
            const div = document.createElement("div");
            div.classList.add("suggestion");
            div.textContent = word.itemname;


            div.addEventListener("click", () => {
                searchInput.value = word.itemname;
                suggestionsBox.style.display = "none";
                const data = words.filter(word => word.itemname.toLowerCase().includes(query))
                const cart =    document.querySelector(".items-cart")
                cart.innerHTML = ""

            data.forEach(word =>{
                const outerDiv = document.createElement("div");
                outerDiv.classList.add("outer");
                cart.appendChild(outerDiv);

    img = document.createElement("img");
        img.src ="/uploads/"+ word.img;
        img.alt = word.itemname;
        outerDiv.appendChild(img);
    name = document.createElement("h3");
        name.classList.add("name");
        name.textContent = word.itemname;
        outerDiv.appendChild(name);
    price = document.createElement("h3");
        price.classList.add("price");
        price.textContent ="रु"+ word.price;
        outerDiv.appendChild(price);
    buyButton = document.createElement("button");
        buyButton.textContent = "Buy";
        outerDiv.appendChild(buyButton);
        document.querySelector(".items-cart").appendChild(outerDiv);
})


    });
    
            suggestionsBox.appendChild(div);
        });
    } else {
        suggestionsBox.style.display = "none";
    }
});

document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
        suggestionsBox.style.display = "none";
    }
});


