import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Steven's Game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.innerText = "Click me 😩 "
button.style.padding = "10px"
button.style.fontSize = "16px"

button.addEventListener("click", () => {
    console.log("Button has been clicked");
    
});

app.append(button);
