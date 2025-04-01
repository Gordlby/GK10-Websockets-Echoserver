const ws = require("websocket");
const http = require("http");

var server = http.createServer(function (req, res) {
});
server.listen(8080, function () {
    console.log("Server is listening on port 8080");
}
);
var wsServer = new ws.server({
    httpServer: server
});

wsServer.on("request", function (request) {
    var connection = request.accept(null, request.origin);
    console.log("Connection accepted");
    connection.sendUTF("Hello from echoserver");

    connection.on("message", function (message) {
        if (message.type === "utf8") {
            console.log("Received Message: " + message.utf8Data);
            connection.sendUTF(message.utf8Data);
        }
    }
    );
    connection.on("close", function (reasonCode, description) {
        console.log("Peer " + connection.remoteAddress + " disconnected.");
    }
    );
}
);