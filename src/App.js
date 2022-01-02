import React, { useState, useEffect } from "react";
import "./App.css";
import { TiArrowRepeat } from "react-icons/ti";

function App() {
  const [value1, setValue1] = useState("1");
  const [value2, setValue2] = useState("7");
  const [moeda1, setMoeda1] = useState("dolar");
  const [moeda2, setMoeda2] = useState("real");
  const [lastChanged, setLastChanged] = useState(0);
  const handleMoedaChange = (e, moeda) => {
    if (moeda == moeda1) {
      setMoeda1(e.target.value);
    } else if (moeda == moeda2) {
      setMoeda2(e.target.value);
    }
  };

  const handleInputChange = (e, value) => {
    if (!Number(e.target.value) && Number(e.target.value) !== 0) {
      alert("Apenas números são aceitos");
      return;
    }
    if (value == 0) {
      setValue1(e.target.value);
      setLastChanged(0);
    } else if (value == 1) {
      setValue2(e.target.value);
      setLastChanged(1);
    }
    console.log(value1, value2);
  };
  const handleInversion = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    applyCambio();
  }, [value1, value2]);
  const applyCambio = () => {
    if (lastChanged == 0) {
      setValue2(value1 * 7);
    }
    if (lastChanged == 1) {
      setValue1(value2 / 7);
    }
  };
  return (
    <div className='App'>
      <div className='title-container'>
        <h1>conversor de cambio</h1>
      </div>
      <div className='conversor-container'>
        <div
          className='moedas'
          style={{ display: "flex", justifyContent: "center" }}
        >
          <select
            name=''
            id='moeda1'
            onChange={(e) => {
              handleMoedaChange(e, moeda1);
            }}
          >
            <option value='dolar'>dolar</option>
            <option value='real'>real</option>
            <option value='euro'>euro</option>
            <option value='yen'>yen</option>
          </select>
          <div className='div'>
            <a onClick={handleInversion} href=''>
              <TiArrowRepeat style={{ fontSize: "2rem" }} />
            </a>
          </div>
          <select name='' id=''>
            <option value='real'>real</option>
            <option value='dolar'>dolar</option>
            <option value='euro'>euro</option>
            <option value='yen'>yen</option>
          </select>
        </div>
        <div className='results'>
          <input
            type='text'
            id='value1'
            onChange={(e) => handleInputChange(e, 0)}
            value={value1}
          />
          <input
            type='text'
            id='value2'
            value={value2}
            onChange={(e) => handleInputChange(e, 1)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
