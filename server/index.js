//axios를 이용해서 title, content 데이터를 post 방식으로 보내고 완료되면 alert창을 띄워준다.  app.js에서 axios를 임포트하고 ...

//express모듈 호출
const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser =  require('body-parser');
const { urlencoded } = require('body-parser');
const { default: axios } = require('axios');

const PORT = process.env.port || 8000;
 
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Dldbtlr0517!",
    database: "mydb"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

/* Persons */
app.post("/api/signup", (req,res) => {
    const Nickname =  req.body.nickname;
    const usrID = req.body.id;
    const Address = req.body.address;
    const Address1 = req.body.address1;
    const sqlQuery =  "INSERT INTO Persons (Nickname,userID,Address,Address1) VALUES (?,?,?,?)";
    db.query(sqlQuery,[Nickname,usrID,Address,Address1],(err,result)=>{
        if(!err){ 
            console.log(result);    
            return res.send(result);
        } else { 
            res.send(err);
   
        }
    });
});

app.post("/api/userinfoupdate", (req,res) => {
    const Nickname =  req.body.nickname;
    //const userID = req.body.userid;
    const PersonID = req.body.personid;
    const Address = req.body.address;
    const Address1 = req.body.address1;
    const sqlQuery =  "UPDATE Persons SET Nickname = ? , Address = ? , Address1 = ? WHERE PersonID = ?";
    db.query(sqlQuery,[Nickname,Address,Address1,PersonID],(err,result)=>{
        if(!err){ 
            
            return res.send(result);
        } else { 
            res.send(err);
   
        }
    });
});
app.get("/api/userinfo",(req,res)=>{
    
    const sqlQuery = "SELECT userID, Nickname, PersonID, Address, Address1 FROM Persons WHERE userID LIKE ?";
    //전달받은 parameter 값.
    const Firebase_ID = req.query.user;
    console.log(req.body.user);
    db.query(sqlQuery,[Firebase_ID],(err,data)=>{
        if(!err){ 
            return res.send(data);
        } else { 
            res.send(err);
   
        }
    });
});


//----board----
app.post("/api/insert", (req,res) => {
    const title = req.body.title;
    const content =  req.body.content;
    const writer = req.body.writer;
    const writer_email = req.body.writer_email;
    const sqlQuery =  "INSERT INTO board (title,content,writer,writer_email) VALUES (?,?,?,?)";
    db.query(sqlQuery,[title,content,writer,writer_email],(err,result)=>{
        res.send('success'); 
        //res.send(err); //에러코드를 표시.  
    });
});
//접속 시 응답메시지 출력
app.get("/api/boardread",(req,res)=>{
    const sqlQuery = "SELECT id,title,content,date,writer FROM board";
    db.query(sqlQuery,(err,result)=>{
        if(!err){ 
            
            return res.send(result);
        } else { 
            res.send(err);
   
        }
    });
})




app.listen(PORT, ()=>{
    console.log(`running on port ${PORT}`);
});