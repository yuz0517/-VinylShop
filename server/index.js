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

app.get("/api/userinfo/personid",(req,res)=>{
    
    const sqlQuery = "SELECT PersonID FROM Persons WHERE userID LIKE ?";
    //전달받은 parameter 값.
    const userID = req.query.user;
    console.log(req.body.user);
    db.query(sqlQuery,[userID],(err,data)=>{
        if(!err){ 
            return res.send(data);
        } else { 
            res.send(err);
        }
    });
});


//-----------------board------------------
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
    const sqlQuery = "SELECT id,title,content,date,writer,writer_email FROM board";
    db.query(sqlQuery,(err,result)=>{
        if(!err){ 
            
            return res.send(result);
        } else { 
            res.send(err);
   
        }
    });
})



app.get("/api/boardsearch/title",(req,res)=>{
    //const sqlQuery = "SELECT id,title,content,date,writer FROM board";
   
    //전달받은 parameter 값.
    const key = req.query.key;
    const querykey = '%'+key+'%';
    const sqlQuery = "SELECT id,title,content,date,writer,writer_email FROM board WHERE title Like ?";
    console.log(sqlQuery);
    db.query(sqlQuery,[querykey,querykey],(err,data)=>{
        
        if(!err){ 
            console.log(data)
            return res.send(data);
        } else { 
           
            res.send(err);
   
        }
    });
});

app.get("/api/boardsearch/content",(req,res)=>{
    const key = req.query.key;
    const querykey = '%'+key+'%';
    const sqlQuery = "SELECT id,title,content,date,writer,writer_email FROM board WHERE content Like ?";
    console.log(sqlQuery);
    db.query(sqlQuery,[querykey,querykey],(err,data)=>{
        
        if(!err){ 
            console.log(data)
            return res.send(data);
        } else { 
           
            res.send(err);
   
        }
    });
});

app.get("/api/boardsearch/writer",(req,res)=>{
    const key = req.query.key;
    const querykey = '%'+key+'%';
    const sqlQuery = "SELECT id,title,content,date,writer,writer_email FROM board WHERE writer Like ?";
    console.log(sqlQuery);
    db.query(sqlQuery,[querykey,querykey],(err,data)=>{
        
        if(!err){ 
            console.log(data)
            return res.send(data);
        } else { 
           
            res.send(err);
   
        }
    });
});



app.get("/api/boardsearch/titleorcontent",(req,res)=>{
    const key = req.query.key;
    const querykey = '%'+key+'%';
    const sqlQuery = "SELECT id,title,content,date,writer,writer_email FROM board WHERE title Like ? OR content Like ?";
    console.log(querykey);
    db.query(sqlQuery,[querykey,querykey],(err,data)=>{
        
        if(!err){ 
            console.log(data)
            return res.send(data);
        } else { 
           
            res.send(err);
   
        }
    });
});

app.get("/api/boardsearch/mine",(req,res)=>{
    const key = req.query.key;
    const sqlQuery = "SELECT id,title,content,date,writer,writer_email FROM board WHERE writer_email Like ?";
    console.log(sqlQuery);
    db.query(sqlQuery,[key],(err,data)=>{
        
        if(!err){ 
            console.log(data)
            return res.send(data);
        } else { 
           
            res.send(err);
   
        }
    });
});

// app.post("/api/board/delete",(req,res)=>{
//     //res.header("")
//     //res.header("Access-Control-Allow-Origin", "*");
//     const key = req.query.key;
//     const sqlQuery = "DELETE FROM board WHERE id=?";
    
//     db.query(sqlQuery, [key], (err, data) => {
//         if(!err){ 
            
//             console.log(data)
//             return res.send(data);
//         } else { 
           
//             res.send(err);
   
//         }
//     });
// });

// app.post("/api/boarddelete",(req,res)=>{
        
//     const key = req.query.key;
//     const sqlQuery = "DELETE FROM board WHERE id=?";
//     db.query(sqlQuery, [key], (err, data) => {
//         console.log(req.query.key)
//         if(!err){ 
//             console.log(key)
//             console.log(data)
//             return res.send(data);
//         } else { 
//             console.log(key)
//             res.send(err);
   
//         }
//     });
// });
app.delete("/api/board/delete",(req,res)=>{
        
    //const key = req.query.key;
    const key = req.body.id;
    const sqlQuery = "DELETE FROM board WHERE id=? ;";
    db.query(sqlQuery, [key], (err, data) => {
        console.log(req.body.id)
        if(!err){ 
            console.log(key)
            console.log(data)
            return res.send(data);
        } else { 
            console.log(key)
            res.send(err);
   
        }
    });
});


app.put("/api/board/update",(req,res)=>{
        
    const id = req.body.id;
    const title = req.body.title;
    const content = req.body.content;

    const sqlQuery = "UPDATE board SET title=? , content=? WHERE id=? ;";
    db.query(sqlQuery, [title, content, id], (err, data) => {
        console.log(req.body.id)
        if(!err){ 
            console.log(id)
            console.log(data)
            return res.send(data);
        } else { 
        
            res.send(err);
   
        }
    });
});

//-----------------vinylshop------------------
app.get("/api/vinyl/List",(req,res)=>{
    //const sqlQuery = "SELECT id,title,content,date,writer FROM board";
   
    //전달받은 parameter 값.
    const key =req.query.key;
    //const querykey = '%'+key+'%';
    const sqlQuery = "SELECT * FROM VinylList WHERE menuname= ?";
    //const querykey = 'menuname='+key;
    console.log(sqlQuery); 
    db.query(sqlQuery,[key],(err,data)=>{
        console.log(key)
        if(!err){ 
            console.log(data)
            return res.send(data);
        } else { 
           console.log(err)
            res.send(err);
   
        }
    });
});

app.get("/api/vinyl/isitsold",(req,res)=>{
    //const sqlQuery = "SELECT id,title,content,date,writer FROM board";
   
    //전달받은 parameter 값.
    const key =req.query.key;
    const sqlQuery = "SELECT sold FROM VinylList WHERE id= ?";
    console.log(sqlQuery); 
    db.query(sqlQuery,[key],(err,data)=>{
        console.log(key)
        if(!err){ 
            console.log(data)
            return res.send(data);
        } else { 
           console.log(err)
            res.send(err);
   
        }
    });
});
//---------------------cart------------------------
app.delete("/api/cart/initdelete",(req,res)=>{
        
    //const key = req.query.key;
    const key = req.body.id;
    const sqlQuery = "DELETE from cart WHERE product_id in (SELECT VinylList.id FROM (SELECT * FROM VinylList WHERE sold=1) AS VinylList);";
    db.query(sqlQuery, [key], (err, data) => {
        console.log(req.body.id)
        if(!err){ 
            console.log(key,"삭제완료")
            console.log(data)
            return res.send(data);
        } else { 
            console.log(key)
            res.send(err);
   
        }
    });
});
app.get("/api/cart/getcart",(req,res)=>{
    const key = req.query.key;
    const sqlQuery = "SELECT * FROM cart WHERE person_id = ?"
    console.log(sqlQuery);
    db.query(sqlQuery,[key],(err,data)=>{
        console.log(key)
        if(!err){
            console.log(data);
            return res.send(data);
        }else {
            console.log(err);
            res.send(err);
        }
    })
})
app.post("/api/cart/insert", (req,res) => {
    const product_id = req.body.product_id;
    const person_id =  req.body.person_id;
    const artist = req.body.artist;
    const title = req.body.title;
    const price = req.body.price;
    const sold = req.body.sold;
    const img0 = req.body.img0;
    const sqlQuery =  "INSERT INTO cart (product_id,person_id,artist,title,price,sold,img0) VALUES (?,?,?,?,?,?,?)";
    db.query(sqlQuery,[product_id,person_id,artist,title,price,sold,img0],(err,result)=>{
        
   
        if(!err){ 
            console.log(result)
            return res.send('success'); 
        } else { 
           console.log(err)
            res.send(err);
   
        }
    });
});

app.listen(PORT, ()=>{
    console.log(`running on port ${PORT}`);
});
