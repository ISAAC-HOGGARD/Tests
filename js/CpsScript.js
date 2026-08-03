let button = document.getElementById("btnCPS");
let stopButton = document.getElementById("Btn2");
let numInput = document.getElementById("numInput");
let submitBtn = document.getElementById("submitBtn");
let cpsTime = document.getElementById("timeInfo");
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
    numInput.placeholder = "Change duration";
    button.style.display = "revert";
    stopButton.style.display = "revert";
    numInput.value = "";
});

stopButton.addEventListener("click", function(){
    start = false;
    button.style.display = "revert";
    cpsTime.textContent = "";
    button.textContent = "start";
    stopButton.textContent = "Restart";
    submitBtn.style.display = "revert";
    numInput.style.display = "revert";
    clearInterval(intervalId);
    clearTimeout(timeoutId);
});

let clicks;
let best = Number(localStorage.getItem("best")) || 0;
button.addEventListener("click", function(){
    if (start === false){
        start = true;
        clicks = 0;
        let startTime = Date.now();
        stopButton.textContent = "Stop";
        button.textContent = "click";
        submitBtn.style.display = "none";
        numInput.style.display = "none";
        console.log("The clicker is on");
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
            let cpsDisplay = document.getElementById("cpsInfo");
            if (cps > best){
                best = cps;
                localStorage.setItem("best", best);
                cpsDisplay.textContent = `New best CPS is ${best}`;
            } else {
                cpsDisplay.textContent = `Your CPS was ${cps}`;
            }
            console.log(`Best is ${best}`);
            submitBtn.style.display = "revert";
            numInput.style.display = "revert";
            button.style.display = "none";
            stopButton.textContent = "Restart";
            cpsTime.textContent = "";
            console.log("The clicker is off");
        }, clickTimeMs);
    } else {
        clicks = clicks +1;
        //console.log(clicks)
    }
});
