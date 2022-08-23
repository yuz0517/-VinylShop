//axios를 이용해서 title, content 데이터를 post 방식으로 보내고 완료되면 alert창을 띄워준다.  app.js에서 axios를 임포트하고 ...

//express모듈 호출
const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser =  require('body-parser');
const { urlencoded } = require('body-parser');

const PORT = process.env.port || 8000;
 
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "2Pac7307!",
    database: "mydb"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post("/api/insert", (req,res) => {
    const title = req.body.title;
    const content =  req.body.content;
    const sqlQuery =  "INSERT INTO board (title,content) VALUES (?,?)";
    db.query(sqlQuery,[title,content],(err,result)=>{
        res.send('success'); 
        //res.send(err); //에러코드를 표시.
    });
});
//접속 시 응답메시지 출력
/*app.get("/",(req,res)=>{
    const sqlQuery = "INSERT INTO board (title,content) VALUES (?,?) ";
    db.query(sqlQuery,(err,result)=>{
        res.send('서버가 정상적으로 open되었습니다.') //서버가 정상적으로 오픈되면 이 메시지가 열림. 
        //res.send(err); //에러코드를 표시.
    });
})*/
app.listen(PORT, ()=>{
    console.log(`running on port ${PORT}`);
});