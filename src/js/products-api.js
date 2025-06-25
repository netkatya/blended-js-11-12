// Функції для роботи з бекендом
import axios from 'axios';

axios.defaults.baseURL = "https://dummyjson.com";


export async function fetchCategories() {
    const { data } = await axios.get("/products/category-list");
    return ["All", ...data];
}

export async function fetchProducts(page = 1, limit = 12) {
    const skip = (page - 1) * limit;
    const { data } = await axios.get(`/products?limit=${limit}&skip=${skip}`);
    return data.products;
}

export async function fetchProductsByCategory(category, page = 1, limit = 12) {
    if (category === "All") {
        return fetchProducts(page, limit)
    } else {
        const skip = (page - 1) * limit;
        const { data } = await axios.get(`/products/category/${category}/?limit=${limit}&skip=${skip}`);
        return data.products;
    }
}

export async function fetchProductsById(id) {
    const { data } = await axios.get(`/products/${id}`);
    return data;
}

export async function searchProducts(query, page = 1, limit = 12) {
    if (!query.trim()) return []; 
    const skip = (page - 1) * limit;
    const { data } = await axios.get(`/products/search?q=${query}&limit=${limit}&skip=${skip}`);
    return data.products;
}

export async function fetchTotalProductsCount() {
    const { data } = await axios.get(`/products?limit=1`);
    return data.total; //  Will return the total number of products
}


