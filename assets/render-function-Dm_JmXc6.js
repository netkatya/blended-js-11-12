import{a as e}from"./vendor-DGDcxXwr.js";e.defaults.baseURL="https://dummyjson.com";async function _(){const{data:s}=await e.get("/products/category-list");return["All",...s]}async function i(s=1,o=12){const t=(s-1)*o,{data:c}=await e.get(`/products?limit=${o}&skip=${t}`);return c.products}async function y(s,o=1,t=12){if(s==="All")return i(o,t);{const c=(o-1)*t,{data:r}=await e.get(`/products/category/${s}/?limit=${t}&skip=${c}`);return r.products}}async function g(s){const{data:o}=await e.get(`/products/${s}`);return o}async function $(s,o=1,t=12){if(!s.trim())return[];const c=(o-1)*t,{data:r}=await e.get(`/products/search?q=${s}&limit=${t}&skip=${c}`);return r.products}const a={categoriesList:document.querySelector("ul.categories"),productsList:document.querySelector("ul.products")},d=document.querySelector("ul.categories"),b=()=>d.querySelectorAll("button.categories__btn"),f=document.querySelector("ul.products"),h=document.querySelector("div.not-found"),S=document.querySelector(".modal"),l=document.querySelector(".modal-product"),q=document.querySelector(".search-form"),P=document.querySelector(".search-form__input"),k=document.querySelector(".search-form__btn-clear"),w=document.querySelector(".modal-product__btn--wishlist");function L(s){const o=s.map(t=>`<li class="categories__item">
            <button class="categories__btn" type="button">${t}</button>
        </li>`).join("");a.categoriesList.innerHTML=o}function B(s){const o=s.map(t=>`<li class="products__item" data-id="${t.id}">
        <img class="products__image" src="${t.thumbnail}" alt="${t.title}"/>
        <p class="products__title">${t.title}</p>
        <p class="products__brand"><span class="products__brand--bold">Brand:${t.brand}</span></p>
        <p class="products__category">Category:${t.category} </p>
        <p class="products__price">Price: $${t.price}</p>
    </li>`).join("");a.productsList.innerHTML=o}function j(s){const{thumbnail:o,title:t,description:c,price:r,tags:n,brand:p}=s;l.innerHTML=`
        <img class="modal-product__img" src="${o}" alt="${t}" />
        <div class="modal-product__content">
            <p class="modal-product__title">${t}</p>
            <ul class="modal-product__tags">
                ${n.map(u=>`<li>${u}</li>`).join("")}
            </ul>
            <p class="modal-product__description">${c}</p>
            <p class="modal-product__shipping-information">Shipping: Free worldwide shipping</p>
            <p class="modal-product__return-policy">Return Policy: 30 days money back guarantee</p>
            <p class="modal-product__price">Price: $${r}</p>
            <button class="modal-product__buy-btn" type="button">Buy</button>
        </div>
    `}export{_ as a,L as b,i as c,b as d,d as e,g as f,k as g,y as h,j as i,q as j,$ as k,S as m,h as n,f as p,B as r,P as s,w};
//# sourceMappingURL=render-function-Dm_JmXc6.js.map
