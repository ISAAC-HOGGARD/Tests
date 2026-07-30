let button = document.getElementById("btnCPS");
let stopButton = document.getElementById("Btn2");
let numInput = document.getElementById("numInput");
let submitBtn = document.getElementById("submitBtn");
let start = false;
let clickTimeMs;
let clickTimeS;
let intervalId;
let timeoutId;

button.textContent = "start";
button.style.display = "none";
stopButton.style.display = "none";

submitBtn.addEventListener("click", function() {
    input = numInput.value;
    if (input === "" || isNaN(input) || Number(input) <= 0){
        alert("Please enter a positive number");
        return;
    }
    clickTimeMs = (Number(numInput.value)) * 1000;
    clickTimeS = Number(numInput.value);
    console.log(`Click time is ${clickTimeS}`);
    button.style.display = "revert";
    stopButton.style.display = "revert";
    numInput.value = "";
})

stopButton.addEventListener("click", function(){
    start = false;
    button.style.display = "revert";
    button.textContent = "start";
    clearInterval(intervalId);
    clearTimeout(timeoutId);
})

let best
let clicks;
button.addEventListener("click", function(){
    if (start === false){
        start = true;
        button.textContent = "click";
        clicks = 0;
        let startTime = Date.now();
        console.log("The clicker is on");
        submitBtn.style.display = "none";
        numInput.style.display = "none";
        let cpsTime = document.getElementById("timeInfo");
        cpsTime.textContent = `Time left: ${clickTimeS}`;

        intervalId = setInterval(function() {
            let secondsLeft = Number(((clickTimeS -(Date.now() - startTime) / 1000)).toFixed(0));
            cpsTime.textContent = `Time left: ${secondsLeft}`;
        }, 1000);

        timeoutId = setTimeout(function() {
            start = false;
            let endTime = Date.now();
            clearInterval(intervalId);
            let totalTime = (endTime-startTime) / 1000;
            console.log(`clicks is ${clicks}, time is ${totalTime}`);
            let cps = clicks/totalTime;
            cps = Number(cps.toFixed(2));
            console.log(`You got ${cps} CPS`);
            if (cps > best || isNaN(best)){
                best = cps;
                console.log(`Best is ${best}`);
            }
            submitBtn.style.display = "revert";
            numInput.style.display = "revert";
            console.log("The clicker is off");
            let cpsDisplay = document.getElementById("cpsInfo");
            cpsDisplay.textContent = `Your CPS was ${cps}`;
            cpsTime.textContent = "";
            button.style.display = "none";
        }, clickTimeMs);
    } else {
        clicks = clicks +1;
        //console.log(clicks)
    }
})
