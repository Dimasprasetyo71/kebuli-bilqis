let searchForm = document.querySelector('.search-form');

function openWhatsApp() {
  var email = document.querySelector('.email').value;
  var saran = document.querySelector('.saran').value;
  var phoneNumber = '6285714127454'; // Nomor WhatsApp tujuan
  var message = 'Email: ' + email + '\nSaran: ' + saran; // Pesan yang akan dikirim

  // Membuat URL untuk membuka aplikasi WhatsApp dengan pesan yang diisi
  var url = 'https://api.whatsapp.com/send?phone=' + phoneNumber + '&text=' + encodeURIComponent(message);

  // Membuka WhatsApp di tab atau aplikasi WhatsApp jika tersedia
  window.open(url, '_blank');
}


let shoppingCart = document.querySelector('.shopping-cart');

document.querySelector('#cart-btn').onclick = () => {
  shoppingCart.classList.toggle('active');
  navbar.classList.remove('active');
}


let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () => {
  navbar.classList.toggle('active');
  shoppingCart.classList.remove('active');
}

var swiper = new Swiper(".product-slider", {
  loop: true,
  spaceBetween: 20,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  centeredSlides: true,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1020: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper(".review-slider", {
  loop: true,
  spaceBetween: 20,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  centeredSlides: true,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1020: {
      slidesPerView: 3,
    },
  },
});



// Objek untuk menyimpan item di keranjang
let cartItems = [];

// Fungsi untuk menambahkan item ke keranjang
function addToCart(item) {
  cartItems.push(item);
  updateCartUI();
}

// Fungsi untuk memperbarui tampilan keranjang
function updateCartUI() {
  let cartContainer = document.querySelector('.shopping-cart');
  cartContainer.innerHTML = '';
  let totalPrice = 0;

  cartItems.forEach(item => {
    let cartItemElement = document.createElement('div');
    cartItemElement.classList.add('box');

    // Membuat inputan deskripsi produk
    let descriptionInput = document.createElement('input');
    descriptionInput.classList.add('description-input');
    descriptionInput.placeholder = 'deskripsi'; // Placeholder untuk deskripsi produk
    descriptionInput.value = item.description || ''; // Mengatur nilai awal deskripsi atau biarkan kosong jika belum diisi
    descriptionInput.addEventListener('input', function () {
      item.description = this.value; // Memperbarui deskripsi saat pengguna mengubahnya
      console.log(item.description);
    });

    // Membuat inputan jumlah produk
    let quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.classList.add('quantity-input');
    quantityInput.value = item.quantity; // Mengatur nilai awal input sesuai dengan jumlah produk
    quantityInput.min = '1'; // Set nilai minimal input ke 1
    quantityInput.addEventListener('input', function () {
      let newQuantity = parseFloat(this.value);
      if (!isNaN(newQuantity) && newQuantity >= 1) {
        item.quantity = newQuantity; // Memperbarui jumlah produk dalam keranjang
        updateCartUI(); // Memperbarui tampilan keranjang belanja
      } else {
        // Jika nilai yang dimasukkan tidak valid, kembalikan nilainya ke jumlah sebelumnya
        this.value = item.quantity;
      }
    });

    cartItemElement.innerHTML = `
            <i class="fas fa-trash" onclick="removeFromCart(${item.id})"></i>
            <img src="${item.image}" alt="">
            <div class="content">
                <h3>${item.name}</h3>
                <span class="price">${item.price}</span>
                <div class="description">Deskripsi:</div>
                <div class="quantity">Jumlah: </div>
            </div>
        `;
    // Menambahkan input deskripsi ke dalam div description
    cartItemElement.querySelector('.description').appendChild(descriptionInput);

    // Menambahkan input jumlah ke dalam div quantity
    cartItemElement.querySelector('.quantity').appendChild(quantityInput);

    // Menambahkan harga produk ke total
    let priceNumeric = parseFloat(item.price.replace('Rp.', '').replace('.', '').replace(',', '') || 0);
    totalPrice += priceNumeric * item.quantity;

    // Menambahkan elemen produk ke keranjang
    cartContainer.appendChild(cartItemElement);
  });

  let totalElement = document.createElement('div');
  totalElement.classList.add('total');
  totalElement.innerHTML = `Total: Rp.${totalPrice.toLocaleString()}`;
  cartContainer.appendChild(totalElement);

  let checkoutButton = document.createElement('a');
  checkoutButton.classList.add('btn');
  const ua = navigator.userAgent.toLowerCase();
  const isAndroid = ua.indexOf("android") > -1;
  const isIos = ua.indexOf("iphone") > -1 || ua.indexOf("ipad") > -1;

  checkoutButton.addEventListener('click', function () {
    // Buat teks pesan WhatsApp dengan deskripsi di bawah nama produk
    let whatsappMessage = `Halo, saya ingin memesan produk dengan detail sebagai berikut:\n\n`;
    cartItems.forEach((item) => {
      whatsappMessage += `${item.name} (${item.quantity})\nDeskripsi: ${item.description}\n\n`;
      console.log(item);
    });
    whatsappMessage += `Total: Rp.${totalPrice.toLocaleString()}/-`;

    // Tentukan URL WhatsApp dengan teks pesan yang sudah dibuat
    let whatsappURL = '';
    if (isAndroid) {
      whatsappURL = "whatsapp://send?text=" + encodeURIComponent(whatsappMessage) + "&phone=6285714127454";
    } else if (isIos) {
      whatsappURL = "https://wa.me/6285714127454?text=" + encodeURIComponent(whatsappMessage);
    } else {
      whatsappURL = "https://web.whatsapp.com/send?text=" + encodeURIComponent(whatsappMessage) + "&phone=6285714127454";
    }

    // Atur URL WhatsApp sebagai href dari tombol checkout
    checkoutButton.href = whatsappURL;
  })
  checkoutButton.textContent = "Checkout";
  cartContainer.appendChild(checkoutButton);
}



function addToCart(productId, productName, productPrice, productImage, productDescription) {
  let existingItem = cartItems.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.push({
      id: productId,
      name: productName,
      price: productPrice,
      image: productImage,
      description: productDescription, // Tambahkan deskripsi produk di sini
      quantity: 1
    });
  }

  updateCartUI();
}

document.querySelectorAll('.product-slider .btn').forEach((button, index) => {
  button.addEventListener('click', () => {
    let selectedProduct = {
      id: index + 1,
      name: document.querySelectorAll('.product-slider h3')[index].textContent,
      price: document.querySelectorAll('.product-slider .price')[index].textContent,
      image: document.querySelectorAll('.product-slider img')[index].src,
      quantity: 1,
    };
    let existingItem = cartItems.find(item => item.id === selectedProduct.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push(selectedProduct);
    }
    updateCartUI();
  });
});

function removeFromCart(productId) {
  let index = cartItems.findIndex(item => item.id === productId);
  cartItems.splice(index, 1);
  updateCartUI();
}

document.addEventListener('click', function (event) {
  if (!event.target.closest('.shopping-cart') && !event.target.closest('#cart-btn') && !event.target.closest('.btn') && !event.target.closest('.fas')) {
    shoppingCart.classList.remove('active');
  }
});

// searchForm.addEventListener('submit', function (event) {
//   event.preventDefault();
//   let keyword = document.querySelector('#search-box').value;
//   window.location.href = "https://www.google.com/search?q=" + keyword;
// });

kotakSaran = document.querySelector('.kotak-saran');

// kotakSaran.addEventListener('submit', function (event) {
//   event.preventDefault();
//   let email = document.querySelector('#email').value;
//   let saran = document.querySelector('#saran').value;
// });