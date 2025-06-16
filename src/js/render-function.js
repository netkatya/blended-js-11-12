//Функцію для створення, рендеру або видалення розмітки

import { refs } from "./refs";

export function renderCategories(categories) {
    const markupCategories = categories.map(category =>
        `<li class="categories__item">
            <button class="categories__btn" type="button">${category}</button>
        </li>`
    ).join("");

    refs.categoriesList.innerHTML = markupCategories;
}

export function renderProducts(products) {
    const markupProducts = products.map(product =>
        `<li class="products__item" data-id="">
        <img class="products__image" src="" alt=""/>
        <p class="products__title"></p>
        <p class="products__brand"><span class="products__brand--bold">Brand:</span></p>
        <p class="products__category">Category: </p>
        <p class="products__price">Price: $</p>
    </li>`
    ).join("");

    refs.productsList.innerHTML = markupProducts;
}