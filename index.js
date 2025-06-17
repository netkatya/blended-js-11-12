import"./assets/styles-BK7AYJoX.js";import{a as r}from"./assets/vendor-DGDcxXwr.js";r.defaults.baseURL="https://dummyjson.com";async function y(){const{data:t}=await r.get("/products/category-list");return["All",...t]}async function u(t=1,e=12){const o=(t-1)*e,{data:s}=await r.get(`/products?limit=${e}&skip=${o}`);return s.products}async function b(t,e=1,o=12){if(t==="All")return u(e,o);{const s=(e-1)*o,{data:c}=await r.get(`/products/category/${t}/?limit=${o}&skip=${s}`);return c.products}}async function f(t){const{data:e}=await r.get(`/products/${t}`);return e}const p={categoriesList:document.querySelector("ul.categories"),productsList:document.querySelector("ul.products")},L=document.querySelector("ul.categories"),i=document.querySelector("ul.products"),n=document.querySelector("div.not-found"),a=document.querySelector(".modal"),$=document.querySelector(".modal-product");function h(t){const e=t.map(o=>`<li class="categories__item">
            <button class="categories__btn" type="button">${o}</button>
        </li>`).join("");p.categoriesList.innerHTML=e}function m(t){const e=t.map(o=>`<li class="products__item" data-id="${o.id}">
        <img class="products__image" src="${o.thumbnail}" alt="${o.title}"/>
        <p class="products__title">${o.title}</p>
        <p class="products__brand"><span class="products__brand--bold">Brand:${o.brand}</span></p>
        <p class="products__category">Category:${o.category} </p>
        <p class="products__price">Price: $${o.price}</p>
    </li>`).join("");p.productsList.innerHTML=e}function v(t){const{thumbnail:e,title:o,description:s,price:c,tags:_,brand:w}=t;$.innerHTML=`
        <img class="modal-product__img" src="${e}" alt="${o}" />
        <div class="modal-product__content">
            <p class="modal-product__title">${o}</p>
            <ul class="modal-product__tags">
                ${_.map(g=>`<li>${g}</li>`).join("")}
            </ul>
            <p class="modal-product__description">${s}</p>
            <p class="modal-product__shipping-information">Shipping: Free worldwide shipping</p>
            <p class="modal-product__return-policy">Return Policy: 30 days money back guarantee</p>
            <p class="modal-product__price">Price: $${c}</p>
            <button class="modal-product__buy-btn" type="button">Buy</button>
        </div>
    `}let d=1;const l=12;document.addEventListener("DOMContentLoaded",async()=>{try{const t=await y();h(t);const e=await u(d,l);m(e)}catch(t){console.error("Error loading data:",t)}});L.addEventListener("click",async t=>{const e=t.target.closest("button.categories__btn");if(!e)return;const o=e.textContent.trim();document.querySelectorAll(".categories__btn").forEach(c=>{c.classList.remove("categories__btn--active")}),e.classList.add("categories__btn--active");let s=[];try{o==="All"?s=await u(d,l):s=await b(o,d,l),s.length===0?(n.classList.add("not-found--visible"),i.innerHTML=""):(n.classList.remove("not-found--visible"),m(s))}catch(c){console.error("Помилка при завантаженні продуктів:",c),n.classList.add("not-found--visible"),i.innerHTML=""}});i.addEventListener("click",async t=>{const e=t.target.closest("li.products__item");if(!e)return;const o=e.dataset.id;if(o)try{const s=await f(o);v(s),a.classList.add("modal--is-open")}catch(s){console.error("Помилка при завантаженні продукту:",s)}});a.addEventListener("click",t=>{(t.target===a||t.target.classList.contains("modal__close-btn"))&&a.classList.remove("modal--is-open")});
//# sourceMappingURL=index.js.map
