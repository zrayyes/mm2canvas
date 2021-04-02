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


class Canvas {
    constructor() {
        this.width = 320;
        this.height = 180;
        this.blockSize = 5;
    }

    drawTop() {
        const ctx = document.getElementById('colors').getContext('2d');
        ctx.fillStyle = 'lavender';
        ctx.fillRect(0, 0, this.width, this.height / 2);

        ctx.fillStyle = 'black';
        ctx.font = '16px serif';
        ctx.fillText('Color Picker', 1, 16);

        // Draw colors
        for (let [i, color] of COLORS.entries()) {
            ctx.fillStyle = color[0];
            if (i % 2 === 0) {
                ctx.fillRect((12 * i), 45, 12, 12);
            } else {
                ctx.fillRect((12 * i), 60, 12, 12);
            }
        }
    }

    drawCanvas() {
        const ctx = document.getElementById('canvas').getContext('2d');

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, this.width * this.blockSize, this.height * this.blockSize);
    }
}

const c = new Canvas();
c.drawTop();
c.drawCanvas();
