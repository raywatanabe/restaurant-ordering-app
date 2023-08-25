import { menuArray } from "./data.js"

const paymentModal = document.getElementById("payment-modal")

let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
})

document.addEventListener("click", function(e) {
    if (e.target.dataset.add) {
        handleAddClick(e.target.dataset.add)
    } else if (e.target.dataset.remove) {
        handleRemoveClick(e.target.dataset.remove)
    } else if (e.target.id === "complete-order-btn") {
        togglePaymentModal()
    } else if (e.target.id === "cancel-order-btn") {
        togglePaymentModal()
    }
})

document.getElementById("payment-form").addEventListener("submit", function(e){
    e.preventDefault()
    togglePaymentModal()
    document.getElementById("order-complete-modal").classList.remove("hidden")
})

function handleAddClick(itemId) {
    const targetMenuItem = menuArray.filter(function(item){
        return item.id == itemId
    })[0]
    targetMenuItem.quantity++
    renderOrder()
}

function handleRemoveClick(itemId) {
    const targetMenuItem = menuArray.filter(function(item){
        return item.id == itemId
    })[0]
    targetMenuItem.quantity--
    renderOrder()
}

function togglePaymentModal() {
    paymentModal.classList.toggle("hidden")
}

function getOrderTotalPrice() {
    let orderTotalPrice = 0
    menuArray.forEach(function(item){
        if (item.quantity > 0) {
            const totalItemPrice = item.price * item.quantity

            orderTotalPrice += totalItemPrice
        }
    })

    return USDollar.format(orderTotalPrice)
}

function getOrderHtml() {
    let orderHtml = ``

    menuArray.forEach(function(item){
        if (item.quantity > 0) {
            const totalItemPrice = item.price * item.quantity

            orderHtml+=`
            <div class="order-item">
                <h3 class="order-item-name">${item.name}</h3>
                <i class="fa-solid fa-minus" data-remove="${item.id}"></i>
                <p class="quantity">${item.quantity}</p>
                <i class="fa-solid fa-plus" data-add="${item.id}"></i>
                <h4 class="order-item-price">${USDollar.format(totalItemPrice)}<h4>
            </div>`
        }
    })
    return orderHtml
}

function getMenuHtml() {
    let menuHtml = ``
    menuArray.forEach(function(item) {
        let menuItemIngredients = item.ingredients.join(", ")

        menuHtml+=`
        <div class="menu-item">
            <p class="menu-item-emoji">${item.emoji}</p>
            <div class="menu-item-details">
                <h3 class="menu-item-name">
                ${item.name}</h3>
                <p class="menu-item-ingredients">
                ${menuItemIngredients}</p>
                <h4 class="menu-item-price">
                ${item.price}</h4>
            </div>
            <i class="fa-solid fa-plus" data-add="${item.id}"></i>
        </div>
        `
    })

    return menuHtml
}

function renderMenu() {
    document.getElementById("menu").innerHTML = getMenuHtml()
}

function renderOrder() {
    document.getElementById("order-items").innerHTML = getOrderHtml()
    document.getElementById("order-total-price").innerHTML = getOrderTotalPrice()
    if (getOrderTotalPrice() != "$0.00") {
        document.getElementById("order").classList.remove("hidden")
    } else {
        document.getElementById("order").classList.add("hidden")
    }


}

renderMenu()