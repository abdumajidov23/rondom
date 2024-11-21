const titleEl = document.querySelector(".title");
const randomTelBtn = document.getElementById("randomTelBtn");
const addTelBtn = document.getElementById("addTelBtn");
const viewListBtn = document.getElementById("viewListBtn");
const darkModeToggle = document.getElementById("darkModeToggle");
const addModal = document.getElementById("addModal");
const listModal = document.getElementById("listModal");
const overlay = document.getElementById("overlay");
const saveTelBtn = document.getElementById("saveTel");
const closeListBtn = document.getElementById("closeList");
const newTelInput = document.getElementById("newTel");
const telList = document.getElementById("telList");
const audioEl = document.querySelector(".audio");
const mainEl = document.querySelector(".main");
const backBtn = document.createElement("button");

const TEL = [];

function randomTel() {
  randomTelBtn.setAttribute("disabled", true);
  const interval = setInterval(() => {
    let randomNumber = Math.floor(Math.random() * TEL.length);
    titleEl.textContent = TEL[randomNumber];
  }, 100);

  setTimeout(() => {
    clearInterval(interval);
    randomTelBtn.removeAttribute("disabled"); 
    const selectedTel = titleEl.textContent;
    TEL.splice(TEL.indexOf(selectedTel), 1); 
    audioEl.play();
  }, 3000);
}


function toggleModal(modal) {
  modal.classList.toggle("active");
  overlay.classList.toggle("active");
}

function addTel() {
  const newTel = newTelInput.value.trim();
  const isValidNumber = /^[+]?[0-9\s]+$/.test(newTel); 
  if (newTel && isValidNumber) {
    TEL.push(newTel);
    newTelInput.value = "";
    toggleModal(addModal);
  } else {
    alert("Faqat raqam kiriting! Masalan: +998901234567 yoki 901234567");
  }
}


function viewTelList() {
  telList.innerHTML = TEL.map((tel) => `<li>${tel}</li>`).join("");
  toggleModal(listModal);
}

function showBackButton() {
  backBtn.textContent = "Ortga";
  backBtn.className = "btn";
  backBtn.style.marginTop = "10px";
  backBtn.addEventListener("click", () => {
    addModal.classList.remove("active");
    overlay.classList.remove("active");
    backBtn.remove(); 
  });
  addModal.appendChild(backBtn); 
}

randomTelBtn.addEventListener("click", randomTel);
addTelBtn.addEventListener("click", () => {
  toggleModal(addModal);
  showBackButton();
});

viewListBtn.addEventListener("click", viewTelList);
saveTelBtn.addEventListener("click", addTel);
closeListBtn.addEventListener("click", () => toggleModal(listModal));
overlay.addEventListener("click", () => {
  addModal.classList.remove("active");
  listModal.classList.remove("active");
  overlay.classList.remove("active");
});
darkModeToggle.addEventListener("click", () => mainEl.classList.toggle("dark"));
