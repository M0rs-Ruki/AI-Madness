class AIMadnessDashboard {
  constructor() {
    this.sidebarOpen = window.innerWidth > 1024
    this.expandedModel = null
    this.aiModels = [
      { id: "chatgpt", name: "ChatGPT", enabled: true },
      { id: "claude", name: "Claude", enabled: true },
      { id: "gemini", name: "Gemini", enabled: true },
      { id: "perplexity", name: "Perplexity", enabled: false },
      { id: "deepseek", name: "DeepSeek", enabled: false },
    ]

    this.init()
  }

  init() {
    this.bindEvents()
    this.updateLayout()
    this.updatePanelsGrid()
  }

  bindEvents() {
    // Sidebar toggle
    const menuBtn = document.getElementById("menuBtn")
    const closeSidebar = document.getElementById("closeSidebar")
    const sidebar = document.getElementById("sidebar")

    menuBtn?.addEventListener("click", () => this.toggleSidebar())
    closeSidebar?.addEventListener("click", () => this.toggleSidebar())

    // Model toggles
    const switches = document.querySelectorAll('.switch input[type="checkbox"]')
    switches.forEach((switchEl) => {
      switchEl.addEventListener("change", (e) => {
        const modelId = e.target.dataset.model
        this.toggleModel(modelId)
      })
    })

    // Expand buttons
    const expandBtns = document.querySelectorAll(".expand-btn")
    expandBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const modelId = e.target.dataset.model
        this.expandModel(modelId)
      })
    })

    // Send button
    const sendBtn = document.getElementById("sendBtn")
    const promptInput = document.getElementById("promptInput")

    sendBtn?.addEventListener("click", () => this.sendPrompt())
    promptInput?.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.sendPrompt()
      }
    })

    // Window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1024) {
        this.sidebarOpen = true
      } else {
        this.sidebarOpen = false
      }
      this.updateLayout()
    })

    // Chat items
    const chatItems = document.querySelectorAll(".chat-item")
    chatItems.forEach((item) => {
      item.addEventListener("click", () => {
        // Add active state or load chat
        console.log("Chat item clicked:", item.textContent.trim())
      })
    })
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen
    this.updateLayout()
  }

  updateLayout() {
    const sidebar = document.getElementById("sidebar")
    const mainContent = document.querySelector(".main-content")

    if (this.sidebarOpen && window.innerWidth > 1024) {
      sidebar?.classList.remove("hidden")
      mainContent?.classList.remove("full-width")
    } else if (this.sidebarOpen && window.innerWidth <= 1024) {
      sidebar?.classList.add("open")
      sidebar?.classList.remove("hidden")
    } else {
      sidebar?.classList.add("hidden")
      sidebar?.classList.remove("open")
      mainContent?.classList.add("full-width")
    }
  }

  toggleModel(modelId) {
    const model = this.aiModels.find((m) => m.id === modelId)
    if (model) {
      model.enabled = !model.enabled
      this.updatePanelVisibility(modelId, model.enabled)
      this.updatePanelsGrid()
    }
  }

  updatePanelVisibility(modelId, enabled) {
    const panel = document.querySelector(`[data-model="${modelId}"]`)
    if (panel) {
      if (enabled) {
        panel.classList.remove("disabled")
        panel.style.display = "flex"
        // Animate in
        setTimeout(() => {
          panel.style.opacity = "1"
          panel.style.transform = "scale(1)"
        }, 10)
      } else {
        panel.classList.add("disabled")
        // Animate out
        panel.style.opacity = "0.5"
        panel.style.transform = "scale(0.95)"
        setTimeout(() => {
          panel.style.display = "none"
        }, 300)
      }
    }
  }

  expandModel(modelId) {
    const panel = document.querySelector(`[data-model="${modelId}"]`)
    const expandBtn = panel?.querySelector(".expand-btn")

    if (this.expandedModel === modelId) {
      // Minimize
      this.expandedModel = null
      panel?.classList.remove("expanded")
      if (expandBtn) expandBtn.textContent = "Expand"
    } else {
      // Expand
      // First minimize any currently expanded panel
      if (this.expandedModel) {
        const currentExpanded = document.querySelector(`[data-model="${this.expandedModel}"]`)
        const currentBtn = currentExpanded?.querySelector(".expand-btn")
        currentExpanded?.classList.remove("expanded")
        if (currentBtn) currentBtn.textContent = "Expand"
      }

      this.expandedModel = modelId
      panel?.classList.add("expanded")
      if (expandBtn) expandBtn.textContent = "Minimize"
    }

    this.updatePanelsGrid()
  }

  updatePanelsGrid() {
    const grid = document.getElementById("panelsGrid")
    const enabledModels = this.aiModels.filter((model) => model.enabled)

    if (!grid) return

    // Remove all grid classes
    grid.classList.remove("single-column", "two-columns", "three-columns")

    if (this.expandedModel) {
      grid.classList.add("single-column")
    } else if (enabledModels.length === 1) {
      grid.classList.add("single-column")
    } else if (enabledModels.length === 2) {
      grid.classList.add("two-columns")
    } else if (enabledModels.length >= 3) {
      grid.classList.add("three-columns")
    }
  }

  sendPrompt() {
    const promptInput = document.getElementById("promptInput")
    const prompt = promptInput?.value.trim()

    if (!prompt) return

    console.log("Sending prompt:", prompt)

    // Simulate AI responses
    const enabledModels = this.aiModels.filter((model) => model.enabled)
    enabledModels.forEach((model) => {
      this.simulateResponse(model.id, prompt)
    })

    // Clear input
    if (promptInput) promptInput.value = ""
  }

  simulateResponse(modelId, prompt) {
    const panel = document.querySelector(`[data-model="${modelId}"]`)
    const body = panel?.querySelector(".panel-body")
    const status = panel?.querySelector(".status")

    if (!body || !status) return

    // Show loading state
    status.textContent = "Generating..."
    body.innerHTML = '<div class="empty-state"><p>Generating response...</p></div>'

    // Simulate response after delay
    setTimeout(
      () => {
        const responses = [
          `Here's my response to "${prompt}" from ${modelId.toUpperCase()}. This is a simulated response that demonstrates the multi-AI interface functionality.`,
          `Based on your query "${prompt}", I can provide the following insights from ${modelId.toUpperCase()}...`,
          `Analyzing "${prompt}" - ${modelId.toUpperCase()} suggests considering multiple perspectives on this topic.`,
        ]

        const randomResponse = responses[Math.floor(Math.random() * responses.length)]

        body.innerHTML = `
                <div class="response-content">
                    <p style="color: var(--foreground); line-height: 1.6;">${randomResponse}</p>
                </div>
            `
        status.textContent = "Complete"
      },
      Math.random() * 2000 + 1000,
    ) // Random delay between 1-3 seconds
  }
}

// Initialize the dashboard when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new AIMadnessDashboard()
})

// Add some additional interactive features
document.addEventListener("DOMContentLoaded", () => {
  // Add hover effects to action buttons
  const actionBtns = document.querySelectorAll(".action-btn")
  actionBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault()
      const rect = btn.getBoundingClientRect()
      const ripple = document.createElement("div")
      ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(234, 88, 12, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                left: ${e.clientX - rect.left - 10}px;
                top: ${e.clientY - rect.top - 10}px;
                width: 20px;
                height: 20px;
            `

      btn.style.position = "relative"
      btn.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  })

  // Add CSS for ripple animation
  const style = document.createElement("style")
  style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `
  document.head.appendChild(style)
})
