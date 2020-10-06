/* ==================================
       Sidebar
===================================== */

var slidebar = document.getElementById("slidebar");
var bodyContent = document.getElementById("bodyContent");
var counter = document.getElementById("counter");
var chartText = document.getElementsByClassName("chart-text");


var call = true;
function sidebarToggle() {
    if (call == true) {
        slidebar.style.width = "250px";
        bodyContent.style.marginLeft = "250px";
        uvchartsusers.style.left = ".2rem",
        uvchartspurchas.style.top = "-13px",
        uvchartspurchas.style.fontSize = "13px";
        uvchartspurchas.style.left = "0",
        uvchartsusers.style.top = "-13px",
        uvchartsusers.style.fontSize = "13px",
        uvchartsviews.style.left = "0",
        uvchartsviews.style.fontSize = "13px",
        uvchartsviews.style.top = "-13px",
        call = false;
        $(".counter").css({"top": "82px", "left": "2.1rem"});
        $(".counter").addClass('tempCounter');
        $(".chart-text").addClass('tempText');

    } else {
        slidebar.style.width = "0";
        bodyContent.style.marginLeft = "0";
        uvchartsusers.style.left = "1.5rem",
        uvchartspurchas.style.left = "1.5rem",
        uvchartsviews.style.left = "1.5rem",
        uvchartsusers.style.fontSize = "16px",
        uvchartspurchas.style.fontSize = "16px",
        uvchartsviews.style.fontSize = "16px",
        $(".counter").css({"top": "100px", "left": "2.5rem"});
        $("#uvchartsviews").css({"top": "0"});
        $("#uvchartsusers").css({"top": "0"});
        $("#uvchartspurchas").css({"top": "0"});
        $(".counter").removeClass('tempCounter');
        $(".chart-text").removeClass('tempText');
        call = true;
    }
}

var list1 = document.getElementById("toggoleList1");
var list2 = document.getElementById("toggoleList2");

function listToggole1() {
    if (list1.style.display === "none") {
        list1.style.display = "block";
    } else {
        list1.style.display = "none";
    }
}

function listToggole2() {
    if (list2.style.display === "none") {
        list2.style.display = "block";
    } else {
        list2.style.display = "none";
    }
}

/* ==================================
      Start progress bar
===================================== */

jQuery.fn.getCircleLength = function () {
    console.log('gcl');
    var r = this.attr('r');
    var lng = 2 * Math.PI * r;
    return lng;
};

function makePie(mold) {
    $(mold).html('<svg class="pie" viewBox="0 0 200 200"><circle cx="100" cy="100" r="88.936" class="pie-trail"/><circle cx="100" cy="100" r="88.936" class="pie-stuffing"/></svg><text x="18" y="20.35" id="counter" class="counter"></text><br>');


    var stuffing = $(mold + ' .pie-stuffing'),
        lineWidth = parseInt(stuffing.css("stroke-width"), 10);
    totalLength = $(stuffing).getCircleLength() + lineWidth;
    console.log(stuffing.get(0));
    $(mold + " text").data("current", 0);

    $(stuffing).css({
        'stroke-dashoffset': totalLength,
        'stroke-dasharray': totalLength + ' ' + totalLength
    })
} // END: makePie()


function bakePie(mold, options) {
    var defaults = {
        percentage: $(mold).data("percentage"),
        duration: $(mold).data("baking-time"),
        counter: $(mold + " text").data("current"),
        frame: 100, //how long to display single value when counting
    };
    $.extend(true, defaults, options);
    options = defaults;

    var stuffing = $(mold + ' .pie-stuffing'),
        lineWidth = parseInt(stuffing.css("stroke-width"), 10),
        totalLength = $(stuffing).getCircleLength() + lineWidth,       
        counter = options.counter,
        toCount = options.duration - counter,
        pieChunk = toCount / (options.duration / options.frame),
        almostDone = options.duration - pieChunk,
        iterate = setTimeout(count, options.frame);

    function count() { 
        counter += pieChunk;
        $(mold + " text").data("current", counter).text(Math.round(counter));

        if (counter < almostDone & pieChunk > 0) { 
            iterate = setTimeout(count, options.frame);
        }
        else if (counter > almostDone & pieChunk < 0) {
            iterate = setTimeout(count, options.frame);
        }
        else {
            iterate = setTimeout(function () {
                $(mold + " text").data("current", options.duration).text(options.duration);
                clearTimeout(iterate);
            }, options.frame);
        }
    }

    //animate chart
    $(stuffing).animate({
        'stroke-dashoffset': totalLength * (100 - options.percentage) / 100
    }, options.duration);
}  // END: bakePie()

makePie('#pie-mold1');
makePie('#pie-mold2');
makePie('#pie-mold3');

setTimeout(function () { bakePie('#pie-mold1'); }, 1000);
setTimeout(function () { bakePie('#pie-mold2'); }, 1000);
setTimeout(function () { bakePie('#pie-mold3'); }, 1000);

