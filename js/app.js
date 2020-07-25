//globals

const cart = document.getElementById('cart');
const cartTotal = document.querySelector('#cart-total');
const itemTotal = document.querySelector('.item-total');
const itemCount =  document.querySelector('#item-count');
 
const setAdded = (prev,state) =>{
       
    const cartBtn = document.querySelectorAll('.store-item-icon');
    cartBtn.forEach((btn,i)=>{
        if(btn.children[0].getAttribute('added') === prev){
            btn.children[0].setAttribute('added',state);
        }
    }); 
}



//show cart 

(
    function(){
    const cartInfo = document.getElementById('cart-info'); 
    cartInfo.addEventListener('click', function(){
        cart.classList.toggle('show-cart');
    })
    }()
);
 
  
//  add items to the cart
  
const nodes = document.querySelectorAll('.store-item-icon');
 const cartBtn = Array.from(nodes);
 cartBtn.map(btn=>{
     btn.children[0].setAttribute('added','false');
     btn.addEventListener('click', function(event){
         
      
         const node = event.target;
    
         if( node.parentElement.classList.contains('store-item-icon')){
              // console.log(event.target)


            if(node.getAttribute('added') == 'false'){
           //console.log('true child');
       
                const pathname = node.parentElement.previousElementSibling.src;
                const pos = pathname.indexOf('img') + 3;
                const partPath = pathname.slice(pos);
                 
                 
                const img = `img-cart${partPath}`;
                const name = node.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;
                const slice_price = node.parentElement.parentElement.nextElementSibling.children[0].children[1].textContent;
               const splitted = slice_price.split(" ");
               const price = splitted[2];
               
         
                const item = {img,name,price}
             //   console.log(item);
         
             const cartItem = document.createElement('div');
             cartItem.setAttribute('id','cart-list');
             cartItem.classList.add(
                 'cart-item','d-flex','justify-content-between', 'text-capitalize','my-3'
             )
             
             cartItem.innerHTML = 
                        `
                    <img src='${item.img}' class="img-fluid rounded-circle" id="item-img" alt="">
                     <div class="item-text">
         
                       <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
                       <span> &#8358;</span>
                       <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span>
                     </div>
                     <a href="#" id='cart-item-remove' class="cart-item-remove">
                       <i class="fas fa-trash"></i>
                     </a>
                        `;
                const total = document.querySelector('.cart-total-container');        
                    cart.insertBefore(cartItem,total);  
         
                alert('Item inserted to cart');
            showTotal();
       //  added = true;
 node.setAttribute('added','true');
                       
               //handle removing individual item.
               // not directly in dom but inserted as a virtual dom
               // placed in if to confirm the virtual dom as been inserted into dom

              const trash = document.querySelectorAll('.fa-trash');
              trash.forEach((item,i)=>{
                item.addEventListener('click',(e)=>{
                    const current = e.target;
                    const node = item.parentElement.parentElement;
                 cart.removeChild(node);
                 setAdded('true','false');
                // console.log(node);
               
               
                const cTotal =  parseFloat(cartTotal.textContent);
                const iTotal = parseFloat(itemTotal.textContent);
                const iCount = Number(itemCount.textContent);

               
               
                const itemPrice =   parseFloat(node.children[1].children[2].textContent);
 
                 itemTotal.textContent = ( iTotal - itemPrice).toFixed(2);
                 cartTotal.textContent = (cTotal - itemPrice).toFixed(2);
                 itemCount.textContent =  iCount - 1;             


                })
              });
                  
            } //EOF added if

        
} //EOF IF
     })
 });

  function showTotal(){
      const total = [];
      const items = document.querySelectorAll('.cart-item-price');
      items.forEach(item=>{
          total.push(Number(item.textContent));
          
      });

      const floatMoney = total.reduce((total,item)=>{
          total += item;
          return total;
      },0);
      
    const money = floatMoney.toFixed(2);

    cartTotal.textContent = money;
    itemTotal.textContent = money;
   itemCount.textContent = total.length;
  }
   
 
//clear cart
 !function (){
 
    document.querySelector('#clear-cart').addEventListener('click',()=>{
        const cartItem = document.querySelectorAll('.cart-item');
   
        cartItem.forEach((item,i)=>{
            cart.removeChild(item);
        })
      setAdded('true','false');      
     cartTotal.textContent = "00.00";
     itemTotal.textContent = "0.00";
    itemCount.textContent = "0";
    document.querySelector('#checkout').textContent = "Checkout";

       });

    }();  

 

    // checkout

    void function(){
  const checkout = document.querySelector('#checkout');
     checkout.addEventListener('click',()=>{
         const size = parseFloat(itemCount.textContent);
         if(size === 0) alert('no item to checkout... go shop');
         else checkout.textContent = 'processing...'; 
    })
    }();