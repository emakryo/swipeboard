onload = function(){

    //define text area

    var text = document.getElementById("text");
    text.style.width = innerWidth-40 + "px";
    text.style.height = "80px";
    text.intext = function(x,y){
        var r = this.getBoundingClientRect();
        return r.left <= x && x < r.right &&
            r.top <= y && y < r.bottom;
    }

    //define swipeboard division

    var swipeboard = document.getElementById("swipeboard");
    var deviceWidthMm = 50;
    //swipeboard.width = 12 * innerWidth / deviceWidthMm;
    swipeboard.width = 77;
    swipeboard.style.width = swipeboard.width + "px";
    swipeboard.style.height = swipeboard.width + "px";
    swipeboard.style.left = (innerWidth-swipeboard.width)/2 + "px";

    swipeboard.inboard = function(x,y){
        var r = this.getBoundingClientRect();
        return r.left <= x && x < r.right &&
            r.top <= y && y < r.bottom;
    }

    //define swipeboard actions

    swipeboard.touch = {on: false, t: undefined, x: undefined, y: undefined};

    swipeboard.state = "fgh";

    swipeboard.action = function(x,y){
        var dist = (x-this.touch.x)*(x-this.touch.x) +
            (y-this.touch.y)*(y-this.touch.y);
        var grad = (y-this.touch.y)/(x-this.touch.x);

        if(dist < 15) return this.tap();
        if(x == this.touch.x && y > this.touch.y) return this.swipeDown();
        if(grad > 2.4 && y > this.touch.y) return this.swipeDown();
        if(grad <= -2.4 && y > this.touch.y) return this.swipeDown();
        if(x == this.touch.x && y <= this.touch.y) return this.swipeUp();
        if(grad > 2.4 && y <= this.touch.y) return this.swipeUp();
        if(grad <= -2.4 && y <= this.touch.y) return this.swipeUp();
        if(-2.4 < grad && grad <= -0.4 && x < this.touch.x)
            return this.swipeLeftDown();
        if(-2.4 < grad && grad <= -0.4 && x >= this.touch.x)
            return this.swipeRightUp();
        if(-0.4 < grad && grad <= 0.4 && x < this.touch.x)
            return this.swipeLeft();
        if(-0.4 < grad && grad <= 0.4 && x >= this.touch.x)
            return this.swipeRight();
        if(0.4 < grad && grad <= 2.4 && x < this.touch.x)
            return this.swipeLeftUp();
        if(0.4 < grad && grad <= 2.4 && x >= this.touch.x)
            return this.swipeRightDown();
        else document.getElementById("action").innerHTML = "unknown";
    }

    swipeboard.tap = function(){
        document.getElementById("action").innerHTML = "tap";
        if(this.state == "fgh"){
            text.value += "g";
        }
    }

    swipeboard.swipeUp = function(){
        document.getElementById("action").innerHTML = "swipe up";
    }

    swipeboard.swipeDown = function(){
        document.getElementById("action").innerHTML = "swipe down";
    }

    swipeboard.swipeRight = function(){
        document.getElementById("action").innerHTML = "swipe right";
        if(this.state == "fgh"){
            text.value += "h";
        }
    }

    swipeboard.swipeRightUp = function(){
        document.getElementById("action").innerHTML = "swipe right up";
    }

    swipeboard.swipeRightDown = function(){
        document.getElementById("action").innerHTML = "swipe right down";
    }

    swipeboard.swipeLeft = function(){
        document.getElementById("action").innerHTML = "swipe left";
        if(this.state == "fgh"){
            text.value += "f";
        }
    }

    swipeboard.swipeLeftUp = function(){
        document.getElementById("action").innerHTML = "swipe left up";
    }

    swipeboard.swipeLeftDown = function(){
        document.getElementById("action").innerHTML = "swipe left down";
    }


    //define touch event

    document.addEventListener("touchstart", function(e){
        e.preventDefault();
        var touch = e.changedTouches[0];
        var d = new Date();
        if(swipeboard.inboard(touch.pageX, touch.pageY)){
            swipeboard.touch.x = touch.pageX;
            swipeboard.touch.y = touch.pageY;
            swipeboard.touch.t = d.getTime();
            swipeboard.touch.on = true;
        }

    }, false);

    document.addEventListener("touchmove", function(e){
        e.preventDefault();
        var touch = e.changedTouches[0];
        var d = new Date();
        if(swipeboard.inboard(touch.pageX, touch.pageY)){
            // swipe into region
            if(!swipeboard.touch.on){
                swipeboard.touch.t = d.getTime();
                swipeboard.touch.x = touch.pageX;
                swipeboard.touch.y = touch.pageY;
                swipeboard.touch.on = true;
            }
        }
        else{
            // swipe out of region
            if(swipeboard.touch.on){
                swipeboard.touch.on = false;
                swipeboard.action(touch.pageX, touch.pageY);
            }
        }
    }, false);

    document.addEventListener("touchend", function(e){
        e.preventDefault();
        var touch = e.changedTouches[0];
        var d = new Date();
        if(swipeboard.touch.on){
            swipeboard.touch.on = false;
            swipeboard.action(touch.pageX, touch.pageY);
        }
    }, false);

}
