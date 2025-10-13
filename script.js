// Wrap everything to ensure DOM is loaded
window.addEventListener("DOMContentLoaded", () => {
  const chatIcon = document.getElementById("chat-icon");
  const chatPopup = document.getElementById("chat-popup");
  const closeChat = document.getElementById("close-chat");
  const sendBtn = document.getElementById("send-chat");
  const chatInput = document.getElementById("chat-input");
  const chatBody = document.getElementById("chat-body");

  // Add floating animation
  chatIcon.classList.add("chat-floating");

  // Open chat popup
  chatIcon.addEventListener("click", () => {
    chatPopup.style.display = "flex";
    chatIcon.style.display = "none";
  });

  // Close chat popup
  closeChat.addEventListener("click", () => {
    chatPopup.style.display = "none";
    chatIcon.style.display = "flex";
  });

  // Bot response logic
  function getBotResponse(message) {
    const msg = message.toLowerCase();

    if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
      return "👋 Hi there! How can I help you today?";
    }
    if (msg.includes("how are you")) {
      return "😊 I'm just a bot, but I'm here to help you! How can I assist?";
    }
    if (msg.includes("services") || msg.includes("offer") || msg.includes("what do you do")) {
      return "We provide Security, Networking, Cloud, and IT Training solutions. Which one interests you?";
    }
    if (msg.includes("phone") || msg.includes("call")) {
      return "📞 You can reach us at +255 754 123 456 789.";
    }
    if (msg.includes("email")) {
      return "✉️ Our email is info@maptech.co.tz. Feel free to send us a message!";
    }
    if (msg.includes("location") || msg.includes("office") || msg.includes("where")) {
      return "📍 We are located at TTCL Building, Kijitonyama, Dar es Salaam, Tanzania.";
    }
    if (msg.includes("hours") || msg.includes("open") || msg.includes("time")) {
      return "🕗 Our business hours are Mon-Fri 8:00 AM - 6:00 PM, Sat 9:00 AM - 4:00 PM, Sunday closed.";
    }
    if (msg.includes("thanks") || msg.includes("thank you")) {
      return "🙏 You're welcome! Do you have any other questions?";
    }
    if (msg.includes("bye") || msg.includes("goodbye")) {
      return "👋 Goodbye! Have a great day!";
    }

    return "🤖 Thanks for your message! Our team will respond shortly.";
  }

  // Typing effect for bot message
  function typeBotMessage(text) {
    const botMsg = document.createElement("div");
    botMsg.classList.add("bot-message");

    // Add typing indicator
    const typingIndicator = document.createElement("span");
    typingIndicator.classList.add("typing");
    typingIndicator.textContent = "Typing...";
    botMsg.appendChild(typingIndicator);
    chatBody.appendChild(botMsg);
    chatBody.scrollTop = chatBody.scrollHeight;

    // After short delay, remove typing and show message letter by letter
    setTimeout(() => {
      botMsg.removeChild(typingIndicator);
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          botMsg.textContent += text.charAt(i);
          chatBody.scrollTop = chatBody.scrollHeight;
          i++;
        } else {
          clearInterval(interval);
        }
      }, 30); // typing speed in milliseconds per character
    }, 800); // delay before typing starts
  }

  function sendMessage() {
    const msg = chatInput.value.trim();
    if (!msg) return;

    const userMsg = document.createElement("div");
    userMsg.classList.add("user-message");
    userMsg.textContent = msg;
    chatBody.appendChild(userMsg);
    chatInput.value = "";
    chatBody.scrollTop = chatBody.scrollHeight;

    setTimeout(() => {
      const response = getBotResponse(msg);
      typeBotMessage(response);
    }, 300);
  }

  sendBtn.addEventListener("click", sendMessage);
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });
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

