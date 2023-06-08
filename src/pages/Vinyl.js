import React, { useEffect, useState} from "react";
import Axios from "axios";
import Menu from "./Vinyl/Menu.js";
import VinylList from "./Vinyl/VinylList";
import './Vinyl/Vinyl.css'
import Item from "./Vinyl/Item.js";
import { useNavigate } from "react-router-dom";
function Vinyl() {
  let navigate = useNavigate();
  let [selected, setSelected] = useState("Japanese");
  let [dbdata, setDbdata] = useState([]);
  let [datalength, setdatalength] = useState([])
  useEffect(() => {
    Axios.get("http://localhost:8000/api/vinyl/List", {
      params: { key: selected },
    })
      .then((res) => {
        setDbdata([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
      setdatalength(dbdata.length);
    console.log(dbdata, selected);
  }, [selected]);
  return (
    <>
      <div className="div-vinylmenu">
        <p className="p-vinylmenu">ALL</p>
        <p className="p-vinylmenu"
          onClick={() => {
            setSelected("Jazz");
          }}
        >
          Jazz
        </p>
        <p className="p-vinylmenu"
          onClick={() => {
            setSelected("Korean");
          }}
        >
          Korean
        </p>
        <p className="p-vinylmenu"
          onClick={() => {
            setSelected("Japanese");
          }}
        >
          Japanese
        </p>
        <p className="p-vinylmenu"
          onClick={() => {
            setSelected("Future");
          }}
        >
          Future jazz/Club jazz/Shibuya-kei/Downtempo
        </p>
        <p className="p-vinylmenu"
          onClick={() => {
            setSelected("Taiwan");
          }}
        >
          Taiwan/Hongkong/China
        </p>
        <p className="p-vinylmenu"
          onClick={() => {
            setSelected("House");
          }}
        >
          House/Techno
        </p>
        <p className="p-vinylmenu"
          onClick={() => {
            setSelected("Soul");
          }}
        >
          Soul/Funk
        </p>
      </div>

      <div>
        
        {dbdata.map((item) => {
          return (
            
            <div className="div-vinylcontainer" key={item.id}>
              <div className="vinyl-item">
              <VinylList
                result_num={datalength} item={item}
                
                />
               
              </div>
            </div>
          );
        })}
      </div>

      
      <Menu />

     
    </>
  );
}

export default Vinyl;
