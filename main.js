// Init
// ////

let time = 0; // Time variable for sine wave calculation
const amplitude = 50; // Amplitude of sine wave (vertical movement range)
const frequency = 0.05; // Frequency of sine wave (speed of movement)
const cosOffset = 3.14/3; // Pi over 3 for phase offset

var randomFrameCount = 0; // Counts animation frames for random function
var counterCount = 0; // Counts animation frames for counter function
var circleFrameCount = 0; // Counts animation frames for circle random function
var polylineFrameCount = 0; // Counts animation frames for polyline random function
var antsCounter = 0; // Counts animation frames for marching ants


// ///////////////////////////////////////////////

function animate() {

    // Update all math functions
    // /////////////////////////

    const sin = ((amplitude * Math.sin(frequency * time)) + 50) / 100; // +50/100 remaps function to 0-1
    const cos = (amplitude * Math.cos(frequency * time) + 50) / 100;  // +50/100 remaps function to 0-1
    const cosPlusOffset = (amplitude * Math.cos(frequency * time + cosOffset) + 50) / 100;  // +50/100 remaps function to 0-1
    const random = Math.random();
    const hypot = Math.hypot(sin, cos);
    const log = Math.log(counterCount);
    const logWithSine = Math.log(sin);

    // Advance Frame Counters
    // //////////////////////

    randomFrameCount += 1;
    counterCount += 1;
    circleFrameCount += 1;
    antsCounter += 1;


    // Update Bay One: Blue Bars and Color Blocks
    // //////////////////////////////////////////

    document.getElementById("sin").innerHTML = `Sin: ${sin.toFixed(2)}`;
    document.getElementById("sinRect").setAttribute('width', sin*100);

    document.getElementById("cos").innerHTML = `Cos: ${cos.toFixed(2)}`;
    document.getElementById("cosRect").setAttribute('width', cos*100);

    document.getElementById("cosPlusOffset").innerHTML = `Cos+: ${cosPlusOffset.toFixed(2)}`;
    document.getElementById("cosPlusOffsetRect").setAttribute('width', cosPlusOffset*100);

    // Updates values once per indicated frame count
    if (randomFrameCount == 20) {
        document.getElementById("random").innerHTML = `Ran: ${random.toFixed(2)}`;
        document.getElementById("ranRect").setAttribute("width", random.toFixed(2)*100)
        randomFrameCount = 0;
    }

    document.getElementById("counter").innerHTML = `Counter: ${counterCount}`;
    document.getElementById("counterRect").setAttribute("width", counterCount);
    if (counterCount >= 100) {
        counterCount = 0;
    }

    document.getElementById("hypot").innerHTML = `Hypot: ${hypot.toFixed(2)}`;
    document.getElementById("hypotRect").setAttribute("width", hypot.toFixed(2)*100);

    var logValueThisFrame = Math.abs((log*10).toFixed(0));
    if (logValueThisFrame === Infinity) {
        // console.log("Ignoring Infinity!");
    } else {
        document.getElementById("log").innerHTML = `Log+Counter: ${logValueThisFrame}`
        document.getElementById("logRect").setAttribute("width", logValueThisFrame);
    }

    document.getElementById("logWithSine").innerHTML = `Log+Sine: ${Math.abs((logWithSine*10).toFixed(1))}`
    document.getElementById("logWithSineRect").setAttribute("width", Math.abs((logWithSine*10).toFixed(2)));

    document.getElementById("colorRectOne").setAttribute("fill", `rgb(${sin*256} ${cos*256} ${cosPlusOffset*256})`);
    document.getElementById("colorRectTwo").setAttribute("fill", `rgb(${cosPlusOffset*256} ${sin*256} ${cos*256})`);


    // Update Bay Two: Red Circles
    // ///////////////////////////

    var circleOneValue = logValueThisFrame/50 * 40;
    if (logValueThisFrame === Infinity) {
        // console.log("Ignoring Infinity!");
    } else {
        document.getElementById("circleOne").setAttribute("r", circleOneValue);
    }

    document.getElementById("circleTwo").setAttribute("r", (Math.abs((logWithSine*2).toFixed(2)) +5 ));
    document.getElementById("circleThree").setAttribute("r", (counterCount/100)*36);

    // Updates values once per indicated frame count
    if (circleFrameCount == 20) {
        document.getElementById("circleFour").setAttribute("r", ((random*40).toFixed(0)));
        circleFrameCount = 0;
    }

    document.getElementById("circleFive").setAttribute("r", sin*30 +5);
    document.getElementById("circleSix").setAttribute("r", cos*30 +5);

    // Update Bay Three: Green Polylines
    // /////////////////////////////////

    // Original polyline points values: "25 50 50 100 75 50 100 100 125 50 150 100";
    
    var polylineOnePoints = `25 ${sin*50+20} 50 ${cosPlusOffset*50+20} 75 ${sin*50+20} 100 ${cosPlusOffset*50+20} 125 ${sin*50+20} 150 ${cosPlusOffset*50+20}`;
    document.getElementById("polylineOne").setAttribute("points", polylineOnePoints);

    var polylineTwoPoints = `25 50 50 ${Math.random()*50+20} 75 ${Math.random()*50+20} 100 ${Math.random()*50+20} 125 ${Math.random()*50+20} 150 50`;
    polylineFrameCount += 1;
    if (polylineFrameCount == 30) {
        document.getElementById("polylineTwo").setAttribute("points", polylineTwoPoints);
        polylineFrameCount = 0;
    }
    
    var polylineThreePoints = `25 50 50 ${cosPlusOffset*50+20} 75 ${cos*50+20} 100 ${sin*50+20} 125 ${hypot*50+20} 150 50`;
    document.getElementById("polylineThree").setAttribute("points", polylineThreePoints);

    var polylineFourPoints = `${25*sin+25} 50 ${50*sin+26} 100 ${75*sin+27} 50 ${100*sin+28} 100 ${125*sin+29} 50 ${150*sin+30} 100`;
    document.getElementById("polylineFour").setAttribute("points", polylineFourPoints);

    if (logValueThisFrame === Infinity) {
        // console.log("Ignoring Infinity!");
    } else {
        var polylineFivePoints = `25 50 50 ${logValueThisFrame*2+25} 75 50 100 ${logValueThisFrame*2+25} 125 50 150 ${logValueThisFrame*2+25}`;
        document.getElementById("polylineFive").setAttribute("points", polylineFivePoints);
    }

    // Update Bay Four: Pink Marching Ants
    // ///////////////////////////////////

    var antsInterval = 200;
    if (antsCounter < antsInterval) {
        
        document.getElementById("ants").classList.add("marchingAntsLinear");
        document.getElementById("antsLabel").innerHTML = "Ants: Linear";

    } else if (antsCounter == antsInterval) {
        
        document.getElementById("ants").classList.remove("marchingAntsLinear");
        document.getElementById("antsLabel").innerHTML = "Ants: Ease";
        document.getElementById("ants").classList.add("marchingAntsEase");

    } else if (antsCounter == (antsInterval*2)) {

        document.getElementById("antsLabel").innerHTML = "Ants: Bezier One";
        document.getElementById("ants").classList.remove("marchingAntsEase");
        document.getElementById("ants").classList.add("marchingAntsBezierOne");

    } else if (antsCounter == (antsInterval*3)) {

        document.getElementById("antsLabel").innerHTML = "Ants: Bezier Two";
        document.getElementById("ants").classList.remove("marchingAntsBezierOne");
        document.getElementById("ants").classList.add("marchingAntsBezierTwo");

    } else if (antsCounter > antsInterval*4) {
        
        document.getElementById("antsLabel").innerHTML = "Ants: Linear";
        document.getElementById("ants").classList.remove("marchingAntsBezierTwo");
        document.getElementById("ants").classList.add("marchingAntsLinear");
        antsCounter = 0;

    }
    
    // Advance time for math
    time += 0.1;

    // Call the animate function again for the next frame
    requestAnimationFrame(animate);

}

animate();

