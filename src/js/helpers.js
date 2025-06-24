//Допоміжні функції

import { fetchProducts, fetchProductsByCategory } from './products-api';
import { renderProducts } from './render-function';
import { productsList, loader, themeToggle, paginationContainer } from './constants';
import iziToast from 'izitoast';
import Pagination from 'tui-pagination';

let currentPage = 1;
const limit = 12;
let currentCategory = "All";
let pagination = null; // TUI Pagination instance


export const resetPagination = (newCategory = "All") => {
    currentPage = 1;
    currentCategory = newCategory;
    productsList.innerHTML = '';
    if (pagination) pagination.reset(); // if pagination exists
};

// Function to initialize TUI Pagination
export const initPagination = (totalItems) => {
    if (pagination) { // remove old instance if any
        pagination.destroy();
        pagination = null;
    }


    pagination = new Pagination('pagination', { // assumes <div id="pagination"></div> in HTML
        totalItems: totalItems,
        itemsPerPage: limit,
        visiblePages: 5,
        centerAlign: true,
    });

    pagination.on('afterMove', async (event) => {
        const page = event.page;
        await loadProductsByPage(page);
    });

};



// General loader function for pagination pages
export const loadProductsByPage = async (page) => {
    loader.style.display = 'block';
    try {
        let products;
        if (currentCategory === "All") {
            products = await fetchProducts(page, limit);
        } else {
            products = await fetchProductsByCategory(currentCategory, page, limit);
        }

        if (products.length === 0) {
            iziToast.info({
                title: 'Info',
                message: 'No products found.',
                position: 'topRight'
            });
            productsList.innerHTML = ''; // Clear list
        } else {
            renderProducts(products);
        }
    } catch (error) {
        console.error('Error loading products:', error);
    } finally {
        loader.style.display = 'none';
    }
};

// Theme Switcher
export function changeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.add(`${savedTheme}-theme`);

    themeToggle.addEventListener('click', () => {
        if (document.body.classList.contains('light-theme')) {
            document.body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('theme', 'light');
        }
    });
}

// import { fetchProducts, fetchProductsByCategory } from './products-api';
// import { renderProducts } from './render-function';
// import { productsList, loadButton, loader, themeToggle } from './constants';
// import iziToast from 'izitoast';
// import Pagination from 'tui-pagination';


// let currentPage = 1;
// const limit = 12;
// let currentCategory = "All";

// export const resetPagination = (newCategory = "All") => {
//     currentPage = 1;
//     currentCategory = newCategory;
//     productsList.innerHTML = '';
// };

// export const loadMoreProducts = async () => {
//     loader.style.display = 'block';
//     try {
//         currentPage += 1;
//         let products;
//         if (currentCategory === "All") {
//             products = await fetchProducts(currentPage, limit);
//         } else {
//             products = await fetchProductsByCategory(currentCategory, currentPage, limit);
//         }

//         if (products.length === 0) {
//             loadButton.style.display = 'none';
//             iziToast.info({
//                 title: 'Info',
//                 message: 'No more products to load.',
//                 position: 'topRight'
//             });
//         } else {
//             renderProducts(products);
//         }
//     } catch (error) {
//         console.error('Error loading more products:', error);
//     } finally {
//         loader.style.display = 'none';
//     }
// };



// // theme 
// export function changeTheme() {
// const savedTheme = localStorage.getItem('theme') || 'light';

// document.body.classList.add(`${savedTheme}-theme`);

// themeToggle.addEventListener('click', () => {
//     if (document.body.classList.contains('light-theme')) {
//         document.body.classList.replace('light-theme', 'dark-theme');
//         localStorage.setItem('theme', 'dark');
//     } else {
//         document.body.classList.replace('dark-theme', 'light-theme');
//         localStorage.setItem('theme', 'light');
//     }
// });
// }
