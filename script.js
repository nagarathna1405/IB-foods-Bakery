let selectedProduct = "";

/* ---------- ORDER MODAL ---------- */
function order(item) {
  selectedProduct = item;
  document.getElementById("productName").innerText = item;
  document.getElementById("orderModal").style.display = "block";
}

function closeOrder() {
  document.getElementById("orderModal").style.display = "none";
}

/* ---------- SAVE ORDER ---------- */
function submitOrder() {
  const name = document.getElementById("custName").value;
  const phone = document.getElementById("custPhone").value;
  const address = document.getElementById("custAddress").value;
  const qty = document.getElementById("custQty").value;

  if (!name || !phone || !address) {
    alert("⚠️ Please fill all details");
    return;
  }

  const orderData = {
    id: Date.now(),
    product: selectedProduct,
    customer: name,
    phone: phone,
    address: address,
    quantity: qty || 1,
    status: "Pending", // Pending → Preparing → Ready → Delivered
    rating: 0,
    date: new Date().toLocaleString()
  };

  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(orderData);
  localStorage.setItem("orders", JSON.stringify(orders));

  alert("✅ Order placed successfully!");
  closeOrder();
}

/* ---------- WHATSAPP ORDER ---------- */
function whatsappOrder(product) {
  const phoneNumber = "91 9066556630"; // 👉 replace with bakery WhatsApp number
  const message = `Hello 🍰 I want to order:\n\nProduct: ${product}`;
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

/* ---------- ADMIN: VIEW ORDERS ---------- */
function getOrders() {
  return JSON.parse(localStorage.getItem("orders")) || [];
}

/* ---------- ADMIN: UPDATE STATUS ---------- */
function updateOrderStatus(orderId, newStatus) {
  let orders = getOrders();
  orders = orders.map(order => {
    if (order.id === orderId) {
      order.status = newStatus;
    }
    return order;
  });
  localStorage.setItem("orders", JSON.stringify(orders));
}

/* ---------- CUSTOMER RATING ---------- */
function rateOrder(orderId, stars) {
  let orders = getOrders();
  orders = orders.map(order => {
    if (order.id === orderId) {
      order.rating = stars;
    }
    return order;
  });
  localStorage.setItem("orders", JSON.stringify(orders));
  alert("⭐ Thank you for your rating!");
}
