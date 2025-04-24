let carrinho = [];
let total = 0;

function adicionarCarrinho(nome, preco) {
  carrinho.push({ nome, preco });
  atualizarCarrinho();
  // Animar o aumento do preço
  const totalEl = document.getElementById('total');
  totalEl.classList.add('price-up');
  setTimeout(() => {
    totalEl.classList.remove('price-up');
  }, 500);  // A animação dura 0.5s
}

function removerItem(index) {
  const lista = document.getElementById('lista-carrinho');
  const itemToRemove = lista.children[index];
  itemToRemove.style.animation = "removeItemAnimation 0.5s forwards"; // Animação de remoção
  
  // Após a animação, remove o item e atualiza o carrinho
  setTimeout(() => {
    carrinho.splice(index, 1);
    atualizarCarrinho();
  }, 500); // Espera a animação terminar para remover o item
}

function limparCarrinho() {
  carrinho = [];
  // Adiciona a animação quando o carrinho é limpo
  const carrinhoSection = document.querySelector('.carrinho');
  carrinhoSection.style.animation = "cartCleared 0.5s ease-in-out";
  setTimeout(() => {
    atualizarCarrinho();
  }, 500);  // Espera a animação terminar
}

function atualizarCarrinho() {
  const lista = document.getElementById('lista-carrinho');
  const totalEl = document.getElementById('total');
  lista.innerHTML = ''; // Limpa a lista do carrinho

  // Adiciona os itens no carrinho
  carrinho.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${item.nome} - R$ ${item.preco.toFixed(2)}</span>
      <button onclick="removerItem(${index})">Remover</button>
    `;
    lista.appendChild(li);
  });

  // Atualiza o total
  total = carrinho.reduce((acc, item) => acc + item.preco, 0);
  totalEl.innerText = total.toFixed(2);
}

function finalizarPedido() {
  if (carrinho.length === 0) {
    alert("Carrinho vazio. Adicione itens antes de finalizar.");
  } else {
    alert(`Pedido finalizado! Total: R$ ${total.toFixed(2)}`);
    limparCarrinho();
  }
}