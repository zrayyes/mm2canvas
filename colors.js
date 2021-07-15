export const COLORS = [
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
export function invertColor(hexTripletColor) {
    var color = hexTripletColor;
    color = color.substring(1);
    color = parseInt(color, 16);
    color = 0xFFFFFF ^ color;
    color = color.toString(16);
    color = ("000000" + color).slice(-6);
    color = "#" + color;
    return color;
}