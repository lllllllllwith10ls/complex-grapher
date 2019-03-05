let escapeRadius = 2;
var magnificationFactor = 200;
var posX = 0;
var posY = 0;

let canvas = document.getElementById("mandelbrot");
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
let width  = canvas.width;
let height = canvas.height;
let ctx = canvas.getContext('2d');

function iterate(r,i,iterations) {
	var z = Complex.zero;
	var c = new Complex(r,i);
	var n = 0;
	while(n < iterations && z.abs <= escapeRadius) {
		n++; 
		z = Complex.add(Complex.power(z,new Complex(2,0)),c);
	}

	return n;
}
function render() {
	
	for(let x=0; x < width; x++) {
		for(let y=0; y < height; y++) {
			let n = iterate(x/magnificationFactor-width/2/magnificationFactor-posX,y/magnificationFactor-height/2/magnificationFactor-posY,100);
			if(n >= 50) {
				ctx.fillStyle = "rgb(0,0,0)";
			} else {
				ctx.fillStyle = "rgb("+Math.floor(255*n/100)+",255,255)";
			}
			ctx.fillRect(x,y,1,1);
		} 
	}
}
