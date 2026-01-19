// JavaScript do Aplicativo - Deflash Decks

// ==================== FUNÇÃO MD5 (implementação local) ====================
const md5 = (function() {
  function safeAdd(x, y) {
    const lsw = (x & 0xffff) + (y & 0xffff);
    const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xffff);
  }

  function bitRotateLeft(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
  }

  function md5cmn(q, a, b, x, s, t) {
    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
  }

  function md5ff(a, b, c, d, x, s, t) {
    return md5cmn((b & c) | (~b & d), a, b, x, s, t);
  }

  function md5gg(a, b, c, d, x, s, t) {
    return md5cmn((b & d) | (c & ~d), a, b, x, s, t);
  }

  function md5hh(a, b, c, d, x, s, t) {
    return md5cmn(b ^ c ^ d, a, b, x, s, t);
  }

  function md5ii(a, b, c, d, x, s, t) {
    return md5cmn(c ^ (b | ~d), a, b, x, s, t);
  }

  function binlMD5(x, len) {
    x[len >> 5] |= 0x80 << (len % 32);
    x[(((len + 64) >>> 9) << 4) + 14] = len;

    let a = 1732584193;
    let b = -271733879;
    let c = -1732584194;
    let d = 271733878;

    for (let i = 0; i < x.length; i += 16) {
      const olda = a;
      const oldb = b;
      const oldc = c;
      const oldd = d;

      a = md5ff(a, b, c, d, x[i], 7, -680876936);
      d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
      c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
      b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
      a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
      d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
      c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
      b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
      a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
      d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
      c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
      b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
      a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
      d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
      c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
      b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);

      a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
      d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
      c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
      b = md5gg(b, c, d, a, x[i], 20, -373897302);
      a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
      d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
      c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
      b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
      a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
      d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
      c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
      b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
      a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
      d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
      c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
      b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);

      a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
      d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
      c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
      b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
      a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
      d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
      c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
      b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
      a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
      d = md5hh(d, a, b, c, x[i], 11, -358537222);
      c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
      b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
      a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
      d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
      c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
      b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);

      a = md5ii(a, b, c, d, x[i], 6, -198630844);
      d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
      c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
      b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
      a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
      d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
      c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
      b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
      a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
      d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
      c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
      b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
      a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
      d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
      c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
      b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);

      a = safeAdd(a, olda);
      b = safeAdd(b, oldb);
      c = safeAdd(c, oldc);
      d = safeAdd(d, oldd);
    }
    return [a, b, c, d];
  }

  function binl2rstr(input) {
    let output = '';
    for (let i = 0; i < input.length * 32; i += 8) {
      output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xff);
    }
    return output;
  }

  function rstr2binl(input) {
    const output = [];
    output[(input.length >> 2) - 1] = undefined;
    for (let i = 0; i < output.length; i++) {
      output[i] = 0;
    }
    for (let i = 0; i < input.length * 8; i += 8) {
      output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << (i % 32);
    }
    return output;
  }

  function rstrMD5(s) {
    return binl2rstr(binlMD5(rstr2binl(s), s.length * 8));
  }

  function rstr2hex(input) {
    const hexTab = '0123456789abcdef';
    let output = '';
    for (let i = 0; i < input.length; i++) {
      const x = input.charCodeAt(i);
      output += hexTab.charAt((x >>> 4) & 0x0f) + hexTab.charAt(x & 0x0f);
    }
    return output;
  }

  function str2rstrUTF8(input) {
    return unescape(encodeURIComponent(input));
  }

  return function(string) {
    return rstr2hex(rstrMD5(str2rstrUTF8(string)));
  };
})();

// ==================== CONSTANTES DE REPETIÇÃO ESPAÇADA ====================

// Intervalos em milissegundos para cada nível de easeFactor
const EASY_INTERVALS = [
  1 * 24 * 60 * 60 * 1000,      // 0: 1 dia
  7 * 24 * 60 * 60 * 1000,      // 1: 1 semana
  30 * 24 * 60 * 60 * 1000,     // 2: 1 mês
  90 * 24 * 60 * 60 * 1000,     // 3: 3 meses
  180 * 24 * 60 * 60 * 1000,    // 4: 6 meses
  365 * 24 * 60 * 60 * 1000     // 5+: 1 ano
];

// Labels para exibição do intervalo "Fácil"
const EASY_LABELS = ['1 dia', '1 semana', '1 mês', '3 meses', '6 meses', '1 ano'];

// Intervalos fixos para outros botões (em ms)
const AGAIN_INTERVAL = 1 * 60 * 1000;      // 1 minuto
const HARD_INTERVAL = 5 * 60 * 1000;       // 5 minutos
const MEDIUM_INTERVAL = 10 * 60 * 1000;    // 10 minutos

// ==================== GERENCIAMENTO DE DADOS ====================

// Gera ID único para deck
function generateDeckId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

// Gera ID único para carta (MD5 do conteúdo)
function generateCardId(front, back, createdAt) {
  return md5(front + back + createdAt);
}

// Carrega configurações do localStorage
function loadSettings() {
  const saved = localStorage.getItem('settings');
  if (saved) {
    return JSON.parse(saved);
  }
  return {
    darkMode: false,
    notifications: true,
    authorName: ''
  };
}

// Salva configurações no localStorage
function saveSettings(settings) {
  localStorage.setItem('settings', JSON.stringify(settings));
}

// Carrega decks do localStorage (com migração)
function loadDecks() {
  const saved = localStorage.getItem('decks');
  if (saved) {
    const decks = JSON.parse(saved);
    // Migra cartas antigas que não têm os novos campos
    let needsSave = false;
    decks.forEach(deck => {
      deck.cards.forEach(card => {
        if (card.nextReview === undefined) {
          card.nextReview = null;
          card.easeFactor = 0;
          card.lastReview = null;
          needsSave = true;
        }
      });
    });
    if (needsSave) {
      saveDecks(decks);
    }
    return decks;
  }
  return [];
}

// Salva decks no localStorage
function saveDecks(decks) {
  localStorage.setItem('decks', JSON.stringify(decks));
}

// ==================== CRUD DECKS ====================

// Cria um novo deck
function createDeck(name) {
  const decks = loadDecks();
  const newDeck = {
    id: generateDeckId(),
    name: name.trim(),
    createdAt: new Date().toISOString(),
    cards: []
  };
  decks.push(newDeck);
  saveDecks(decks);
  return newDeck;
}

// Atualiza nome do deck
function updateDeck(deckId, newName) {
  const decks = loadDecks();
  const deck = decks.find(d => d.id === deckId);
  if (deck) {
    deck.name = newName.trim();
    saveDecks(decks);
    return true;
  }
  return false;
}

// Exclui um deck
function deleteDeck(deckId) {
  let decks = loadDecks();
  decks = decks.filter(d => d.id !== deckId);
  saveDecks(decks);
}

// Obtém um deck pelo ID
function getDeckById(deckId) {
  const decks = loadDecks();
  return decks.find(d => d.id === deckId);
}

// ==================== CRUD CARTAS ====================

// Adiciona carta a um deck
function addCard(deckId, front, back) {
  const decks = loadDecks();
  const deck = decks.find(d => d.id === deckId);
  if (deck) {
    const settings = loadSettings();
    const createdAt = new Date().toISOString();
    const newCard = {
      id: generateCardId(front, back, createdAt),
      front: front.trim(),
      back: back.trim(),
      author: settings.authorName || 'Anônimo',
      createdAt: createdAt,
      nextReview: null,
      easeFactor: 0,
      lastReview: null
    };
    deck.cards.push(newCard);
    saveDecks(decks);
    return newCard;
  }
  return null;
}

// Atualiza uma carta
function updateCard(deckId, cardId, front, back) {
  const decks = loadDecks();
  const deck = decks.find(d => d.id === deckId);
  if (deck) {
    const cardIndex = deck.cards.findIndex(c => c.id === cardId);
    if (cardIndex !== -1) {
      const card = deck.cards[cardIndex];
      card.front = front.trim();
      card.back = back.trim();
      // Atualiza o ID baseado no novo conteúdo
      card.id = generateCardId(front, back, card.createdAt);
      saveDecks(decks);
      return card;
    }
  }
  return null;
}

// Exclui uma carta
function deleteCard(deckId, cardId) {
  const decks = loadDecks();
  const deck = decks.find(d => d.id === deckId);
  if (deck) {
    deck.cards = deck.cards.filter(c => c.id !== cardId);
    saveDecks(decks);
    return true;
  }
  return false;
}

// ==================== SISTEMA DE REVISÃO ====================

// Obtém cartas disponíveis para revisão
function getCardsForReview(deckId) {
  const deck = getDeckById(deckId);
  if (!deck) return [];

  const now = new Date().getTime();

  // Filtra cartas que precisam ser revisadas
  const cardsToReview = deck.cards.filter(card => {
    if (card.nextReview === null) return true; // Nunca revisada
    return new Date(card.nextReview).getTime() <= now;
  });

  // Separa cartas nunca revisadas das já revisadas
  const neverReviewed = cardsToReview.filter(c => c.nextReview === null);
  const reviewed = cardsToReview.filter(c => c.nextReview !== null);

  // Embaralha as nunca revisadas
  shuffleArray(neverReviewed);

  // Ordena as já revisadas por nextReview (mais antigas primeiro)
  reviewed.sort((a, b) => new Date(a.nextReview) - new Date(b.nextReview));

  // Retorna: primeiro as nunca revisadas (aleatório), depois as já revisadas (por data)
  return [...neverReviewed, ...reviewed];
}

// Embaralha um array (Fisher-Yates)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Obtém próxima revisão mais próxima
function getNextReviewTime(deckId) {
  const deck = getDeckById(deckId);
  if (!deck || deck.cards.length === 0) return null;

  const now = new Date().getTime();
  let nextTime = null;

  deck.cards.forEach(card => {
    if (card.nextReview !== null) {
      const reviewTime = new Date(card.nextReview).getTime();
      if (reviewTime > now) {
        if (nextTime === null || reviewTime < nextTime) {
          nextTime = reviewTime;
        }
      }
    }
  });

  return nextTime;
}

// Formata tempo relativo
function formatRelativeTime(timestamp) {
  const now = new Date().getTime();
  const diff = timestamp - now;

  if (diff < 0) return 'agora';

  const minutes = Math.floor(diff / (60 * 1000));
  const hours = Math.floor(diff / (60 * 60 * 1000));
  const days = Math.floor(diff / (24 * 60 * 60 * 1000));

  if (minutes < 1) return 'menos de 1 minuto';
  if (minutes < 60) return `${minutes} minuto${minutes > 1 ? 's' : ''}`;
  if (hours < 24) return `${hours} hora${hours > 1 ? 's' : ''}`;
  return `${days} dia${days > 1 ? 's' : ''}`;
}

// Atualiza carta após revisão
function updateCardReview(deckId, cardId, difficulty) {
  const decks = loadDecks();
  const deck = decks.find(d => d.id === deckId);
  if (!deck) return null;

  const card = deck.cards.find(c => c.id === cardId);
  if (!card) return null;

  const now = new Date();
  card.lastReview = now.toISOString();

  switch (difficulty) {
    case 'again':
      card.nextReview = new Date(now.getTime() + AGAIN_INTERVAL).toISOString();
      card.easeFactor = 0;
      break;
    case 'hard':
      card.nextReview = new Date(now.getTime() + HARD_INTERVAL).toISOString();
      card.easeFactor = 0;
      break;
    case 'medium':
      card.nextReview = new Date(now.getTime() + MEDIUM_INTERVAL).toISOString();
      card.easeFactor = Math.max(0, (card.easeFactor || 0) - 1);
      break;
    case 'easy':
      const easeIndex = Math.min(card.easeFactor || 0, EASY_INTERVALS.length - 1);
      card.nextReview = new Date(now.getTime() + EASY_INTERVALS[easeIndex]).toISOString();
      card.easeFactor = Math.min((card.easeFactor || 0) + 1, EASY_INTERVALS.length - 1);
      break;
  }

  saveDecks(decks);
  return card;
}

// Obtém o label do intervalo fácil baseado no easeFactor
function getEasyIntervalLabel(easeFactor) {
  const index = Math.min(easeFactor || 0, EASY_LABELS.length - 1);
  return EASY_LABELS[index];
}

// ==================== RENDERIZAÇÃO ====================

// Formata data para exibição
function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

// Renderiza lista de decks
function renderDecks() {
  const decks = loadDecks();
  const container = document.getElementById('decks-container');
  const emptyMessage = document.getElementById('empty-decks');

  if (decks.length === 0) {
    container.innerHTML = '';
    emptyMessage.classList.remove('d-none');
    return;
  }

  emptyMessage.classList.add('d-none');

  container.innerHTML = decks.map(deck => {
    const cardsToReview = getCardsForReview(deck.id).length;
    const reviewBadge = cardsToReview > 0
      ? `<span class="badge bg-primary ms-2">${cardsToReview} para revisar</span>`
      : '';

    return `
    <div class="col-12 col-md-6 col-lg-4">
      <div class="card deck-card" data-deck-id="${deck.id}">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start">
            <div class="deck-info" style="cursor: pointer;" onclick="openDeck('${deck.id}')">
              <h5 class="card-title mb-1">${escapeHtml(deck.name)}${reviewBadge}</h5>
              <p class="text-muted small mb-0">
                <i class="bi bi-card-text"></i> ${deck.cards.length} carta${deck.cards.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div class="dropdown">
              <button class="btn btn-link p-0 text-muted" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-three-dots-vertical"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item" href="#" onclick="openManageCards('${deck.id}'); return false;">
                  <i class="bi bi-card-list me-2"></i>Gerenciar Cartas
                </a></li>
                <li><a class="dropdown-item" href="#" onclick="openExportModal('${deck.id}'); return false;">
                  <i class="bi bi-download me-2"></i>Exportar Cards
                </a></li>
                <li><a class="dropdown-item" href="#" onclick="triggerImport('${deck.id}'); return false;">
                  <i class="bi bi-upload me-2"></i>Importar Cards
                </a></li>
                <li><a class="dropdown-item" href="#" onclick="openRenameModal('${deck.id}'); return false;">
                  <i class="bi bi-pencil me-2"></i>Renomear
                </a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item text-danger" href="#" onclick="openDeleteModal('${deck.id}'); return false;">
                  <i class="bi bi-trash me-2"></i>Excluir
                </a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  }).join('');
}

// Renderiza lista de cartas de um deck (gerenciamento)
function renderCards(deckId) {
  const deck = getDeckById(deckId);
  if (!deck) return;

  const container = document.getElementById('cards-container');
  const emptyMessage = document.getElementById('empty-cards');
  const countElement = document.getElementById('cards-count');

  // Atualiza contador
  countElement.textContent = `${deck.cards.length} carta${deck.cards.length !== 1 ? 's' : ''}`;

  if (deck.cards.length === 0) {
    container.innerHTML = '';
    emptyMessage.classList.remove('d-none');
    return;
  }

  emptyMessage.classList.add('d-none');

  container.innerHTML = deck.cards.map(card => `
    <div class="card card-item mb-3" data-card-id="${card.id}">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-start">
          <div class="flex-grow-1">
            <div class="card-front mb-2">
              <strong>Frente:</strong> ${escapeHtml(card.front)}
            </div>
            <div class="card-back text-muted mb-2">
              <strong>Traseira:</strong> ${escapeHtml(card.back)}
            </div>
            <small class="text-muted">
              <i class="bi bi-person"></i> ${escapeHtml(card.author)} |
              <i class="bi bi-calendar"></i> ${formatDate(card.createdAt)}
              ${card.nextReview ? `| <i class="bi bi-clock"></i> Próx: ${formatDate(card.nextReview)}` : ''}
            </small>
          </div>
          <div class="card-actions">
            <button class="btn btn-link btn-sm p-1 text-muted" onclick="editCard('${deckId}', '${card.id}')" title="Editar">
              <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-link btn-sm p-1 text-danger" onclick="confirmDeleteCard('${deckId}', '${card.id}')" title="Excluir">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// Escapa HTML para prevenir XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ==================== NAVEGAÇÃO ====================

let currentDeckId = null;

// Abre a página de REVISÃO de um deck (clique no deck)
function openDeck(deckId) {
  const deck = getDeckById(deckId);
  if (!deck) return;

  currentDeckId = deckId;
  startReview(deckId);
}

// Abre a página de GERENCIAMENTO de cartas (menu ...)
function openManageCards(deckId) {
  const deck = getDeckById(deckId);
  if (!deck) return;

  currentDeckId = deckId;

  // Atualiza o título
  document.querySelector('#cards-deck-name span').textContent = deck.name;

  // Atualiza info do autor no formulário
  const settings = loadSettings();
  const authorInfo = document.getElementById('card-author-info');
  if (settings.authorName) {
    authorInfo.textContent = `Autor: ${settings.authorName}`;
  } else {
    authorInfo.textContent = 'Configure seu nome em Configurações';
  }

  // Limpa o formulário
  clearCardForm();

  // Renderiza as cartas
  renderCards(deckId);

  // Mostra a página de gerenciamento
  showPage('manage-cards');
}

// Volta para a página de decks
function goBackToDecks() {
  currentDeckId = null;
  clearCardForm();
  showPage('decks');
  renderDecks();
}

// Mostra uma página específica
function showPage(pageName) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => page.classList.add('d-none'));

  const targetPage = document.getElementById(`page-${pageName}`);
  if (targetPage) {
    targetPage.classList.remove('d-none');
  }

  // Atualiza navegação (só para páginas principais)
  const navLinks = document.querySelectorAll('[data-page]');
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-page') === pageName) {
      link.classList.add('active');
    }
  });
}

// ==================== SISTEMA DE REVISÃO (UI) ====================

let reviewSession = {
  deckId: null,
  cards: [],
  currentIndex: 0,
  totalCards: 0
};

// Inicia uma sessão de revisão
function startReview(deckId) {
  const deck = getDeckById(deckId);
  if (!deck) return;

  const cardsToReview = getCardsForReview(deckId);

  // Atualiza título
  document.querySelector('#review-deck-name span').textContent = deck.name;

  // Configura sessão
  reviewSession = {
    deckId: deckId,
    cards: cardsToReview,
    currentIndex: 0,
    totalCards: cardsToReview.length
  };

  // Mostra página de revisão
  showPage('review');

  if (cardsToReview.length === 0) {
    // Sem cartas para revisar
    document.getElementById('review-container').classList.add('d-none');
    document.getElementById('review-complete').classList.add('d-none');
    document.getElementById('no-cards-review').classList.remove('d-none');

    // Mostra quando será a próxima revisão
    const nextTime = getNextReviewTime(deckId);
    const infoEl = document.getElementById('next-review-info');
    if (nextTime) {
      infoEl.textContent = `Próxima carta em ${formatRelativeTime(nextTime)}.`;
    } else if (deck.cards.length === 0) {
      infoEl.textContent = 'Este deck não tem cartas. Adicione cartas pelo menu.';
    } else {
      infoEl.textContent = 'Todas as cartas estão agendadas para mais tarde.';
    }
  } else {
    // Tem cartas para revisar
    document.getElementById('review-container').classList.remove('d-none');
    document.getElementById('review-complete').classList.add('d-none');
    document.getElementById('no-cards-review').classList.add('d-none');

    showCurrentCard();
  }
}

// Mostra a carta atual
function showCurrentCard() {
  if (reviewSession.currentIndex >= reviewSession.cards.length) {
    // Revisão completa
    document.getElementById('review-container').classList.add('d-none');
    document.getElementById('review-complete').classList.remove('d-none');
    return;
  }

  const card = reviewSession.cards[reviewSession.currentIndex];

  // Atualiza progresso
  document.getElementById('review-progress').textContent =
    `${reviewSession.currentIndex + 1} de ${reviewSession.totalCards} cartas`;

  // Mostra frente
  document.querySelector('#review-front .review-text').textContent = card.front;
  document.querySelector('#review-back .review-text').textContent = card.back;

  // Reseta estado visual
  document.getElementById('review-front').classList.remove('d-none');
  document.getElementById('review-back').classList.add('d-none');
  document.getElementById('show-answer-container').classList.remove('d-none');
  document.getElementById('difficulty-buttons').classList.add('d-none');

  // Atualiza label do botão Fácil baseado no easeFactor atual
  document.getElementById('easy-interval').textContent = getEasyIntervalLabel(card.easeFactor || 0);
}

// Mostra a resposta
function showAnswer() {
  document.getElementById('review-back').classList.remove('d-none');
  document.getElementById('show-answer-container').classList.add('d-none');
  document.getElementById('difficulty-buttons').classList.remove('d-none');
}

// Processa resposta de dificuldade
function handleDifficulty(difficulty) {
  const card = reviewSession.cards[reviewSession.currentIndex];

  // Atualiza a carta no banco
  updateCardReview(reviewSession.deckId, card.id, difficulty);

  // Avança para próxima carta
  reviewSession.currentIndex++;
  showCurrentCard();
}

// ==================== FORMULÁRIO DE CARTAS ====================

let editingCardId = null;

// Limpa o formulário de cartas
function clearCardForm() {
  document.getElementById('card-front').value = '';
  document.getElementById('card-back').value = '';
  document.getElementById('edit-card-id').value = '';
  document.getElementById('form-card-title').textContent = 'Adicionar Carta';
  document.getElementById('btnCancelarEdicao').classList.add('d-none');
  editingCardId = null;
}

// Edita uma carta existente
function editCard(deckId, cardId) {
  const deck = getDeckById(deckId);
  if (!deck) return;

  const card = deck.cards.find(c => c.id === cardId);
  if (!card) return;

  editingCardId = cardId;
  document.getElementById('card-front').value = card.front;
  document.getElementById('card-back').value = card.back;
  document.getElementById('edit-card-id').value = cardId;
  document.getElementById('form-card-title').textContent = 'Editar Carta';
  document.getElementById('btnCancelarEdicao').classList.remove('d-none');

  // Scroll para o formulário
  document.getElementById('card-front').focus();
}

// Salva carta (nova ou editada)
function saveCard() {
  const front = document.getElementById('card-front').value.trim();
  const back = document.getElementById('card-back').value.trim();

  if (!front || !back) {
    showAviso('Preencha a frente e a traseira da carta.');
    return;
  }

  if (!currentDeckId) return;

  if (editingCardId) {
    // Atualiza carta existente
    updateCard(currentDeckId, editingCardId, front, back);
  } else {
    // Adiciona nova carta
    addCard(currentDeckId, front, back);
  }

  clearCardForm();
  renderCards(currentDeckId);
}

// Confirma exclusão de carta
function confirmDeleteCard(deckId, cardId) {
  if (confirm('Tem certeza que deseja excluir esta carta?')) {
    deleteCard(deckId, cardId);
    renderCards(deckId);
  }
}

// ==================== MODAIS ====================

// Abre modal de renomear deck
function openRenameModal(deckId) {
  const deck = getDeckById(deckId);
  if (!deck) return;

  document.getElementById('renameDeckId').value = deckId;
  document.getElementById('newDeckName').value = deck.name;

  const modal = new bootstrap.Modal(document.getElementById('modalRenomearDeck'));
  modal.show();
}

// Abre modal de excluir deck
function openDeleteModal(deckId) {
  const deck = getDeckById(deckId);
  if (!deck) return;

  document.getElementById('deleteDeckId').value = deckId;
  document.getElementById('deleteDeckName').textContent = deck.name;

  const modal = new bootstrap.Modal(document.getElementById('modalExcluirDeck'));
  modal.show();
}

// Abre modal de exportar cards
function openExportModal(deckId) {
  const deck = getDeckById(deckId);
  if (!deck) return;

  document.getElementById('exportDeckId').value = deckId;
  document.getElementById('exportDeckName').textContent = deck.name;
  document.getElementById('exportWithoutProgress').checked = true;

  const modal = new bootstrap.Modal(document.getElementById('modalExportarCards'));
  modal.show();
}

// Exporta cards do deck para arquivo JSON
function exportDeckCards(deckId, includeProgress) {
  const deck = getDeckById(deckId);
  if (!deck) return;

  const exportData = {
    deckName: deck.name,
    exportedAt: new Date().toISOString(),
    includesProgress: includeProgress,
    cards: deck.cards.map(card => {
      if (includeProgress) {
        return {
          front: card.front,
          back: card.back,
          author: card.author,
          createdAt: card.createdAt,
          nextReview: card.nextReview,
          easeFactor: card.easeFactor,
          lastReview: card.lastReview
        };
      } else {
        return {
          front: card.front,
          back: card.back,
          author: card.author,
          createdAt: card.createdAt,
          nextReview: null,
          easeFactor: 0,
          lastReview: null
        };
      }
    })
  };

  // Cria o arquivo e faz download
  const jsonString = JSON.stringify(exportData, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `${deck.name.replace(/[^a-zA-Z0-9]/g, '_')}_cards.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ==================== IMPORTAÇÃO DE CARDS ====================

// Gera hash MD5 baseado apenas no conteúdo (front + back)
function getCardContentHash(front, back) {
  return md5(front.trim().toLowerCase() + back.trim().toLowerCase());
}

// Variável para armazenar o deck alvo da importação
let importTargetDeckId = null;

// Abre o seletor de arquivo para importação
function triggerImport(deckId) {
  importTargetDeckId = deckId;
  const fileInput = document.getElementById('importFileInput');
  fileInput.value = ''; // Limpa seleção anterior
  fileInput.click();
}

// Processa o arquivo de importação
function processImportFile(file) {
  if (!importTargetDeckId) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const importData = JSON.parse(e.target.result);

      // Valida estrutura do arquivo
      if (!importData.cards || !Array.isArray(importData.cards)) {
        showImportResult('error', 'Arquivo inválido. Estrutura de cards não encontrada.');
        return;
      }

      // Obtém o deck atual
      const decks = loadDecks();
      const deck = decks.find(d => d.id === importTargetDeckId);
      if (!deck) {
        showImportResult('error', 'Deck não encontrado.');
        return;
      }

      // Cria set de hashes dos cards existentes no deck
      const existingHashes = new Set();
      deck.cards.forEach(card => {
        existingHashes.add(getCardContentHash(card.front, card.back));
      });

      // Filtra cards novos (não duplicados)
      const settings = loadSettings();
      let importedCount = 0;
      let duplicateCount = 0;

      importData.cards.forEach(importCard => {
        // Valida campos obrigatórios
        if (!importCard.front || !importCard.back) {
          return;
        }

        const contentHash = getCardContentHash(importCard.front, importCard.back);

        // Verifica se já existe
        if (existingHashes.has(contentHash)) {
          duplicateCount++;
          return;
        }

        // Card é novo, adiciona ao deck
        const createdAt = importCard.createdAt || new Date().toISOString();
        const newCard = {
          id: generateCardId(importCard.front, importCard.back, createdAt),
          front: importCard.front.trim(),
          back: importCard.back.trim(),
          author: importCard.author || settings.authorName || 'Importado',
          createdAt: createdAt,
          // Usa os valores do arquivo se existirem, senão usa padrão
          nextReview: importCard.nextReview || null,
          easeFactor: importCard.easeFactor || 0,
          lastReview: importCard.lastReview || null
        };

        deck.cards.push(newCard);
        existingHashes.add(contentHash); // Evita duplicatas dentro do próprio arquivo
        importedCount++;
      });

      // Salva as alterações
      saveDecks(decks);

      // Mostra resultado
      showImportResult('success', null, importedCount, duplicateCount, importData.cards.length);

      // Atualiza a lista de decks
      renderDecks();

    } catch (err) {
      showImportResult('error', 'Erro ao ler o arquivo: ' + err.message);
    }
  };

  reader.readAsText(file);
}

// Mostra o modal com resultado da importação
function showImportResult(type, errorMessage, imported, duplicates, total) {
  const content = document.getElementById('importResultContent');

  if (type === 'error') {
    content.innerHTML = `
      <div class="text-center">
        <i class="bi bi-x-circle text-danger" style="font-size: 3rem;"></i>
        <p class="mt-3 mb-0">${errorMessage}</p>
      </div>
    `;
  } else {
    content.innerHTML = `
      <div class="text-center">
        <i class="bi bi-check-circle text-success" style="font-size: 3rem;"></i>
        <h5 class="mt-3">Importação Concluída</h5>
      </div>
      <div class="mt-3">
        <p class="mb-2"><i class="bi bi-file-earmark-text me-2"></i>Total no arquivo: <strong>${total}</strong> cards</p>
        <p class="mb-2 text-success"><i class="bi bi-plus-circle me-2"></i>Importados: <strong>${imported}</strong> cards novos</p>
        <p class="mb-0 text-muted"><i class="bi bi-copy me-2"></i>Ignorados (duplicados): <strong>${duplicates}</strong> cards</p>
      </div>
    `;
  }

  const modal = new bootstrap.Modal(document.getElementById('modalImportResult'));
  modal.show();
}

// ==================== MODAL DE AVISO ====================

// Exibe modal de aviso (substitui alert)
function showAviso(mensagem) {
  const modalEl = document.getElementById('modalAviso');
  const mensagemEl = document.getElementById('modalAvisoMensagem');

  if (modalEl && mensagemEl) {
    mensagemEl.textContent = mensagem;
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }
}

// ==================== FINANÇAS ====================

// Carrega dados financeiros do localStorage
function loadFinancas() {
  const saved = localStorage.getItem('financas');
  if (saved) {
    return JSON.parse(saved);
  }
  return {
    lancamentos: [],
    planejamento: []
  };
}

// Salva dados financeiros no localStorage
function saveFinancas(data) {
  localStorage.setItem('financas', JSON.stringify(data));
}

// Gera ID único para item financeiro
function generateFinancaId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

// Adiciona lançamento real
function addLancamento(tipo, nome, valor, data) {
  const financas = loadFinancas();
  financas.lancamentos.push({
    id: generateFinancaId(),
    tipo,
    nome: nome.trim(),
    valor: parseFloat(valor),
    data
  });
  saveFinancas(financas);
  renderFinancas();
}

// Adiciona planejamento
function addPlanejamento(tipo, nome, valor, data) {
  const financas = loadFinancas();
  financas.planejamento.push({
    id: generateFinancaId(),
    tipo,
    nome: nome.trim(),
    valor: parseFloat(valor),
    data
  });
  saveFinancas(financas);
  renderFinancas();
}

// Remove lançamento
function deleteLancamento(id) {
  const financas = loadFinancas();
  financas.lancamentos = financas.lancamentos.filter(l => l.id !== id);
  saveFinancas(financas);
  renderFinancas();
}

// Remove planejamento
function deletePlanejamento(id) {
  const financas = loadFinancas();
  financas.planejamento = financas.planejamento.filter(p => p.id !== id);
  saveFinancas(financas);
  renderFinancas();
}

// Calcula indicadores financeiros com filtro de data
function calcularIndicadores(dataInicio, dataFim) {
  const financas = loadFinancas();

  const filtrarPorData = (items) => {
    if (!dataInicio && !dataFim) return items;
    return items.filter(item => {
      const itemData = item.data;
      if (dataInicio && itemData < dataInicio) return false;
      if (dataFim && itemData > dataFim) return false;
      return true;
    });
  };

  const calcular = (items) => {
    const filtrados = filtrarPorData(items);
    let entradas = 0, saidas = 0, saves = 0;
    filtrados.forEach(item => {
      if (item.tipo === 'entrada') entradas += item.valor;
      else if (item.tipo === 'saida') saidas += item.valor;
      else if (item.tipo === 'save') saves += item.valor;
    });
    return { entradas, saidas, saves, saldo: entradas - saidas - saves };
  };

  return {
    real: calcular(financas.lancamentos),
    planejado: calcular(financas.planejamento)
  };
}

// ==================== EXPORT/IMPORT FINANÇAS ====================

// Exporta dados financeiros para JSON
function exportFinancas() {
  const financas = loadFinancas();

  const exportData = {
    exportedAt: new Date().toISOString(),
    type: 'deflash-financas',
    lancamentos: financas.lancamentos,
    planejamento: financas.planejamento
  };

  const jsonString = JSON.stringify(exportData, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `financas_${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Importa dados financeiros de JSON
function importFinancas(file) {
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const importData = JSON.parse(e.target.result);

      // Valida estrutura
      if (importData.type !== 'deflash-financas' ||
          !Array.isArray(importData.lancamentos) ||
          !Array.isArray(importData.planejamento)) {
        showAviso('Arquivo inválido. Use um arquivo exportado pelo Deflash.');
        return;
      }

      const financas = loadFinancas();

      // Função para verificar duplicatas por hash do conteúdo
      const getItemHash = (item) => md5(item.tipo + item.nome + item.valor + item.data);

      // Importa lançamentos
      const existingLancHashes = new Set(financas.lancamentos.map(getItemHash));
      let lancImportados = 0;
      importData.lancamentos.forEach(item => {
        if (!existingLancHashes.has(getItemHash(item))) {
          financas.lancamentos.push({
            id: generateFinancaId(),
            tipo: item.tipo,
            nome: item.nome,
            valor: item.valor,
            data: item.data
          });
          existingLancHashes.add(getItemHash(item));
          lancImportados++;
        }
      });

      // Importa planejamento
      const existingPlanHashes = new Set(financas.planejamento.map(getItemHash));
      let planImportados = 0;
      importData.planejamento.forEach(item => {
        if (!existingPlanHashes.has(getItemHash(item))) {
          financas.planejamento.push({
            id: generateFinancaId(),
            tipo: item.tipo,
            nome: item.nome,
            valor: item.valor,
            data: item.data
          });
          existingPlanHashes.add(getItemHash(item));
          planImportados++;
        }
      });

      saveFinancas(financas);
      renderFinancas();

      showImportFinancasResult(lancImportados, planImportados,
        importData.lancamentos.length, importData.planejamento.length);

    } catch (err) {
      showAviso('Erro ao ler arquivo: ' + err.message);
    }
  };
  reader.readAsText(file);
}

// Mostra resultado da importação de finanças
function showImportFinancasResult(lancImportados, planImportados, totalLanc, totalPlan) {
  const content = document.getElementById('importResultContent');
  content.innerHTML = `
    <div class="text-center">
      <i class="bi bi-check-circle text-success" style="font-size: 3rem;"></i>
      <h5 class="mt-3">Importação Concluída</h5>
    </div>
    <div class="mt-3">
      <p class="mb-2"><strong>Lançamentos:</strong></p>
      <p class="mb-1 text-success"><i class="bi bi-plus-circle me-2"></i>Importados: ${lancImportados} de ${totalLanc}</p>
      <p class="mb-2 text-muted"><i class="bi bi-copy me-2"></i>Duplicados ignorados: ${totalLanc - lancImportados}</p>
      <p class="mb-2"><strong>Planejamento:</strong></p>
      <p class="mb-1 text-success"><i class="bi bi-plus-circle me-2"></i>Importados: ${planImportados} de ${totalPlan}</p>
      <p class="mb-0 text-muted"><i class="bi bi-copy me-2"></i>Duplicados ignorados: ${totalPlan - planImportados}</p>
    </div>
  `;
  const modal = new bootstrap.Modal(document.getElementById('modalImportResult'));
  modal.show();
}

// Renderiza lista de itens financeiros agrupada por tipo
function renderListaFinancas(containerId, items, tipo) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const entradas = items.filter(i => i.tipo === 'entrada').sort((a, b) => new Date(b.data) - new Date(a.data));
  const saidas = items.filter(i => i.tipo === 'saida').sort((a, b) => new Date(b.data) - new Date(a.data));
  const saves = items.filter(i => i.tipo === 'save').sort((a, b) => new Date(b.data) - new Date(a.data));

  const deleteFunc = tipo === 'lancamento' ? 'deleteLancamento' : 'deletePlanejamento';

  const renderGrupo = (titulo, lista, corTexto, corBg) => {
    if (lista.length === 0) return '';
    return `
      <div class="financas-grupo">
        <h6 class="${corTexto}"><i class="bi bi-chevron-down"></i> ${titulo}</h6>
        ${lista.map(item => `
          <div class="financas-item d-flex justify-content-between align-items-center">
            <div class="item-nome">
              ${escapeHtml(item.nome)}
              <span class="item-data text-muted d-block">${formatarDataFinanca(item.data)}</span>
            </div>
            <div class="item-valor ${corTexto}">
              R$ ${item.valor.toFixed(2)}
              <button class="btn btn-link btn-sm text-danger p-0 ms-2" onclick="${deleteFunc}('${item.id}')" title="Excluir">
                <i class="bi bi-x-lg"></i>
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  };

  container.innerHTML =
    renderGrupo('Entradas', entradas, 'text-success') +
    renderGrupo('Saídas', saidas, 'text-danger') +
    renderGrupo('Investimento/Save', saves, 'text-primary');

  if (items.length === 0) {
    container.innerHTML = '<p class="text-muted text-center small">Nenhum registro.</p>';
  }
}

// Formata data para exibição em finanças
function formatarDataFinanca(dataStr) {
  const data = new Date(dataStr + 'T00:00:00');
  return data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

// Renderiza indicadores
function renderIndicadores(ind) {
  const container = document.getElementById('indicadores-container');
  if (!container) return;

  container.innerHTML = `
    <div class="col-6 col-md-3">
      <div class="card indicador-card">
        <div class="card-body text-center">
          <small class="text-muted">Saldo Real</small>
          <h4 class="${ind.real.saldo >= 0 ? 'text-success' : 'text-danger'}">
            R$ ${ind.real.saldo.toFixed(2)}
          </h4>
        </div>
      </div>
    </div>
    <div class="col-6 col-md-3">
      <div class="card indicador-card">
        <div class="card-body text-center">
          <small class="text-muted">Saldo Planejado</small>
          <h4 class="${ind.planejado.saldo >= 0 ? 'text-success' : 'text-danger'}">
            R$ ${ind.planejado.saldo.toFixed(2)}
          </h4>
        </div>
      </div>
    </div>
    <div class="col-6 col-md-3">
      <div class="card indicador-card">
        <div class="card-body text-center">
          <small class="text-muted">Guardado (Real)</small>
          <h4 class="text-primary">R$ ${ind.real.saves.toFixed(2)}</h4>
        </div>
      </div>
    </div>
    <div class="col-6 col-md-3">
      <div class="card indicador-card">
        <div class="card-body text-center">
          <small class="text-muted">Guardado (Plan.)</small>
          <h4 class="text-primary">R$ ${ind.planejado.saves.toFixed(2)}</h4>
        </div>
      </div>
    </div>
  `;
}

// Renderiza página de finanças completa
function renderFinancas() {
  const financas = loadFinancas();

  // Obtém filtros de data
  const dataInicio = document.getElementById('filtro-data-inicio')?.value || null;
  const dataFim = document.getElementById('filtro-data-fim')?.value || null;

  const indicadores = calcularIndicadores(dataInicio, dataFim);

  // Renderiza lançamentos reais
  renderListaFinancas('lancamentos-lista', financas.lancamentos, 'lancamento');

  // Renderiza planejamento
  renderListaFinancas('planejamento-lista', financas.planejamento, 'planejamento');

  // Renderiza indicadores
  renderIndicadores(indicadores);
}

// Inicializa filtros de data com mês atual
function initFiltrosData() {
  const hoje = new Date();
  const primeiroDia = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
  const ultimoDia = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);

  const formatDate = (d) => d.toISOString().split('T')[0];

  const filtroInicio = document.getElementById('filtro-data-inicio');
  const filtroFim = document.getElementById('filtro-data-fim');

  if (filtroInicio) filtroInicio.value = formatDate(primeiroDia);
  if (filtroFim) filtroFim.value = formatDate(ultimoDia);
}

// ==================== INICIALIZAÇÃO ====================

document.addEventListener('DOMContentLoaded', () => {
  // Carrega configurações
  const settings = loadSettings();

  // Navegação entre páginas
  const navLinks = document.querySelectorAll('[data-page]');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetPage = link.getAttribute('data-page');
      showPage(targetPage);

      if (targetPage === 'decks') {
        renderDecks();
      }

      if (targetPage === 'financas') {
        initFiltrosData();
        renderFinancas();
      }

      // Fecha o menu mobile se estiver aberto
      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse.classList.contains('show')) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
        bsCollapse.hide();
      }
    });
  });

  // Clique no logo/brand volta para decks
  const navBrand = document.getElementById('navBrand');
  if (navBrand) {
    navBrand.addEventListener('click', (e) => {
      e.preventDefault();
      goBackToDecks();
    });
  }

  // Botão voltar na página de gerenciamento
  const btnVoltarDecks = document.getElementById('btnVoltarDecks');
  if (btnVoltarDecks) {
    btnVoltarDecks.addEventListener('click', goBackToDecks);
  }

  // Botões voltar na página de revisão
  const btnVoltarReview = document.getElementById('btnVoltarReview');
  if (btnVoltarReview) {
    btnVoltarReview.addEventListener('click', goBackToDecks);
  }

  const btnVoltarAposRevisao = document.getElementById('btnVoltarAposRevisao');
  if (btnVoltarAposRevisao) {
    btnVoltarAposRevisao.addEventListener('click', goBackToDecks);
  }

  const btnVoltarSemCartas = document.getElementById('btnVoltarSemCartas');
  if (btnVoltarSemCartas) {
    btnVoltarSemCartas.addEventListener('click', goBackToDecks);
  }

  // Botão mostrar resposta
  const btnShowAnswer = document.getElementById('btnShowAnswer');
  if (btnShowAnswer) {
    btnShowAnswer.addEventListener('click', showAnswer);
  }

  // Botões de dificuldade
  const difficultyButtons = document.querySelectorAll('[data-difficulty]');
  difficultyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      handleDifficulty(btn.getAttribute('data-difficulty'));
    });
  });

  // Criar novo deck
  const btnCriarDeck = document.getElementById('btnCriarDeck');
  if (btnCriarDeck) {
    btnCriarDeck.addEventListener('click', () => {
      const nameInput = document.getElementById('deckName');
      const name = nameInput.value.trim();

      if (!name) {
        showAviso('Digite um nome para o deck.');
        return;
      }

      createDeck(name);
      nameInput.value = '';

      // Fecha o modal
      const modal = bootstrap.Modal.getInstance(document.getElementById('modalNovoDeck'));
      modal.hide();

      // Atualiza a lista
      renderDecks();
    });
  }

  // Confirmar renomear deck
  const btnConfirmarRenomear = document.getElementById('btnConfirmarRenomear');
  if (btnConfirmarRenomear) {
    btnConfirmarRenomear.addEventListener('click', () => {
      const deckId = document.getElementById('renameDeckId').value;
      const newName = document.getElementById('newDeckName').value.trim();

      if (!newName) {
        showAviso('Digite um nome para o deck.');
        return;
      }

      updateDeck(deckId, newName);

      // Fecha o modal
      const modal = bootstrap.Modal.getInstance(document.getElementById('modalRenomearDeck'));
      modal.hide();

      // Atualiza a lista
      renderDecks();
    });
  }

  // Confirmar exclusão de deck
  const btnConfirmarExcluir = document.getElementById('btnConfirmarExcluir');
  if (btnConfirmarExcluir) {
    btnConfirmarExcluir.addEventListener('click', () => {
      const deckId = document.getElementById('deleteDeckId').value;

      deleteDeck(deckId);

      // Fecha o modal
      const modal = bootstrap.Modal.getInstance(document.getElementById('modalExcluirDeck'));
      modal.hide();

      // Atualiza a lista
      renderDecks();
    });
  }

  // Confirmar exportação de cards
  const btnConfirmarExportar = document.getElementById('btnConfirmarExportar');
  if (btnConfirmarExportar) {
    btnConfirmarExportar.addEventListener('click', () => {
      const deckId = document.getElementById('exportDeckId').value;
      const includeProgress = document.getElementById('exportWithProgress').checked;

      exportDeckCards(deckId, includeProgress);

      // Fecha o modal
      const modal = bootstrap.Modal.getInstance(document.getElementById('modalExportarCards'));
      modal.hide();
    });
  }

  // Input de arquivo para importação
  const importFileInput = document.getElementById('importFileInput');
  if (importFileInput) {
    importFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        processImportFile(file);
      }
    });
  }

  // ==================== EVENT LISTENERS FINANÇAS ====================

  // Botão adicionar lançamento
  const btnAddLancamento = document.getElementById('btnAddLancamento');
  if (btnAddLancamento) {
    btnAddLancamento.addEventListener('click', () => {
      const valor = document.getElementById('lancamento-valor').value;
      const tipo = document.getElementById('lancamento-tipo').value;
      const nome = document.getElementById('lancamento-nome').value;
      const data = document.getElementById('lancamento-data').value;

      if (!valor || !nome || !data) {
        showAviso('Preencha todos os campos.');
        return;
      }

      if (parseFloat(valor) <= 0) {
        showAviso('O valor deve ser maior que zero.');
        return;
      }

      addLancamento(tipo, nome, valor, data);

      // Limpa formulário
      document.getElementById('lancamento-valor').value = '';
      document.getElementById('lancamento-nome').value = '';
    });
  }

  // Botão adicionar planejamento
  const btnAddPlanejamento = document.getElementById('btnAddPlanejamento');
  if (btnAddPlanejamento) {
    btnAddPlanejamento.addEventListener('click', () => {
      const valor = document.getElementById('plan-valor').value;
      const tipo = document.getElementById('plan-tipo').value;
      const nome = document.getElementById('plan-nome').value;
      const data = document.getElementById('plan-data').value;

      if (!valor || !nome || !data) {
        showAviso('Preencha todos os campos.');
        return;
      }

      if (parseFloat(valor) <= 0) {
        showAviso('O valor deve ser maior que zero.');
        return;
      }

      addPlanejamento(tipo, nome, valor, data);

      // Limpa formulário
      document.getElementById('plan-valor').value = '';
      document.getElementById('plan-nome').value = '';
    });
  }

  // Define data de hoje como padrão nos calendários de finanças
  const hoje = new Date().toISOString().split('T')[0];
  const lancamentoData = document.getElementById('lancamento-data');
  const planData = document.getElementById('plan-data');
  if (lancamentoData) lancamentoData.value = hoje;
  if (planData) planData.value = hoje;

  // Botão exportar finanças
  const btnExportFinancas = document.getElementById('btnExportFinancas');
  if (btnExportFinancas) {
    btnExportFinancas.addEventListener('click', exportFinancas);
  }

  // Botão importar finanças
  const btnImportFinancas = document.getElementById('btnImportFinancas');
  const importFinancasInput = document.getElementById('importFinancasInput');
  if (btnImportFinancas && importFinancasInput) {
    btnImportFinancas.addEventListener('click', () => {
      importFinancasInput.value = '';
      importFinancasInput.click();
    });

    importFinancasInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        importFinancas(file);
      }
    });
  }

  // Botão filtrar indicadores
  const btnFiltrarIndicadores = document.getElementById('btnFiltrarIndicadores');
  if (btnFiltrarIndicadores) {
    btnFiltrarIndicadores.addEventListener('click', renderFinancas);
  }

  // Salvar carta
  const btnSalvarCarta = document.getElementById('btnSalvarCarta');
  if (btnSalvarCarta) {
    btnSalvarCarta.addEventListener('click', saveCard);
  }

  // Cancelar edição de carta
  const btnCancelarEdicao = document.getElementById('btnCancelarEdicao');
  if (btnCancelarEdicao) {
    btnCancelarEdicao.addEventListener('click', clearCardForm);
  }

  // Toggle modo escuro
  const darkModeToggle = document.getElementById('darkMode');
  if (darkModeToggle) {
    darkModeToggle.checked = settings.darkMode;
    if (settings.darkMode) {
      document.body.classList.add('dark-mode');
    }

    darkModeToggle.addEventListener('change', () => {
      document.body.classList.toggle('dark-mode');
      const currentSettings = loadSettings();
      currentSettings.darkMode = darkModeToggle.checked;
      saveSettings(currentSettings);
    });
  }

  // Notificações toggle
  const notificationsToggle = document.getElementById('notifications');
  if (notificationsToggle) {
    notificationsToggle.checked = settings.notifications;

    notificationsToggle.addEventListener('change', () => {
      const currentSettings = loadSettings();
      currentSettings.notifications = notificationsToggle.checked;
      saveSettings(currentSettings);
    });
  }

  // Nome do autor
  const authorNameInput = document.getElementById('authorName');
  if (authorNameInput) {
    authorNameInput.value = settings.authorName || '';

    authorNameInput.addEventListener('change', () => {
      const currentSettings = loadSettings();
      currentSettings.authorName = authorNameInput.value.trim();
      saveSettings(currentSettings);
    });

    // Também salva quando o usuário sai do campo
    authorNameInput.addEventListener('blur', () => {
      const currentSettings = loadSettings();
      currentSettings.authorName = authorNameInput.value.trim();
      saveSettings(currentSettings);
    });
  }

  // Enter no modal de novo deck
  const deckNameInput = document.getElementById('deckName');
  if (deckNameInput) {
    deckNameInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        btnCriarDeck.click();
      }
    });
  }

  // Enter no modal de renomear
  const newDeckNameInput = document.getElementById('newDeckName');
  if (newDeckNameInput) {
    newDeckNameInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        btnConfirmarRenomear.click();
      }
    });
  }

  // Atalhos de teclado para revisão
  document.addEventListener('keydown', (e) => {
    // Só funciona na página de revisão
    if (document.getElementById('page-review').classList.contains('d-none')) return;

    // Ignora se estiver em um input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    const showAnswerBtn = document.getElementById('show-answer-container');
    const difficultyBtns = document.getElementById('difficulty-buttons');

    if (!showAnswerBtn.classList.contains('d-none')) {
      // Mostrando pergunta - espaço mostra resposta
      if (e.code === 'Space') {
        e.preventDefault();
        showAnswer();
      }
    } else if (!difficultyBtns.classList.contains('d-none')) {
      // Mostrando resposta - teclas 1-4 para dificuldade
      switch (e.key) {
        case '1':
          handleDifficulty('again');
          break;
        case '2':
          handleDifficulty('hard');
          break;
        case '3':
          handleDifficulty('medium');
          break;
        case '4':
          handleDifficulty('easy');
          break;
      }
    }
  });

  // Renderiza os decks iniciais
  renderDecks();

  console.log('Deflash Decks iniciado com sucesso!');
});
