//Логіка сторінки Home

import { fetchCategories, fetchProducts, fetchProductsByCategory, fetchProductsById, searchProducts } from "./js/products-api";
import { renderCategories, renderProducts, renderProductInModal } from "./js/render-function";
import { categoriesList, productsList, notFoundDiv, modal, modalProduct, searchForm, searchInput, categoryButtons, clearSearchBtn } from "./js/constants";


let currentPage = 1;
const limit = 12;

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const categories = await fetchCategories();
        renderCategories(categories);

        const products = await fetchProducts(currentPage, limit);
        renderProducts(products);
    } catch (error) {
        console.error('Error loading data:', error);
    }
});

    categoryButtons().forEach(btn => {
        btn.classList.remove("categories__btn--active");
    });

categoriesList.addEventListener("click", async (event) => {
    const button = event.target.closest("button.categories__btn");
    if (!button) return;

    const category = button.textContent.trim();

    // тут актуальний виклик функції
    categoryButtons().forEach(btn => {
        btn.classList.remove("categories__btn--active");
    });

    button.classList.add("categories__btn--active");

    searchInput.value = '';
    clearSearchBtn.classList.add('hidden');
    notFoundDiv.classList.remove('not-found--visible');

    let products = [];

    try {
        if (category === "All") {
            products = await fetchProducts(currentPage, limit);
        } else {
            products = await fetchProductsByCategory(category, currentPage, limit);
        }

        if (products.length === 0) {
            notFoundDiv.classList.add('not-found--visible');
            productsList.innerHTML = '';
        } else {
            notFoundDiv.classList.remove('not-found--visible');
            renderProducts(products);
        }
    } catch (error) {
        console.error('Помилка при завантаженні продуктів:', error);
        notFoundDiv.classList.add('not-found--visible');
        productsList.innerHTML = '';
    }
});

productsList.addEventListener("click", async (event) => {
    const productItem = event.target.closest("li.products__item");
    if (!productItem) return;

    const productId = productItem.dataset.id;
    if (!productId) return;

    try {
        const product = await fetchProductsById(productId);
        renderProductInModal(product);
        modal.classList.add("modal--is-open"); 
    } catch (error) {
        console.error('Помилка при завантаженні продукту:', error);
    }
});

modal.addEventListener("click", (event) => {
    if (event.target === modal || event.target.classList.contains("modal__close-btn")) {
        modal.classList.remove("modal--is-open");
    }
});

searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const query = searchInput.value.trim();

    if (!query) return;

    try {
        const products = await searchProducts(query, currentPage, limit);

        if (products.length === 0) {
            notFoundDiv.classList.add('not-found--visible');
            productsList.innerHTML = '';
        } else {
            notFoundDiv.classList.remove('not-found--visible');
            renderProducts(products);
        }
    } catch (error) {
        console.error('Помилка при завантаженні продуктів:', error);
        notFoundDiv.classList.add('not-found--visible');
        productsList.innerHTML = '';
    }
});


searchInput.addEventListener('input', () => {
    if (searchInput.value.trim() !== '') {
        clearSearchBtn.classList.remove('hidden');
    } else {
        clearSearchBtn.classList.add('hidden');
    }
});


clearSearchBtn.addEventListener("click", async () => {
    searchInput.value = '';
    clearSearchBtn.classList.add('hidden');
    notFoundDiv.classList.remove('not-found--visible');

    try {
        const products = await fetchProducts(currentPage, limit);
        renderProducts(products);
    } catch (error) {
        console.error('Помилка при завантаженні всіх продуктів:', error);
        productsList.innerHTML = '';
        notFoundDiv.classList.add('not-found--visible');
    }
});