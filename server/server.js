//axios를 이용해서 title, content 데이터를 post 방식으로 보내고 완료되면 alert창을 띄워준다.  app.js에서 axios를 임포트하고 ...

//express모듈 호출
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");
const { default: axios } = require("axios");

const admin = require("firebase-admin");
const firebaseAdminAccount = require("/Users/yuz/myapp2022/src/firebase-admin-key.json");

const PORT = process.env.port || 8000;

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Dldbtlr0517!",
  database: "mydb",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => res.json("API Running 🏃🏻‍♂️"));

/* Persons */
app.post("/api/signup", (req, res) => {
  const Nickname = req.body.nickname;
  const usrID = req.body.id;
  const Address = req.body.address;
  const Address1 = req.body.address1;
  const withdrawal = 1000;
  const sqlQuery =
    "INSERT INTO Persons (Nickname,userID,Address,Address1,withdrawal,admin) VALUES (?,?,?,?,1000,0)";
  db.query(sqlQuery, [Nickname, usrID, Address, Address1], (err, result) => {
    if (!err) {
      console.log(result);
      return res.send(result);
    } else {
      res.send(err);
      console.log(err);
    }
  });
});

app.post("/api/userinfoupdate", (req, res) => {
  const Nickname = req.body.nickname;
  //const userID = req.body.userid;
  const PersonID = req.body.personid;
  const Address = req.body.address;
  const Address1 = req.body.address1;
  const sqlQuery =
    "UPDATE Persons SET Nickname = ? , Address = ? , Address1 = ? WHERE PersonID = ?";
  db.query(sqlQuery, [Nickname, Address, Address1, PersonID], (err, result) => {
    if (!err) {
      return res.send(result);
    } else {
      res.send(err);
    }
  });
});
app.get("/api/userinfo", (req, res) => {
  const sqlQuery =
    "SELECT userID, Nickname, PersonID, Address, Address1, reward_points FROM Persons WHERE userID LIKE ?";
  //전달받은 parameter 값.
  const Firebase_ID = req.query.user;
  console.log(req.body.user);
  db.query(sqlQuery, [Firebase_ID], (err, data) => {
    if (!err) {
      return res.send(data);
    } else {
      res.send(err);
    }
  });
});
app.get("/api/userinfo/point", (req, res) => {
  const sqlQuery = "SELECT reward_points FROM Persons WHERE PersonID Like ?";
  const key = req.query.key;
  console.log(sqlQuery, key);
  db.query(sqlQuery, [key], (err, data) => {
    if (!err) {
      return res.send(data);
    } else {
      res.send(err);
      console.log(err);
    }
  });
});

app.get("/api/userinfo/personid", (req, res) => {
  const sqlQuery = "SELECT PersonID FROM Persons WHERE userID LIKE ?";
  //전달받은 parameter 값.
  const userID = req.query.user;
  console.log(req.body.user);
  db.query(sqlQuery, [userID], (err, data) => {
    if (!err) {
      console.log(data);
      return res.send(data);
    } else {
      console.log(err);
      res.send(err);
    }
  });
});

//-----------------board------------------
app.post("/api/insert", (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const writer = req.body.writer;
  const writer_email = req.body.writer_email;
  const sqlQuery =
    "INSERT INTO board (title,content,writer,writer_email) VALUES (?,?,?,?)";
  db.query(sqlQuery, [title, content, writer, writer_email], (err, result) => {
    res.send("success");
    //res.send(err); //에러코드를 표시.
  });
});
//접속 시 응답메시지 출력
app.get("/api/boardread", (req, res) => {
  const sqlQuery =
    "SELECT id,title,content,date,writer,writer_email FROM board";
  db.query(sqlQuery, (err, result) => {
    if (!err) {
      return res.send(result);
    } else {
      res.send(err);
    }
  });
});

app.get("/api/boardsearch/title", (req, res) => {
  //const sqlQuery = "SELECT id,title,content,date,writer FROM board";

  //전달받은 parameter 값.
  const key = req.query.key;
  const querykey = "%" + key + "%";
  const sqlQuery =
    "SELECT id,title,content,date,writer,writer_email FROM board WHERE title Like ?";
  console.log(sqlQuery);
  db.query(sqlQuery, [querykey, querykey], (err, data) => {
    if (!err) {
      console.log(data);
      return res.send(data);
    } else {
      res.send(err);
    }
  });
});

app.get("/api/boardsearch/content", (req, res) => {
  const key = req.query.key;
  const querykey = "%" + key + "%";
  const sqlQuery =
    "SELECT id,title,content,date,writer,writer_email FROM board WHERE content Like ?";
  console.log(sqlQuery);
  db.query(sqlQuery, [querykey, querykey], (err, data) => {
    if (!err) {
      console.log(data);
      return res.send(data);
    } else {
      res.send(err);
    }
  });
});

app.get("/api/boardsearch/writer", (req, res) => {
  const key = req.query.key;
  const querykey = "%" + key + "%";
  const sqlQuery =
    "SELECT id,title,content,date,writer,writer_email FROM board WHERE writer Like ?";
  console.log(sqlQuery);
  db.query(sqlQuery, [querykey, querykey], (err, data) => {
    if (!err) {
      console.log(data);
      return res.send(data);
    } else {
      res.send(err);
    }
  });
});

app.get("/api/boardsearch/titleorcontent", (req, res) => {
  const key = req.query.key;
  const querykey = "%" + key + "%";
  const sqlQuery =
    "SELECT id,title,content,date,writer,writer_email FROM board WHERE title Like ? OR content Like ?";
  console.log(querykey);
  db.query(sqlQuery, [querykey, querykey], (err, data) => {
    if (!err) {
      console.log(data);
      return res.send(data);
    } else {
      res.send(err);
    }
  });
});

app.get("/api/boardsearch/mine", (req, res) => {
  const key = req.query.key;
  const sqlQuery =
    "SELECT id,title,content,date,writer,writer_email FROM board WHERE writer_email Like ?";
  console.log(sqlQuery);
  db.query(sqlQuery, [key], (err, data) => {
    if (!err) {
      console.log(data);
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

app.delete("/api/board/delete", (req, res) => {
  const key = req.body.id;
  const sqlQuery = "DELETE FROM board WHERE id=? ;";
  db.query(sqlQuery, [key], (err, data) => {
    console.log(req.body.id);
    if (!err) {
      console.log(key);
      console.log(data);
      return res.send(data);
    } else {
      console.log(key);
      res.send(err);
    }
  });
});

app.put("/api/board/update", (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const content = req.body.content;

  const sqlQuery = "UPDATE board SET title=? , content=? WHERE id=? ;";
  db.query(sqlQuery, [title, content, id], (err, data) => {
    console.log(req.body.id);
    if (!err) {
      console.log(id);
      console.log(data);
      return res.send(data);
    } else {
      res.send(err);
    }
  });
});

//-----------------vinylshop------------------
app.get("/api/vinyl/List", (req, res) => {
  //const sqlQuery = "SELECT id,title,content,date,writer FROM board";

  //전달받은 parameter 값.
  const key = req.query.key;
  //const querykey = '%'+key+'%';
  const sqlQuery = "SELECT * FROM VinylList WHERE menuname= ?";
  //const querykey = 'menuname='+key;
  console.log(sqlQuery);
  db.query(sqlQuery, [key], (err, data) => {
    console.log(key);
    if (!err) {
      console.log(data);
      return res.send(data);
    } else {
      console.log(err);
      res.send(err);
    }
  });
});

app.get("/api/vinyl/isitsold", (req, res) => {
  //const sqlQuery = "SELECT id,title,content,date,writer FROM board";

  //전달받은 parameter 값.
  const key = req.query.key;
  const sqlQuery = "SELECT sold FROM VinylList WHERE id= ?";
  console.log(sqlQuery);
  db.query(sqlQuery, [key], (err, data) => {
    console.log(key);
    if (!err) {
      console.log(data);
      return res.send(data);
    } else {
      console.log(err);
      res.send(err);
    }
  });
});

app.get("/api/vinyl/new", (req, res) => {
  const sqlQuery = " SELECT * FROM VinylList WHERE sold = 0 LIMIT 9";
  db.query(sqlQuery, [], (err, data) => {
    if (!err) {
      console.log(data);
      return res.send(data);
    } else {
      console.log(err);
      res.send(err);
    }
  });
});
//---------------------cart------------------------
app.delete("/api/cart/initdelete", (req, res) => {
  const sqlQuery =
    "DELETE from cart WHERE product_id in (SELECT VinylList.id FROM (SELECT * FROM VinylList WHERE sold=1) AS VinylList);";
  db.query(sqlQuery, (err, data) => {
    console.log(req.body.id);
    if (!err) {
      console.log(req.body.id, "db삭제완료");
      console.log(data);
      return res.send(data);
    } else {
      res.send(err);
    }
  });
});
app.delete("/api/cart/delete", (req, res) => {
  const product_id = req.body.productId;
  const person_id = req.body.personId;
  const sqlQuery = "DELETE from cart WHERE product_id = ? AND person_id = ?;";
  db.query(sqlQuery, [product_id, person_id], (err, data) => {
    console.log(req.body.id);
    if (!err) {
      return res.send(data);
    } else {
      res.send(err);
    }
    r;
  });
});

app.get("/api/cart/getcartall", (req, res) => {
  const sqlQuery = "SELECT title FROM VinylList where sold = 1;";
  console.log(sqlQuery);
  db.query(sqlQuery, (err, data) => {
    if (!err) {
      console.log(data);
      return res.send(data);
    } else {
      console.log(err);
      res.send(err);
    }
  });
});
app.get("/api/cart/getcart", (req, res) => {
  const key = req.query.key;
  const sqlQuery = "SELECT * FROM cart WHERE person_id = ?";
  console.log(sqlQuery);
  db.query(sqlQuery, [key], (err, data) => {
    console.log(key);
    if (!err) {
      console.log(data);
      return res.send(data);
    } else {
      console.log(err);
      res.send(err);
    }
  });
});
app.post("/api/cart/insert", (req, res) => {
  const product_id = req.body.product_id;
  const person_id = req.body.person_id;
  const artist = req.body.artist;
  const title = req.body.title;
  const price = req.body.price;
  const sold = req.body.sold;
  const img0 = req.body.img0;
  const sqlQuery =
    "INSERT INTO cart (product_id,person_id,artist,title,price,sold,img0) VALUES (?,?,?,?,?,?,?)";
  db.query(
    sqlQuery,
    [product_id, person_id, artist, title, price, sold, img0],
    (err, result) => {
      if (!err) {
        console.log(result);
        return res.send("success");
      } else {
        console.log(err);
        res.send(err);
      }
    }
  );
});
/* -----------Address------------ */
app.get("/api/address/getallinfo", (req, res) => {
  const key = req.query.key;
  const sqlQuery = "SELECT * FROM address WHERE user_id Like ?";
  console.log(sqlQuery, key);
  db.query(sqlQuery, [key], (err, data) => {
    if (!err) {
      console.log(key);
      return res.send(data);
    } else {
      res.send(err);
    }
  });
});

app.post("/api/address/postaddress", (req, res) => {
  const user_id = req.body.user_id;
  const postal_code = req.body.postal_code;
  const address1 = req.body.address1;
  const address2 = req.body.address2;
  const phone = req.body.phone;
  const country = req.body.country;
  const is_default = req.body.is_default;
  const address_name = req.body.address_name;
  const recipient = req.body.recipient;
  const sqlQuery =
    "INSERT INTO address (user_id,postal_code,address1,address2,phone,country,is_default,address_name,recipient) VALUES (?,?,?,?,?,?,?,?,?)";
  db.query(
    sqlQuery,
    [
      user_id,
      postal_code,
      address1,
      address2,
      phone,
      country,
      is_default,
      address_name,
      recipient,
    ],
    (err, result) => {
      console.log(
        user_id,
        postal_code,
        address1,
        address2,
        phone,
        country,
        is_default,
        address_name
      );
      console.log(err);
      res.send(err); //에러코드를 표시.
    }
  );
});
app.delete("/api/address/delete", (req, res) => {
  const key = req.body.id;
  const sqlQuery = "DELETE FROM address WHERE address_id=? ;";
  db.query(sqlQuery, [key], (err, data) => {
    console.log(req.body.id);
    if (!err) {
      console.log(key);
      console.log(data);
      return res.send(data);
    } else {
      console.log(key);
      res.send(err);
    }
  });
});

/* ------------Point-------------- */
app.get("/api/point/get", (req, res) => {
  const key = req.query.key;
  const sqlQuery = "SELECT * FROM point WHERE person_id Like ?";
  console.log(sqlQuery, key);
  db.query(sqlQuery, [key], (err, data) => {
    if (!err) {
      console.log(key);
      return res.send(data);
    } else {
      res.send(err);
    }
  });
});

/* -------------Intro--------------- */
//subscribe
app.post("/api/intro/subscribe", (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  console.log(email)

  console.log(email)
  const sqlQuery = "INSERT INTO subscribe (email,name) VALUES (?,?)";
  db.query(sqlQuery,[email,name],(err,data) => {
    if(!err){
      console.log(data);
      res.send(data);
    }
    else {
      res.send(err);
    }
  })
})


/*-------------admin--------------------*/
app.get("/api/admin/subscribe/get", (req, res) => {
  
  const sqlQuery = "SELECT * FROM subscribe";
  db.query(sqlQuery,[],(err,data) => {
    if(!err){
      console.log(data);
      return res.send(data);
    }
    else {
      res.send(err);
    }
  })
});
app.delete ("api/admin/subscribe/delete", (req, res) => {
  const key = req.body.id;
  var keyString = "";
   key.forEach((element, index, array) => {
    if (index === array.length - 1) {
      keyString += "'" + element + "'";
    } else {
      keyString += "'" + element + "'" + ",";
    }
  });
  console.log("sdf")

  const sqlQuery = `DELETE FROM Subscribe WHERE id IN( ${keyString}) ;`;
  console.log(sqlQuery + keyString);
  db.query(sqlQuery, [keyString], (err, data) => {
    console.log(db.query);
    if (!err) {
      console.log(key);
      console.log(data.sql);
      //return res.send({success: true, key});
      return res.send("success")
    } else {
      console.log(key);
      //res.send({success: false, key});
      return res.send("fail")
    }
  });
})

// app.delete("/api/admin/user/delete/multi", (req, res) => {
//   const key = req.body.id;
//   var keyString = "";
//   // key.forEach((element, index, array) => {
//   //   if (index === array.length - 1) {
//   //     keyString += "userID = " + `"`+element  + `"`;
//   //   } else {
//   //     keyString += "userID = "+`"` + element + `"` + `||`;
//   //   }
//   // });
//   //  key.forEach((element, index, array) => {
//   //     if( index === array.length -1 ){
//   //       keyString += `"`+element + `"`;
//   //     } else {
//   //       keyString += `"` + element + `"` + ","
//   //     }
//   //  })
//   key.forEach((element, index, array) => {
//     if (index === array.length - 1) {
//       keyString += "'" + element + "'";
//     } else {
//       keyString += "'" + element + "'" + ",";
//     }
//   });


app.get("/api/admin/login", (req, res) => {
  const key = req.query.key;
  const sqlQuery = "SELECT * FROM admin WHERE email Like ?";
  console.log(sqlQuery, key);
  db.query(sqlQuery, [key], (err, data) => {
    if (!err) {
      console.log(data);
      return res.send(data);
    } else {
      res.send(err);
    }
  });
});

app.get("/api/admin/getuser", (req, res) => {
  const sqlQuery = "SELECT * FROM Persons WHERE admin=0 ";
  db.query(sqlQuery, [], (err, data) => {
    if (!err) {
      console.log(data);
      return res.send(data);
    } else {
      res.send(err);
    }
  });
});

app.get("/api/admin/getadmin", (req, res) => {
  const sqlQuery = "SELECT * FROM Persons WHERE admin=1 ";
  db.query(sqlQuery, [], (err, data) => {
    if (!err) {
      console.log(data);
      return res.send(data);
    } else {
      res.send(err);
    }
  });
});

app.get("/api/admin/user/search/:searchKey", (req, res) => {
  const sqlQuery = "SELECT * FROM Persons WHERE admin = ? AND ?? Like ?";
  const admin = req.query.listOption;
  const key = req.params.searchKey;
  const searchOption = req.query.searchOption;
  const keuyy = req.query.searchKey;
  const queryKey = "%" + key + "%";

  //const fullQuery = db.format(sqlQuery,[admin,listOption,queryKey])
  //console.log(fullQuery);
  console.log(admin, searchOption, queryKey);
  db.query(sqlQuery, [admin, searchOption, queryKey], (err, data) => {
    if (!err) {
      console.log(data);
      return res.send(data);
    } else {
      res.send(err);
      console.log(sqlQuery);
    }
  });
});

app.delete("/api/admin/user/delete", (req, res) => {
  const key = req.body.id;
  const sqlQuery = "DELETE FROM Persons WHERE userID = ? ;";
  db.query(sqlQuery, [key], (err, data) => {
    console.log("key is: ", req.body.id);
    if (!err) {
      console.log(key);
      console.log(data);
      return res.send(data);
    } else {
      console.log(key);
      res.send(err);
    }
  });
});

app.delete("/api/admin/user/delete/multi", (req, res) => {
  const key = req.body.id;
  var keyString = "";
  // key.forEach((element, index, array) => {
  //   if (index === array.length - 1) {
  //     keyString += "userID = " + `"`+element  + `"`;
  //   } else {
  //     keyString += "userID = "+`"` + element + `"` + `||`;
  //   }
  // });
  //  key.forEach((element, index, array) => {
  //     if( index === array.length -1 ){
  //       keyString += `"`+element + `"`;
  //     } else {
  //       keyString += `"` + element + `"` + ","
  //     }
  //  })
  key.forEach((element, index, array) => {
    if (index === array.length - 1) {
      keyString += "'" + element + "'";
    } else {
      keyString += "'" + element + "'" + ",";
    }
  });

  console.log(keyString);
  const sqlQuery = `DELETE FROM Persons WHERE userID  IN( ${keyString}) ;`;
  console.log(sqlQuery + keyString);
  db.query(sqlQuery, [keyString], (err, data) => {
    console.log(db.query);
    if (!err) {
      console.log(key);
      console.log(data.sql);
      return res.send({success: true, key});
    } else {
      console.log(key);
      res.send({success: false, key});
    }
  });
});

app.patch("/api/admin/user/update/:id", (req, res) => {
  const id = req.params.id;
  const nickName = req.body.nickname;
  const role = req.body.role;
  const address = req.body.address;
  const address1 = req.body.address1;
  const sqlQuery =
    "UPDATE Persons SET Nickname = ? , Address = ? , Address1 = ? , admin = ? WHERE PersonID = ?";
  db.query(sqlQuery, [nickName, address, address1, role, id], (err, result) => {
    if (!err) {
      return res.send(result);
    } else {
      res.send(err);
    }
  });
});
//--firebase--
admin.initializeApp({
  credential: admin.credential.cert(firebaseAdminAccount),
});

const auth = admin.auth();

app.use(bodyParser.json());

app.post("/users/api/admin/user/delete", async (req, res) => {
  const { email } = req.body;

  try {
    const userRecord = await auth.getUserByEmail(email);
    await auth.deleteUser(userRecord.uid);
    res.json({ success: true, userRecord });
  } catch (error) {
    console.error("에러 발생", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post("/users/api/admin/user/delete/multi", async (req, res) => {
  const { emails } = req.body;
  try {
    var deleteResults = [];
    var failResults = [];
    var successResults = [];
    for (const email of emails) {
      try {
        console.log("firebase 삭제 시도 ", email);
        const userRecord = await auth.getUserByEmail(email);
        await auth.deleteUser(userRecord.uid);
        //deleteResults.push({ email, success: true });
        successResults.push( email );
      } catch (error) {
        failResults.push( email );
      }
    }
    if (failResults.length === 0) {
      console.log("전체삭제성공")
      res.json({ success: true, successResults, failResults });
    } else if (failResults.length === emails.length) {
      //삭제 요청 건과 삭제 실패 건의 수가 동일하면 전체 삭제 실패이므로 success false 값을 보내서 db 삭제를 막는다.
      console.log("전체삭제실패")
      res.status(500).json({ success: false, successResults,failResults, error: error.message });
    } else if(failResults.length >=1 ) {
      //삭제 실패 건이 1 이상일 때 -> 요청 건의 일부가 실패된 상태
      console.log("일부삭제실패")
      res.json({ success: true, successResults, failResults });
    }
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ success: false, error: error.message });
  }
});
