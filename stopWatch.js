class Stopwatch {
    constructor(container) {
        this.startTime = 0;
        this.elapsedTime = 0;
        this.timerInterval = null;
        this.container = container;
        this.createUI();
    }

    createUI() {
        const display = document.createElement("div");
        display.id = "display";
        display.innerHTML = "00:00:00";
        this.container.appendChild(display);

        const controls = document.createElement("div");
        controls.className = "controls";

        const playButton = document.createElement("button");
        playButton.className = "buttonPlay";
        playButton.innerHTML = "<img id='playButton' src='icons/play-button.svg' />";
        controls.appendChild(playButton);

        const pauseButton = document.createElement("button");
        pauseButton.className = "buttonPause";
        pauseButton.innerHTML = "<img id='pauseButton' src='icons/pause-button.svg' />";
        controls.appendChild(pauseButton);

        const resetButton = document.createElement("button");
        resetButton.className = "buttonReset";
        resetButton.innerHTML = "<img id='resetButton' src='icons/reset-button.svg' />";
        controls.appendChild(resetButton);

        this.container.appendChild(controls);

        playButton.addEventListener("click", () => this.start());
        pauseButton.addEventListener("click", () => this.pause());
        resetButton.addEventListener("click", () => this.reset());
    }

    start() {
        if (!this.timerInterval) {
            this.startTime = Date.now() - this.elapsedTime;
            this.timerInterval = setInterval(() => this.printTime(), 10);
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

const addButton = document.getElementById("addButton");
const container = document.getElementById("container");

addButton.addEventListener("click", () => {
    const stopwatch = new Stopwatch(container);
});