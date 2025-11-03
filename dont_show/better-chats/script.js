let posts = [];
let currentPost = null;

async function init() {
  const res = await fetch('posts.json');
  const data = await res.json();
  posts = data.posts;
  if (location.pathname.endsWith('post.html')) {
    const params = new URLSearchParams(location.search);
    const id = parseInt(params.get('id'), 10);
    renderPost(id);
  } else {
    setupIndex();
  }
}

function setupIndex() {
  renderPosts('hot');
  document.querySelectorAll('nav button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderPosts(btn.dataset.sort, document.getElementById('search').value.toLowerCase());
    });
  });
  document.getElementById('search').addEventListener('input', e => {
    const mode = document.querySelector('nav button.active').dataset.sort;
    renderPosts(mode, e.target.value.toLowerCase());
  });
}

function renderPosts(mode, query = '') {
  let sorted = [...posts];
  if (mode === 'new') sorted.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  else sorted.sort((a, b) => b.score - a.score);
  const container = document.getElementById('posts');
  container.innerHTML = '';
  sorted.filter(p => p.title.toLowerCase().includes(query)).forEach(p => {
    const article = document.createElement('article');
    article.className = 'post';
    const votes = document.createElement('div');
    votes.className = 'votes';
    const up = document.createElement('button');
    up.textContent = '▲';
    const score = document.createElement('span');
    score.textContent = getScore(p.id, p.score);
    const down = document.createElement('button');
    down.textContent = '▼';
    up.addEventListener('click', () => vote(p.id, score, 1));
    down.addEventListener('click', () => vote(p.id, score, -1));
    votes.append(up, score, down);
    const content = document.createElement('div');
    content.className = 'content';
    const title = document.createElement('a');
    title.href = `post.html?id=${p.id}`;
    title.className = 'post-title';
    title.textContent = p.title;
    const meta = document.createElement('div');
    meta.className = 'meta';
    meta.textContent = `Posted in r/${p.community} by ${p.author}`;
    const comments = document.createElement('span');
    comments.className = 'comments-count';
    comments.textContent = `${p.comments.length} comments`;
    content.append(title, meta, comments);
    article.append(votes, content);
    container.append(article);
  });
}

function vote(id, elem, delta) {
  const key = `post-${id}-score`;
  let current = parseInt(localStorage.getItem(key)) || 0;
  current += delta;
  localStorage.setItem(key, current);
  const original = posts.find(p => p.id === id).score;
  elem.textContent = original + current;
}

function getScore(id, base) {
  const key = `post-${id}-score`;
  let current = parseInt(localStorage.getItem(key)) || 0;
  return base + current;
}

function renderPost(id) {
  currentPost = posts.find(p => p.id === id);
  if (!currentPost) return;
  const container = document.getElementById('posts');
  const article = document.createElement('article');
  article.className = 'post';
  const votes = document.createElement('div');
  votes.className = 'votes';
  const up = document.createElement('button');
  up.textContent = '▲';
  const score = document.createElement('span');
  score.textContent = getScore(currentPost.id, currentPost.score);
  const down = document.createElement('button');
  down.textContent = '▼';
  up.addEventListener('click', () => vote(currentPost.id, score, 1));
  down.addEventListener('click', () => vote(currentPost.id, score, -1));
  votes.append(up, score, down);
  const content = document.createElement('div');
  content.className = 'content';
  const title = document.createElement('h2');
  title.textContent = currentPost.title;
  const meta = document.createElement('div');
  meta.className = 'meta';
  meta.textContent = `Posted in r/${currentPost.community} by ${currentPost.author}`;
  const body = document.createElement('p');
  body.textContent = currentPost.body;
  content.append(title, meta, body);
  article.append(votes, content);
  container.append(article);
  renderComments();
  setupCommentForm();
}

function renderComments() {
  const id = currentPost.id;
  const container = document.createElement('div');
  container.id = 'comments';
  const list = [...currentPost.comments, ...(JSON.parse(localStorage.getItem(`post-${id}-comments`) || '[]'))];
  list.forEach(c => {
    const item = document.createElement('div');
    item.className = 'comment';
    const votes = document.createElement('div');
    votes.className = 'votes';
    const up = document.createElement('button');
    up.textContent = '▲';
    const score = document.createElement('span');
    score.textContent = c.score;
    const down = document.createElement('button');
    down.textContent = '▼';
    up.addEventListener('click', () => { c.score++; score.textContent = c.score; });
    down.addEventListener('click', () => { c.score--; score.textContent = c.score; });
    votes.append(up, score, down);
    const content = document.createElement('div');
    content.className = 'content';
    const meta = document.createElement('div');
    meta.className = 'meta';
    meta.textContent = `${c.author}`;
    const body = document.createElement('div');
    body.textContent = c.body;
    content.append(meta, body);
    item.append(votes, content);
    container.append(item);
  });
  document.getElementById('posts').append(container);
}

function setupCommentForm() {
  const id = currentPost.id;
  const form = document.createElement('div');
  form.className = 'comment-form';
  form.innerHTML = '<h3>Leave a comment</h3><textarea id="new-comment"></textarea><br/><button id="submit-comment">Submit</button>';
  document.getElementById('posts').append(form);
  document.getElementById('submit-comment').addEventListener('click', () => {
    const text = document.getElementById('new-comment').value.trim();
    if (!text) return;
    const comment = { author: 'you', body: text, timestamp: new Date().toISOString(), score: 0 };
    const stored = JSON.parse(localStorage.getItem(`post-${id}-comments`) || '[]');
    stored.push(comment);
    localStorage.setItem(`post-${id}-comments`, JSON.stringify(stored));
    document.getElementById('new-comment').value = '';
    document.getElementById('comments').remove();
    renderComments();
  });
}

init();
