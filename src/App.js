import React, { useState, useEffect } from "react";
import "./App.css";
import { TiArrowRepeat } from "react-icons/ti";
import { FaGithubSquare } from "react-icons/fa";

function App() {
  // state values
  const [fetchedData, setFetchedData] = useState();
  const [currencyValue1, setCurrencyValue1] = useState(1);
  const [currencyValue2, setCurrencyValue2] = useState(7);
  const [currency1, setCurrency1] = useState("dolar");
  const [currency2, setCurrency2] = useState("real");
  const [lastChanged, setLastChanged] = useState(0);
  const [reRenderCurrency, setReRenderCurrency] = useState(true);
  const [data, setData] = useState({
    valoresEmDolar: {
      dolar: 1,
      real: 0.176,
      euro: 1.12,
      yen: 0.0086,
    },
    valoresNativos: {
      dolar: 1,
      real: 5.68,
      euro: 0.89,
      yen: 116.14,
    },
  });
  // functions
  function getPreviousDay(date = new Date()) {
    const previous = new Date(date.getTime());
    // previous.setDate(date.getDate() - 1);
    previous.setDate(date.getDate());
    return previous;
  }
  async function getExchangeRate() {
    const previousDay = getPreviousDay();
    const year = `${previousDay.getFullYear()}`;
    const month = previousDay.getMonth() + 1;
    const monthString = month < 10 ? `0${month}` : `${month}`;
    const day =
      previousDay.getDate() < 10
        ? `0${previousDay.getDate()}`
        : `${previousDay.getDate()}`;
    let responseObject;
    const url = `https://api.exchangerate.host/${year}-${monthString}-${day}?base=USD`;
    try {
      const response = await fetch(url);
      responseObject = await response.json();
    } catch (error) {
      console.log("error", error);
    }
    setFetchedData(responseObject);
  }

  const handleCurrencySelectionChange = (e, currency) => {
    setReRenderCurrency(true);
    if (currency === currency1 && e.target.id === "currency1") {
      setCurrency1(e.target.value);
    } else if (currency === currency2) {
      setCurrency2(e.target.value);
    }
  };

  const handleInputChange = (e, value) => {
    if (!Number(e.target.value) && Number(e.target.value) !== 0) {
      alert("Apenas números são aceitos");
      return;
    }
    setReRenderCurrency(true);
    if (value === 0) {
      setCurrencyValue1(e.target.value);
      setLastChanged(0);
    } else if (value === 1) {
      setCurrencyValue2(e.target.value);
      setLastChanged(1);
    }
  };

  const handleInversion = (e) => {
    e.preventDefault();
    setReRenderCurrency(false);
    const holdCurrency1 = currency1;
    const holdCurrency2 = currency2;
    const holdCurrencyValue1 = currencyValue1;
    const holdCurrencyValue2 = currencyValue2;
    setCurrency1(holdCurrency2);
    setCurrency2(holdCurrency1);
    setCurrencyValue1(holdCurrencyValue2);
    setCurrencyValue2(holdCurrencyValue1);
  };

  const applyCambio = () => {
    const exchangeConverter = (currency, currencyValue, targetCurrency) => {
      return Number(
        (
          data.valoresEmDolar[currency] *
          currencyValue *
          data.valoresNativos[targetCurrency]
        ).toFixed(2)
      );
    };
    if (lastChanged === 0) {
      setCurrencyValue2(
        exchangeConverter(currency1, currencyValue1, currency2)
      );
    }
    if (lastChanged === 1) {
      setCurrencyValue1(
        exchangeConverter(currency2, currencyValue2, currency1)
      );
    }
  };
  // useEffect

  useEffect(() => {
    if (fetchedData) {
      setData({
        valoresEmDolar: {
          dolar: 1,
          real: (1 / data.valoresNativos["real"]).toFixed(2),
          euro: (1 / data.valoresNativos["euro"]).toFixed(2),
          yen: (1 / data.valoresNativos["yen"]).toFixed(2),
        },
        valoresNativos: {
          dolar: 1,
          real: fetchedData.rates.BRL,
          euro: fetchedData.rates.EUR,
          yen: fetchedData.rates.JPY,
        },
      });
      setCurrencyValue2(fetchedData.rates.BRL);
    }
  }, [fetchedData]);

  useEffect(() => {
    getExchangeRate();
  }, []);

  useEffect(() => {
    if (reRenderCurrency) {
      applyCambio();
    }
  }, [currencyValue1, currencyValue2, currency1, currency2]);

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
    <div className='App'>
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
              value={currency1}
              name=''
              id='currency1'
              onChange={(e) => {
                handleCurrencySelectionChange(e, currency1);
              }}
              style={{ ...selectStyle }}
            >
              <option value='dolar'>dolar</option>
              <option value='real'>real</option>
              <option value='euro'>euro</option>
              <option value='yen'>yen</option>
            </select>
            <div className='div'>
              <a onClick={(e) => handleInversion(e)} href=''>
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
              value={currency2}
              name=''
              style={selectStyle}
              id='currency2'
              onChange={(e) => {
                handleCurrencySelectionChange(e, currency2);
              }}
            >
              <option value='real'>real</option>
              <option value='dolar'>dolar</option>
              <option value='euro'>euro</option>
              <option value='yen'>yen</option>
            </select>
          </div>
          <div className='results' style={{ marginTop: "0.5rem" }}>
            <input
              type='text'
              id='currencyValue1'
              onChange={(e) => handleInputChange(e, 0)}
              value={currencyValue1}
              style={{ ...inputStyle, marginRight: "0.2rem" }}
            />
            <input
              type='text'
              id='currencyValue2'
              value={currencyValue2}
              onChange={(e) => handleInputChange(e, 1)}
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
