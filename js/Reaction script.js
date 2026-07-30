let button = document.getElementById("BtnReaction");
let startTime;
let clickable = false;
let timeoutId;

setTimeout(function() {
    let popup = document.getElementById("pop");
    popup.textContent = "";
}, 4000);

document.getElementById("Btn2").addEventListener("click", function() {
    clickable = false;
    console.log(`Clickable - ${clickable}`);
    button.style.backgroundColor = "Red";
    let randomInt = Math.random() + 2;

    timeoutId = setTimeout(function() {
        clickable = true;
        console.log(`Clickable - ${clickable}`);
        button.style.backgroundColor = "Green";
        startTime = Date.now();
    }, randomInt * 1000);
});

button.addEventListener("click", function() {
    if (clickable === true) {
        let endTime = Date.now();
        let reactionTime = (endTime - startTime);
        console.log(reactionTime);
        let reaction = document.getElementById("reactionInfo");
        reaction.textContent = `${reactionTime}ms`
        clickable = false;
        button.style.backgroundColor = "white";
    } else {
        alert("Click the button when it's green");
        button.style.backgroundColor = "white";
        clearTimeout(timeoutId);
    }
});
