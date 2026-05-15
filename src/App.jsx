import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [rates, setRates] = useState({});
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState(0);

  useEffect(() => {
    fetch("https://open.er-api.com/v6/latest/USD")
      .then((res) => res.json())
      .then((data) => {
        setRates(data.rates);
        setConvertedAmount((1 * data.rates["EUR"]).toFixed(2));
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (rates[fromCurrency] && rates[toCurrency]) {
      const result = (amount / rates[fromCurrency]) * rates[toCurrency];
      setConvertedAmount(result.toFixed(2));
    }
  }, [amount, fromCurrency, toCurrency, rates]);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const currencyOptions = Object.keys(rates);

  return (
    <section id="converter-tool" className="container py-5">
      <h1 className="text-center mb-5">Currency Converter</h1>

      <div className="converter-card">
        <div className="input-group-custom">
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="currency-input"
            placeholder="0.00"
          />
        </div>

        <div className="conversion-row">
          <div className="select-box">
            <label>From</label>
            <input
              list="from-rates"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value.toUpperCase())}
              className="currency-select"
            />
            <datalist id="from-rates">
              {currencyOptions.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </div>

          <button className="swap-button" onClick={handleSwap} type="button">
            ⇄
          </button>

          <div className="select-box">
            <label>To</label>
            <input
              list="to-rates"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value.toUpperCase())}
              className="currency-select"
            />
            <datalist id="to-rates">
              {currencyOptions.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </div>
        </div>

        <div className="result-display">
          <p>
            {amount} {fromCurrency} =
          </p>
          <h2>
            {convertedAmount} {toCurrency}
          </h2>
        </div>
      </div>
    </section>
  );
}

export default App;
