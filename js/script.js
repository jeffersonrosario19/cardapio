const menuItems = [
  {
    id: 1,
    nome: "Vatapa",
    descricao: "Porcao cremosa e bem temperada, servida quentinha.",
    preco: 18,
    categoria: "Comidas tipicas"
  },
  {
    id: 2,
    nome: "Tacaca",
    descricao: "Caldo tradicional servido quente, com sabor marcante.",
    preco: 16,
    categoria: "Comidas tipicas"
  },
  {
    id: 3,
    nome: "Torta Salgada",
    descricao: "Fatia caprichada, macia e recheada.",
    preco: 10,
    categoria: "Comidas tipicas"
  },
  {
    id: 4,
    nome: "Churrasco na Chapa",
    descricao: "Carne preparada na hora, servida bem quente.",
    preco: 22,
    categoria: "Comidas tipicas"
  },
  {
    id: 5,
    nome: "Arroz com Galinha",
    descricao: "Prato tradicional, bem temperado e servido fresco.",
    preco: 20,
    categoria: "Comidas tipicas"
  },
  {
    id: 6,
    nome: "Bolo de Macaxeira",
    descricao: "Fatia caseira, macia e com sabor regional.",
    preco: 8,
    categoria: "Bolos e doces"
  },
  {
    id: 7,
    nome: "Bolo de Milho",
    descricao: "Bolo fofinho, dourado e muito saboroso.",
    preco: 8,
    categoria: "Bolos e doces"
  },
  {
    id: 8,
    nome: "Pudim Caseiro",
    descricao: "Sobremesa cremosa com calda de caramelo.",
    preco: 9,
    categoria: "Bolos e doces"
  },
  {
    id: 9,
    nome: "Brigadeiro",
    descricao: "Doce tradicional enrolado e coberto com granulado.",
    preco: 4,
    categoria: "Bolos e doces"
  },
  {
    id: 10,
    nome: "Cocada Cremosa",
    descricao: "Doce de coco com textura cremosa e sabor caseiro.",
    preco: 6,
    categoria: "Bolos e doces"
  },
  {
    id: 11,
    nome: "Suco",
    descricao: "Bebida gelada para acompanhar os pratos da barraca.",
    preco: 7,
    categoria: "Bebidas"
  },
  {
    id: 12,
    nome: "Coca-Cola 2 Litros",
    descricao: "Refrigerante gelado para compartilhar.",
    preco: 14,
    categoria: "Bebidas"
  },
  {
    id: 13,
    nome: "Guarana",
    descricao: "Refrigerante gelado e refrescante.",
    preco: 6,
    categoria: "Bebidas"
  },
  {
    id: 14,
    nome: "Fanta Uva",
    descricao: "Refrigerante sabor uva servido bem gelado.",
    preco: 6,
    categoria: "Bebidas"
  },
  {
    id: 15,
    nome: "Agua",
    descricao: "Agua mineral gelada.",
    preco: 3,
    categoria: "Bebidas"
  }
];

const paymentOptions = ["Dinheiro", "Pix", "Cartao de Debito", "Cartao de Credito"];
const neutralIcons = ["assets/icons/icon-neutro1.png", "assets/icons/icon-neutro2.png"];

const state = {
  category: "Todos",
  search: "",
  paymentMethod: "Dinheiro",
  pixVisible: false,
  order: [],
  currentItemId: null,
  editingIndex: null,
  quantity: 1
};

const refs = {
  categoryChips: document.getElementById("categoryChips"),
  cardapioGrid: document.getElementById("cardapioGrid"),
  listaPedido: document.getElementById("listaPedido"),
  subtotalValue: document.getElementById("subtotalValue"),
  totalValue: document.getElementById("totalValue"),
  trocoBox: document.getElementById("trocoBox"),
  dinheiroInput: document.getElementById("dinheiroInput"),
  mesaInput: document.getElementById("mesaInput"),
  garcomInput: document.getElementById("garcomInput"),
  resumoMesa: document.getElementById("resumoMesa"),
  resumoGarcom: document.getElementById("resumoGarcom"),
  searchInput: document.getElementById("searchInput"),
  resetFiltersBtn: document.getElementById("resetFiltersBtn"),
  newOrderBtn: document.getElementById("newOrderBtn"),
  finalizarBtn: document.getElementById("finalizarBtn"),
  paymentMethods: document.getElementById("paymentMethods"),
  pixCard: document.getElementById("pixCard"),
  showPixBtn: document.getElementById("showPixBtn"),
  pixAmountValue: document.getElementById("pixAmountValue"),
  pixInline: document.getElementById("pixInline"),
  decisionDialog: document.getElementById("decisionDialog"),
  closeDecisionDialogBtn: document.getElementById("closeDecisionDialogBtn"),
  decisionTotalValue: document.getElementById("decisionTotalValue"),
  decisionNewOrderBtn: document.getElementById("decisionNewOrderBtn"),
  decisionPrintBtn: document.getElementById("decisionPrintBtn"),
  itemDialog: document.getElementById("itemDialog"),
  dialogNome: document.getElementById("dialogNome"),
  dialogDescricao: document.getElementById("dialogDescricao"),
  dialogPreco: document.getElementById("dialogPreco"),
  dialogQtd: document.getElementById("dialogQtd"),
  dialogForm: document.getElementById("dialogForm"),
  closeDialogBtn: document.getElementById("closeDialogBtn"),
  decreaseQtyBtn: document.getElementById("decreaseQtyBtn"),
  increaseQtyBtn: document.getElementById("increaseQtyBtn")
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

function updateHeaderMeta() {
  refs.resumoMesa.textContent = refs.mesaInput.value.trim() || "Nao informada";
  refs.resumoGarcom.textContent = refs.garcomInput.value.trim() || "Nao informado";
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

  items.forEach((item) => {
    const iconPath = neutralIcons[Math.floor(Math.random() * neutralIcons.length)];
    const article = document.createElement("article");
    article.className = "product-card";
    article.innerHTML = `
      <div class="product-card__media">
        <img src="${iconPath}" alt="${item.nome}">
      </div>
      <div class="product-card__top">
        <div>
          <span class="product-card__tag">${item.categoria}</span>
          <h3>${item.nome}</h3>
        </div>
      </div>
      <p>${item.descricao}</p>
      <div class="product-card__bottom">
        <div class="price">${currency(item.preco)}</div>
        <button class="product-card__button" type="button">Adicionar</button>
      </div>
    `;

    article.querySelector(".product-card__button").addEventListener("click", () => openDialog(item.id));
    refs.cardapioGrid.appendChild(article);
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
  const formattedTotal = currency(total);
  const isPix = state.paymentMethod === "Pix";

  refs.pixCard.hidden = !isPix;
  refs.pixAmountValue.textContent = formattedTotal;
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
          <p>Escolha itens no cardapio para comecar a venda.</p>
        </div>
      </div>
    `;
  } else {
    state.order.forEach((item, index) => {
      const orderItem = document.createElement("div");
      orderItem.className = "order-item";
      orderItem.innerHTML = `
        <div class="order-item__top">
          <div>
            <div class="order-item__name">${item.qtd}x ${item.nome}</div>
          </div>
          <strong>${currency(item.preco * item.qtd)}</strong>
        </div>
        <div class="order-item__footer">
          <span>${currency(item.preco)} por unidade</span>
          <div class="order-item__actions">
            <button class="action-edit" type="button">Editar</button>
            <button class="action-remove" type="button">Remover</button>
          </div>
        </div>
      `;

      const [editButton, removeButton] = orderItem.querySelectorAll("button");
      editButton.addEventListener("click", () => openDialog(item.id, index));
      removeButton.addEventListener("click", () => {
        state.order.splice(index, 1);
        renderOrder();
      });
      refs.listaPedido.appendChild(orderItem);
    });
  }

  const total = getOrderTotal();
  refs.subtotalValue.textContent = currency(total);
  refs.totalValue.textContent = currency(total);
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

  const change = valuePaid - total;

  if (valuePaid <= 0) {
    refs.trocoBox.textContent = "Troco: R$ 0,00";
    return;
  }

  refs.trocoBox.textContent =
    change >= 0 ? `Troco: ${currency(change)}` : `Faltam ${currency(Math.abs(change))}`;
}

function openDialog(itemId, editingIndex = null) {
  const item = menuItems.find((menuItem) => menuItem.id === itemId);
  if (!item) {
    return;
  }

  state.currentItemId = itemId;
  state.editingIndex = editingIndex;

  if (editingIndex !== null) {
    state.quantity = state.order[editingIndex].qtd;
  } else {
    state.quantity = 1;
  }

  refs.dialogNome.textContent = item.nome;
  refs.dialogDescricao.textContent = item.descricao;
  refs.dialogPreco.textContent = currency(item.preco);
  refs.dialogQtd.textContent = state.quantity;

  refs.itemDialog.showModal();
}

function closeDialog() {
  refs.itemDialog.close();
  state.currentItemId = null;
  state.editingIndex = null;
  state.quantity = 1;
  refs.dialogForm.reset();
}

function confirmDialog(event) {
  event.preventDefault();

  const item = getCurrentItem();
  if (!item) {
    closeDialog();
    return;
  }

  const payload = {
    id: item.id,
    nome: item.nome,
    preco: item.preco,
    qtd: state.quantity
  };

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
  refs.dinheiroInput.value = "";
  refs.mesaInput.value = "";
  refs.garcomInput.value = "";
  updateHeaderMeta();
  renderPaymentMethods();
  renderOrder();
}

function printReceipt() {
  const total = getOrderTotal();
  const mesa = refs.mesaInput.value.trim() || "Balcao";
  const garcom = refs.garcomInput.value.trim() || "Nao informado";
  const payment = state.paymentMethod;
  const valuePaid = Number(refs.dinheiroInput.value) || 0;
  const changeText =
    payment === "Dinheiro" ? `Troco: ${currency(Math.max(valuePaid - total, 0))}` : "Troco: nao se aplica";
  const dateTime = new Date().toLocaleString("pt-BR");

  const lines = state.order.map((item) => `${item.qtd}x ${item.nome} - ${currency(item.preco * item.qtd)}`).join("\n");

  const receiptWindow = window.open("", "_blank", "width=380,height=640");
  if (!receiptWindow) {
    alert("Nao foi possivel abrir a janela de impressao.");
    return;
  }

  receiptWindow.document.write(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <title>Comprovante</title>
      <style>
        @page {
          size: 58mm auto;
          margin: 2mm;
        }

        * {
          box-sizing: border-box;
        }

        body {
          width: 54mm;
          margin: 0 auto;
          padding: 2mm 1.5mm;
          font-family: Arial, sans-serif;
          color: #1f130d;
          background: #fff;
        }

        h1 {
          margin: 0 0 6px;
          font-size: 14px;
          text-align: center;
        }

        pre {
          white-space: pre-wrap;
          font-family: Consolas, monospace;
          line-height: 1.35;
          font-size: 10px;
          margin: 0;
          word-break: break-word;
        }
      </style>
    </head>
    <body onload="window.print(); window.close();">
      <h1>Barraca Sao Francisco de Assis</h1>
      <pre>
Data: ${dateTime}
Mesa: ${mesa}
Atendente: ${garcom}
Pagamento: ${payment}
-----------------------------
${lines}
-----------------------------
Total: ${currency(total)}
${payment === "Dinheiro" ? `Recebido: ${currency(valuePaid)}\n${changeText}` : ""}
      </pre>
    </body>
    </html>
  `);
  receiptWindow.document.close();
}

function finalizeOrder() {
  if (state.order.length === 0) {
    alert("Adicione itens antes de finalizar o pedido.");
    return;
  }

  if (state.paymentMethod === "Dinheiro" && (Number(refs.dinheiroInput.value) || 0) < getOrderTotal()) {
    alert("O valor recebido ainda nao cobre o total do pedido.");
    return;
  }

  refs.decisionTotalValue.textContent = currency(getOrderTotal());
  refs.decisionDialog.showModal();
}

function closeDecisionDialog() {
  refs.decisionDialog.close();
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
refs.newOrderBtn.addEventListener("click", newOrder);
refs.finalizarBtn.addEventListener("click", finalizeOrder);
refs.dinheiroInput.addEventListener("input", updateChange);
refs.mesaInput.addEventListener("input", updateHeaderMeta);
refs.garcomInput.addEventListener("input", updateHeaderMeta);
refs.showPixBtn.addEventListener("click", togglePixCode);
refs.closeDecisionDialogBtn.addEventListener("click", closeDecisionDialog);
refs.decisionPrintBtn.addEventListener("click", confirmPrint);
refs.decisionNewOrderBtn.addEventListener("click", confirmNewOrderOnly);

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
  const dialogDimensions = refs.itemDialog.getBoundingClientRect();
  const clickedOutside =
    event.clientX < dialogDimensions.left ||
    event.clientX > dialogDimensions.right ||
    event.clientY < dialogDimensions.top ||
    event.clientY > dialogDimensions.bottom;

  if (clickedOutside) {
    closeDialog();
  }
});

refs.decisionDialog.addEventListener("click", (event) => {
  const dialogDimensions = refs.decisionDialog.getBoundingClientRect();
  const clickedOutside =
    event.clientX < dialogDimensions.left ||
    event.clientX > dialogDimensions.right ||
    event.clientY < dialogDimensions.top ||
    event.clientY > dialogDimensions.bottom;

  if (clickedOutside) {
    closeDecisionDialog();
  }
});

updateHeaderMeta();
renderCategoryChips();
renderMenu();
renderPaymentMethods();
renderOrder();
