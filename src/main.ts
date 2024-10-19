import "./style.css";
import cookiePicLocal from "./assets/cookie.png";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Cookie Clicking Game";
document.title = gameName;

let counter: number = 0;
let time: number = 0;
let speedRate: number = 0;

let upgradeA: number = 0;
let upgradeB: number = 0;
let upgradeC: number = 0;

const currentCostA: number = 10;
const currentCostB: number = 100;
const currentCostC: number = 1000;

const orginalCostA: number = currentCostA;
const orginalCostB: number = currentCostB;
const orginalCostC: number = currentCostC;

const header = document.createElement("h1");
header.innerHTML = gameName;

//button, image, text elements of the page.
const button = document.createElement("Button") as HTMLButtonElement;

button.innerText = "Click me 😩 ";
button.style.padding = "15px";
button.style.fontSize = "16px";

//counter for cookies
const counterDisplay = document.createElement("counter") as HTMLDivElement;
counterDisplay.id = "numberCounter";
counterDisplay.textContent = "0 cookies";
counterDisplay.style.marginTop = "100px";
counterDisplay.style.fontSize = "20px";

//cookie image
const cookiePic = document.createElement("img") as HTMLImageElement;
cookiePic.src = cookiePicLocal;
cookiePic.alt = "cookie";
cookiePic.style.width = "400px";
cookiePic.style.marginTop = "50px";
cookiePic.style.display = "block";
cookiePic.style.marginLeft = "auto";
cookiePic.style.marginRight = "auto";

//counter for speed rate
const speedRateDisplay = document.createElement("div");
speedRateDisplay.textContent = "Speed Rate: 0.00 cookies per second";

//purchase history counter
const buyDisplay = document.createElement("div");
buyDisplay.textContent = "Purchased - A: 0, B: 0, C: 0";
buyDisplay.style.padding = "20px";

//options for speed upgrades
const optionA = upgradeButton("Option A (cost 10) ", orginalCostA ,  0.1);
const optionB = upgradeButton("Option B (cost 100) ", orginalCostB, 2.0);
const optionC = upgradeButton("Option C (cost 1000) " , orginalCostC, 50.0);

//logic for upgrade buttons
function upgradeButton(text: string, cost: number, rate: number) {
  const button2 = document.createElement("Button") as HTMLButtonElement;
  button2.innerText = text;
  button2.style.padding = "10px";
  button2.style.fontSize = "16px";
  button2.style.marginTop = "10px";
  button2.style.marginLeft = "10px";
  button2.disabled = true;

  button2.addEventListener("click", () => {
    if (counter >= cost) {
      counter -= cost;
      speedRate += rate;

      cost *= 1.15; //costs of each option increases by this increment. 
      cost = parseFloat(cost.toFixed(2));

      button2.innerText = `${text.split('(')[0]}(cost ${cost.toFixed(2)})`

      if (rate === 0.1) upgradeA++;
      else if (rate === 2.0) upgradeB++;
      else if (rate == 50.0) upgradeC++;

      raiseCounter();
      enableButtons();
    }
  });

  return button2;
}

//opens up option when players hit the counter req
function enableButtons() {
  optionA.disabled = counter < orginalCostA;
  optionB.disabled = counter < orginalCostB;
  optionC.disabled = counter < orginalCostC;
}

//updates counters
function raiseCounter() {
  counter += 1;
  counterDisplay.textContent = `${counter.toFixed(2)} cookies `;
  speedRateDisplay.textContent = `Speed Rate: ${speedRate.toFixed(2)} cookies per second`;
  buyDisplay.textContent = `Purchased - A: ${upgradeA}, B: ${upgradeB}, C: ${upgradeC}`;
}

function counterUpdate(timeLapse: number) {
  if (time === 0) {
    time = timeLapse;
  }

  const delta = timeLapse - time;
  counter += (delta / 1000) * speedRate;
  counterDisplay.textContent = `${counter.toFixed(2)} cookies `;
  time = timeLapse;
  requestAnimationFrame(counterUpdate);
}

//raises after manually clicking
button.addEventListener("click", () => {
  raiseCounter();
  enableButtons();
});

requestAnimationFrame(counterUpdate);

//auto click every second
setInterval(() => {
  raiseCounter();
}, 1000);

//for elements to appear on the window
app.append(counterDisplay);
app.append(header);
app.append(button);
app.append(optionA);
app.append(optionB);
app.append(optionC);
app.append(speedRateDisplay);
app.append(buyDisplay);
app.append(cookiePic);
