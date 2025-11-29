// Simple data - you can edit/add your own prompts here
const prompts = [
  {
    id: 1,
    title: "Social Media Caption Assistant",
    category: "Marketing",
    tags: ["social-media", "instagram", "car-dealership"],
    prompt: "You are a social media copywriter for a car dealership. Write 5 short, engaging caption options for a new car delivery post. Keep tone friendly and professional. Use simple English and add 2–3 relevant hashtags."
  },
  {
    id: 2,
    title: "Code Explainer",
    category: "Programming",
    tags: ["coding", "explain-code"],
    prompt: "Explain the following code step-by-step like I am a beginner. Then suggest one improvement: ```<paste code here>```"
  },
  {
    id: 3,
    title: "Study Notes Generator",
    category: "Learning",
    tags: ["notes", "students"],
    prompt: "Convert the following text into clear bullet-point notes. Add headings, subheadings, and one simple example for each main idea."
  }
];

const promptsContainer = document.getElementById("promptsContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

function renderPrompts(list) {
  promptsContainer.innerHTML = "";

  if (list.length === 0) {
    promptsContainer.innerHTML = "<p>No prompts found.</p>";
    return;
  }

  list.forEach((p) => {
    const card = document.createElement("article");
    card.className = "prompt-card";

    const tagsText = p.tags.map((t) => `#${t}`).join(" ");

    card.innerHTML = `
      <div class="prompt-header">
        <div class="prompt-title">${p.title}</div>
        <div class="prompt-category">${p.category}</div>
      </div>
      <div class="prompt-tags">${tagsText}</div>
      <div class="prompt-text">${p.prompt}</div>
      <button class="copy-btn" data-id="${p.id}">Copy prompt</button>
    `;

    promptsContainer.appendChild(card);
  });

  // attach copy listeners
  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.getAttribute("data-id"));
      const promptData = prompts.find((p) => p.id === id);
      if (!promptData) return;

      navigator.clipboard
        .writeText(promptData.prompt)
        .then(() => {
          btn.textContent = "Copied!";
          setTimeout(() => (btn.textContent = "Copy prompt"), 1200);
        })
        .catch(() => {
          alert("Could not copy. Copy manually.");
        });
    });
  });
}

function applyFilters() {
  const searchValue = searchInput.value.toLowerCase().trim();
  const categoryValue = categoryFilter.value;

  const filtered = prompts.filter((p) => {
    const inCategory = categoryValue ? p.category === categoryValue : true;
    const inSearch =
      p.title.toLowerCase().includes(searchValue) ||
      p.tags.join(" ").toLowerCase().includes(searchValue);

    return inCategory && inSearch;
  });

  renderPrompts(filtered);
}

// Initial render
renderPrompts(prompts);

// Events
searchInput.addEventListener("input", applyFilters);
categoryFilter.addEventListener("change", applyFilters);

