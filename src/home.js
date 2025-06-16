//Логіка сторінки Home

import { fetchCategories, fetchProducts, fetchProductsByCategory } from "./js/products-api";
import { renderCategories, renderProducts } from "./js/render-function";
import { categoriesList, productsList, notFoundDiv } from "./js/constants";

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

categoriesList.addEventListener("click", async (event) => {
    const button = event.target.closest("button.categories__btn");
    if (!button) return;

    const category = button.textContent.trim();

    document.querySelectorAll(".categories__btn").forEach(btn => {
        btn.classList.remove("categories__btn--active");
    });

    button.classList.add("categories__btn--active");

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