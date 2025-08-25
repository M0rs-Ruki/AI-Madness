sendPrompt() {
  const promptInput = document.getElementById("promptInput");
  const prompt = promptInput?.value.trim();
  if (!prompt) return;

  // Only use ChatGPT, Claude, Gemini
  const enabledModels = this.aiModels.filter(
    (m) => m.enabled && ["chatgpt", "claude", "gemini"].includes(m.id)
  );

  // Show loading in all panels
  enabledModels.forEach((model) => {
    const panel = document.querySelector(`[data-model="${model.id}"]`);
    const body = panel?.querySelector(".panel-body");
    const status = panel?.querySelector(".status");

    if (body && status) {
      status.textContent = "Generating...";
      body.innerHTML = '<div class="empty-state"><p>Generating response...</p></div>';
    }
  });

  // Send prompt to backend
  fetch("/user/prompt", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.answers || !Array.isArray(data.answers)) return;

      // Distribute answers across panels
      enabledModels.forEach((model, idx) => {
        const panel = document.querySelector(`[data-model="${model.id}"]`);
        const body = panel?.querySelector(".panel-body");
        const status = panel?.querySelector(".status");

        if (body && status) {
          // If more answers than panels, split accordingly
          body.innerHTML = `
            <div class="response-content">
              ${data.answers
                .slice(idx, idx + 1) // one answer per panel
                .map((ans) => `<p style="color: var(--foreground); line-height:1.6;">${ans}</p>`)
                .join("")}
            </div>
          `;
          status.textContent = "Complete";
        }
      });
    })
    .catch((err) => {
      console.error("Error fetching AI response:", err);
      enabledModels.forEach((model) => {
        const panel = document.querySelector(`[data-model="${model.id}"]`);
        const status = panel?.querySelector(".status");
        if (status) status.textContent = "Error";
      });
    });

  // Clear input
  if (promptInput) promptInput.value = "";
}
