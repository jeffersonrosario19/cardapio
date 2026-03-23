const menuItems = [
  { id: 1, nome: "Vatapa", descricao: "Porcao cremosa e bem temperada, servida quentinha.", preco: 7, categoria: "Comidas tipicas" },
  { id: 2, nome: "Tacaca", descricao: "Caldo tradicional servido quente, com sabor marcante.", preco: 10, categoria: "Comidas tipicas" },
  { id: 3, nome: "Torta Salgada", descricao: "Fatia caprichada, macia e recheada.", preco: 6, categoria: "Comidas tipicas" },
  { id: 4, nome: "Churrasco na Chapa", descricao: "Carne preparada na hora, servida bem quente.", preco: 10, categoria: "Comidas tipicas" },
  { id: 5, nome: "Arroz com Galinha", descricao: "Prato tradicional, bem temperado e servido fresco.", preco: 6, categoria: "Comidas tipicas" },
  { id: 6, nome: "Bolo simples", descricao: "Fatia caseira, macia e com sabor regional.", preco: 4, categoria: "Bolos e doces" },
  { id: 7, nome: "Bolo de chocolate", descricao: "Bolo fofinho, dourado e muito saboroso.", preco: 5, categoria: "Bolos e doces" },
  { id: 8, nome: "Pudim", descricao: "Sobremesa cremosa com calda de caramelo.", preco: 4, categoria: "Bolos e doces" },
  { id: 9, nome: "Lasanha", descricao: "Porcao saborosa, bem recheada e servida quentinha.", preco: 4, categoria: "Comidas tipicas" },
  { id: 10, nome: "Fanta laranja 2 litros", descricao: "Refrigerante gelado para compartilhar.", preco: 12, categoria: "Bebidas" },
  { id: 11, nome: "Suco", descricao: "Bebida gelada para acompanhar os pratos da barraca.", preco: 7, categoria: "Bebidas" },
  { id: 12, nome: "Coca 2 Litros", descricao: "Refrigerante gelado para compartilhar.", preco: 15, categoria: "Bebidas" },
  { id: 13, nome: "Coca 600ml", descricao: "Refrigerante gelado e refrescante.", preco: 6, categoria: "Bebidas" },
  { id: 14, nome: "Fanta Uva 2 litros", descricao: "Refrigerante sabor uva servido bem gelado.", preco: 12, categoria: "Bebidas" },
  { id: 15, nome: "Agua", descricao: "Agua mineral gelada.", preco: 5, categoria: "Bebidas" }
];

const paymentOptions = ["Dinheiro", "Pix", "Cartao de Debito", "Cartao de Credito"];
const neutralIcons = ["assets/icons/icon-neutro1.png", "assets/icons/icon-neutro2.png"];

const state = {
  category: "Todos",
  search: "",
  paymentMethod: "Dinheiro",
  pixVisible: false,
  cartOpen: false,
  order: [],
  currentItemId: null,
  editingIndex: null,
  quantity: 1
};

const refs = {
  categoryChips: document.getElementById("categoryChips"),
  cardapioGrid: document.getElementById("cardapioGrid"),
  menuItemsCount: document.getElementById("menuItemsCount"),
  brandOrderCount: document.getElementById("brandOrderCount"),
  resultsCount: document.getElementById("resultsCount"),
  activeCategoryLabel: document.getElementById("activeCategoryLabel"),
  ticketValue: document.getElementById("ticketValue"),
  listaPedido: document.getElementById("listaPedido"),
  subtotalValue: document.getElementById("subtotalValue"),
  totalValue: document.getElementById("totalValue"),
  trocoBox: document.getElementById("trocoBox"),
  dinheiroInput: document.getElementById("dinheiroInput"),
  searchInput: document.getElementById("searchInput"),
  resetFiltersBtn: document.getElementById("resetFiltersBtn"),
  newOrderBtn: document.getElementById("newOrderBtn"),
  finalizarBtn: document.getElementById("finalizarBtn"),
  paymentMethods: document.getElementById("paymentMethods"),
  pixCard: document.getElementById("pixCard"),
  showPixBtn: document.getElementById("showPixBtn"),
  pixAmountValue: document.getElementById("pixAmountValue"),
  pixInline: document.getElementById("pixInline"),
  cartDrawer: document.getElementById("cartDrawer"),
  cartOverlay: document.getElementById("cartOverlay"),
  openCartBtn: document.getElementById("openCartBtn"),
  closeCartBtn: document.getElementById("closeCartBtn"),
  cartFabCount: document.getElementById("cartFabCount"),
  cartFabTotal: document.getElementById("cartFabTotal"),
  itemDialog: document.getElementById("itemDialog"),
  dialogImage: document.getElementById("dialogImage"),
  dialogNome: document.getElementById("dialogNome"),
  dialogDescricao: document.getElementById("dialogDescricao"),
  dialogPreco: document.getElementById("dialogPreco"),
  dialogQtd: document.getElementById("dialogQtd"),
  dialogForm: document.getElementById("dialogForm"),
  closeDialogBtn: document.getElementById("closeDialogBtn"),
  decreaseQtyBtn: document.getElementById("decreaseQtyBtn"),
  increaseQtyBtn: document.getElementById("increaseQtyBtn"),
  decisionDialog: document.getElementById("decisionDialog"),
  closeDecisionDialogBtn: document.getElementById("closeDecisionDialogBtn"),
  decisionTotalValue: document.getElementById("decisionTotalValue"),
  decisionNewOrderBtn: document.getElementById("decisionNewOrderBtn"),
  decisionPrintBtn: document.getElementById("decisionPrintBtn"),
  alertDialog: document.getElementById("alertDialog"),
  closeAlertDialogBtn: document.getElementById("closeAlertDialogBtn"),
  alertTitle: document.getElementById("alertTitle"),
  alertMessage: document.getElementById("alertMessage"),
  alertOkBtn: document.getElementById("alertOkBtn")
};

function currency(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function getCategories() {
  return ["Todos", ...new Set(menuItems.map((item) => item.categoria))];
}

function getFilteredItems() {
  return menuItems.filter((item) => {
    const categoryMatch = state.category === "Todos" || item.categoria === state.category;
    const searchMatch =
      state.search.trim() === "" ||
      `${item.nome} ${item.descricao} ${item.categoria}`.toLowerCase().includes(state.search.toLowerCase());
    return categoryMatch && searchMatch;
  });
}

function getCurrentItem() {
  return menuItems.find((item) => item.id === state.currentItemId);
}

function getOrderTotal() {
  return state.order.reduce((sum, item) => sum + item.preco * item.qtd, 0);
}

function getOrderCount() {
  return state.order.reduce((sum, item) => sum + item.qtd, 0);
}

function updateCatalogInsights(items = getFilteredItems()) {
  const total = getOrderTotal();
  refs.menuItemsCount.textContent = String(menuItems.length);
  refs.brandOrderCount.textContent = `${getOrderCount()} ${getOrderCount() === 1 ? "item" : "itens"}`;
  refs.resultsCount.textContent = `${items.length} ${items.length === 1 ? "item" : "itens"}`;
  refs.activeCategoryLabel.textContent = state.category;
  refs.ticketValue.textContent = currency(total);
}

function updateDrawerState() {
  refs.cartOverlay.hidden = !state.cartOpen;
  refs.cartDrawer.classList.toggle("is-open", state.cartOpen);
  refs.cartDrawer.setAttribute("aria-hidden", String(!state.cartOpen));
  document.body.classList.toggle("is-cart-open", state.cartOpen);
}

function openCart() {
  state.cartOpen = true;
  updateDrawerState();
}

function closeCart() {
  state.cartOpen = false;
  updateDrawerState();
}

function renderCategoryChips() {
  refs.categoryChips.innerHTML = "";
  getCategories().forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `chip${state.category === category ? " is-active" : ""}`;
    button.textContent = category;
    button.addEventListener("click", () => {
      state.category = category;
      renderCategoryChips();
      renderMenu();
    });
    refs.categoryChips.appendChild(button);
  });
}

function renderMenu() {
  const items = getFilteredItems();
  refs.cardapioGrid.innerHTML = "";
  updateCatalogInsights(items);

  if (items.length === 0) {
    refs.cardapioGrid.innerHTML = `
      <div class="empty-state">
        <div>
          <strong>Nenhum item encontrado</strong>
          <p>Tente buscar outro nome ou limpar os filtros.</p>
        </div>
      </div>
    `;
    return;
  }

  items.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = "menu-card";
    card.innerHTML = `
      <span class="menu-card__tag">${item.categoria}</span>
      <div class="menu-card__media">
        <img src="${neutralIcons[index % neutralIcons.length]}" alt="${item.nome}">
      </div>
      <h3>${item.nome}</h3>
      <div class="menu-card__bottom">
        <div class="menu-card__price">${currency(item.preco)}</div>
        <button class="menu-card__button" type="button">Pedir</button>
      </div>
    `;
    card.querySelector(".menu-card__button").addEventListener("click", () => openDialog(item.id, null, index));
    refs.cardapioGrid.appendChild(card);
  });
}

function renderPaymentMethods() {
  refs.paymentMethods.innerHTML = "";
  paymentOptions.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `payment-option${state.paymentMethod === option ? " is-active" : ""}`;
    button.innerHTML = `<span>${option}</span><strong>${state.paymentMethod === option ? "Selecionado" : "Escolher"}</strong>`;
    button.addEventListener("click", () => {
      state.paymentMethod = option;
      if (option !== "Pix") {
        state.pixVisible = false;
      }
      renderPaymentMethods();
      updatePixUI();
      updateChange();
    });
    refs.paymentMethods.appendChild(button);
  });
}

function updatePixUI() {
  const total = getOrderTotal();
  const isPix = state.paymentMethod === "Pix";
  refs.pixCard.hidden = !isPix;
  refs.pixAmountValue.textContent = currency(total);
  refs.pixInline.hidden = !isPix || !state.pixVisible;
  refs.showPixBtn.textContent = state.pixVisible ? "Ocultar QR Code" : "Mostrar QR Code";
}

function renderOrder() {
  refs.listaPedido.innerHTML = "";

  if (state.order.length === 0) {
    refs.listaPedido.innerHTML = `
      <div class="empty-state">
        <div>
          <strong>Seu pedido esta vazio</strong>
          <p>Escolha itens no cardapio para comecar o atendimento.</p>
        </div>
      </div>
    `;
  } else {
    state.order.forEach((item, index) => {
      const line = document.createElement("div");
      line.className = "order-line";
      line.innerHTML = `
        <div class="order-line__top">
          <div class="order-line__name">${item.qtd}x ${item.nome}</div>
          <strong class="order-line__price">${currency(item.preco * item.qtd)}</strong>
        </div>
        <div class="order-line__bottom">
          <span>${currency(item.preco)} un.</span>
          <div class="order-line__actions">
            <button class="action-edit" type="button">Editar</button>
            <button class="action-remove" type="button">Remover</button>
          </div>
        </div>
      `;

      const [editButton, removeButton] = line.querySelectorAll("button");
      editButton.addEventListener("click", () => openDialog(item.id, index, index));
      removeButton.addEventListener("click", () => {
        state.order.splice(index, 1);
        renderOrder();
      });
      refs.listaPedido.appendChild(line);
    });
  }

  const total = getOrderTotal();
  const count = getOrderCount();
  refs.subtotalValue.textContent = currency(total);
  refs.totalValue.textContent = currency(total);
  refs.cartFabCount.textContent = `${count} ${count === 1 ? "item" : "itens"}`;
  refs.cartFabTotal.textContent = currency(total);
  updateCatalogInsights();
  updatePixUI();
  updateChange();
}

function updateChange() {
  const total = getOrderTotal();
  const valuePaid = Number(refs.dinheiroInput.value) || 0;

  if (state.paymentMethod !== "Dinheiro") {
    refs.trocoBox.textContent = `Pagamento em ${state.paymentMethod}. Troco nao necessario.`;
    return;
  }

  if (valuePaid <= 0) {
    refs.trocoBox.textContent = "Troco: R$ 0,00";
    return;
  }

  const change = valuePaid - total;
  refs.trocoBox.textContent = change >= 0 ? `Troco: ${currency(change)}` : `Faltam ${currency(Math.abs(change))}`;
}

function openDialog(itemId, editingIndex = null, iconIndex = 0) {
  const item = menuItems.find((menuItem) => menuItem.id === itemId);
  if (!item) {
    return;
  }

  state.currentItemId = itemId;
  state.editingIndex = editingIndex;
  state.quantity = editingIndex !== null ? state.order[editingIndex].qtd : 1;
  refs.dialogImage.src = neutralIcons[iconIndex % neutralIcons.length];
  refs.dialogImage.alt = item.nome;
  refs.dialogNome.textContent = item.nome;
  refs.dialogDescricao.textContent = item.descricao;
  refs.dialogPreco.textContent = currency(item.preco);
  refs.dialogQtd.textContent = state.quantity;
  refs.itemDialog.showModal();
}

function resetDialogState() {
  state.currentItemId = null;
  state.editingIndex = null;
  state.quantity = 1;
  refs.dialogForm.reset();
}

function closeDialog() {
  if (refs.itemDialog.open) {
    refs.itemDialog.close();
    return;
  }

  resetDialogState();
}

function confirmDialog(event) {
  event.preventDefault();
  const item = getCurrentItem();
  if (!item) {
    closeDialog();
    return;
  }

  const payload = { id: item.id, nome: item.nome, preco: item.preco, qtd: state.quantity };
  if (state.editingIndex !== null) {
    state.order[state.editingIndex] = payload;
  } else {
    state.order.push(payload);
  }

  closeDialog();
  renderOrder();
}

function resetFilters() {
  state.category = "Todos";
  state.search = "";
  refs.searchInput.value = "";
  renderCategoryChips();
  renderMenu();
}

function newOrder() {
  state.order = [];
  state.paymentMethod = "Dinheiro";
  state.pixVisible = false;
  state.cartOpen = false;
  refs.dinheiroInput.value = "";
  renderPaymentMethods();
  renderOrder();
  updateDrawerState();
}

function printReceipt() {
  const total = getOrderTotal();
  const payment = state.paymentMethod;
  const valuePaid = Number(refs.dinheiroInput.value) || 0;
  const changeText = payment === "Dinheiro" ? `Troco: ${currency(Math.max(valuePaid - total, 0))}` : "Troco: nao se aplica";
  const dateTime = new Date().toLocaleString("pt-BR");
  const itemCount = getOrderCount();
  const lines = state.order
    .map((item) => `${item.qtd}x ${item.nome}\n   ${currency(item.preco)} cada   ${currency(item.preco * item.qtd)}`)
    .join("\n");

  const receiptWindow = window.open("", "_blank", "width=380,height=640");
  if (!receiptWindow) {
    showAlert("Nao foi possivel abrir a janela de impressao.", "Erro ao imprimir");
    return;
  }

  receiptWindow.document.write(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <title>Comprovante</title>
      <style>
        @page { size: 58mm auto; margin: 2mm; }
        * { box-sizing: border-box; }
        body { width: 54mm; margin: 0 auto; padding: 2mm 1.5mm 4mm; font-family: Arial, sans-serif; color: #1f130d; background: #fff; }
        .ticket { border-top: 2px dashed #1f130d; border-bottom: 2px dashed #1f130d; padding: 2.5mm 0; }
        h1 { margin: 0; font-size: 14px; text-align: center; }
        .subtitle { margin: 2px 0 8px; text-align: center; font-size: 10px; }
        pre { white-space: pre-wrap; font-family: Consolas, monospace; line-height: 1.4; font-size: 10px; margin: 0; word-break: break-word; }
      </style>
    </head>
    <body onload="window.print(); window.close();">
      <div class="ticket">
      <h1>Barraca da Comunidade</h1>
      <div class="subtitle">Comprovante do pedido</div>
      <pre>
Data: ${dateTime}
Itens: ${itemCount}
Pagamento: ${payment}
-----------------------------
${lines}
-----------------------------
Total: ${currency(total)}
${payment === "Dinheiro" ? `Recebido: ${currency(valuePaid)}\n${changeText}` : ""}
      </pre>
      </div>
    </body>
    </html>
  `);
  receiptWindow.document.close();
}

function finalizeOrder() {
  if (state.order.length === 0) {
    showAlert("Adicione itens antes de fechar o pedido.", "Pedido vazio");
    return;
  }

  if (state.paymentMethod === "Dinheiro" && (Number(refs.dinheiroInput.value) || 0) < getOrderTotal()) {
    showAlert("O valor recebido ainda nao cobre o total do pedido.", "Valor insuficiente");
    return;
  }

  refs.decisionTotalValue.textContent = currency(getOrderTotal());
  refs.decisionDialog.showModal();
}

function closeDecisionDialog() {
  if (refs.decisionDialog.open) {
    refs.decisionDialog.close();
  }
}

function showAlert(message, title = "Atencao") {
  refs.alertTitle.textContent = title;
  refs.alertMessage.textContent = message;
  refs.alertDialog.showModal();
}

function closeAlertDialog() {
  if (refs.alertDialog.open) {
    refs.alertDialog.close();
  }
}

function confirmPrint() {
  closeDecisionDialog();
  printReceipt();
  newOrder();
}

function confirmNewOrderOnly() {
  closeDecisionDialog();
  newOrder();
}

function togglePixCode() {
  if (state.paymentMethod !== "Pix") {
    return;
  }

  state.pixVisible = !state.pixVisible;
  updatePixUI();
}

refs.searchInput.addEventListener("input", (event) => {
  state.search = event.target.value;
  renderMenu();
});

refs.resetFiltersBtn.addEventListener("click", resetFilters);
refs.openCartBtn.addEventListener("click", openCart);
refs.closeCartBtn.addEventListener("click", closeCart);
refs.cartOverlay.addEventListener("click", closeCart);
refs.newOrderBtn.addEventListener("click", newOrder);
refs.finalizarBtn.addEventListener("click", finalizeOrder);
refs.dinheiroInput.addEventListener("input", updateChange);
refs.showPixBtn.addEventListener("click", togglePixCode);
refs.closeDecisionDialogBtn.addEventListener("click", closeDecisionDialog);
refs.decisionPrintBtn.addEventListener("click", confirmPrint);
refs.decisionNewOrderBtn.addEventListener("click", confirmNewOrderOnly);
refs.closeAlertDialogBtn.addEventListener("click", closeAlertDialog);
refs.alertOkBtn.addEventListener("click", closeAlertDialog);

refs.closeDialogBtn.addEventListener("click", closeDialog);
refs.dialogForm.addEventListener("submit", confirmDialog);
refs.decreaseQtyBtn.addEventListener("click", () => {
  state.quantity = Math.max(1, state.quantity - 1);
  refs.dialogQtd.textContent = state.quantity;
});
refs.increaseQtyBtn.addEventListener("click", () => {
  state.quantity += 1;
  refs.dialogQtd.textContent = state.quantity;
});

refs.itemDialog.addEventListener("click", (event) => {
  const rect = refs.itemDialog.getBoundingClientRect();
  const clickedOutside =
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom;
  if (clickedOutside) {
    closeDialog();
  }
});

refs.itemDialog.addEventListener("close", () => {
  resetDialogState();
});

refs.decisionDialog.addEventListener("click", (event) => {
  const rect = refs.decisionDialog.getBoundingClientRect();
  const clickedOutside =
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom;
  if (clickedOutside) {
    closeDecisionDialog();
  }
});

refs.alertDialog.addEventListener("click", (event) => {
  const rect = refs.alertDialog.getBoundingClientRect();
  const clickedOutside =
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom;
  if (clickedOutside) {
    closeAlertDialog();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && state.cartOpen) {
    closeCart();
  }
});

renderCategoryChips();
renderMenu();
renderPaymentMethods();
renderOrder();
updateDrawerState();
