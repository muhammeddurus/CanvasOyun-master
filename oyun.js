var canvas = document.createElement("canvas");
canvas.height = 512;
canvas.width = 670;

var button = document.createElement("input");

var sayac = 10;


document.body.appendChild(button);

var score = 0;



button.type = "button"
button.style.position = "relative";
button.style.left = "250px"
button.style.top = "250px";
button.value = "Next Level"
button.style.fontSize = "2em";
button.style.display = "none"


var ctx = canvas.getContext("2d");
document.body.appendChild(canvas);

var area = new Image();
area.src = "images/background3.gif";


var mini = new Image();
mini.src = "images/minion.png";

var star = new Image();
star.src = "images/starwars.png";

var tus = {};

addEventListener('keydown', function (ev) {
    tus[ev.keyCode] = true;
});
addEventListener('keyup', function (event) {
    delete tus[event.keyCode];
});

var starPosX = canvas.width / 2;
var starPosY = canvas.height / 2;

const hizAyari=null;
var hizAyari2;
var starH = {
   hizAyari : 5
};

var miniH = {};

var koordinat = function () {
    starH.x = starPosX; //başlangıç koordinatını giriyoruz.
    starH.y = starPosY;

    miniH.x = (Math.floor(Math.random() * 620 + 10));
    miniH.y = (Math.floor(Math.random() * 460 + 10));
    
};
var timerInterval = null;

function startTimer() {
    sayac=10;
    timerInterval = setInterval(function () {
        if (sayac >= 1) {
            sayac--;
        }
    }, 1000);
  }



var hareket = function () {
    
    //yukarı
    if (38 in tus && starH.y > 7) {
        starH.y -= starH.hizAyari;
    };
    //aşağı
    if (40 in tus && starH.y < 445) {
        starH.y += starH.hizAyari;
    };
    //sola
    if (37 in tus && starH.x > 5) {
        starH.x -= starH.hizAyari;
    };
    //sağa
    if (39 in tus && starH.x < 630) {
        starH.x += starH.hizAyari;
    };
    if (starH.x <= (miniH.x + 32) && starH.y <= (miniH.y + 32) && miniH.x <= (starH.x + 32) && miniH.y <= (starH.y + 32)) {
        score = score + 10;



        if (score < 100) {
            koordinat();
        }
        else if (score = 100) {
            clearInterval(timerInterval);
            showOnFinish();
            
            
            button.addEventListener('click', function () {
            
            area.src="images/a.jpg";
            score = 0;
            
            koordinat();
            
            
            button.style.display = "none";
            
            })
        }



    }


};


function showGameOver() {
    ctx.font = "30px Tahoma";
    ctx.fillStyle = "white";
    ctx.fillText("Game Over", 250, 200);
    ctx.fillText(score, 390, 30);
}

function showOnload() {
    ctx.font = "30px Tahoma";
    ctx.fillStyle = "white";
    ctx.fillText("SCORE:", 500, 30);
    ctx.fillText(score, 615, 30);
}
function Timer() {
    ctx.font = "30px Tahoma";
    ctx.fillStyle = "white";
    ctx.fillText("TIME:", 10, 30);
    ctx.fillText(sayac, 100, 30);
}

function showOnFinish() {
    button.value = "Next Level";
    button.style.display = "block";
}

var ciz = function () {

    ctx.drawImage(area, 0, 0);
    ctx.drawImage(mini, miniH.x, miniH.y);
    ctx.drawImage(star, starH.x, starH.y);
    showOnload();
    Timer();
};

var enSon = function () {
    
    if (sayac > 0) {
        hareket();
        ciz();
        
        requestAnimationFrame(enSon);
    }
    else if (sayac == 0) {
        
        button.value = "Tekrar Dene";
        button.style.display = "block";
        button.addEventListener('click', function () {
            sayac = 10;
            area.src="images/background3.gif";
            score = 0;
            enSon();
            koordinat();
            
            button.style.display = "none";
            

        })
    }

};

koordinat();
enSon();
startTimer();
