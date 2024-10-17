const emojis = [
    "😍",
    "😍",
    "🥺",
    "🥺",
    "😱",
    "😱",
    "😁",
    "😁",
    "🤔",
    "🤔",
    "😎",
    "😎",
    "😂",
    "😂",
    "🙄",
    "🙄",
];

let openCards = [];
let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));
let score = 0;
let timer;
let seconds = 0;
let minutes = 0;

function startTimer() {
    timer = setInterval(() => {
        seconds++;
        if (seconds == 60) {
            seconds = 0;
            minutes++;
        }
        let timeString = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        document.querySelector("#time").textContent = timeString;
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

for (let i = 0; i < emojis.length; i++) {
    let box = document.createElement("div");
    box.className = "item";
    box.innerHTML = shuffleEmojis[i];
    box.onclick = handleClick;
    document.querySelector(".game").appendChild(box)
}

function handleClick() {
    if (openCards.length < 2) {
        this.classList.add("boxOpen");
        openCards.push(this);
    }

    if (openCards.length == 2) {
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");
        score += 10;
    } else {
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
        score -= 2;
    }

    document.querySelector("#score").textContent = score;
    openCards = [];

    if (document.querySelectorAll(".boxMatch").length === emojis.length) {
        stopTimer();
        alert(`Você venceu! Pontuação final: ${score}`);
    }
}

startTimer();