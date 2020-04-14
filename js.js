var baseImg = null;
var grayImg = null;
var redImg = null;
var blurImg = null;
var sharkImg = null;
var canv = null;
var is_red = false;

function is_loaded(img) {
	if(img == null || !img.complete()) {
		return false;
	} else {
		return true;
	}
}

function loadImage() {
	var imgFile = document.getElementById("imgBtn");
	baseImg = new SimpleImage(imgFile);
	grayImg = new SimpleImage(imgFile);
	redImg = new SimpleImage(imgFile);
	blurImg = new SimpleImage(imgFile);
	sharkImg = new SimpleImage(imgFile);
	canv = document.getElementById("canvas1");
	baseImg.drawTo(canv);
	document.getElementById("errorSpace").innerHTML = "";
}

function applyGrayscale() {
	if(is_loaded(baseImg)) {
		var averageVal = 0;
		for(pixel of grayImg.values()) {
			averageVal = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
			pixel.setRed(averageVal);
			pixel.setGreen(averageVal);
			pixel.setBlue(averageVal);
		}
		grayImg.drawTo(canv);
	} else {
		document.getElementById("errorSpace").innerHTML = "Please upload a picture first!";
	}
}

function makeRed(redImg) {
	var avg = 0;
	for(var pixel of redImg.values()) {
		avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
		if(avg < 128) {
			pixel.setRed(2 * avg);
			pixel.setGreen(0);
			pixel.setBlue(0);
		} else {
			pixel.setRed(255);
			pixel.setGreen(2*avg-255);
			pixel.setBlue(2*avg-255);
		}
	}
	return true;
}

function applyRed() {
	if(!is_red) {
		if(is_loaded(baseImg)) {
		is_red = makeRed(redImg);
		redImg.drawTo(canv);
		} else {
			document.getElementById("errorSpace").innerHTML = "Please upload a picture first!";
		}
	} else {
		redImg.drawTo(canv);
	}
}

// 7 colors [RED(255,0,0), ORANGE(255,165,0), YELLOW(255,255,0), GREEN(0,255,0), 
//           BLUE(0,0,255), INDIGO(51,0,153), VIOLET(127, 0, 255)]
function applyRainbow() {
	if(is_loaded(baseImg)) {
		var rainbowImg = new SimpleImage(baseImg.getWidth(), baseImg.getHeight());
		var y = 0;
		var temp_x, temp_y;
		var len = rainbowImg.getHeight()/7;
		// create rainbow image
		for(pixel of rainbowImg.values()) {
			y = pixel.getY();
			switch(true) {
				case(y < 1*len): // RED(255,0,0)
					pixel.setRed(255);
					pixel.setGreen(0);
					pixel.setBlue(0);
					break;
				case(y < 2*len && y >= 1*len): // ORANGE(255,165,0)
					pixel.setRed(255);
					pixel.setGreen(165);
					pixel.setBlue(0);
					break;
				case(y < 3*len && y >= 2*len): // YELLOW(255,255,0)
					pixel.setRed(255);
					pixel.setGreen(255);
					pixel.setBlue(0);
					break;
				case(y < 4*len && y >= 3*len): // GREEN(0,255,0)
					pixel.setRed(0);
					pixel.setGreen(255);
					pixel.setBlue(0);
					break;
				case(y < 5*len && y >= 4*len): // BLUE(0,0,255)
					pixel.setRed(0);
					pixel.setGreen(0);
					pixel.setBlue(255);
					break;
				case(y < 6*len && y >= 5*len): // INDIGO(51,0,153)
					pixel.setRed(51);
					pixel.setGreen(0);
					pixel.setBlue(153);
					break;
				case(y >= 6*len): // VIOLET(127, 0, 255)
					pixel.setRed(127);
					pixel.setGreen(0);
					pixel.setBlue(255);
					break;
			}
		}
		for (pixel of rainbowImg.values()) {
			temp_x = pixel.getX();
			temp_y = pixel.getY();
			pixel.setRed((rainbowImg.getRed(temp_x, temp_y) + baseImg.getRed(temp_x, temp_y)) / 2);
			pixel.setGreen((rainbowImg.getGreen(temp_x, temp_y) + baseImg.getGreen(temp_x, temp_y)) / 2);
			pixel.setBlue((rainbowImg.getBlue(temp_x, temp_y) + baseImg.getBlue(temp_x, temp_y)) / 2);
		}
		rainbowImg.drawTo(canv);
	} else {
		document.getElementById("errorSpace").innerHTML = "Please upload a picture first!";
	}
}

function applyBlur() {
	if(is_loaded(baseImg)) {
		var blurRadius = 6;
		var x, y, i_temp;
		var w = blurImg.getWidth();
		var h = blurImg.getHeight();
		for(pixel of blurImg.values()) {
			x = pixel.getX();
			y = pixel.getY();
			if(x >= blurRadius && x <= w-blurRadius) {
				if(x % blurRadius == 0) {
					for(i_temp = 1; i_temp < 2*blurRadius; i_temp++) {
						blurImg.setPixel(x - blurRadius + i_temp, y, blurImg.getPixel(x, y));
					}
				}
			}
			if(y >= blurRadius && y <= h-blurRadius) {
				if(y % blurRadius == 0) {
					for(i_temp = 1; i_temp < 2*blurRadius; i_temp++) {
						blurImg.setPixel(x, y - blurRadius +i_temp, blurImg.getPixel(x, y));
					}
				}
			}
		}
		blurImg.drawTo(canv);
		console.log("Blur ended");
	} else {
		document.getElementById("errorSpace").innerHTML = "Please upload a picture first!";
	}
}

function clearCanv() {
	if(is_loaded(baseImg)) {
		baseImg.drawTo(canv);
	}
}

function applyShark() {
	if(is_loaded(baseImg)) {
		var x = 0;
		var y = 0;
		var h = sharkImg.getHeight();
		for(var pixel of sharkImg.values()) {
			x = pixel.getX();
			y = pixel.getY();
			if((y-50 < 20*Math.sin(0.1*x)) || (h - y  -50 < 20*Math.sin(0.1*x))) {
				pixel.setRed(255);
				pixel.setGreen(255);
				pixel.setBlue(0);
			}
		}
		sharkImg.drawTo(canv);
	} else {
		document.getElementById("errorSpace").innerHTML = "Please upload a picture first!";
	}
}