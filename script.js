var title = document.getElementById("title");
var price = document.getElementById("price");
var taxes = document.getElementById("taxes");
var ads = document.getElementById("ads");
var discount = document.getElementById("discount");
var count = document.getElementById("count");
var total = document.getElementById("total");
var category = document.getElementById("category");
var creat = document.getElementById("creat");
var table = document.getElementById("table");
var fill = document.getElementById("fill");
var img = document.createElement("img");
var mood = "creat"
var nombre = 0
var deleteall = document.getElementById("deleteall")
var lesproduits
if (localStorage.locaproduits != null) { lesproduits = JSON.parse(localStorage.locaproduits) }
else { lesproduits = [] }

//get total
function gettotal() {
    if (price.value != "") {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
    }
    else {
        total.innerHTML = "free"
    }
}
gettotal()
fill.onchange = function () {
    let fil = new FileReader()
    fil.readAsDataURL(fill.files[0])
    fil.onload = function () {
        img.src = fil.result
    }

}
// creat produit
total.innerHTML = "free"

creat.onclick = function creatproduit() {
    var produit1 = {
        imag: img.src,
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        count: count.value,
        category: category.value,
        total: total.innerHTML
    }
    if (title.value != "" && price.value != "" && count.value <= 100 && category.value != "") {
        if (mood === "creat") {
            if (count.value > 1) {
                for (let x = 0; x < count.value; x++) { lesproduits.push(produit1) }
            }
            else { lesproduits.push(produit1) }
        }

        else {
            lesproduits[nombre] = produit1
            creat.innerHTML = "creat"
            mood = "creat"
            count.style.display = "block"

        }
        localStorage.locaproduits = JSON.stringify(lesproduits)
        clearinp()
        read()
        total.innerHTML = "free"
    }

}
// localStorage.clear()

// read produit 
function read() {
    table.innerHTML = ""
    let rows = ""
    for (let i = 0; i < lesproduits.length; i++) {
        rows +=
            `<tr>
                <td id="left"><img src="${lesproduits[i].imag}"></td>
                <td>${i + 1}</td>
                <td>${lesproduits[i].title}</td>
                <td>${lesproduits[i].price}</td>
                <td>${lesproduits[i].taxes}</td>
                <td>${lesproduits[i].ads}</td>
                <td>${lesproduits[i].discount}</td>
                <td>${lesproduits[i].total}</td>
                <td>${lesproduits[i].category}</td>
                <td><button id="del" onclick="deletepro(${i})">DELETE</button></td>
                <td><button id ="upd" onclick="updatepr(${i})">UPDATE</button></td>
            </tr>`
    }
    table.innerHTML = rows
    if (lesproduits.length > 0) {
        deleteall.innerHTML = `  <button onclick="delall()" class="button">DELETEALL(${lesproduits.length})</button>`

    }
    else { deleteall.innerHTML = "" }
}
read()

function clearinp() {
    title.value = ""
    price.value = ""
    taxes.value = ""
    ads.value = ""
    discount.value = ""
    total.innerHTML = "free"
    count.value = ""
    category.value = ""
    fill.value = ""
}

function deletepro(id) {
    lesproduits.splice(id, 1)
    localStorage.setItem("locaproduits", JSON.stringify(lesproduits))
    read()
}
// update
function updatepr(id) {
    title.value = lesproduits[id].title
    price.value = lesproduits[id].price
    taxes.value = lesproduits[id].taxes
    ads.value = lesproduits[id].ads
    discount.value = lesproduits[id].discount
    total.innerHTML = lesproduits[id].total
    category.value = lesproduits[id].category
    img.src = lesproduits[id].imag
    creat.innerHTML = "update"
    mood = "update"
    nombre = id
    count.style.display = "none"
}


function delall() {
    localStorage.removeItem("locaproduits")
    lesproduits.splice(0)
    read()
}