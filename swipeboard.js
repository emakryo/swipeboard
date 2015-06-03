onload = function(){

    //define text area

    var text = document.getElementById("text");
    text.style.width = innerWidth-40 + "px";
    text.style.height = "80px";
    text.style["font-size"] = "14px";
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

    swipeboard.state = "all";

    //define swipeboard actions

    swipeboard.touch = {on: false, t: undefined, x: undefined, y: undefined};

    swipeboard.action = function(x,y){
        var dist = (x-this.touch.x)*(x-this.touch.x) +
            (y-this.touch.y)*(y-this.touch.y);
        var grad = (y-this.touch.y)/(x-this.touch.x);

        if(dist < 15) this.tap();
        else if(x == this.touch.x && y > this.touch.y) this.swipeDown();
        else if(grad > 2.4 && y > this.touch.y) this.swipeDown();
        else if(grad <= -2.4 && y > this.touch.y) this.swipeDown();
        else if(x == this.touch.x && y <= this.touch.y) this.swipeUp();
        else if(grad > 2.4 && y <= this.touch.y) this.swipeUp();
        else if(grad <= -2.4 && y <= this.touch.y) this.swipeUp();
        else if(-2.4 < grad && grad <= -0.4 && x < this.touch.x)
            this.swipeLeftDown();
        else if(-2.4 < grad && grad <= -0.4 && x >= this.touch.x)
            this.swipeRightUp();
        else if(-0.4 < grad && grad <= 0.4 && x < this.touch.x)
            this.swipeLeft();
        else if(-0.4 < grad && grad <= 0.4 && x >= this.touch.x)
            this.swipeRight();
        else if(0.4 < grad && grad <= 2.4 && x < this.touch.x)
            this.swipeLeftUp();
        else if(0.4 < grad && grad <= 2.4 && x >= this.touch.x)
            this.swipeRightDown();
        else document.getElementById("action").innerHTML = "unknown";

        chars.setChars(this.state);

    }

    swipeboard.tap = function(){
        document.getElementById("action").innerHTML = "tap";
        switch(this.state){
        case "all":
            this.state = "fgh";
            break;
        case "qwe":
            text.value += "w";
            this.state = "all";
            break;
        case "iop":
            text.value += "o";
            this.state = "all";
            break;
        case "asd":
            text.value += "s";
            this.state = "all";
            break;
        case "fgh":
            text.value += "g";
            this.state = "all";
            break;
        case "jkl":
            text.value += "k";
            this.state = "all";
            break;
        case "zxc":
            text.value += "x";
            this.state = "all";
            break;
        case "vbn":
            text.value += "b";
            this.state = "all";
            break;
        case "m,.":
            text.value += ",";
            this.state = "all";
            break;
        }
    }

    swipeboard.swipeUp = function(){
        document.getElementById("action").innerHTML = "swipe up";
        switch(this.state){
        case "all":
            this.state = "rtyu";
            break;
        }
    }

    swipeboard.swipeDown = function(){
        document.getElementById("action").innerHTML = "swipe down";
        switch(this.state){
        case "all":
            this.state = "vbn";
            break;
        default:
            this.state = "all";
            break;
        }
    }

    swipeboard.swipeRight = function(){
        document.getElementById("action").innerHTML = "swipe right";
        switch(this.state){
        case "all":
            this.state = "jkl";
            break;
        case "qwe":
            text.value += "e";
            this.state = "all";
            break;
        case "rtyu":
            text.value += "u";
            this.state = "all";
            break;
        case "iop":
            text.value += "p";
            this.state = "all";
            break;
        case "asd":
            text.value += "d";
            this.state = "all";
            break;
        case "fgh":
            text.value += "h";
            this.state = "all";
            break;
        case "jkl":
            text.value += "l";
            this.state = "all";
            break;
        case "zxc":
            text.value += "c";
            this.state = "all";
            break;
        case "vbn":
            text.value += "n";
            this.state = "all";
            break;
        case "m,.":
            text.value += ".";
            this.state = "all";
            break;
        }
    }

    swipeboard.swipeRightUp = function(){
        document.getElementById("action").innerHTML = "swipe right up";
        switch(this.state){
        case "all":
            this.state = "iop";
            break;
        case "rtyu":
            text.value += "y";
            this.state = "all";
            break;
        }
    }

    swipeboard.swipeRightDown = function(){
        document.getElementById("action").innerHTML = "swipe right down";
        switch(this.state){
        case "all":
            this.state = "m,.";
            break;
        }
    }

    swipeboard.swipeLeft = function(){
        document.getElementById("action").innerHTML = "swipe left";
        switch(this.state){
        case "all":
            this.state = "asd";
            break;
        case "qwe":
            text.value += "q";
            this.state = "all";
            break;
        case "rtyu":
            text.value += "r";
            this.state = "all";
            break;
        case "iop":
            text.value += "i";
            this.state = "all";
            break;
        case "asd":
            text.value += "a";
            this.state = "all";
            break;
        case "fgh":
            text.value += "f";
            this.state = "all";
            break;
        case "jkl":
            text.value += "j";
            this.state = "all";
            break;
        case "zxc":
            text.value += "z";
            this.state = "all";
            break;
        case "vbn":
            text.value += "v";
            this.state = "all";
            break;
        case "m,.":
            text.value += "m";
            this.state = "all";
            break;
        }
    }

    swipeboard.swipeLeftUp = function(){
        document.getElementById("action").innerHTML = "swipe left up";
        switch(this.state){
        case "all":
            this.state = "qwe";
            break;
        case "rtyu":
            text.value += "t";
            this.state = "all";
            break;
        }
    }

    swipeboard.swipeLeftDown = function(){
        document.getElementById("action").innerHTML = "swipe left down";
        switch(this.state){
        case "all":
            this.state = "zxc";
            break;
        case "zxc":
            text.value = text.value.slice(0,-1);
            this.state = "all";
            break;
        }
    }

    //define swipeboard chars

    chars = document.getElementById("chars");

    chars.secondChars = function(str){
        chars.style["font-size"] = "25px";
        chars.height = 45;
        chars.style["height"] = chars.height + "px";
        chars.innerHTML = str;
        chars.style["margin-top"] = (swipeboard.width-chars.height)/2 + "px";
        chars.style["margin-bottom"] = (swipeboard.width-chars.height)/2 + "px";
    }

    chars.firstChars = function(){
        chars.style["font-size"] = "11.5px";
        chars.height = 45;
        chars.style["height"] = chars.height + "px";
        chars.innerHTML = "qwe rtyu iop<br>asd fgh jkl<br>zxc vbn m,.";
        chars.style["margin-top"] = (swipeboard.width-chars.height)/2 + "px";
        chars.style["margin-bottom"] = (swipeboard.width-chars.height)/2 + "px";
    }

    chars.setChars = function(state){
        switch(state){
        case "all":
            this.firstChars();
            break;
        case "qwe":
            this.secondChars("q w e");
            break;
        case "rtyu":
            this.secondChars("r t y u");
            break;
        case "iop":
            this.secondChars("i o p");
            break;
        case "asd":
            this.secondChars("a s d");
            break;
        case "fgh":
            this.secondChars("f g h");
            break;
        case "jkl":
            this.secondChars("j k l");
            break;
        case "zxc":
            this.secondChars("z x c");
            break;
        case "vbn":
            this.secondChars("v b n");
            break;
        case "m,.":
            this.secondChars("m , .");
            break;
        }
    }

    chars.firstChars();

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
