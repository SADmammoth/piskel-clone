import canvasManager from "./canvasManager.js";
import locator from "./locator.js";

// let flag = false;
// let prevX = 0;
// let prevY = 0;
// function fix_dpi(canvas, dpi) {
//   //get CSS height
//   //the + prefix casts it to an integer
//   //the slice method gets rid of "px"
//   let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
//   //get CSS width
//   let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
//   //scale the canvas
//   canvas.setAttribute('height', style_height * dpi);
//   canvas.setAttribute('width', style_width * dpi);
// }


// $(function () {
//   let rect = $('canvas')[0].getBoundingClientRect();
//   $('canvas').css('alpha', 'false');
//   $('canvas').on('mousedown', function () { this.getContext('2d').beginPath(); flag = true; console.log(1); });
//   $('canvas').on('mouseup', function () { this.getContext('2d').closePath(); flag = false; console.log(2); prevX = 0; prevY = 0; });
//   $('canvas').on('mousemove', function (event) {
//     if (flag) {
//       let ctx = this.getContext('2d');
//       setpixelated(ctx);

//       ctx.rect(convert(event.pageX - rect.left, 500, 320), convert(event.pageY - rect.left, 500, 320), 10, 10);
//       ctx.stroke();
//       console.log(prevX, event.pageX);
//       prevX = convert(event.pageX - rect.left, 500, 320);
//       prevY = convert(event.pageY - rect.top, 500, 320) + 0.5;
//       // setpixelated(ctx);
//       // let rect = this.getBoundingClientRect();
//       // ctx.strokeStyle = 'blue';
//       // console.log('f' + rect.top);
//       // ctx.moveTo(convert(event.pageX - rect.left, 500, 32), convert(event.pageY - rect.top, 500, 32) + 0.5);
//       // if (prevY != 0 || prevX != 0) {
//       //     console.log(prevX, event.pageX);
//       //     ctx.lineTo(prevX, prevY);
//       // }
//       // ctx.stroke();
//       // console.log(3);
//       // prevX = convert(event.pageX - rect.left, 500, 32);
//       // prevY = convert(event.pageY - rect.top, 500, 32) + 0.5;
//     }
//   });
// });

// function convert(val, size_1, size_2) {
//   return val / size_1 * size_2;
// }

// function setpixelated(context) {
//   context['imageSmoothingEnabled'] = false;       /* standard */
//   context['mozImageSmoothingEnabled'] = false;    /* Firefox */
//   context['oImageSmoothingEnabled'] = false;      /* Opera */
//   context['webkitImageSmoothingEnabled'] = false; /* Safari */
//   context['msImageSmoothingEnabled'] = false;     /* IE */
// }

let manager = new canvasManager(32, 32, $('canvas')[0]);
let loc = new locator(manager);

$(function () { $('canvas').on('mousemove', function (event) { loc.drawLocation(event); }); });


