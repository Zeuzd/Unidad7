let socket;

let usarSimulacion = true;
let volumenA = 0;
let volumenB = 0;

let ruidoOffsetA = 0;
let ruidoOffsetB = 100;

let sliderA, sliderB;

function setup() {
  createCanvas(400, 200);
  socket = io();

  sliderA = createSlider(0, 100, 50);
  sliderA.position(20, height + 10);
  sliderB = createSlider(0, 100, 50);
  sliderB.position(220, height + 10);
}

function draw() {
  background(20);
  fill(255);
  textSize(16);
  text("Hinchada A", 20, 20);
  text("Hinchada B", 220, 20);

  if (usarSimulacion) {
    volumenA = noise(ruidoOffsetA) * 100;
    volumenB = noise(ruidoOffsetB) * 100;

    ruidoOffsetA += 0.01;
    ruidoOffsetB += 0.015;
  } else {
    volumenA = sliderA.value();
    volumenB = sliderB.value();
  }

  let diferencia = abs(volumenA - volumenB);
  let total = volumenA + volumenB;
  let porcentaje = total > 0 ? (volumenA / total) * 100 : 50;

  fill(0, 200, 255);
  rect(20, 40, volumenA * 2, 30);
  fill(255, 100, 100);
  rect(220, 40, volumenB * 2, 30);

  // Enviar al servidor para mostrar en terminal
  socket.emit("datos-ruido", {
    hinchadaA: volumenA,
    hinchadaB: volumenB,
    diferencia,
    porcentaje
  });
}
