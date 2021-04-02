const COLORS = [
    ["#fe1600", "Light red"],
    ["#bb1000", "Dark red"],
    ["#fff3d0", "Light brown"],
    ["#ad7f46", "Dark brown"],
    ["#fff001", "Yellow"],
    ["#fec100", "Orange"],
    ["#03d901", "Light green"],
    ["#00bb00", "Dark green"],
    ["#01e9ff", "Light blue"],
    ["#000eff", "Dark blue"],
    ["#ba62fe", "Light purple"],
    ["#8617ba", "Dark purple"],
    ["#fec0fd", "Light pink"],
    ["#b81889", "Dark pink"],
    ["#bbbabb", "Gray"],
    ["#000000", "Black"],
    ["#ffffff", "White"],
];

// Thanks to https://jsfiddle.net/salman/f9Re3/
function invertColor(hexTripletColor) {
    var color = hexTripletColor;
    color = color.substring(1);
    color = parseInt(color, 16);
    color = 0xFFFFFF ^ color;
    color = color.toString(16);
    color = ("000000" + color).slice(-6);
    color = "#" + color;
    return color;
}

class Canvas {
    constructor() {
        this.width = 320;
        this.height = 180;
        this.blockSize = 5;
        this.picker = document.getElementById('colors').getContext('2d');
        this.ctx = document.getElementById('canvas').getContext('2d');
        this.currentColor = 15;
    }

    getColorPickerX(index) {
        return (12 * index) + 5
    }

    getColorPickerY(index) {
        return (index % 2 === 0) ? 45 : 60
    }

    drawPicker() {
        this.picker.fillStyle = 'lavender';
        this.picker.fillRect(0, 0, this.width, this.height / 2);

        this.picker.fillStyle = 'black';
        this.picker.font = '16px serif';
        this.picker.fillText('Color Picker', 1, 16);

        // Draw colors
        for (let [index, color] of COLORS.entries()) {
            this.picker.fillStyle = color[0];
            this.picker.fillRect(this.getColorPickerX(index), this.getColorPickerY(index), 12, 12);
        }
    }

    drawCanvas() {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.width * this.blockSize, this.height * this.blockSize);
    }

    highlightCurrentColor() {
        const index = this.currentColor;
        this.picker.fillStyle = invertColor(COLORS[index][0]);
        this.picker.fillRect(this.getColorPickerX(index) - 2, this.getColorPickerY(index) - 2, 16, 16);

        this.picker.fillStyle = COLORS[index][0];
        this.picker.fillRect(this.getColorPickerX(index), this.getColorPickerY(index), 12, 12);
    }
}

const c = new Canvas();
c.drawPicker();
c.drawCanvas();
c.highlightCurrentColor();