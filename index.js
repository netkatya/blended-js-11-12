import"./assets/styles-BK7AYJoX.js";import{a as i}from"./assets/vendor-DGDcxXwr.js";import{m as y,c as g,a as v,s as n,b as d,n as r,p as c,d as p,e as h}from"./assets/constants-BBDI931W.js";i.defaults.baseURL="https://dummyjson.com";async function $(){const{data:t}=await i.get("/products/category-list");return["All",...t]}async function m(t=1,e=12){const s=(t-1)*e,{data:a}=await i.get(`/products?limit=${e}&skip=${s}`);return a.products}async function w(t,e=1,s=12){if(t==="All")return m(e,s);{const a=(e-1)*s,{data:o}=await i.get(`/products/category/${t}/?limit=${s}&skip=${a}`);return o.products}}async function k(t){const{data:e}=await i.get(`/products/${t}`);return e}async function P(t,e=1,s=12){if(!t.trim())return[];const a=(e-1)*s,{data:o}=await i.get(`/products/search?q=${t}&limit=${s}&skip=${a}`);return o.products}const L={categoriesList:document.querySelector("ul.categories"),productsList:document.querySelector("ul.products")};function E(t){const e=t.map(s=>`<li class="categories__item">
            <button class="categories__btn" type="button">${s}</button>
        </li>`).join("");L.categoriesList.innerHTML=e}function _(t){const e=t.map(s=>`<li class="products__item" data-id="${s.id}">
        <img class="products__image" src="${s.thumbnail}" alt="${s.title}"/>
        <p class="products__title">${s.title}</p>
        <p class="products__brand"><span class="products__brand--bold">Brand:${s.brand}</span></p>
        <p class="products__category">Category:${s.category} </p>
        <p class="products__price">Price: $${s.price}</p>
    </li>`).join("");L.productsList.innerHTML=e}function M(t){const{thumbnail:e,title:s,description:a,price:o,tags:f,brand:H}=t;y.innerHTML=`
        <img class="modal-product__img" src="${e}" alt="${s}" />
        <div class="modal-product__content">
            <p class="modal-product__title">${s}</p>
            <ul class="modal-product__tags">
                ${f.map(b=>`<li>${b}</li>`).join("")}
            </ul>
            <p class="modal-product__description">${a}</p>
            <p class="modal-product__shipping-information">Shipping: Free worldwide shipping</p>
            <p class="modal-product__return-policy">Return Policy: 30 days money back guarantee</p>
            <p class="modal-product__price">Price: $${o}</p>
            <button class="modal-product__buy-btn" type="button">Buy</button>
        </div>
    `}let l=1;const u=12;document.addEventListener("DOMContentLoaded",async()=>{try{const t=await $();E(t);const e=await m(l,u);_(e)}catch(t){console.error("Error loading data:",t)}});g().forEach(t=>{t.classList.remove("categories__btn--active")});v.addEventListener("click",async t=>{const e=t.target.closest("button.categories__btn");if(!e)return;const s=e.textContent.trim();g().forEach(o=>{o.classList.remove("categories__btn--active")}),e.classList.add("categories__btn--active"),n.value="",d.classList.add("hidden"),r.classList.remove("not-found--visible");let a=[];try{s==="All"?a=await m(l,u):a=await w(s,l,u),a.length===0?(r.classList.add("not-found--visible"),c.innerHTML=""):(r.classList.remove("not-found--visible"),_(a))}catch(o){console.error("Помилка при завантаженні продуктів:",o),r.classList.add("not-found--visible"),c.innerHTML=""}});c.addEventListener("click",async t=>{const e=t.target.closest("li.products__item");if(!e)return;const s=e.dataset.id;if(s)try{const a=await k(s);M(a),p.classList.add("modal--is-open")}catch(a){console.error("Помилка при завантаженні продукту:",a)}});p.addEventListener("click",t=>{(t.target===p||t.target.classList.contains("modal__close-btn"))&&p.classList.remove("modal--is-open")});h.addEventListener("submit",async t=>{t.preventDefault();const e=n.value.trim();if(e)try{const s=await P(e,l,u);s.length===0?(r.classList.add("not-found--visible"),c.innerHTML=""):(r.classList.remove("not-found--visible"),_(s))}catch(s){console.error("Помилка при завантаженні продуктів:",s),r.classList.add("not-found--visible"),c.innerHTML=""}});n.addEventListener("input",()=>{n.value.trim()!==""?d.classList.remove("hidden"):d.classList.add("hidden")});d.addEventListener("click",async()=>{n.value="",d.classList.add("hidden"),r.classList.remove("not-found--visible");try{const t=await m(l,u);_(t)}catch(t){console.error("Помилка при завантаженні всіх продуктів:",t),c.innerHTML="",r.classList.add("not-found--visible")}});
//# sourceMappingURL=index.js.map
