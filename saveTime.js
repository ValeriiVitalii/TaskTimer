// Класс для управления таймерами

class Timer {
    constructor(id) {
        this.id = id;
        this.startTime = 0;
        this.elapsedTime = 0;
        this.timerInterval = null;
        this.container = null;
        this.playButton = null;  // Добавляем playButton как свойство
        this.pauseButton = null;  // Добавляем pauseButton как свойство
        this.createUI();
    }

    // Метод для сохранения данных в хранилище
    // Метод для сохранения данных в хранилище
    // Метод для сохранения данных в хранилище
    saveDataToStorage(data, callback) {
        chrome.storage.sync.get('myData', (result) => {
            const savedData = result.myData || {};
            savedData[data.id] = data;
            chrome.storage.sync.set({ myData: savedData }, () => {
                console.log('Data saved:', data);
                if (callback) {
                    callback();
                }
            });
        });
    }

// Метод для загрузки данных из хранилища
    loadDataFromStorage(callback) {
        chrome.storage.sync.get('myData', (result) => {
            const loadedData = result.myData;
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
                return;
            }

            console.log('Data loaded:', loadedData);
            if (callback) {
                callback(loadedData);
            }
        });
    }
// Метод для сохранения данных таймера
    saveData() {
        const timerData = {
            id: this.id,
            startTime: this.startTime,
            elapsedTime: this.elapsedTime
            // Добавьте другие данные, которые вы хотите сохранить
        };
        // Используем функцию класса для сохранения данных
        this.saveDataToStorage(timerData, () => {
            // Вызываем метод, который будет выполнен после сохранения данных
            console.log('Data saved:', timerData);
        });
    }

// Метод для загрузки данных таймера
    loadData() {
        // Используем функцию класса для загрузки данных
        this.loadDataFromStorage((loadedData) => {
            if (loadedData && loadedData[this.id]) {
                this.startTime = loadedData[this.id].startTime;
                this.elapsedTime = loadedData[this.id].elapsedTime;
                this.printTime();
                this.showButton("PAUSE");
            }
        });
    }


    createUI() {
        // Создаем элементы интерфейса, как вы указали в функции createUI
        const display = document.createElement("div");
        display.id = "display";
        display.innerHTML = "00:00:00";
        this.container = document.createElement("div");
        this.container.appendChild(display);

        const circle = document.createElement("div");
        circle.className = "circle";


        const controls = document.createElement("div");
        controls.className = "controls";


        // Получаем элемент контейнера
        const container = document.getElementById("container");

        // Пример изменения стилей (замените на ваши собственные значения)
        container.style.position = "absolute";
        container.style.left = "100px";
        container.style.top = "100px";


        const playButton = document.createElement("button");
        playButton.className = "buttonPlay";
        playButton.innerHTML = "<img id='playButton' src='icons/play.png' />";
        this.playButton = playButton;

        // Устанавливаем атрибут data-id для кнопки
        playButton.setAttribute("data-id", this.id);
        controls.appendChild(playButton);

        // Здесь устанавливаем уникальные стили для каждой кнопки "play"



        const pauseButton = document.createElement("button");
        pauseButton.className = "buttonPause";
        pauseButton.innerHTML = "<img id='pauseButton' src='icons/pause.png' />";
        this.pauseButton = pauseButton;
        // Устанавливаем атрибут data-id для кнопки
        pauseButton.setAttribute("data-id", this.id);
        controls.appendChild(pauseButton);


        const resetButton = document.createElement("button");
        resetButton.className = "buttonReset";
        resetButton.innerHTML = "<img id='resetButton' src='icons/circular.png' />";
        // Устанавливаем атрибут data-id для кнопки
        resetButton.setAttribute("data-id", this.id);
        controls.appendChild(resetButton);

        const timerNameInput = document.createElement("input");
        timerNameInput.type = "text";
        timerNameInput.placeholder = "Enter timer name"; // Задайте текст подсказки
        controls.appendChild(timerNameInput);

        this.playButton = playButton;

        console.log("pauseButton:", this.pauseButton);

        this.pauseButton.style.display = "block";


        playButton.addEventListener("click", () => {
            console.log("Старт");
            this.start();
        });

        pauseButton.addEventListener("click", () => {
            // КНОПКИ ПАУЗЫ НЕТУУУУУ
            console.log("Пауза");
            this.pause();
        });

        resetButton.addEventListener("click", () => {
            console.log("Ресет");
            this.reset();
        });


        this.container.appendChild(controls);
    }


    start() {
        this.startTime = Date.now() - this.elapsedTime;
        this.timerInterval = setInterval(() => {
            this.elapsedTime = Date.now() - this.startTime;
            this.print(this.timeToString(this.elapsedTime));
        }, 10);
        this.showButton("PLAY");
    }


    pause() {
        clearInterval(this.timerInterval);
        this.saveData(); // Сохраняем данные при паузе
        this.showButton("PAUSE");
    }


    reset() {
        clearInterval(this.timerInterval);
        this.print("00:00:00");
        this.elapsedTime = 0;
        this.showButton("PAUSE");

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
        console.log("showButton");
        console.log(buttonKey);

        if (buttonKey === "PLAY") {
            console.log(this.playButton.style.display);

            this.playButton.style.display = "none";
            this.pauseButton.style.display = "block";

            console.log(this.playButton.style.display);
        } else if (buttonKey === "PAUSE") {
            console.log(this.pauseButton.style.display);

            this.playButton.style.display = "block";
            this.pauseButton.style.display = "none";

            console.log(this.pauseButton.style.display);
        }
    }

    print(txt) {
        const display = this.container.querySelector("#display");
        display.innerHTML = txt;
    }
}

// Объект для хранения и управления таймерами
const timers = {};


function createTimer() {
    console.log("Создался таймер");
    const id = Object.keys(timers).length + 1;
    const newTimer = new Timer(id);

    const timerNameInput = newTimer.container.querySelector("input");
    const timerName = timerNameInput.value.trim();

    newTimer.loadData();

    // Используем значение в качестве имени таймера
    const timerDisplayName = timerName || `Timer ${id}`;

    timers[id] = newTimer;



    // Замените следующую часть на создание интерфейса вашего таймера
    const container = newTimer.container;
    const circle = document.createElement("div");
    circle.className = "circle";
    circle.appendChild(container); // Вставляем controls внутрь circle
    document.getElementById("container").appendChild(circle);

// После создания таймера добавляем кнопку "Add"
    const addButton = document.getElementById("addButton");
    document.getElementById("container").appendChild(addButton);

    // После добавления таймера, можно регулировать стили блока кнопок (controls)
    const controls = container.querySelector(".controls");

    // Пример изменения стилей (замените на ваши собственные значения)
    controls.style.marginLeft = "-200px";
}


document.getElementById("addButton").addEventListener("click", () => {
    createTimer();
});







































