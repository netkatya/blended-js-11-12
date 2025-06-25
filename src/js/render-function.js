//Функцію для створення, рендеру або видалення розмітки

import { refs } from "./refs";
import { modalProduct } from "./constants";

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
    `<li class="products__item" data-id="${product.id}">
      <img class="products__image" src="${product.thumbnail}" alt="${product.title}"/>
      <p class="products__title">${product.title}</p>
      <p class="products__brand"><span class="products__brand--bold">Brand:${product.brand}</span></p>
      <p class="products__category">Category:${product.category}</p>
      <p class="products__price">Price: $${product.price}</p>
      
      <div class="product" data-id="${product.id}">
        <div class="product-quantity-product hidden">
          <button class="minus-button quantity-button">-</button>
          <input type="number" value="${product.quantity}" min="1" max="100" class="quantity-input" readonly>
          <button class="plus-button quantity-button">+</button>
        </div>
      </div>
    </li>`
  ).join("");

  refs.productsList.innerHTML = markupProducts;
}

export function renderProductInModal(product) {
    const { thumbnail, title, description, price, tags } = product;

    modalProduct.innerHTML = `
        <img class="modal-product__img" src="${thumbnail}" alt="${title}" />
        <div class="modal-product__content">
            <p class="modal-product__title">${title}</p>
            <ul class="modal-product__tags">
                ${tags.map(tag => `<li>${tag}</li>`).join('')}
            </ul>
            <p class="modal-product__description">${description}</p>
            <p class="modal-product__shipping-information">Shipping: Free worldwide shipping</p>
            <p class="modal-product__return-policy">Return Policy: 30 days money back guarantee</p>
            <p class="modal-product__price">Price: $${price}</p>
        </div>
    `;
}


refs.modal.addEventListener("click", (event) => {
    const isMinus = event.target.classList.contains("minus-button");
    const isPlus = event.target.classList.contains("plus-button");

    if (!isMinus && !isPlus) return;

    const quantityInput = event.target.closest(".product-quantity").querySelector(".quantity-input");
    let value = parseInt(quantityInput.value);

    if (isMinus && value > 1) {
        quantityInput.value = value - 1;
    }

    if (isPlus && value < 100) {
        quantityInput.value = value + 1;
    }
});