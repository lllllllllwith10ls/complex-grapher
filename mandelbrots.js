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

function iterate(eq,r,i,iterations) {
	var z = Complex.zero;
	var c = new Complex(r,i);
	var n = 0;
	while(n < iterations && z.abs <= escapeRadius) {
		n++; 
		z = solve(eq,z,c);
	}

	return n;
}
function solveHelp(eq) {
	let num = eq.indexOf("+");
	if(num > -1) {
		let array = eq.split(/\+(.+)/);
		array[0] = solveHelp(array[0]);
		array[1] = solveHelp(array[1]);
		array.unshift("add");
		return array;
	}
	num = eq.indexOf("-");
	if(num > -1) {
		let array = eq.split(/\-(.+)/);
		array[0] = solveHelp(array[0]);
		array[1] = solveHelp(array[1]);
		array.unshift("minus");
		return array;
	}
	num = eq.indexOf("*");
	if(num > -1) {
		let array = eq.split(/\*(.+)/);
		array[0] = solveHelp(array[0]);
		array[1] = solveHelp(array[1]);
		array.unshift("times");
		return array;
	}
	num = eq.indexOf("/");
	if(num > -1) {
		let array = eq.split(/\/(.+)/);
		array[0] = solveHelp(array[0]);
		array[1] = solveHelp(array[1]);
		array.unshift("divide");
		return array;
	}
	num = eq.indexOf("^");
	if(num > -1) {
		let array = eq.split(/\^(.+)/);
		array[0] = solveHelp(array[0]);
		array[1] = solveHelp(array[1]);
		array.unshift("power");
		return array;
	}
	num = eq.indexOf("log(");
	if(num === 0) {
		let num2 = findComma(eq,3);
		array = [eq.subString(4,num2),eq.subString(num2+1,eq.length-2)];
		array[0] = solveHelp(array[0]);
		array[1] = solveHelp(array[1]);
		array.unshift("log");
		return array;
	}
	num = eq.indexOf("cos(");
	if(num === 0) {
		let array = [eq.subString(4,eq.length-2)];
		array[0] = solveHelp(array[0]);
		array.unshift("cos");
		return array;
	}
	num = eq.indexOf("sin(");
	if(num === 0) {
		let array = [eq.subString(4,eq.length-2)];
		array[0] = solveHelp(array[0]);
		array.unshift("sin");
		return array;
	}
	num = eq.indexOf("tan(");
	if(num === 0) {
		let array = [eq.subString(4,eq.length-2)];
		array[0] = solveHelp(array[0]);
		array.unshift("tan");
		return array;
	}
	return eq;
	
}
function solve(eq,c,z) {
	if(typeof eq[1] === "array") {
		eq[1] = solveHelp2(eq[1],c,z);
	}
	if(typeof eq[2] === "array") {
		eq[2] = solveHelp2(eq[1],c,z);
	}
	if(!isNaN(parseInt(eq[1]))) {
		if(eq[1][eq[1].length-1] === "i") {
			eq[1] = new Complex(0,parseInt(eq[1]));
		} else {
			eq[1] = new Complex(parseInt(eq[1]),0);
		}
	}
	if(!isNaN(parseInt(eq[2]))) {
		if(eq[2][eq[2].length-1] === "i") {
			eq[2] = new Complex(0,parseInt(eq[2]));
		} else {
			eq[2] = new Complex(parseInt(eq[2]),0);
		}
	}
	if(eq[1] === "e") {
		eq[1] = Complex.e;
	}
	if(eq[1] === "pi") {
		eq[1] = Complex.pi;
	}
	if(eq[1] === "i") {
		eq[1] = Complex.i;
	}
	if(eq[1] === "z") {
		eq[1] = z;
	}
	if(eq[1] === "c") {
		eq[1] = c;
	}
	
	if(eq[2] === "e") {
		eq[2] = Complex.e;
	}
	if(eq[2] === "pi") {
		eq[2] = Complex.pi;
	}
	if(eq[2] === "i") {
		eq[2] = Complex.i;
	}
	if(eq[2] === "z") {
		eq[2] = z;
	}
	if(eq[2] === "c") {
		eq[2] = c;
	}
	
	if(eq[0] === "add") {
		return Complex.add(eq[1],eq[2]);
	}
	if(eq[0] === "mult") {
		return Complex.mult(eq[1],eq[2]);
	}
	if(eq[0] === "minus") {
		return Complex.sub(eq[1],eq[2]);
	}
	if(eq[0] === "divide") {
		return Complex.div(eq[1],eq[2]);
	}
	if(eq[0] === "power") {
		return Complex.power(eq[1],eq[2]);
	}
	if(eq[0] === "log") {
		return Complex.logBase(eq[1],eq[2]);
	}
	if(eq[0] === "cos") {
		return Complex.cos(eq[1]);
	}
	if(eq[0] === "sin") {
		return Complex.sin(eq[1]);
	}
	if(eq[0] === "tan") {
		return Complex.tan(eq[1]);
	}
}
function findComma(eq,num) {
	let i = num;
	let parentheses = 1;
	while(parentheses > 0) {
		i++;
		if(eq[i] === "(") {
			parentheses++;
		}
		if(eq[i] === ")") {
			parentheses--;
		}
		if(eq[i] === "," && parentheses === 1) {
			return i;
		}
	}
	return -1;
}
function render(eq,iterations) {
	
	eq = solveHelp(eq);
	for(let x=0; x < width; x++) {
		for(let y=0; y < height; y++) {
			let n = iterate(eq,x/magnificationFactor-width/2/magnificationFactor-posX,y/magnificationFactor-height/2/magnificationFactor-posY,iterations);
			if(n >= iterations) {
				ctx.fillStyle = "rgb(0,0,0)";
			} else {
				ctx.fillStyle = "rgb("+Math.floor(255*n/iterations)+",0,0)";
			}
			ctx.fillRect(x,y,1,1);
		} 
	}
}
