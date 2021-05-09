// // how to convert rgb and hex colors
// function hex(r, g, b) {
//     return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
// }
// function rgb(r, g, b) {
//     return `rgb${r}, ${g}, ${b}`;
// }


// // use a factory function to make an object that automatically
// // has a hex method and rgb method and stores the rgb values
// // as properties on the object. 

// // This function makes and returns an object every time it is called. 
// // The resulting objects all follow the same "recipe"

// function makeColor(r, g, b) {
//     // makes an object that starts empty
//     const color = {};
//     // add some properties based on arguments
//     color.r = r; 
//     color.g = g; 
//     color.b = b; 
//     // add some methods uniquely defined on each instance of an object
//     color.rgb = function() {
//         // this refers to the "color" object
//         const {r, g, b} = this;
//         return `rgb(${r}, ${g}, ${b})`;
//     };
//     color.hex = function() {
//         // this refers to the "color" object
//         const {r, g, b} = this;
//         return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
//     }
//     // return the object
//     return color;
// }

// const firstColor = makeColor(35, 255, 150);
// firstColor.hex(); //"#23ff96"
// firstColor.rgb(); //"rgb(35, 255, 150)"
// color1.hex === color2.hex //false

//********************
//Constructor Function
//********************

// // The name is capitalize indicating this is a Constructor Function  
// // Constructor Functions help you to create objects.
// function Color(r, g, b) {
//     this.r = r; 
//     this.g = g; 
//     this.b = b; 
// }

// //If you call it on its own like a regular function
// Color(35, 60, 190); //undefined
// //It returns undefined, because "this" refers to the global scope

// // *****************
// // THE NEW OPERATOR!
// // *****************
// // The new operator lets developers create an instance of a user-defined 
// // object type or of one of the built-in object types that has a constructor function.

// // The new keyword does the following things:
// //     1. Creates a blank, plain JavaScript object.
// //     2. Adds a property to the new object (__proto__) that links to the constructor function's prototype object
// //          Note: Properties/objects added to the construction function prototype are therefore accessible to all instances created from the constructor 
// //          function (using new).
// //     3. Binds the newly created object instance as the this context (i.e. all references to this in the constructor function now refer to the object 
// //        created in the first step).
// //     4. Returns this if the function doesn't return an object.

// // Methods defined on the object prototype
// // Do Not use arrow functions becuase of "this" keyword
// Color.prototype.rgb = function() {
//     const {r, g, b} = this;
//     return `rgb(${r}, ${g}, ${b})`;
// };

// Color.prototype.hex = function() {
//     const {r, g, b} = this;
//     return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
// };

// Color.prototype.rgba = function(a = 1.0) {
//     const {r, g, b} = this; 
//     return `rgba(${r}, ${g}, ${b}, ${a})`;
// };

// const color1 = new Color(40, 50, 60);
// const color2 = new Color(0, 0, 0);

// color1.hex(); // "#28323c"
// color2.rgb(); // "rgb()"
// color1.hex === color2.hex //true

// define a Class
//captialzie when creating class or constructor functions
class Color {
    // #1 - must add constructor
    constructor( r, g, b, name ) {
        // this is the property we are adding to the object
        this.r = r; 
        this.g = g; 
        this.b = b;
        this.name = name;
        this.calcHSL();
    }
    //define a method - added to the prototype automatically
    innerRGB() {
        const { r, g, b } = this;
        return `${r}, ${g}, ${b}`;
    }
    rgb() {
        return `rgb(${this.innerRGB()})`;
    }
    hex() {
        const { r, g, b } = this;
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    rgba(a=1.0) {
        return `rgba(${this.innerRGB()}, ${a})`;
    }
    hsl(){
        const { h, s, l } = this;
        return `hsl(${h}, ${s}%, ${l}%)`
    }
    fullySaturated() {
        const { h, l } = this;
        return `hsl(${h}, 100%, ${l}%)`
    }
    opposite(){
        const { h, s, l } = this;
        const newHue = (h + 180) % 360;
        return `hsl(${newHue}, ${s}%, ${l}%)`
    }
    calcHSL() {
        let { r, g, b } = this;
        //Make r, g, and b fractions of 1
        r /= 255;
        g /= 255;
        b /= 255;
    
        // Find greatest and smalles channel values
        let cmin = Math.min(r, g, b), 
            cmax = Math.max(r, g, b), 
            delta = cmax - cmin,
            h = 0, 
            s = 0, 
            l = 0;
        if(delta == 0) h = 0; 
        else if(cmax == r)
        //Red is max
            h = ((g - b) / delta) % 6; 
        else if (cmax == g)
        //Green is max
            h = (b - r) / delta + 2;
        else
        //Blue is max
            h = (r - g) / delta + 4;
    
        h = Math.round(h * 60);
    
        //Make negative hues positive behind 360
        if(h < 0) h += 360;
        //Calculate lightness
        l = (cmax + cmin) / 2;
    
        //Calculate saturation
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    
        //Multiply l and s by 100
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);
        this.h = h;
        this.s = s; 
        this.l = l;
    }
}
const red = new Color(255, 67, 89, 'tomato');
const white = new Color(255, 255, 255, 'white');
// red.hex === white.hex //true

