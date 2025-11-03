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

const stateSpan = document.getElementById("issue-state");
const closeButton = document.getElementById("close-button");

const openState =
  '<svg class="octicon octicon-issue-opened mr-1" viewBox="0 0 16 16" width="16" height="16"><path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z"></path></svg> Open';
const closedState =
  '<svg class="octicon octicon-issue-closed mr-1" viewBox="0 0 16 16" width="16" height="16"><path d="M11.28 4.22a.75.75 0 0 1 1.06 1.06L7.53 10.06a.75.75 0 0 1-1.06 0L3.66 7.25a.75.75 0 0 1 1.06-1.06L6.5 7.94l4.78-4.72Z"></path><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Zm0 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Z"></path></svg> Closed';

let isOpen = true;

closeButton.addEventListener("click", function () {
  isOpen = !isOpen;
  if (isOpen) {
    stateSpan.className = "State State--open d-flex flex-items-center";
    stateSpan.innerHTML = openState;
    closeButton.textContent = "Close issue";
    closeButton.classList.remove("btn-primary");
    closeButton.classList.add("btn-danger");
  } else {
    stateSpan.className = "State State--closed d-flex flex-items-center";
    stateSpan.innerHTML = closedState;
    closeButton.textContent = "Reopen issue";
    closeButton.classList.remove("btn-danger");
    closeButton.classList.add("btn-primary");
  }
});

