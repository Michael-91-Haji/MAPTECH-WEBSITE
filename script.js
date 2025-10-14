
  
document.addEventListener("DOMContentLoaded", () => {
  const chatIcon = document.getElementById("chat-icon");
  const chatPopup = document.getElementById("chat-popup");
  const closeBtn = document.getElementById("close-chat");
  const chatBody = document.getElementById("chat-body");
  const chatInput = document.getElementById("chat-input");
  const sendBtn = document.getElementById("send-btn");
  const emojiBtn = document.getElementById("emoji-btn");
  const emojiPicker = document.getElementById("emoji-picker");
  const botSound = document.getElementById("bot-sound");

  if (!chatIcon || !chatPopup || !chatBody || !chatInput) return;

  let welcomeShown = false;
  function showWelcomeMessage() {
    if (welcomeShown) return;
    welcomeShown = true;
    const introDots = showTypingDots();
    setTimeout(() => {
      introDots.remove();
      appendMsg("👋 Hello! Welcome to MapTech Chat Support. Please let us know how we can help you.", "bot");
      chatBody.scrollTop = chatBody.scrollHeight;
    }, 900);
  }

  function openPopup() {
    chatPopup.classList.add("open");
    document.body.classList.add("chat-open");
    chatInput.focus();
    chatBody.scrollTop = chatBody.scrollHeight;
    showWelcomeMessage();
  }

  function closePopup() {
    chatPopup.classList.remove("open");
    document.body.classList.remove("chat-open");
    emojiPicker.classList.remove("show");
  }

  chatIcon.addEventListener("click", () => {
    if (chatPopup.classList.contains("open")) closePopup();
    else openPopup();
  });
  closeBtn && closeBtn.addEventListener("click", closePopup);

  emojiBtn && emojiBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    emojiPicker.classList.toggle("show");
  });
  
  document.addEventListener("click", (e) => {
    if (!emojiPicker.contains(e.target) && e.target !== emojiBtn) emojiPicker.classList.remove("show");
  });
  emojiPicker && emojiPicker.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    chatInput.value += btn.textContent;
    chatInput.focus();
  });

  chatInput.addEventListener("focus", () => {
    document.documentElement.dataset.scrollY = window.scrollY;
    document.body.classList.add("chat-open");
  });
  chatInput.addEventListener("blur", () => {
    const y = document.documentElement.dataset.scrollY;
    document.body.classList.remove("chat-open");
    if (y) window.scrollTo(0, parseInt(y));
  });

  chatBody.addEventListener("touchstart", function () {
    const top = this.scrollTop;
    const totalScroll = this.scrollHeight;
    const currentScroll = top + this.offsetHeight;
    if (top === 0) this.scrollTop = 1;
    if (currentScroll === totalScroll) this.scrollTop = top - 1;
  }, { passive: true });

  chatBody.addEventListener("touchmove", function (e) {
    const atTop = this.scrollTop === 0;
    const atBottom = this.scrollTop + this.clientHeight >= this.scrollHeight;
    if ((atTop && e.touches[0].clientY > 0) || (atBottom && e.touches[0].clientY < 0)) {
      e.preventDefault();
    }
  }, { passive: false });

  function appendMsg(text, who) {
    const d = document.createElement("div");
    d.className = "msg " + (who === "user" ? "user" : "bot");
    d.textContent = text;
    chatBody.appendChild(d);
    chatBody.scrollTop = chatBody.scrollHeight;
    return d;
  }

  function showTypingDots() {
    const wrapper = document.createElement("div");
    wrapper.className = "msg bot typing-dots";
    wrapper.innerHTML = '<span></span><span></span><span></span>';
    chatBody.appendChild(wrapper);
    chatBody.scrollTop = chatBody.scrollHeight;
    return wrapper;
  }

  function getBotResponse(msg) {
    if (!msg) return "Hello!";
    const m = msg.toLowerCase();
    if (/(hello|hi|hey|mambo)\b/.test(m)) return "👋 Hi! How can I help you today?";
    if (m.includes("how are you")) return "😊 I'm fine — ready to help!";
    if (m.includes("service") || m.includes("services") || m.includes("offer")) return "We offer Security, Networking, Cloud and IT training. Which do you want to know about?";
    if (m.includes("phone") || m.includes("call")) return "📞 Call us at +255 754 123 456 789.";
    if (m.includes("email")) return "✉️ Use info@maptech.co.tz.";
    if (m.includes("location") || m.includes("where")) return "📍We're located at TTCL Building, Kijitonyama, Dar es Salaam.";
    if (m.includes("hours") || m.includes("time") || m.includes("open")) return "🕗 Mon–Fri 8:00–18:00, Sat 9:00–16:00.";
    if (m.includes("thanks") || m.includes("thank")) return "🙏 You're welcome!";
    if (m.includes("bye") || m.includes("goodbye")) return "👋 Goodbye — have a great day!";
    return "🤖 Thanks — our team will reply shortly.";
  }

  function playBotSound() {
    if (!botSound) return;
    botSound.currentTime = 0;
    const p = botSound.play();
    if (p && p.catch) p.catch(() => {});
  }

  function sendFlow() {
    const text = chatInput.value.trim();
    if (!text) return; 
    appendMsg(text, "user");
    chatInput.value = "";
    const dots = showTypingDots();
    const thinkMs = 600 + Math.min(2000, text.length * 30);
    setTimeout(() => {
      dots.remove();
      const reply = getBotResponse(text);
      playBotSound();
      const botEl = appendMsg("", "bot");
      let i = 0;
      const speed = () => 20 + Math.random() * 30;
      (function typeChar() {
        if (i < reply.length) {
          botEl.textContent += reply.charAt(i++);
          chatBody.scrollTop = chatBody.scrollHeight;
          setTimeout(typeChar, speed());
        }
      })();
    }, thinkMs);
  }

  sendBtn.addEventListener("click", sendFlow);
  chatInput.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); sendFlow(); } });

});


/* ------ */

window.addEventListener("load", function() {
    window.scrollTo(0, 0);
});

const menuButton = document.getElementById('menuButton');
const mobileNav = document.getElementById('mobileNav');

menuButton.addEventListener('click', () => {
  if (mobileNav.style.display === 'flex') {
    mobileNav.style.display = 'none';
  } else {
    mobileNav.style.display = 'flex';
  }
});

const mobileLinks = mobileNav.querySelectorAll('a');
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.style.display = 'none';
  });
});

const fadeElements = document.querySelectorAll('.fade-in');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.2
});
fadeElements.forEach(el => fadeObserver.observe(el));


const showMoreBtn = document.getElementById("view-all-btn");
const hiddenServices = document.querySelectorAll(".service-card[id^='service-hidden']");
let isVisible = false;

showMoreBtn.addEventListener("click", () => {
  isVisible = !isVisible;
  hiddenServices.forEach(service => {
    service.style.display = isVisible ? "flex" : "none";
  });
  showMoreBtn.textContent = isVisible ? "Show Less" : "View All Services"; 

});

hiddenServices.forEach(service => {
  service.style.display = "none";
});

const menuIcon = document.getElementById('menu');
const showMenu = document.getElementById('humburger-menu');
const overlay = document.getElementById('overlay');

function toggleMenu() {
  const isShown = showMenu.classList.contains('show');
  if (isShown) {
    showMenu.classList.remove('show');
    overlay.style.display = 'none';
  } else {
    showMenu.classList.add('show');
    overlay.style.display = 'block';
  }
}

menuIcon.addEventListener('click', (e) => {
  toggleMenu();
  e.stopPropagation();
});

document.addEventListener('click', (e) => {
  if (!showMenu.contains(e.target) && showMenu.classList.contains('show')) {
    toggleMenu();
  }
});

showMenu.addEventListener('click', (e) => {
  e.stopPropagation();
});

overlay.addEventListener('click', () => {
  toggleMenu();
});

