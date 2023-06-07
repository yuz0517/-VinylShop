import React, { useEffect, useState } from "react";
import Axios from "axios";
import Menu from "./Vinyl/Menu.js";
import VinylList from "./Vinyl/VinylList";
import './Vinyl/Vinyl.css'
function Vinyl() {
  let [selected, setSelected] = useState("Japanese");
  let [dbdata, setDbdata] = useState([]);
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

    console.log(dbdata, selected);
  }, [selected]);
  return (
    <>
      <div className="div-vinylmenu">
        <p>ALL</p>
        <p
          onClick={() => {
            setSelected("Jazz");
          }}
        >
          Jazz
        </p>
        <p
          onClick={() => {
            setSelected("Korean");
          }}
        >
          Korean pop
        </p>
        <p
          onClick={() => {
            setSelected("Japanese");
          }}
        >
          Japanese pop
        </p>
        <p
          onClick={() => {
            setSelected("Future");
          }}
        >
          Future jazz/Club jazz/Shibuya-kei/Downtempo
        </p>
        <p
          onClick={() => {
            setSelected("Taiwan");
          }}
        >
          Taiwan/Hongkong/China
        </p>
        <p
          onClick={() => {
            setSelected("House");
          }}
        >
          House/Techno
        </p>
        <p
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
            <div className="vinyl-container" key={item.id}>
              <div className="vinyl-item">
                <p>{item.title}</p>
                <p>{item.artist}</p>
                <img src={item.img0} width="80%" />
              </div>
            </div>
          );
        })}
      </div>

      <div>Vinyl</div>
      <Menu />

      <VinylList />
    </>
  );
}

export default Vinyl;
