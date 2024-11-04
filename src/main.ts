import "./style.css";
import cookiePicLocal from "./assets/cookie.png";
import kitchenPicLocal from "./assets/vintageKitchen.png";
import fryingPanLocal from "./assets/fryingPan.png";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Cookie Clicking Game";
document.title = gameName;

let counter: number = 0;
let time: number = 0;
let speedRate: number = 0;

interface item {
  name: string;
  cost: number;
  rate: number;
}

const availableItems: item[] = [
  { name: "Fast Baking", cost: 10, rate: 0.1 },
  { name: "Faster Baking", cost: 100, rate: 2.0 },
  { name: "Fastest Baking", cost: 1000, rate: 50 },
];

const upgradeCount: number[] = Array(availableItems.length).fill(0);

// Header
const header = document.createElement("h1");
header.innerHTML = gameName;
header.style.zIndex = "3"; 

// Button and upgrade labels 
const button = CookieButton("Click me 😩", ButtonClicks);
const upgradeButton: HTMLButtonElement[] = [];
availableItems.forEach((item, index) => {
  const buttonUpgrade = CookieButton(`${item.name} (${item.cost} units/sec)`, () => UpgradeButtons(item, index));
  buttonUpgrade.style.padding = "10px";
  buttonUpgrade.style.fontSize = "16px";
  buttonUpgrade.style.marginTop = "10px";
  buttonUpgrade.style.marginLeft = "10px";
  buttonUpgrade.disabled = true;

  upgradeButton.push(buttonUpgrade);
  app.append(buttonUpgrade);
});

//Button creation
function CookieButton(text: string, onClick: () => void): HTMLButtonElement {
  const btn = document.createElement("button");
  btn.innerText = text;
  btn.addEventListener("click", onClick);
  return btn;
}

// Counter for cookies
const counterDisplay = document.createElement("div") as HTMLDivElement;
counterDisplay.id = "numberCounter";
counterDisplay.textContent = "0 cookies";
counterDisplay.style.position = "absolute";
counterDisplay.style.top = "40%";
counterDisplay.style.left = "40%";
counterDisplay.style.transform = "translate(-50%, -50%)";
counterDisplay.style.zIndex = "3";
counterDisplay.style.color = "white";

// Cookie Image
const cookiePic = document.createElement("img") as HTMLImageElement;
cookiePic.src = cookiePicLocal;
cookiePic.alt = "cookie";
cookiePic.style.width = "400px";
cookiePic.style.marginTop = "50px";
cookiePic.style.display = "block";
cookiePic.style.marginLeft = "auto";
cookiePic.style.marginRight = "auto";

// Cookie Animation Function
function cookieAnimation() {
  cookiePic.style.transition = "transform 0.2s";
  cookiePic.style.transform = "scale(1.2)";

  setTimeout(() => {
    cookiePic.style.transform = "scale(1)";
  }, 200);
}

// Background Image
const kitchenPic = document.createElement("img") as HTMLImageElement;
kitchenPic.src = kitchenPicLocal;
kitchenPic.alt = "Kitchen";
kitchenPic.style.position = "absolute";
kitchenPic.style.top = "0";
kitchenPic.style.left = "0";
kitchenPic.style.width = "100%";
kitchenPic.style.height = "100%";
kitchenPic.style.zIndex = "-2"; 
kitchenPic.style.objectFit = "cover";
kitchenPic.style.opacity = "0.2";

// Counter for speed rate
const speedRateDisplay = document.createElement("div");
speedRateDisplay.textContent = "Speed Rate: 0.00 cookies per second";
speedRateDisplay.style.zIndex = "3";

// Purchase History Display
const buyDisplay = document.createElement("div");
buyDisplay.textContent = "Purchased - ";
buyDisplay.style.padding = "20px";
buyDisplay.style.zIndex = "3";

// Frying Pan Image
const fryingPanPic = document.createElement("img") as HTMLImageElement;
fryingPanPic.src = fryingPanLocal;
fryingPanPic.alt = "frying pan";
fryingPanPic.style.position = "relative";
fryingPanPic.style.width = "60%";
fryingPanPic.style.height = "auto";

const fryingPanResizeable = document.createElement("div");
fryingPanResizeable.style.position = "absolute";
fryingPanResizeable.style.top = "10%";
fryingPanResizeable.style.left = "52%";
fryingPanResizeable.style.width = "600px";
fryingPanResizeable.style.height = "auto";
fryingPanResizeable.style.transform = "translate(-50%, -50%)";
fryingPanResizeable.style.zIndex = "1";

button.addEventListener("click", ButtonClicks);

// Button Click Function
function ButtonClicks() {
  counter++;
  updateDisplay();
  enableButtons();
  cookieAnimation();
}

// Upgrade Button Click 
function UpgradeButtons(item: item, index: number) {
  if (counter >= item.cost) {
    counter -= item.cost;
    speedRate += item.rate;
    upgradeCount[index]++;

    item.cost *= 1.15;
    item.cost = parseFloat(item.cost.toFixed(2));
    upgradeButton[index].innerText = `${item.name} (${item.cost.toFixed(2)} units/sec)`;

    updateDisplay();
    enableButtons();
  }
}

function enableButtons() {
  availableItems.forEach((item, index) => {
    upgradeButton[index].disabled = counter < item.cost;
  });
}

function updateDisplay() {
  counterDisplay.textContent = `${counter.toFixed(2)} `;
  speedRateDisplay.textContent = `Speed Rate: ${speedRate.toFixed(2)} cookies per second`;
  buyDisplay.textContent = `Purchased - ${availableItems
    .map((item, index) => `${item.name}: ${upgradeCount[index]}`)
    .join(", ")}`;
}

// For tracking counter updates
function CurrentTimelapse(timeLapse: number) {
  if (time === 0) {
    time = timeLapse;
  }
  const delta = timeLapse - time;
  time = timeLapse;
  return delta;
}

function UpdateCounter(delta: number) {
  counter += (delta / 1000) * speedRate;
  updateDisplay();
}

function CounterUpdates(timeLapse: number) {
  const delta = CurrentTimelapse(timeLapse);
  UpdateCounter(delta);
  requestAnimationFrame(CounterUpdates);
}

requestAnimationFrame(CounterUpdates);

// Auto Update Every Second
setInterval(() => {
  updateDisplay();
}, 1000);

// Append Elements to App
fryingPanResizeable.append(fryingPanPic);
fryingPanResizeable.append(counterDisplay);
app.append(fryingPanResizeable);
app.append(header);
app.append(button);
app.append(speedRateDisplay);
app.append(buyDisplay);
app.append(cookiePic);
app.append(kitchenPic);