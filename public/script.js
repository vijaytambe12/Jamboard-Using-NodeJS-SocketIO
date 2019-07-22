window.onload = function () {
    var myCanvas = document.getElementById("myCanvas");
    var curColor = $('#selectColor option:selected').val();
    var isDown      = false;
    var ctx = myCanvas.getContext("2d");
    var canvasX, canvasY;
    ctx.lineWidth = 5;

    var socket = io.connect('http://localhost:3000');



    if(myCanvas){

        $(myCanvas)
            .mousedown(function(e){
                mouseDown(e);
            })
            .mousemove(function(e){
                mouseMove(e);
            })
            .mouseup(function(e){
                mouseUp(e);
            });


    }

    function mouseDown(e) {
        isDown = true;
        ctx.beginPath();
        canvasX = e.pageX - myCanvas.offsetLeft;
        canvasY = e.pageY - myCanvas.offsetTop;
        ctx.moveTo(canvasX, canvasY);
        socket.emit("mouseDown",{canvasX,canvasY});
    }

    function mouseMove(e) {
        if(isDown !== false) {
            canvasX = e.pageX - myCanvas.offsetLeft;
            canvasY = e.pageY - myCanvas.offsetTop;
            ctx.lineTo(canvasX, canvasY);
            ctx.strokeStyle = curColor;
            ctx.stroke();
            socket.emit("mouseMove",{canvasX,canvasY,curColor});

        }
    }

    function mouseUp(e) {
        isDown = false;
        ctx.closePath();

    }

    $('#selectColor').change(function () {
        curColor = $('#selectColor option:selected').val();
    });


    socket.on("mouseDownClient", data=> {
        isDown = true;
        ctx.beginPath();
        ctx.moveTo(data.canvasX, data.canvasY);
    });

    socket.on("mouseMoveClient", data=> {
        ctx.lineTo(data.canvasX, data.canvasY);
        ctx.strokeStyle = data.curColor;
        ctx.stroke();
    });

};
