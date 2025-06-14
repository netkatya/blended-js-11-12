// Функції для роботи з бекендом
import axios from 'axios';

axios.defaults.baseURL = "https://dummyjson.com";


export async function fetchCategories() {
    const { data } = await axios.get("/products/category-list");
    return ["All", ...data];
}

export async function fetchProducts(page = 1, limit = 12) {
    const skip = (page - 1) * limit;
    const { data } = await axios.get(`/products?limit=${limit}&skip=${scip}`);
    return data.products;
}


axios.get("/docs/products").then().catch();
axios.get("/products?limit=10&skip=10 ").then().catch();
axios.get("/products/1").then().catch();
axios.get("/products/search?q=nail").then().catch();

axios.get("/products/category/smartphones").then().catch();
