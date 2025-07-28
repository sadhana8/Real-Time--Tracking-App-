// const express =  require('express');
// const app = express();
// const path = require("path");
// const http = require("http");

// const socketio = require("socket.io");
// const server = http.createServer(app);
// const io = socketio(server);

// app.set("view engine", "ejs");
// app.set(express.static(path.join(__dirname,"public")));

// io.on("connection", function (socket){
//     socket.on("send-location", function(data){
//         io.emit("receive-location", {id: socket.id, ...data});
//     });
//    socket.on("disconnect", function(){
//     io.emit("user-disconnected", socket.id);
//    });
// });

// app.get("/", function (req,res){
//     res.render("index");
// });

// server.listen(3000);

// //npx nodemon app.js to run these
const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set the view engine to EJS
app.set("view engine", "ejs");

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
    res.render("index");
});

// Socket.io logic
io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("send-location", (data) => {
        console.log("Location received from", socket.id, data);
        io.emit("receive-location", { id: socket.id, ...data });
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
        io.emit("user-disconnected", socket.id);
    });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
