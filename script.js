//Dark mode
const toggle = document.getElementById("theme-toggle");
toggle.addEventListener("click", () => {
  const dark = document.body.classList.toggle("dark-mode");
  toggle.textContent = dark ? "Light Mode" : "Dark Mode";
});

//Filterable project list
const projects = [
  { title: "FieldCheck", description: "Weather app for Sport Coaches", category: "Python" },
  { title: "Shuttle", description: "Shuttle Tracker App", category: "Java" },
  { title: "Hurricane Prediction", description: "Predicts hurricanes.", category: "Java" },
  { title: "Wedding Planner", description: "App for planning weddings.", category: "Java" },
  { title: "BridgeIT", description: "An extension for the Blackstone website.", category: "Team" }
];

const state = { searchText: "", category: "All" };
const list = document.getElementById("project-list");
const count = document.getElementById("project-count");
const buttons = document.getElementById("filter-buttons");

function render() {
  const shown = projects.filter(project =>
    (state.category === "All" || project.category === state.category) &&
    `${project.title} ${project.description} ${project.category}`.toLowerCase().includes(state.searchText.toLowerCase())
  );

  list.innerHTML = "";
  for (const project of shown) {
    const li = document.createElement("li");
    li.textContent = `${project.title} (${project.category}) — ${project.description}`;
    list.append(li);
  }

  // Highlight the active category button
  buttons.querySelectorAll("button").forEach(button =>
    button.classList.toggle("active", button.dataset.category === state.category)
  );
}

document.getElementById("project-search").addEventListener("input", event => {
  state.searchText = event.target.value.trim();
  render();
});

buttons.addEventListener("click", event => {
  const button1 = event.target.closest("button");
  if (!button1) return;
  //When you click the active button again goes back to "All"
  const clicked = button1.dataset.category;
  state.category = state.category === clicked ? "All" : clicked;
  render();
});

render();

//Contact form
const form = document.getElementById("contact-form");
const error = document.getElementById("form-error");
const summary = document.getElementById("form-summary");

form.addEventListener("submit", async event => {
  event.preventDefault();
  const { name, email, message } = Object.fromEntries(new FormData(form));

  const problem =
    !name.trim() ? "Please enter your name." :
    !/^\S+@\S+\.\S+$/.test(email.trim()) ? "Please enter a valid email." :
    message.trim().length < 10 ? "Message must be at least 10 characters." : "";

  error.textContent = problem;
  summary.textContent = "";
  if (problem) return;

  // uses the Formspree API to send the form data
  try {
    const res = await fetch(form.action, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(form)
    });
    if (!res.ok) throw new Error("Request failed");
    summary.textContent = `Thanks, ${name.trim()}! We'll reply to ${email.trim()}.`;
    form.reset();
  } catch {
    error.textContent = "Couldn't send. Try again later.";
  }
});
