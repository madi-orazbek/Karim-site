const body = document.body;
const consoleScreen = document.getElementById("consoleScreen");
const hiddenMessageSection = document.getElementById("hiddenMessageSection");
const controlButtons = document.querySelectorAll("[data-effect]");
const revealElements = document.querySelectorAll(".reveal");

const consoleMessages = {
  neon: "Неон активирован: BMW M5 Comp теперь светится так, будто сама ночь решила сделать тюнинг.",
  drift: "Режим дрифта запущен: дым пошёл, стиль поднялся, уважение на парковке выросло до небес.",
  flash: "Сигнал фар отправлен: братский световой привет и +100 к уличной харизме.",
  turbo: "Турбо включено: праздник ускорился, а атмосфера стала быстрее, чем мысли о новой BMW.",
  "hidden-message": "Секретный уровень открыт. Для Kacanz загружено дополнительное поздравление.",
  "ideal-parking": "Режим идеальной парковки активирован: бордюры аплодируют, разметка в восторге, штрафов по-прежнему 0."
};

const bodyModes = [
  "neon-mode",
  "drift-mode",
  "flash-mode",
  "turbo-mode",
  "ideal-parking-mode"
];

function updateConsole(effect) {
  consoleScreen.textContent = consoleMessages[effect] || "Эффект активирован.";
}

function pulseButton(button) {
  button.classList.add("active");
  setTimeout(() => {
    button.classList.remove("active");
  }, 800);
}

function triggerTemporaryMode(modeClass, duration = 2200) {
  body.classList.add(modeClass);
  setTimeout(() => {
    body.classList.remove(modeClass);
  }, duration);
}

function toggleNeonMode() {
  body.classList.toggle("neon-mode");
  const isEnabled = body.classList.contains("neon-mode");

  consoleScreen.textContent = isEnabled
    ? "Неон включён: ночной город официально признал Kacanz королём BMW."
    : "Неон выключен: но стиль всё равно остался на максимуме.";
}

function showHiddenMessage() {
  hiddenMessageSection.classList.add("show");
  hiddenMessageSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function activateEffect(effect, button) {
  pulseButton(button);

  switch (effect) {
    case "neon":
      toggleNeonMode();
      break;

    case "drift":
      updateConsole(effect);
      triggerTemporaryMode("drift-mode", 2600);
      break;

    case "flash":
      updateConsole(effect);
      triggerTemporaryMode("flash-mode", 1800);
      break;

    case "turbo":
      updateConsole(effect);
      triggerTemporaryMode("turbo-mode", 2000);
      break;

    case "hidden-message":
      updateConsole(effect);
      showHiddenMessage();
      break;

    case "ideal-parking":
      updateConsole(effect);
      triggerTemporaryMode("ideal-parking-mode", 2600);
      break;

    default:
      updateConsole(effect);
  }
}

controlButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const effect = button.dataset.effect;
    activateEffect(effect, button);
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.18
  }
);

revealElements.forEach((element) => observer.observe(element));

window.addEventListener("load", () => {
  setTimeout(() => {
    body.classList.add("neon-mode");
    consoleScreen.textContent =
      "Добро пожаловать в birthday mode: сервер ночного города загружен, BMW M5 Comp готова, Kacanz — главный герой вечера.";
  }, 350);
});
