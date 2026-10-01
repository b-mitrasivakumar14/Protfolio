// ---------- Your content: edit these ----------
const skills = {
  "Programming": ["Python (strong)", "Java (basics)"],
  "Databases": ["MongoDB"],
  "Cybersecurity": ["Security fundamentals", "Networking basics", "Cisco certified (basic)"]
};

const projects = [
  {
    title: "Project name 1",
    description: "One or two lines on what it does and why you built it.",
    stack: "Python",
    link: "https://github.com/your-username/project-1"
  },
  {
    title: "Project name 2",
    description: "Short summary of the problem it solves.",
    stack: "Python, MongoDB",
    link: "https://github.com/your-username/project-2"
  },
  {
    title: "Project name 3",
    description: "What it does and what you learned from it.",
    stack: "Python",
    link: "https://github.com/your-username/project-3"
  }
];

// ---------- Render skills ----------
const skillsEl = document.getElementById("skills-list");
Object.entries(skills).forEach(([group, items]) => {
  const wrap = document.createElement("div");
  const h3 = document.createElement("h3");
  h3.textContent = group;
  const ul = document.createElement("ul");
  ul.className = "chips";
  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    ul.appendChild(li);
  });
  wrap.append(h3, ul);
  skillsEl.appendChild(wrap);
});

// ---------- Render projects ----------
const projectsEl = document.getElementById("project-list");
projects.forEach(p => {
  const card = document.createElement("article");
  card.className = "project";

  const h3 = document.createElement("h3");
  h3.textContent = p.title;

  const desc = document.createElement("p");
  desc.textContent = p.description;

  const stack = document.createElement("p");
  stack.className = "stack";
  stack.textContent = "Built with " + p.stack;

  const a = document.createElement("a");
  a.href = p.link;
  a.target = "_blank";
  a.rel = "noopener";
  a.textContent = "View on GitHub";

  card.append(h3, desc, stack, a);
  projectsEl.appendChild(card);
});

// ---------- Password checker ----------
const pw = document.getElementById("pw");
const bar = document.getElementById("meter-bar");
const result = document.getElementById("pw-result");
const tipsEl = document.getElementById("pw-tips");

const common = ["password", "123456", "qwerty", "admin", "letmein", "welcome", "iloveyou"];

function rate(value) {
  let score = 0;
  const tips = [];

  if (value.length >= 12) score++; else tips.push("Use at least 12 characters.");
  if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score++; else tips.push("Mix upper and lower case letters.");
  if (/\d/.test(value)) score++; else tips.push("Add a number.");
  if (/[^A-Za-z0-9]/.test(value)) score++; else tips.push("Add a symbol such as ! or #.");

  if (common.some(word => value.toLowerCase().includes(word))) {
    score = Math.max(0, score - 2);
    tips.unshift("Avoid common words like 'password'.");
  }
  return { score, tips };
}

pw.addEventListener("input", () => {
  const value = pw.value;
  tipsEl.innerHTML = "";

  if (!value) {
    bar.style.width = "0";
    result.textContent = "Start typing to see a rating.";
    return;
  }

  const { score, tips } = rate(value);
  const levels = [
    { label: "Very weak", color: "var(--weak)" },
    { label: "Weak", color: "var(--weak)" },
    { label: "Fair", color: "var(--ok)" },
    { label: "Good", color: "var(--ok)" },
    { label: "Strong", color: "var(--strong)" }
  ];

  bar.style.width = ((score + 1) / 5) * 100 + "%";
  bar.style.background = levels[score].color;
  result.textContent = levels[score].label;

  tips.forEach(t => {
    const li = document.createElement("li");
    li.textContent = t;
    tipsEl.appendChild(li);
  });
});

// ---------- Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();