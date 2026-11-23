const list = document.querySelector("#starred");

function showMessage(text, role) {
  const message = document.createElement("p");
  message.setAttribute("role", role);
  message.textContent = text;
  list.before(message);
}

fetch("events.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to load events.json: HTTP ${response.status}`);
    }
    return response.json();
  })
  .then((events) => {
    if (!Array.isArray(events)) {
      throw new Error("events.json does not contain an array");
    }
    if (events.length === 0) {
      showMessage("No starred repositories yet.", "status");
      return;
    }
    events.forEach((event) => {
      const item = document.createElement("li");
      item.textContent = `${event.name} — starred ${event.starred}`;
      list.appendChild(item);
    });
  })
  .catch((error) => {
    console.error(error);
    showMessage("Could not load the starred repositories list.", "alert");
  });
