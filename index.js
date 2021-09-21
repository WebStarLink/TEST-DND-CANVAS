const figureCanvas = document.getElementById("figures");
const mainCanvas = document.getElementById("canvas");
const circleCanvas = document.getElementById("circle");
const squareCanvas = document.getElementById("square");

const figureCtx = figureCanvas.getContext("2d");
const mainCtx = mainCanvas.getContext("2d");
const circleCtx = circleCanvas.getContext("2d");
const squareCtx = squareCanvas.getContext("2d");

const shapes = [
  { type: "circle", x: 100, y: 100 },
  { type: "square", x: 200, y: 200 },
];

updateCanvasSizes();
window.onresize = updateCanvasSizes;

drawCircle(figureCtx, 50, 50);
drawCircle(circleCtx, 0, 0);
drawSquare(figureCtx, 50, 200);
drawSquare(squareCtx, 0, 0);

const draw = { circle: drawCircle, square: drawSquare };
shapes.forEach(drawShape);
makeDraggable(circleCanvas);
makeDraggable(squareCanvas);
function makeDraggable(shapeCanvas) {
  shapeCanvas.onmousedown = ({ offsetX, offsetY }) => {
    window.onmousemove = (event) => {
      const x = event.pageX - 11 - offsetX;
      const y = event.pageY - 51 - offsetY;
      shapeCanvas.style.top = y + "px";
      shapeCanvas.style.left = x + "px";
    };
    window.onmouseup = () => {
      window.onmousemove = null;
      const { top, left } = shapeCanvas.style;
      if (!top) return;
      addShape(shapeCanvas.id, parseFloat(left) - 201, parseFloat(top) - 0);
      shapeCanvas.style = "";
    };
  };
}

function addShape(type, x, y) {
  if (
    x < 0 ||
    x > mainCanvas.width - 100 ||
    y < 0 ||
    y > mainCanvas.height - 100
  ) {
    return;
  }

  const shape = { type, x, y };
  shapes.push(shape);
  drawShape(shape);
  console.log(shapes);
}

function updateCanvasSizes() {
  figureCanvas.height = innerHeight - 61;
  mainCanvas.height = innerHeight - 61;
  mainCanvas.width = innerWidth - 223;
}

function drawShape({ type, x, y }) {
  draw[type](mainCtx, x, y);
}

function drawSquare(ctx, x, y) {
  ctx.fillStyle = "black";
  ctx.fillRect(x, y, 100, 100);
  ctx.fillStyle = "green";
  ctx.fillRect(x + 1, y + 1, 98, 98);
}

function drawCircle(ctx, x, y) {
  ctx.fillStyle = "blue";
  ctx.beginPath();
  ctx.arc(x + 50, y + 50, 49.5, 0, 7);
  ctx.fill();
  ctx.stroke();
}
