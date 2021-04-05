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

const MOVE = {
    STATIONARY: 0,
    LEFT: 1,
    RIGHT: 2
}

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
        this.move = MOVE.STATIONARY;
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

        // Highlight current color
        this.picker.fillStyle = invertColor(COLORS[this.currentColor][0]);
        this.picker.fillRect(this.getColorPickerX(this.currentColor) - 2, this.getColorPickerY(this.currentColor) - 2, 16, 16);


        // Draw colors
        for (let [index, color] of COLORS.entries()) {
            this.picker.fillStyle = color[0];
            this.picker.fillRect(this.getColorPickerX(index), this.getColorPickerY(index), 12, 12);
        }
    }

    drawCanvas() {
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, this.width * this.blockSize, this.height * this.blockSize);
    }

    update() {
        switch (this.move) {
            case MOVE.LEFT:
                this.currentColor = (this.currentColor === 0) ? 16 : this.currentColor - 1;
                break;
            case MOVE.RIGHT:
                this.currentColor = (this.currentColor === 16) ? 0 : this.currentColor + 1;
                break;
            default:
                break;
        }
        this.move = MOVE.STATIONARY;
    }
}

const c = new Canvas();

const haveEvents = 'ongamepadconnected' in window;
const controllers = {};

function connecthandler(e) {
    console.log("Gamepad detected.")
    addgamepad(e.gamepad);
}

function addgamepad(gamepad) {
    controllers[gamepad.index] = gamepad;
    console.log(`Gamepad ${gamepad.index} added.`)
    requestAnimationFrame(updateStatus);
}

function disconnecthandler(e) {
    console.log(`Gamepad disconnected.`)
    removegamepad(e.gamepad);
}

function removegamepad(gamepad) {
    delete controllers[gamepad.index];
    console.log(`Gamepad ${gamepad.index} deleted.`)
}


function updateStatus() {
    if (!haveEvents) {
        scangamepads();
    }

    for (let j in controllers) {
        const controller = controllers[j];

        for (let i = 0; i < controller.buttons.length; i++) {
            let val = controller.buttons[i];
            let pressed = val == 1.0;
            if (typeof (val) == "object") {
                pressed = val.pressed;
                val = val.value;
            }

            if (pressed) {
                switch (i) {
                    case 4: // L
                        c.move = MOVE.LEFT;
                        break;
                    case 5: // R
                        c.move = MOVE.RIGHT;
                        break;
                }
            } else {
                c.MOVE = MOVE.STATIONARY;
            }
        }

        // for (let i = 0; i < controller.axes.length; i++) {
        //     console.log(controller.axes[i].toFixed(4));
        // }
    }


    c.update()
    c.drawPicker();
    c.drawCanvas();
    requestAnimationFrame(updateStatus);
}

function scangamepads() {
    var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
    for (let i = 0; i < gamepads.length; i++) {
        if (gamepads[i]) {
            if (gamepads[i].index in controllers) {
                controllers[gamepads[i].index] = gamepads[i];
            } else {
                addgamepad(gamepads[i]);
            }
        }
    }
}

window.addEventListener("gamepadconnected", connecthandler);
window.addEventListener("gamepaddisconnected", disconnecthandler);


if (!haveEvents) {
    setInterval(scangamepads, 500);
}