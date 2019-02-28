class Complex {
	constructor(real,im) {
		this.real = real;
		this.im = im;
	}
	get conj() {
		return new Complex(this.real,-this.im);
	}
	get abs() {
		return Math.sqrt(this.real**2+this.im**2);
	}
	get neg() {
		return new Complex(-this.real,-this.im);
	}
	get recip() {
		return new Complex(this.real/(this.real**2+this.im**2),-this.im/(this.real**2+this.im**2));
	}
	static add(a,b) {
		return new Complex(a.real+b.real,a.im+b.im);
	}
	static mult(a,b) {
		return new Complex(a.real*b.real-a.im*b.im,a.im*b.real+a.real*b.im);
	}
	static sub(a,b) {
		return Complex.add(a,b.neg);
	}
	static div(a,b) {
		return Complex.mult(a,b.recip);
	}
	static exp(a) {
		return new Complex(Math.cos(a.im)*Math.E**a.real,Math.sin(a.im)*Math.E**a.real);
	}
	static log(a) {
		return new Complex(Math.log(Math.sqrt(a.real**2+a.im**2)),Math.atan2(a.im,a.real));
	}
	static power(a,b) {
		return Complex.exp(Complex.mult(b,Complex.log(a)));
	}
	static sin(a) {
		return Complex.div(Complex.exp(Complex.sub(Complex.mult(a,Complex.i),Complex.mult(a,Complex.i.neg))),new Complex(0,2));
	}
	static cos(a) {
		return Complex.div(Complex.exp(Complex.add(Complex.mult(a,Complex.i),Complex.mult(a,Complex.i.neg))),new Complex(2,0));
	}
	static tan(a) {
		return Complex.div(Complex.sin(a),Complex.cos(a));
	}
}
Complex.i = new Complex(0,1);
Complex.one = new Complex(1,0);
Complex.zero = new Complex(0,0);
