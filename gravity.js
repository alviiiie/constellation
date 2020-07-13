/*
* Gravitational n-body algorithm
*/

const g = 39.5;
const dt = 0.008; //0.005 years is equal to 1.825 days
const softeningConstant = 0.15;
const radius = 4; //edit later
const scale = 70;
var canvas;
var ctx;
var width;
var height;
var response_array = [];
var image_array = [];
//nBodyProblem instance: innerSolarSystem
//gravity constant
//time step
//list of masses (grab from database)
//softeningConstant



/*
 * The animate function that sets everything in motion.
 * We run it 60 times a second with the help of requestAnimationFrame
 */
function updatePositionVectors(massI) {
massI.x += massI.vx * dt;
     massI.y += massI.vy * dt;
     massI.z += massI.vz * dt;
}

function updateAccelerationVectors(massI) {
  const massesLen = response_array.length;
    let ax = 0;
    let ay = 0;
    let az = 0;

    for (let j = 0; j < massesLen; j++) {
      if (massI.name !== response_array[j].name) {
        const massJ = response_array[j];

        const dx = massJ.x - massI.x;
        const dy = massJ.y - massI.y;
        const dz = massJ.z - massI.z;

        const distSq = dx * dx + dy * dy + dz * dz;

        const f =
          (g * massJ.m) /
          (distSq * Math.sqrt(distSq + softeningConstant));

        ax += dx * f;
        ay += dy * f;
        az += dz * f;
      }
    }

    massI.ax = ax;
    massI.ay = ay;
    massI.az = az;
}

function updateVelocityVectors(massI) {
    massI.vx += massI.ax * dt;
    massI.vy += massI.ay * dt;
    massI.vz += massI.az * dt;
 }


function animate () {
  /*
   * Advance our simulation by one step
   */

  //Clear the canvas in preparation for the next drawing cycle
  ctx.clearRect(0, 0, width, height);

  //massesLen = number of masses in our list
  const massesLen = response_array.length;


  for (let i = 0; i < massesLen; i++) {
    const massI = response_array[i];
	  if(massI.x){
	  updatePositionVectors(massI);
	  updateAccelerationVectors(massI);
	  updateVelocityVectors(massI);
	}
//console.log(massI.name);
    /*
     * The origin (x = 0, y = 0) of the canvas coordinate system is in the top left corner
     * To prevent our simulation from being centered on the top left corner, include the x and y offsets
     * So that it is centered smack in the middle of the canvas
     */

    const x = width / 2 + massI.x * scale;
    const y = height / 2 + massI.y * scale;

    //display name
    if (massI.name) {
      ctx.font = "14px Arial";
      ctx.fillText(massI.name, x + 0.5, y + 0.5);
      ctx.fill();
    }

    if (massI.image) {
    	ctx.drawImage(image_array[i], x - image_array[i].width/3, y, image_array[i].width / 2, image_array[i].height /2);
    }
    //if (massI.image) {
  //  	var img = new Image();
//	img.onload = function(){
    //		ctx.drawImage(img, x + 12, y + 4);
  //  	};
//	img.src = massI.image;
//	console.log(img.src);
    //}


    //boundary conditions: bounce back if hit bounds
    if (x < radius || x > width - radius) massI.vx = -massI.vx;

    if (y < radius || y > height - radius) massI.vy = -massI.vy;
  }

  requestAnimationFrame(animate);
};

function getStars() {
	$.ajax ( {
	url: "getStars.php",
	dataType: "json",
	success: function ( data, textStatus, jqXHR ) {
        	// process the data, you only need the "data" argument
        	// jQuery will automatically parse the JSON for you!
       		response_array = data;
		for(let n = 0; n < response_array.length; n++){
			const massN = response_array[n];

			massN.m = (Math.random() * (0.5e-1 - 0.1e-2) + 0.1e-1);
			massN.x = (Math.round(Math.random())*2-1)*(Math.random() * (2.00e-6 - 0.5e-6) + 0.5e-6);
			massN.y = (Math.round(Math.random()) * 2 - 1)*(Math.random() * (4.00e-6 - 2.00e-6) + 2.00e-6);
			massN.z = (Math.round(Math.random()) * 2 - 1)*(Math.random() * (6.00e-8 - 2.00e-8) + 2.00e-8);
			massN.vx = (Math.round(Math.random()) * 2 - 1)*(Math.random() * (5 - 1) + 1);
			massN.vy = (Math.round(Math.random()) * 2 - 1)*(Math.random() * (8 - 3) + 3);
			massN.vz = (Math.round(Math.random()) * 2 - 1)*(Math.random() * (7 - 2) + 2);
		      	massN.ax = 0;
			massN.ay = 0;
			massN.az = 0;

			var image = new Image();
			image.src = response_array[n].image;
			image.onload = function() {
				ctx.drawImage(image, massN.x, massN.y);
			}
			image_array[n] = image;

		}
	console.log(response_array);
	}
   });
}

window.onload = () => {
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext("2d");

	width = (canvas.width = window.innerWidth);
	height = (canvas.height = window.innerHeight);
	getStars();
  animate();
}
