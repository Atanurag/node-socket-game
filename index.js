// run `node index.js` in the terminal

const Express=require("express");
const app=Express();
const http=require("http");

const cors=require('cors');
const server=http.createServer(app);
const {Server}=require("socket.io");

//const id=nanoid()

const io=new Server(server);

let users={}
app.use(cors())
app.get("/",(req,res)=>{
  res.sendFile(__dirname+"/socketwordgame.html");
})

//namespace
//game
const admin1=io.of('/admin1');
let gameBoy={}
admin1.on('connection',(socket)=>{
 console.log("admin1 connected");
//namespace
socket.on("NewUserJoining",(joinedusername)=>{
  gameBoy[socket.id]=joinedusername;
  socket.broadcast.emit("newuser",joinedusername)
})


socket.on("ad",(counting)=>{
//console.log(gameBoy[socket.id])
socket.broadcast.emit("se",counting,gameBoy[socket.id])
console.log(counting)
})
socket.on('disconnect',()=>{
  socket.broadcast.emit("dis",gameBoy[socket.id])
})
})
server.listen(3000)