(() => {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  document.documentElement.classList.add("js-enabled");

  const setupHeader = () => {
    const header = document.querySelector("[data-header]");
    if (!header) return;

    const update = () => header.classList.toggle("scrolled", window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
  };

  const setupReveals = () => {
    const elements = document.querySelectorAll(".reveal");
    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    document.documentElement.classList.add("motion-ready");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8%", threshold: 0.08 });

    elements.forEach((element) => observer.observe(element));
  };

  const setupProjectIndicator = () => {
    const output = document.querySelector("[data-section-number]");
    const projects = document.querySelectorAll("[data-project]");
    if (!output || !projects.length || !("IntersectionObserver" in window)) return;

    const visibility = new Map();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => visibility.set(entry.target, entry.intersectionRatio));
      const current = [...projects].sort((a, b) => (visibility.get(b) || 0) - (visibility.get(a) || 0))[0];
      if (current && (visibility.get(current) || 0) > 0) output.textContent = current.dataset.project;
    }, { threshold: [0, 0.15, 0.35, 0.6] });

    projects.forEach((project) => observer.observe(project));
  };

  const setupCitations = () => {
    document.querySelectorAll(".citation-drawer").forEach((drawer) => { drawer.hidden = true; });
    document.querySelectorAll("[data-citation]").forEach((button) => {
      button.addEventListener("click", () => {
        const drawer = document.getElementById(button.dataset.citation);
        if (!drawer) return;

        const willOpen = button.getAttribute("aria-expanded") !== "true";
        document.querySelectorAll("[data-citation]").forEach((otherButton) => {
          const otherDrawer = document.getElementById(otherButton.dataset.citation);
          otherButton.setAttribute("aria-expanded", "false");
          if (otherDrawer) otherDrawer.hidden = true;
        });

        button.setAttribute("aria-expanded", String(willOpen));
        drawer.hidden = !willOpen;
      });
    });
  };

  const riskPresets = {
    balanced: {
      score: 68,
      summary: "Broad US equity is the largest mapped exposure at 45%.",
      volatility: "22.8%",
      var95: "−0.64%",
      expectedShortfall: "−0.73%",
      worstStress: "−7.6%",
      tickers: "SPY / TLT / GLD / XLE / BTC",
      scenario: "RATES RISE SHARPLY",
      note: "Estimated −7.6% impact. Duration and broad-equity exposure move against the portfolio together.",
      exposures: [
        ["Broad US equity", 45],
        ["Long-duration bonds", 25],
        ["Gold defensive", 15]
      ]
    },
    aiHeavy: {
      score: 89,
      summary: "AI mega-cap technology is the largest mapped exposure at 50%.",
      volatility: "27.8%",
      var95: "−0.86%",
      expectedShortfall: "−1.08%",
      worstStress: "−25.0%",
      tickers: "NVDA / TLT / GLD",
      scenario: "AI CAPEX SENTIMENT REVERSES",
      note: "Estimated −25.0% impact. NVDA contributes more than 100% of variance before diversifying offsets.",
      exposures: [
        ["AI mega-cap tech", 50],
        ["Semiconductors", 50],
        ["Long-duration bonds", 30]
      ]
    }
  };

  const setupRiskPresets = () => {
    const buttons = document.querySelectorAll("[data-risk-preset]");
    const ring = document.querySelector("[data-risk-ring]");
    const score = document.querySelector("[data-risk-score]");
    const summary = document.querySelector("[data-risk-summary]");
    const volatility = document.querySelector("[data-risk-vol]");
    const valueAtRisk = document.querySelector("[data-risk-var]");
    const expectedShortfall = document.querySelector("[data-risk-es]");
    const stress = document.querySelector("[data-risk-stress]");
    const source = document.querySelector("[data-risk-source]");
    const bars = document.querySelector("[data-exposure-bars]");
    const scenario = document.querySelector("[data-risk-scenario]");
    const note = document.querySelector("[data-risk-note]");

    if (!buttons.length || !ring || !score || !bars) return;

    const renderBars = (exposures) => {
      const rows = exposures.map(([label, value]) => {
        const row = document.createElement("div");
        const name = document.createElement("span");
        const track = document.createElement("i");
        const number = document.createElement("b");

        name.textContent = label;
        track.style.setProperty("--value", `${value}%`);
        number.textContent = `${value}%`;
        row.append(name, track, number);
        return row;
      });
      bars.replaceChildren(...rows);
    };

    const render = (key) => {
      const preset = riskPresets[key];
      if (!preset) return;

      ring.style.setProperty("--score", preset.score);
      score.textContent = preset.score;
      summary.textContent = preset.summary;
      volatility.textContent = preset.volatility;
      valueAtRisk.textContent = preset.var95;
      expectedShortfall.textContent = preset.expectedShortfall;
      stress.textContent = preset.worstStress;
      source.textContent = preset.tickers;
      scenario.textContent = preset.scenario;
      note.textContent = preset.note;
      renderBars(preset.exposures);

      buttons.forEach((button) => {
        const active = button.dataset.riskPreset === key;
        button.classList.toggle("active", active);
        button.setAttribute("aria-pressed", String(active));
      });
    };

    buttons.forEach((button) => button.addEventListener("click", () => render(button.dataset.riskPreset)));
  };

  const terminalReports = {
    margin: {
      command: "finance-labs margin-cascade --report",
      lines: [
        ["heading", "# Margin Cascade Report"],
        ["plain", ""],
        ["plain", "Rounds simulated          2"],
        ["plain", "Total forced liquidation  $7,142"],
        ["risk", "Systemic risk score        41.35 / 100"],
        ["plain", "Most stressed fund         Beacon"],
        ["plain", ""],
        ["muted", "FINAL PRICE MOVE"],
        ["risk", "ALPHA   100.00 → 73.53     −26.5%"],
        ["plain", "BETA     58.00 → 55.12      −5.0%"],
        ["plain", "GAMMA    35.00 → 32.20      −8.0%"],
        ["plain", ""],
        ["success", "✓ report written to captures/margin-cascade.txt"]
      ]
    },
    covenant: {
      command: "finance-labs covenant-headroom --scenario hard-landing",
      lines: [
        ["heading", "# Covenant Headroom / Hard Landing"],
        ["plain", ""],
        ["plain", "Periods analyzed           4"],
        ["risk", "Total breach periods        4"],
        ["plain", "Tightest headroom           2026-Q4"],
        ["risk", "Worst net leverage          8.62x"],
        ["plain", ""],
        ["muted", "2026-Q4 / BREACHES"],
        ["risk", "net_leverage        8.62x   limit 4.50x"],
        ["risk", "interest_coverage   1.26x   floor 2.00x"],
        ["risk", "liquidity          $12.0m   floor $25.0m"],
        ["plain", ""],
        ["success", "✓ 2 scenarios × 4 periods evaluated"]
      ]
    },
    firewall: {
      command: "finance-labs prompt-firewall scan adversarial.json",
      lines: [
        ["heading", "# PromptFirewall Lab Report"],
        ["plain", ""],
        ["risk", "Severity                   CRITICAL"],
        ["risk", "Score                      100 / 100"],
        ["plain", "Messages analyzed          3"],
        ["plain", ""],
        ["muted", "RANKED FINDINGS"],
        ["risk", "01  instruction_override   high  +35"],
        ["risk", "02  secret_exfiltration    high  +30"],
        ["risk", "03  tool_abuse              high  +30"],
        ["plain", "04  encoded_payload         med   +25"],
        ["plain", "05  external_endpoint       med   +20"],
        ["plain", ""],
        ["success", "✓ preserve hierarchy · gate tools · block secrets"]
      ]
    }
  };

  const setupTerminal = () => {
    const tabs = [...document.querySelectorAll("[data-terminal]")];
    const panel = document.getElementById("terminal-output");
    const command = panel?.querySelector(".terminal-command");
    const pre = panel?.querySelector("[data-terminal-pre]");
    if (!tabs.length || !panel || !command || !pre) return;

    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", tabs[0].id);
    panel.setAttribute("aria-live", "polite");
    panel.tabIndex = 0;

    const renderLines = (lines) => {
      const fragment = document.createDocumentFragment();
      lines.forEach(([type, text], index) => {
        const span = document.createElement("span");
        if (type === "heading") span.className = "term-heading";
        if (type === "muted") span.className = "term-muted";
        if (type === "success") span.className = "term-success";
        if (type === "risk") span.style.color = "var(--risk)";
        span.textContent = text;
        fragment.append(span);
        if (index < lines.length - 1) fragment.append(document.createTextNode("\n"));
      });
      pre.replaceChildren(fragment);
    };

    const select = (tab, moveFocus = false) => {
      const report = terminalReports[tab.dataset.terminal];
      if (!report) return;

      tabs.forEach((item) => {
        const active = item === tab;
        item.setAttribute("aria-selected", String(active));
        item.tabIndex = active ? 0 : -1;
      });
      panel.setAttribute("aria-labelledby", tab.id);
      command.replaceChildren();
      const prompt = document.createElement("span");
      prompt.textContent = "$";
      command.append(prompt, document.createTextNode(` ${report.command}`));
      renderLines(report.lines);
      if (moveFocus) {
        tab.focus();
        if (typeof tab.scrollIntoView === "function") {
          tab.scrollIntoView({ block: "nearest", inline: "nearest" });
        }
      }
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => select(tab));
      tab.addEventListener("keydown", (event) => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        let nextIndex = index;
        if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
        if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
        if (event.key === "Home") nextIndex = 0;
        if (event.key === "End") nextIndex = tabs.length - 1;
        select(tabs[nextIndex], true);
      });
    });
  };

  const setupSystemMap = () => {
    const map = document.querySelector("[data-system-map] svg");
    const wrapper = map?.closest("[data-system-map]");
    if (!map || !wrapper || reducedMotion.matches || !window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    wrapper.addEventListener("pointermove", (event) => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = wrapper.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        map.style.transform = `translate3d(${x * 9}px, ${y * 9}px, 0) rotateX(${y * -2}deg) rotateY(${x * 2}deg)`;
      });
    });

    wrapper.addEventListener("pointerleave", () => {
      map.style.transform = "";
    });
  };

  setupHeader();
  setupReveals();
  setupProjectIndicator();
  setupCitations();
  setupRiskPresets();
  setupTerminal();
  setupSystemMap();
})();
