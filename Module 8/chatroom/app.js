var express= require('express');
app = express();
server=require('http').createServer(app);
io = require('socket.io').listen(server);
usernames = [];
var newuser= [];
var flag = 0;
var sp = '';
var sp1=[];
//for(var z=0;z<=100;z++)
  //  {
    //    sp1[z]=sp;
      //  sp+=' ';
//    }
server.listen(process.env.PORT || 3000);
 app.get('/',function(req,res){
     res.sendFile(__dirname + '/index.html');
 });
console.log('Server has been Started')

io.sockets.on('connection',function(socket){
   
    
    socket.on('new user',function(data,callback){
        
        if(data == '' || data == ' ' || data == '  '|| data == '   ' || usernames.indexOf(data) != -1)
            {
                callback(false);
            }
        else
            {
                callback(true);
                 
                socket.username = data;
                
                usernames.push(socket.username);
                io.sockets.emit('joinu',usernames[usernames.length-1]);
                updateUsernames();
            }
        
    });
    //Update username
   
 
    function updateUsernames(){
    
        io.sockets.emit('usernames',{usernames:usernames});
       
                    
               
           console.log(usernames);
    }
    
 
    //Send Message
    socket.on('send message',function(data){
       
        io.sockets.emit('new message',{msg : data,user:socket.username});
    });
    // Disconnects user
    socket.on('disconnect',function(data){
        if(!socket.username)return;
        
       io.sockets.emit('leaveu',socket.username);
        
        usernames.splice(usernames.indexOf(socket.username),1);
       
       
        updateUsernames();
    });
    //typing user
    var fl2=0;
    socket.on('keypressed',function(data){
       if (data.fl==1)
           {    fl2=1;
               io.sockets.emit('typing',fl2)
           }
        else{
            fl2=0;
             io.sockets.emit('typing',fl2)
        }
        
    });
    fl2=0;
});