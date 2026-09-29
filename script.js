function isolateLatin(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  const re = /[A-Za-z0-9_$.{}[\]:/+#<>=|"'\\-]+/g;
  for (const node of nodes) {
    if (node.parentElement?.closest("pre, code, script, style")) continue;
    const text = node.nodeValue;
    if (!/[A-Za-z]/.test(text)) continue;
    const frag = document.createDocumentFragment();
    let last = 0;
    let changed = false;
    for (const match of text.matchAll(re)) {
      changed = true;
      if (match.index > last) frag.append(text.slice(last, match.index));
      const span = document.createElement("span");
      span.dir = "ltr";
      span.className = "en";
      span.textContent = match[0];
      frag.append(span);
      last = match.index + match[0].length;
    }
    if (!changed) continue;
    if (last < text.length) frag.append(text.slice(last));
    node.parentNode.replaceChild(frag, node);
  }
}

isolateLatin(document.querySelector("main"));

const search = document.querySelector("#q");
const sections = [...document.querySelectorAll("main section")];
const links = [...document.querySelectorAll(".nav a")];

search.addEventListener("input", () => {
  const q = search.value.trim().toLowerCase();
  sections.forEach((section) => {
    const hit = section.textContent.toLowerCase().includes(q);
    section.hidden = q.length > 0 && !hit;
  });
});

document.querySelectorAll("pre").forEach((pre) => {
  const button = document.createElement("button");
  button.className = "copy";
  button.type = "button";
  button.textContent = "کپی";
  const wrap = document.createElement("div");
  wrap.className = "code-wrap";
  pre.parentNode.insertBefore(wrap, pre);
  wrap.append(button, pre);
  button.addEventListener("click", async () => {
    await navigator.clipboard.writeText(pre.innerText);
    button.textContent = "شد";
    setTimeout(() => { button.textContent = "کپی"; }, 1200);
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    links.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
    });
  });
}, { rootMargin: "-20% 0px -70% 0px" });

sections.forEach((section) => observer.observe(section));
