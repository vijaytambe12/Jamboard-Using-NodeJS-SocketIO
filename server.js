let http = require('http');
let exp = require('express');
let server = new exp();

server.use("/public", exp.static(__dirname + "/public"));


server.get("/", (req,res) => {
    res.sendFile(__dirname + "/index.html");
});



var expressServer =  server.listen(3000, () => {
    console.log("Server Started at 3000");
});

const io = require('socket.io')(expressServer);

io.on("connect",socket => {

    console.log("SOMEONE CONNECTED", socket);

    socket.on("mouseDown", data => {
        io.sockets.emit("mouseDownClient",data);
    });

    socket.on("mouseMove", data => {
        io.sockets.emit("mouseMoveClient",data);
    });
});

