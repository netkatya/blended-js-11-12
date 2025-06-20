import{a as e}from"./vendor-DGDcxXwr.js";e.defaults.baseURL="https://dummyjson.com";async function h(){const{data:t}=await e.get("/products/category-list");return["All",...t]}async function p(t=1,s=12){const o=(t-1)*s,{data:c}=await e.get(`/products?limit=${s}&skip=${o}`);return c.products}async function f(t,s=1,o=12){if(t==="All")return p(s,o);{const c=(s-1)*o,{data:r}=await e.get(`/products/category/${t}/?limit=${o}&skip=${c}`);return r.products}}async function $(t){const{data:s}=await e.get(`/products/${t}`);return s}async function b(t,s=1,o=12){if(!t.trim())return[];const c=(s-1)*o,{data:r}=await e.get(`/products/search?q=${t}&limit=${o}&skip=${c}`);return r.products}const n={categoriesList:document.querySelector("ul.categories"),productsList:document.querySelector("ul.products")},i="wishlist",m=document.querySelector("ul.categories"),S=()=>m.querySelectorAll("button.categories__btn"),w=document.querySelector("ul.products"),q=document.querySelector("div.not-found"),L=document.querySelector(".modal"),_=document.querySelector(".modal-product"),P=document.querySelector(".search-form"),k=document.querySelector(".search-form__input"),v=document.querySelector(".search-form__btn-clear"),B=document.querySelector(".modal-product__btn--wishlist"),I=document.querySelector("[data-wishlist-count]");function W(t){const s=t.map(o=>`<li class="categories__item">
            <button class="categories__btn" type="button">${o}</button>
        </li>`).join("");n.categoriesList.innerHTML=s}function C(t){const s=t.map(o=>`<li class="products__item" data-id="${o.id}">
        <img class="products__image" src="${o.thumbnail}" alt="${o.title}"/>
        <p class="products__title">${o.title}</p>
        <p class="products__brand"><span class="products__brand--bold">Brand:${o.brand}</span></p>
        <p class="products__category">Category:${o.category} </p>
        <p class="products__price">Price: $${o.price}</p>
    </li>`).join("");n.productsList.innerHTML=s}function j(t){const{thumbnail:s,title:o,description:c,price:r,tags:l,brand:g}=t;_.innerHTML=`
        <img class="modal-product__img" src="${s}" alt="${o}" />
        <div class="modal-product__content">
            <p class="modal-product__title">${o}</p>
            <ul class="modal-product__tags">
                ${l.map(d=>`<li>${d}</li>`).join("")}
            </ul>
            <p class="modal-product__description">${c}</p>
            <p class="modal-product__shipping-information">Shipping: Free worldwide shipping</p>
            <p class="modal-product__return-policy">Return Policy: 30 days money back guarantee</p>
            <p class="modal-product__price">Price: $${r}</p>
            <button class="modal-product__buy-btn" type="button">Buy</button>
        </div>
    `}const a=()=>{try{const t=localStorage.getItem(i);return t?JSON.parse(t):[]}catch(t){return console.error("Wishlist data corrupted in localStorage:",t),[]}},u=t=>{localStorage.setItem(i,JSON.stringify(t))},T=t=>{const s=a();s.includes(t)||(s.push(t),u(s))},F=t=>{let s=a();s=s.filter(o=>o!==t),u(s)},H=t=>a().includes(t);export{F as a,T as b,q as c,C as d,h as e,$ as f,a as g,W as h,H as i,p as j,S as k,m as l,L as m,I as n,v as o,w as p,f as q,j as r,k as s,P as t,b as u,B as w};
//# sourceMappingURL=storage-CP7TJ6jn.js.map
