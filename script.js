const c = (el)=>document.querySelector(el);
const cs = (el)=>document.querySelectorAll(el);

fashionJson.map((item, index)=>{

    let fashionItem = c('.models .fashion-item').cloneNode(true);

    fashionItem.querySelector('.fashion-item--img img').src = item.img;
    fashionItem.querySelector('.fashion-item--price').innerHTML = `$ ${item.price.toFixed(2)}`;
    fashionItem.querySelector('.fashion-item--name').innerHTML = item.name;
    fashionItem.querySelector('.fashion-item--desc').innerHTML = item.description;

    c('.fashion-area').append(fashionItem);
});