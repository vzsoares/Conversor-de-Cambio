import React, { useState, useEffect } from "react";
import { TiArrowRepeat } from "react-icons/ti";
import { FaGithubSquare } from "react-icons/fa";

function App() {
  // state values
  const [currencyInput0, setCurrencyInput0] = useState(1);
  const [currencyInput1, setCurrencyInput1] = useState(7);
  const [currencySelect0, setCurrencySelect0] = useState("dollar");
  const [currencySelect1, setCurrencySelect1] = useState("real");
  const [lastChanged, setLastChanged] = useState(0);

  const [data, setData] = useState({
    CurrencyToDollar: {
      dollar: 1,
      real: 0.176,
      euro: 1.12,
      yen: 0.0086,
    },
    DollarToCurrency: {
      dollar: 1,
      real: 5.68,
      euro: 0.89,
      yen: 116.14,
    },
  });
  // functions

  async function fetchExchangeRate() {
    const todayDate = new Date().toISOString().slice(0, 10);
    const url = `https://api.exchangerate.host/${todayDate}?base=USD`;
    let responseObject;
    try {
      const response = await fetch(url);
      responseObject = await response.json();
    } catch (error) {
      console.log("error", error);
    }

    setData({
      CurrencyToDollar: {
        dollar: 1,
        real: (1 / responseObject.rates.BRL).toFixed(2),
        euro: (1 / responseObject.rates.EUR).toFixed(2),
        yen: (1 / responseObject.rates.JPY).toFixed(2),
      },
      DollarToCurrency: {
        dollar: 1,
        real: responseObject.rates.BRL,
        euro: responseObject.rates.EUR,
        yen: responseObject.rates.JPY,
      },
    });
    setCurrencyInput1(responseObject.rates.BRL);
  }

  const handleInversion = (e) => {
    e.preventDefault();
    // TODO
  };
  const applyCambio = () => {
    const exchangeConverter = (currency, currencyValue, targetCurrency) => {
      return Number(
        (
          data.CurrencyToDollar[currency] *
          currencyValue *
          data.DollarToCurrency[targetCurrency]
        ).toFixed(2)
      );
    };
    if (lastChanged === 0) {
      setCurrencyInput1(
        exchangeConverter(currencySelect0, currencyInput0, currencySelect1)
      );
    }
    if (lastChanged === 1) {
      setCurrencyInput0(
        exchangeConverter(currencySelect1, currencyInput1, currencySelect0)
      );
    }
  };
  // useEffect

  useEffect(() => {
    fetchExchangeRate();
  }, []);

  useEffect(() => {
    applyCambio();
  }, [currencyInput0, currencyInput1, currencySelect0, currencySelect1]);

  // style
  const inputStyle = {
    border: "2px solid black",
    borderRadius: "5px",
    padding: "4px",
  };
  const selectStyle = {
    border: "2px solid black",
    borderRadius: "5px",
    padding: "4px",
    backgroundColor: "white",
    textTransform: "capitalize",
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div className='main' style={{ minHeight: "85vh" }}>
        <div className='title-container' style={{ marginBottom: "25vh" }}>
          <h1>Conversor de cambio</h1>
        </div>
        <div className='conversor-container'>
          <div
            className='moedas'
            style={{ display: "flex", justifyContent: "center" }}
          >
            <select
              value={currencySelect0}
              name=''
              id='currencySelect0'
              onChange={(e) => {
                setCurrencySelect0(e.target.value);
              }}
              style={{ ...selectStyle }}
            >
              <option value='dollar'>dollar</option>
              <option value='real'>real</option>
              <option value='euro'>euro</option>
              <option value='yen'>yen</option>
            </select>
            <div className='div'>
              <a onClick={(e) => handleInversion(e)} href='/'>
                <TiArrowRepeat
                  style={{
                    fontSize: "2rem",
                    textDecoration: "none",
                    color: "black",
                  }}
                />
              </a>
            </div>
            <select
              value={currencySelect1}
              name=''
              style={selectStyle}
              id='currencySelect1'
              onChange={(e) => {
                setCurrencySelect1(e.target.value);
              }}
            >
              <option value='real'>real</option>
              <option value='dollar'>dollar</option>
              <option value='euro'>euro</option>
              <option value='yen'>yen</option>
            </select>
          </div>
          <div className='results' style={{ marginTop: "0.5rem" }}>
            <input
              type='number'
              min='0'
              onChange={(e) =>
                setCurrencyInput0(e.target.value) & setLastChanged(0)
              }
              value={currencyInput0}
              style={{ ...inputStyle, marginRight: "0.2rem" }}
            />
            <input
              type='number'
              min='0'
              value={currencyInput1}
              onChange={(e) =>
                setCurrencyInput1(e.target.value) & setLastChanged(1)
              }
              style={{ ...inputStyle, marginLeft: "0.2rem" }}
            />
          </div>
        </div>
      </div>
      {/* gitHub ref */}
      <div
        className='github'
        style={{
          textAlign: "center",
        }}
      >
        <p>
          <small style={{ fontSize: "0.75rem" }}>
            <span>Special tanks to </span>

            <span>
              {" "}
              <span style={{ fontWeight: "500", fontSize: "0.80rem" }}>
                Exchangerate
              </span>{" "}
              for providing{" "}
              <a
                target='_blank'
                rel='noreferrer'
                href='https://exchangerate.host/#/'
                style={{ fontWeight: "500", fontSize: "0.80rem" }}
              >
                this
              </a>{" "}
              amazing API
            </span>
          </small>
        </p>
        <a
          href='https://github.com/vzsoares'
          target='_blank'
          rel='noreferrer'
          className='github'
        >
          <FaGithubSquare
            style={{ color: "black", fontSize: "3rem", marginTop: "0.5rem" }}
          />
        </a>
      </div>
    </div>
  );
}

export default App;
