let button = document.getElementById("BtnReaction");
let startTime;
let clickable = false;
let timeoutId;

setTimeout(function() {
    let popup = document.getElementById("pop");
    popup.textContent = "";
}, 2000);

document.getElementById("Btn2").addEventListener("click", function() {
    clickable = false;
    console.log(`Clickable - ${clickable}`);
    button.style.backgroundColor = "red";
    button.textContent = "Wait";
    let randomInt = Math.random() + 2;

    timeoutId = setTimeout(function() {
        clickable = true;
        console.log(`Clickable - ${clickable}`);
        button.style.backgroundColor = "Green";
        button.textContent = "Click";   
        startTime = Date.now();
    }, randomInt * 1000);
});

let best = Number(localStorage.getItem("best")) || Infinity;
button.addEventListener("click", function() {
    if (clickable === true) {
        let endTime = Date.now();
        let reactionTime = (endTime - startTime);
        let reaction = document.getElementById("reactionInfo");
        if (reactionTime < best){
            best = reactionTime;
            localStorage.setItem("best", best);
            reaction.textContent = `New best ${best}ms`;
        } else {
            reaction.textContent = `${reactionTime}ms`;
        }
        console.log(`Best is ${best}`);
        console.log(reactionTime);
        clickable = false;
        button.style.backgroundColor = "white";
        button.textContent = "Click Start";
    } else {
        if (button.style.backgroundColor === "red"){
            alert("Click the button when it's green");
        } else{
            alert("Click start")
        }
        button.style.backgroundColor = "white";
        clearTimeout(timeoutId);
    }
});
