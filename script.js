// Atualiza data e hora a cada segundo
function atualizarDataHora() {
  const agora = new Date();
  const data = agora.toLocaleDateString('pt-BR');
  const hora = agora.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  const datetimeDiv = document.querySelector('.datetime');
  if (datetimeDiv) {
    datetimeDiv.textContent = `Data: ${data} — Hora: ${hora}`;
  }
}

// Mostrar cardápio e ocultar tela inicial
function mostrarCardapio() {
  document.getElementById('tela-inicial').style.display = 'none';
  document.getElementById('cardapio').style.display = 'flex';
}

atualizarDataHora();
setInterval(atualizarDataHora, 1000);
