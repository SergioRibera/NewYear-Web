var rockets = [];
var sparkles = [];
var moving = true;
var gravity = 0.4;

let sets = {
    txt: "Happy New Year",
    year: 2021
};
window.addEventListener("load", (e) => {
    let a = document.getElementById("txt-ny-t");
    a.innerText = sets.txt;
    a = document.getElementById("txt-ny-y");a.innerText = sets.year;
});

function setup() {
    // put setup code here
    createCanvas(windowWidth, windowHeight);
    background(0);
    strokeWeight(1);
    colorMode(HSB);
    var thisRocket = new rocket();
    rockets.push(thisRocket);
}
function draw() {
    // put drawing code here
    translate(width / 2, height);
    background('rgba(0,0,0, 0.1)');
    for (var i = rockets.length - 1; i >= 0; i--) {
        if (rockets[i].type == "Exploded")
            rockets.splice(i, 1);
        else
            rockets[i].draw();
    }
    for (var i = sparkles.length - 1; i >= 0; i--) {
        if (sparkles[i].position.y > 0 || sparkles[i].brt <= 0)
            sparkles.splice(i, 1);
        else
            sparkles[i].draw();
    }
    if (int(random(0, 12)) == 0) {
        var thisRocket = new rocket();
        rockets.push(thisRocket);
    }
}
function rocket(position, speed, type, sparkler, afterblow) {
    //  stroke(255);
    if (position == undefined)
        this.position = createVector(int(random(-width / 2, width / 2)), 0);
    else
        this.position = position.copy();
    if (speed == undefined)
        this.speed = createVector(random(-1, 1), -random(10, 22));
    else
        this.speed = speed.copy();
    if (afterblow == undefined)
        this.afterblow = -1;
    else
        this.afterblow = afterblow;
    if (sparkler == undefined)
        this.sparkler = round(random(0, 1)) == 0;
    else
        this.sparkler = sparkler;
    this.fuse = random(-1, 1);
    this.hue = round(random(0, 360));
    this.type = type;
    if (type == undefined) {
        typeIndex = int(random(0, 9));
        switch (typeIndex) {
            case 0:
                this.type = "simple";
                break;
            case 2:
                this.type = "directed";
                break;
            case 3:
                this.type = "burster";
                break;
            case 4:
                this.type = "double";
                break;
            case 5:
                this.type = "mega";
                break;
            case 6:
                this.type = "sparkleBlinker";
                break;
            case 7:
                this.type = "writer";
                break;
            case 8:
                this.type = "swirler";
                break;
        }
    }
    this.draw = function() {
        stroke(255);
        if (this.fuse < this.speed.y || this.afterblow >= 0)
            this.explode();
        if (this.sparkler) {
            sparkleDir = random(0, TWO_PI);
            sparkleVel = random(0, 1);
            sparkleSpd = createVector(sparkleVel * cos(sparkleDir), sparkleVel * sin(sparkleDir))
            thisSparkle = new sparkle(createVector(this.position.x + sparkleSpd.x, this.position.y + sparkleSpd.y), sparkleSpd.copy(), random(50, 75), round(random(20, 40)), round(random(0, 30)));
            sparkles.push(thisSparkle);
        }
        stroke(this.hue + round(random(-10, +10)), random(0, 20), 90);
        point(this.position.x, this.position.y);
        this.position.add(this.speed);
        this.speed.y = this.speed.y + gravity;
    }
    this.explode = function() {
        switch (this.type) {
            case "directed":
                {
                    var dir = random(0, TWO_PI);
                    for (var i = 0; i < 50; i++) {
                        sparkleDir = dir + random(0, PI / 1.5);
                        sparkleVel = random(3, 5);
                        sparkleSpd = createVector(this.speed.x + sparkleVel * cos(sparkleDir), this.speed.y + sparkleVel * sin(sparkleDir))
                        thisSparkle = new sparkle(this.position.copy(), sparkleSpd.copy(), random(3, 8), this.hue + round(random(-10, +10)), round(random(0, 40)));
                        sparkles.push(thisSparkle);
                    }
                    this.type = "Exploded";
                }
                break;
            case "burster":
                {
                    for (var i = 0; i < 60; i++) {
                        sparkleDir = random(0, TWO_PI);
                        sparkleVel = random(0, 3) + random(0, 3);
                        sparkleSpd = createVector(this.speed.x + sparkleVel * cos(sparkleDir), this.speed.y + sparkleVel * sin(sparkleDir))
                        thisSparkle = new sparkle(this.position.copy(), sparkleSpd.copy(), random(3, 8), this.hue + round(random(-10, +10)), round(random(0, 40)), "sparkler");
                        sparkles.push(thisSparkle);
                    }
                    this.type = "Exploded";
                }
                break;
            case "double":
                {
                    for (var i = 0; i < 90; i++) {
                        sparkleDir = random(0, TWO_PI);
                        sparkleVel = random(3, 5);
                        sparkleSpd = createVector(this.speed.x + sparkleVel * cos(sparkleDir), this.speed.y + sparkleVel * sin(sparkleDir))
                        thisSparkle = new sparkle(this.position.copy(), sparkleSpd.copy(), random(2, 4), this.hue + round(random(-10, +10)), round(random(0, 40)));
                        sparkles.push(thisSparkle);
                    }
                    for (var i = 0; i < 10; i++) {
                        sparkleDir = random(0, TWO_PI);
                        sparkleVel = random(0, .5);
                        sparkleSpd = createVector(this.speed.x + sparkleVel * cos(sparkleDir), this.speed.y + sparkleVel * sin(sparkleDir))
                        thisSparkle = new sparkle(this.position.copy(), sparkleSpd.copy(), random(2, 4), this.hue + round(random(-10, +10)), round(random(0, 40)));
                        sparkles.push(thisSparkle);
                    }
                    this.type = "Exploded";
                }
                break;
            case "mega":
                {
                    for (var i = 0; i < 1000; i++) {
                        sparkleDir = random(0, TWO_PI);
                        sparkleVel = random(0, 4) + random(0, 4);
                        sparkleSpd = createVector(this.speed.x + sparkleVel * cos(sparkleDir), this.speed.y + sparkleVel * sin(sparkleDir))
                        thisSparkle = new sparkle(this.position.copy(), sparkleSpd.copy(), random(3, 8), this.hue + round(random(-10, +10)), round(random(0, 40)));
                        sparkles.push(thisSparkle);
                    }
                    this.type = "Exploded";
                }
                break;
            case "sparkleBlinker":
                {
                    for (var i = 0; i < 100; i++) {
                        sparkleDir = random(0, TWO_PI);
                        sparkleVel = random(0, 2) + random(0, 3);
                        sparkleSpd = createVector(this.speed.x + sparkleVel * cos(sparkleDir), this.speed.y + sparkleVel * sin(sparkleDir))
                        thisSparkle = new sparkle(this.position.copy(), sparkleSpd.copy(), random(1, 3), this.hue + round(random(-10, +10)), round(random(0, 40)), "blinker");
                        sparkles.push(thisSparkle);
                    }
                    this.type = "Exploded";
                }
                break;
            case "writer":
                {
                    for (var i = 0; i < 100; i++) {
                        sparkleDir = random(0, TWO_PI);
                        sparkleVel = random(0, 2) + random(0, 3);
                        sparkleSpd = createVector(this.speed.x + sparkleVel * cos(sparkleDir), this.speed.y + sparkleVel * sin(sparkleDir))
                        thisSparkle = new sparkle(this.position.copy(), sparkleSpd.copy(), random(1, 3), this.hue + round(random(-10, +10)), round(random(0, 40)), "writer");
                        sparkles.push(thisSparkle);
                    }
                    this.type = "Exploded";
                }
                break;
            case "swirler":
                {
                    for (var i = 0; i < 60; i++) {
                        sparkleDir = random(0, TWO_PI);
                        sparkleVel = random(0, 3) + random(0, 3);
                        sparkleSpd = createVector(this.speed.x + sparkleVel * cos(sparkleDir), this.speed.y + sparkleVel * sin(sparkleDir))
                        thisSparkle = new sparkle(this.position.copy(), sparkleSpd.copy(), random(3, 8), this.hue + round(random(-10, +10)), round(random(0, 40)), "swirler");
                        sparkles.push(thisSparkle);
                    }
                    this.type = "Exploded";
                }
                break;
            default:
                {
                    for (var i = 0; i < 100; i++) {
                        sparkleDir = random(0, TWO_PI);
                        sparkleVel = random(0, 5);
                        sparkleSpd = createVector(this.speed.x + sparkleVel * cos(sparkleDir), this.speed.y + sparkleVel * sin(sparkleDir))
                        thisSparkle = new sparkle(this.position.copy(), sparkleSpd.copy(), random(1, 3), this.hue + round(random(-10, +10)), 0);
                        sparkles.push(thisSparkle);
                    }
                    this.type = "Exploded";
                }
        }
    }
}
function sparkle(position, speed, fade, hue, sat, type) {
    this.position = position.copy();
    this.speed = speed.copy();
    this.fade = (fade == undefined ? 5 : fade);
    this.hue = (hue == undefined ? 360 : hue);
    this.sat = (sat == undefined ? 0 : sat);
    this.type = (type == undefined ? "default" : type);
    this.brt = 255;
    this.burntime = 0;
    this.draw = function() {
        stroke(this.hue, this.sat, this.brt);
        newPositionX = this.position.x + log(this.burntime) * 8 * this.speed.x;
        newPositionY = this.position.y + log(this.burntime) * 8 * this.speed.y + this.burntime * gravity;
        point(newPositionX, newPositionY);
        if (this.type == "writer" && this.burntime > 1) {
            line(newPositionX, newPositionY, this.position.x + log(this.burntime - 2) * 8 * this.speed.x, this.position.y + log(this.burntime - 2) * 8 * this.speed.y + this.burntime * gravity);
        }
        if (this.type == "swirler") {
            sparkleDir = this.burntime / 2 % TWO_PI;
            sparkleVel = random(0, 1);
            sparkleSpd = createVector(sparkleVel * cos(sparkleDir), sparkleVel * sin(sparkleDir))
            thisSparkle = new sparkle(createVector(newPositionX + sparkleSpd.x, newPositionY + sparkleSpd.y), sparkleSpd.copy(), random(50, 75), round(random(20, 40)), round(random(0, 30)));
            sparkles.push(thisSparkle);
        }
        if (this.type == "sparkler") {
            sparkleDir = random(0, TWO_PI);
            sparkleVel = random(0, 1);
            sparkleSpd = createVector(sparkleVel * cos(sparkleDir), sparkleVel * sin(sparkleDir))
            thisSparkle = new sparkle(createVector(newPositionX + sparkleSpd.x, newPositionY + sparkleSpd.y), sparkleSpd.copy(), random(50, 75), round(random(20, 40)), round(random(0, 30)));
            sparkles.push(thisSparkle);
        }
        this.brt = this.brt - fade;
        this.burntime++;
    }
}
function touchStarted() {
    if (moving) {
        moving = false;
        strokeWeight(1);
        fill(255);
        rect(width / 2 - 30, -height + 20, 10, 30);
        rect(width / 2 - 50, -height + 20, 10, 30);
        noLoop();
    } else {
        moving = true;
        loop();
    }
    // prevent default
    return false;
}
