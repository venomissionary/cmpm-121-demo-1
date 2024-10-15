import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Steven's Game";
document.title = gameName;

let counter: number = 0;
let time: number = 0;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.getElementById("Button1") as HTMLButtonElement;
const counterDisplay = document.getElementById(
  "numberCounter",
) as HTMLDivElement;

button.innerText = "Click me 😩 ";
button.style.padding = "10px";
button.style.fontSize = "16px";

button.addEventListener("click", () => {
  raiseCounter();
});

function raiseCounter() {
  counter += 1;
  counterDisplay.textContent = `${counter.toFixed(2)} cookies `;
}

function counterUpdate(timeLapse: number) {
  if (time === 0) {
    time = timeLapse;
  }

  const delta = timeLapse - time;
  counter += delta / 1000;
  counterDisplay.textContent = `${counter.toFixed(2)} cookies `;
  time = timeLapse;
  requestAnimationFrame(counterUpdate);
}

requestAnimationFrame(counterUpdate);

setInterval(() => {
  raiseCounter();
}, 1000);

app.append(button);
