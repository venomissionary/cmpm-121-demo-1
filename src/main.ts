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
   {name: "Fast Baking", cost: 10, rate: 0.1},
   {name: "Faster Baking", cost: 100, rate: 2.0},
   {name: "Fastest Baking", cost: 1000, rate: 50},

];

const header = document.createElement("h1");
header.innerHTML = gameName;

//button, image, text elements of the page.
const button = document.createElement("Button") as HTMLButtonElement;
button.innerText = "Click me 😩 ";
button.style.padding = "30px";
button.style.fontSize = "16px";

//counter for cookies
const counterDisplay = document.createElement("counter") as HTMLDivElement;
counterDisplay.id = "numberCounter";
counterDisplay.textContent = "0 cookies";
counterDisplay.style.position = "absolute";
counterDisplay.style.top = "40%"; 
counterDisplay.style.left = "41%"; 
counterDisplay.style.transform = "translate(-50%, -50%)"; 
counterDisplay.style.zIndex = "2"; 
counterDisplay.style.color = "white"; 

//cookie image
const cookiePic = document.createElement("img") as HTMLImageElement;
cookiePic.src = cookiePicLocal;
cookiePic.alt = "cookie";
cookiePic.style.width = "400px";
cookiePic.style.marginTop = "50px";
cookiePic.style.display = "block";
cookiePic.style.marginLeft = "auto";
cookiePic.style.marginRight = "auto";

//manual click button events
button.addEventListener("click", () => {
  counter++;
  updateDisplay();
  enableButtons();
  cookieAnimation();
});

//cookie animation
function cookieAnimation() {
  cookiePic.style.transition = "transform 0.2s";
  cookiePic.style.transform = "scale(1.2)";

  setTimeout(() => {
    cookiePic.style.transform = "scale(1)";
    
  }, 200);
}

//background setting image
const kitchenPic = document.createElement("img") as HTMLImageElement;
kitchenPic.src = kitchenPicLocal;
kitchenPic.alt = "Kitchen";
kitchenPic.style.position = "absolute";
kitchenPic.style.top = "0";
kitchenPic.style.left = "0";
kitchenPic.style.width = "100%";
kitchenPic.style.height = "100%";
kitchenPic.style.zIndex = "-1";
kitchenPic.style.objectFit = "cover";
kitchenPic.style.opacity = "0.2";

//counter for speed rate
const speedRateDisplay = document.createElement("div");
speedRateDisplay.textContent = "Speed Rate: 0.00 cookies per second";

//purchase history counter
const buyDisplay = document.createElement("div");
buyDisplay.textContent ="Purchased - ";
buyDisplay.style.padding = "20px";

//frying pan image
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

const upgradeButton: HTMLButtonElement[] = [];
const upgradeCount: number[] = Array(availableItems.length).fill(0);

//logic for upgrade buttons
availableItems.forEach((item, index) => {
  const button2 = document.createElement("Button") as HTMLButtonElement;
  button2.innerText = `${item.name} (${item.cost} units/sec)`;
  button2.style.padding = "10px";
  button2.style.fontSize = "16px";
  button2.style.marginTop = "10px";
  button2.style.marginLeft = "10px";
  button2.disabled = true;

  // Attach the event listener to the individual upgrade button
  button2.addEventListener("click", () => {
    if (counter >= item.cost) {
      counter -= item.cost;
      speedRate += item.rate;
      upgradeCount[index]++;

      // Increase the cost after each purchase
      item.cost *= 1.15; 
      item.cost = parseFloat(item.cost.toFixed(2));
      button2.innerText = `${item.name} (${item.cost.toFixed(2)} units/sec)`;

      updateDisplay();
      enableButtons();
    }
  });

  upgradeButton.push(button2);
  app.append(button2);
});

//opens up option when players hit the counter req
function enableButtons() {
  availableItems.forEach((item, index) => {
    upgradeButton[index].disabled = counter < item.cost;
  });
}
//updates counters
function updateDisplay() {
  counterDisplay.textContent = `${counter.toFixed(2)} `;
  speedRateDisplay.textContent = `Speed Rate: ${speedRate.toFixed(2)} cookies per second`;
  buyDisplay.textContent = `Purchased - ${availableItems
    .map((item, index) => `${item.name}: ${upgradeCount[index]}`)
    .join(", ")}`;
}

//tracking counter updates
function counterUpdate(timeLapse: number) {
  if (time === 0) {
    time = timeLapse;
  }

  const delta = timeLapse - time;
  counter += (delta / 1000) * speedRate;
  time = timeLapse;
  updateDisplay();
  requestAnimationFrame(counterUpdate);
}

requestAnimationFrame(counterUpdate);

//auto click every second
setInterval(() => {
  updateDisplay();
}, 1000);

//for elements to appear on the window
fryingPanResizeable.append(fryingPanPic);
fryingPanResizeable.append(counterDisplay);
app.append(fryingPanResizeable);
app.append(header);
app.append(button);
app.append(speedRateDisplay);
app.append(buyDisplay);
app.append(cookiePic);
app.append(kitchenPic);
