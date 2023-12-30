// Класс для управления таймерами

class Timer {
    constructor(id) {
        this.id = id;
        this.startTime = 0;
        this.elapsedTime = 0;
        this.timerInterval = null;
        this.container = null;
        this.createUI();
    }

    createUI() {
        // Создаем элементы интерфейса, как вы указали в функции createUI
        const display = document.createElement("div");
        display.id = "display";
        display.innerHTML = "00:00:00";
        this.container = document.createElement("div");
        this.container.appendChild(display);

        const controls = document.createElement("div");
        controls.className = "controls";

        const playButton = document.createElement("button");
        playButton.className = "buttonPlay";
        playButton.innerHTML = "<img id='playButton' src='icons/play-button.svg' />";
        // Устанавливаем атрибут data-id для кнопки
        playButton.setAttribute("data-id", this.id);
        controls.appendChild(playButton);

        const pauseButton = document.createElement("button");
        pauseButton.className = "buttonPause";
        pauseButton.innerHTML = "<img id='pauseButton' src='icons/pause-button.svg' />";
        // Устанавливаем атрибут data-id для кнопки
        pauseButton.setAttribute("data-id", this.id);
        controls.appendChild(pauseButton);

        const resetButton = document.createElement("button");
        resetButton.className = "buttonReset";
        resetButton.innerHTML = "<img id='resetButton' src='icons/reset-button.svg' />";
        // Устанавливаем атрибут data-id для кнопки
        resetButton.setAttribute("data-id", this.id);
        controls.appendChild(resetButton);

        this.container.appendChild(controls);
    }

    start(id) {
        console.log("Запустился таймер");
        if (!this.timerInterval && this.container.getAttribute("data-id") === id) {
            // Здесь можно взять ваш код из старого метода start
            this.startTime = Date.now() - this.elapsedTime;
            this.timerInterval = setInterval(() => {
                this.elapsedTime = Date.now() - this.startTime;
                this.print(this.timeToString(this.elapsedTime));
            }, 10);
            this.showButton("PAUSE");
        }
    }


    pause() {
        clearInterval(this.timerInterval);
        this.showButton("PLAY");
    }

    reset() {
        clearInterval(this.timerInterval);
        this.print("00:00:00");
        this.elapsedTime = 0;
        this.showButton("PLAY");
    }

    printTime() {
        this.elapsedTime = Date.now() - this.startTime;
        this.print(this.timeToString(this.elapsedTime));
    }

    timeToString(time) {
        let diffInHrs = time / 3600000;
        let hh = Math.floor(diffInHrs);

        let diffInMin = (diffInHrs - hh) * 60;
        let mm = Math.floor(diffInMin);

        let diffInSec = (diffInMin - mm) * 60;
        let ss = Math.floor(diffInSec);

        let diffInMs = (diffInSec - ss) * 100;
        let ms = Math.floor(diffInMs);

        let formattedMM = mm.toString().padStart(2, "0");
        let formattedSS = ss.toString().padStart(2, "0");
        let formattedMS = ms.toString().padStart(2, "0");



        return `${formattedMM}:${formattedSS}:${formattedMS}`;
    }

    showButton(buttonKey) {
        const playButton = this.container.querySelector(".buttonPlay");
        const pauseButton = this.container.querySelector(".buttonPause");
        if (buttonKey === "PLAY") {
            playButton.style.display = "block";
            pauseButton.style.display = "none";
        } else if (buttonKey === "PAUSE") {
            playButton.style.display = "none";
            pauseButton.style.display = "block";
        }
    }

    print(txt) {
        const display = this.container.querySelector("#display");
        display.innerHTML = txt;
    }
}

// Объект для хранения и управления таймерами
const timers = {};


function startTimer(id) {
    if (timers[id]) {
        timers[id].start(id);
    }
}

function createTimer() {
    console.log("Создался таймер");
    const id = Object.keys(timers).length + 1;
    const newTimer = new Timer(id);
    timers[id] = newTimer;

    // Замените следующую часть на создание интерфейса вашего таймера
    const container = newTimer.container;
    document.getElementById("container").appendChild(container);
}

document.getElementById("container").addEventListener("click", (event) => {
    console.log("Контейнер");


    const target = event.target;

    console.log(target.getAttribute);

    if (target.getAttribute("data-id")) {
        console.log("Нажата кнопка Play");

        const timerId = target.getAttribute("data-id");
        startTimer(timerId);
    }
});

document.getElementById("addButton").addEventListener("click", () => {
    createTimer();
});
