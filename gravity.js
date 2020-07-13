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

//nBodyProblem
//METHODS:
//constructor(gravity, dt, softeningConstant, listofMasses)
//updatePositionVectors
//updateVelocityVectors
//updateAccelerationVectors


class nBodyProblem {
    constructor(params) {
      this.g = params.g;
      this.dt = params.dt;
      this.softeningConstant = params.softeningConstant;

      this.masses = params.masses;
    }

    updatePositionVectors() {
      const massesLen = this.masses.length;

      for (let i = 0; i < massesLen; i++) {
        const massI = this.masses[i];

        massI.x += massI.vx * this.dt;
        massI.y += massI.vy * this.dt;
        massI.z += massI.vz * this.dt;
      }

      return this;
    }

    updateVelocityVectors() {
      const massesLen = this.masses.length;

      for (let i = 0; i < massesLen; i++) {
        const massI = this.masses[i];

        massI.vx += massI.ax * this.dt;
        massI.vy += massI.ay * this.dt;
        massI.vz += massI.az * this.dt;
      }
    }

    updateAccelerationVectors() {
      const massesLen = this.masses.length;

      for (let i = 0; i < massesLen; i++) {
        let ax = 0;
        let ay = 0;
        let az = 0;

        const massI = this.masses[i];

        for (let j = 0; j < massesLen; j++) {
          if (i !== j) {
            const massJ = this.masses[j];

            const dx = massJ.x - massI.x;
            const dy = massJ.y - massI.y;
            const dz = massJ.z - massI.z;

            const distSq = dx * dx + dy * dy + dz * dz;

            const f =
              (this.g * massJ.m) /
              (distSq * Math.sqrt(distSq + this.softeningConstant));

            ax += dx * f;
            ay += dy * f;
            az += dz * f;
          }
        }

        massI.ax = ax;
        massI.ay = ay;
        massI.az = az;
      }

      return this;
    }
  }

const masses = [{
    name: "Alvin", //We use solar masses as the unit of mass, so the mass of the Sun is exactly 1
    m: 1.65956463e-2,
    x: -1.50324727873647e-6,
    y: -3.93762725944737e-6,
    z: -4.86567877183925e-8,
    vx: -3.1669325898331,
    vy: 6.85489559263319,
    vz: -7.90076642683254
  },
  {
    name: "Gabe",
    m: 1.65956463e-7,
    x: -0.346390408691506,
    y: -0.272465544507684,
    z: 0.00951633403684172,
    vx: 4.25144321778261,
    vy: -7.61778341043381,
    vz: -1.01249478093275
  }
];
//nBodyProblem instance: innerSolarSystem
//gravity constant
//time step
//list of masses (grab from database)
//softeningConstant

const innerSolarSystem = new nBodyProblem({
    g, //defines the gravity constant
    dt, //defines how fast everything goes
    masses: JSON.parse(JSON.stringify(masses)),//response_array,/*JSON.parse(JSON.stringify(masses))*/ //our list of planets
    softeningConstant
});


//Get the canvas element and its context from the DOM
//const canvas = document.querySelector("#canvas");
//const ctx = canvas.getContext("2d");
/*
const width = canvas.width;
const height = canvas.height;
*/


//const width = (canvas.width = window.innerWidth);
//const height = (canvas.height = window.innerHeight);


/*
 * The animate function that sets everything in motion.
 * We run it 60 times a second with the help of requestAnimationFrame
 */

function animate () {
  /*
   * Advance our simulation by one step
   */

  innerSolarSystem
    .updatePositionVectors()
    .updateAccelerationVectors()
    .updateVelocityVectors();


  //Clear the canvas in preparation for the next drawing cycle
  ctx.clearRect(0, 0, width, height);

  //massesLen = number of masses in our list
  const massesLen = innerSolarSystem.masses.length;


  for (let i = 0; i < massesLen; i++) {
    const massI = innerSolarSystem.masses[i];

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
      ctx.fillText(massI.name, x + 12, y + 4);
      ctx.fill();
    }

    //boundary conditions: bounce back if hit bounds
    if (x < radius || x > width - radius) massI.vx = -massI.vx;

    if (y < radius || y > height - radius) massI.vy = -massI.vy;
  }

  requestAnimationFrame(animate);
};

window.onload = () => {
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext("2d");

	width = (canvas.width = window.innerWidth);
	height = (canvas.height = window.innerHeight);
	animate();
	getStars();
}

function getStars() {
	$.ajax ( {
	url: "getStars.php",
	dataType: "json",
	success: function ( data, textStatus, jqXHR ) {
        	// process the data, you only need the "data" argument
        	// jQuery will automatically parse the JSON for you!
       		response_array = data;
		        console.log(response_array);
        console.log("hello world");
	}
   });

}
