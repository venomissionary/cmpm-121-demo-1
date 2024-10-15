import "./style.css";
import cookiePicLocal from "./assets/cookie.png"; 


const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Cookie Clicking Game";
document.title = gameName;

let counter: number = 0;
let time: number = 0;
let speedRate: number = 0;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.getElementById("Button") as HTMLButtonElement;
const counterDisplay = document.getElementById("numberCounter",) as HTMLDivElement;

const button2 = document.createElement("Button") as HTMLButtonElement;
button2.id = "Button"
button2.innerText = "Upgrade (cost 10)";
button2.style.padding = "10px";
button2.style.fontSize = "16px";
button2.style.marginTop = "10px";
button2.style.marginLeft = "10px";

button2.disabled = true;

button.innerText = "Click me 😩 ";
button.style.padding = "15px";
button.style.fontSize = "16px";

const cookiePic = document.createElement("img") as HTMLImageElement;
cookiePic.src = cookiePicLocal;
cookiePic.alt = "cookie";
cookiePic.style.width = "400px";
cookiePic.style.marginTop = "50px"
cookiePic.style.display = "block";
cookiePic.style.marginLeft = "auto";
cookiePic.style.marginRight = "auto";

button.addEventListener("click", () => {
  raiseCounter();
  UpgradePower();

});

button2.addEventListener("click", () => {
    if (counter >= 10) {
        counter -= 10;
        speedRate += 1;
        counterDisplay.textContent = `${counter.toFixed(2)} cookies `;
        UpgradePower();
    }
})

function raiseCounter() {
  counter += 1;
  counterDisplay.textContent = `${counter.toFixed(2)} cookies `;
}

function counterUpdate(timeLapse: number) {
  if (time === 0) {
    time = timeLapse;
  }

  const delta = timeLapse - time;
  counter += delta / 1000 * speedRate;
  counterDisplay.textContent = `${counter.toFixed(2)} cookies `;
  time = timeLapse;
  requestAnimationFrame(counterUpdate);
}

function UpgradePower() {
    if (counter >= 10) {
        button2.disabled = false;
    } else {
        button2.disabled = true;
    }
}

requestAnimationFrame(counterUpdate);

setInterval(() => {
  raiseCounter();
}, 1000);

app.append(button);
app.append(button2)
app.append(cookiePic)