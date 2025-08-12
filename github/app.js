const comments = [];

function renderComments() {
  const container = document.getElementById("comments");
  container.innerHTML = "";
  comments.forEach((c) => {
    const wrapper = document.createElement("div");
    wrapper.className = "comment";
    const header = document.createElement("div");
    header.className = "comment-header";
    header.textContent = `${c.author} commented on ${new Date(c.time).toLocaleString()}`;
    const body = document.createElement("div");
    body.className = "comment-body";
    body.textContent = c.text;
    wrapper.appendChild(header);
    wrapper.appendChild(body);
    container.appendChild(wrapper);
  });
}

document
  .getElementById("comment-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const input = document.getElementById("comment-input");
    const text = input.value.trim();
    if (!text) return;
    comments.push({ text, time: Date.now(), author: "you" });
    input.value = "";
    renderComments();
  });

renderComments();
