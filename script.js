let cart = [];
let modalQt = 1;
let modalKey = 0;

const c = (el)=>document.querySelector(el);
const cs = (el)=>document.querySelectorAll(el);

//Listagem
fashionJson.map((item, index)=>{
    let fashionItem = c('.models .fashion-item').cloneNode(true);

    fashionItem.setAttribute('data-key', index);
    fashionItem.querySelector('.fashion-item--img img').src = item.img;
    fashionItem.querySelector('.fashion-item--price').innerHTML = `$ ${item.price.toFixed(2)}`;
    fashionItem.querySelector('.fashion-item--name').innerHTML = item.name;
    fashionItem.querySelector('.fashion-item--desc').innerHTML = item.description;
    fashionItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault();
        let key = e.target.closest('.fashion-item').getAttribute('data-key');
        modalQt = 1;
        modalKey = key;

        c('.fashionBig img').src = fashionJson[key].img;
        c('.fashionInfo h1').innerHTML = fashionJson[key].name;
        c('.fashionInfo--desc').innerHTML = fashionJson[key].description;
        c('.fashionInfo--actualPrice').innerHTML = `$ ${fashionJson[key].price.toFixed(2)}`;
        c('.fashionInfo--size.selected').classList.remove('selected');
        cs('.fashionInfo--size').forEach((size, sizeIndex)=>{
            if(sizeIndex ==2){
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = fashionJson[key].sizes[sizeIndex];
        });

        c('.fashionInfo--qt').innerHTML = modalQt;
        
        c('.fashionWindowArea').style.opacity = 0;
        c('.fashionWindowArea').style.display = 'flex';
        setTimeout(()=>{
            c('.fashionWindowArea').style.opacity = 1;
        },200);
    });

    c('.fashion-area').append(fashionItem);
});

//Eventos
function closeModal(){
    c('.fashionWindowArea').style.opacity = 0;
    setTimeout(()=>{
        c('.fashionWindowArea').style.display = 'none';
    }, 500)
}
cs('.fashionInfo--cancelButton, .fashionInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal);
});
c('.fashionInfo--qtmenos').addEventListener('click', ()=>{
    if(modalQt > 1){
        modalQt--;
        c('.fashionInfo--qt').innerHTML = modalQt;
    }
});
c('.fashionInfo--qtmais').addEventListener('click', ()=>{
    modalQt++;
    c('.fashionInfo--qt').innerHTML = modalQt;
});
cs('.fashionInfo--size').forEach((size, sizeIndex)=>{
    size.addEventListener('click', (e)=>{
        c('.fashionInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});
c('.fashionInfo--addButton').addEventListener('click', ()=>{
    let size = parseInt(c('.fashionInfo--size.selected').getAttribute('data-key'));

    //identificador para evitar repetição de itens
    let identifier = fashionJson[modalKey].id+'@'+size;
    let key = cart.findIndex((item)=>item.identifier == identifier);
    if(key >-1){
        cart[key].qt += modalQt;
    }else{
        cart.push({
            identifier,
            id:fashionJson[modalKey].id, 
            size,
            qt:modalQt
        });
    }
    updateCart();
    closeModal();
});

c('.menu-openner').addEventListener('click', ()=>{
    if(cart.length > 0){
        c('aside').style.left = '0';
    }
});
c('.menu-closer').addEventListener('click', ()=>{
    c('aside').style.left = '100vw';
})

function updateCart(){
    c('.menu-openner span').innerHTML = cart.length;
    if(cart.length > 0){
        c('aside').classList.add('show');
        c('.cart').innerHTML = '';

        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for(let i in cart){
            let fashionItem = fashionJson.find((item)=>item.id == cart[i].id);

            subtotal += fashionItem.price * cart[i].qt;

            let cartItem = c('.models .cart--item').cloneNode(true);

            let fashionSizeName;
            switch(cart[i].size){
                case 0:
                    fashionSizeName = 'S';
                    break;
                case 1:
                    fashionSizeName = 'M';
                    break;
                case 2:
                    fashionSizeName = 'L';
            }

            let fashionName = `${fashionItem.name} (${fashionSizeName})`;

            cartItem.querySelector('img').src = fashionItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = fashionName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=>{
                if(cart[i].qt > 1){
                    cart[i].qt--;
                }else{
                    cart.splice(i,1);
                }
                updateCart();
            });
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{
                cart[i].qt++;
                updateCart();
            });

            c('.cart').append(cartItem);
        }

        desconto = subtotal * 0.1;
        total = subtotal - desconto;

        c('.subtotal span:last-child').innerHTML = `$ ${subtotal.toFixed(2)}`;
        c('.desconto span:last-child').innerHTML = `$ ${desconto.toFixed(2)}`;
        c('.total span:last-child').innerHTML = `$ ${total.toFixed(2)}`;

    }else{
        c('aside').classList.remove('show');
        c('aside').style.left = '100vw';
    }
}