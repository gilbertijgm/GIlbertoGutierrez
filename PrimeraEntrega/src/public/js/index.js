const socket = io();
socket.on("products", (data) => {
  const productosLista = document.querySelector(".container");
  productosLista.innerHTML = " ";
  data.forEach((e) => {
    const boxItem = `
                <div class="product">
                <h3>${e.title}</h3>
                <p>Description: ${e.description}</p>
                <p>Categoria: ${e.category}
                <p>ID: ${e.id}</p>
                <p>$ ${e.price}</p>
                <p>Stock: ${e.stock}</p>
                </div>`;
    productosLista.innerHTML += boxItem;
  });
});
