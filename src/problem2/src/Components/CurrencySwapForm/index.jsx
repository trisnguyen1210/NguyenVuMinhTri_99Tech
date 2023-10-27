import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Select, Input, Stack } from "@chakra-ui/react";
import "./style.css";
const CurrencyConverter = () => {
  //use UseState reload page + storage api
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [firstValue, setFirstValue] = useState(0);
  const [secondValue, setSecondValue] = useState(0);
  const [exchangeRate, setExchangeRate] = useState();
  //use UseEffect+axios to get total data render API from web
  // useEffect(() => {
  //   axios
  //     .get("https://api.exchangerate-api.com/v4/latest/USD")
  //     .then((res) => {
  //       const currencyAr = [];
  //       for (const key in res.data.rates) {
  //         currencyAr.push(key);
  //       }
  //       console.log(currencyAr)
  //       setCurrencies(currencyAr);
  //       setFromCurrency(res.data.base);
  //       setToCurrency("VND");
  //       setExchangeRate(res.data.rates["VND"]);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  useEffect(() => {
    axios.get("https://interview.switcheo.com/prices.json").then((res) => {
      const currencyAr = [];
      for (const values of res.data) {
        currencyAr.push(values.currency);
      }
      setCurrencies(currencyAr);
      setFromCurrency(currencyAr[0]);
      setToCurrency(currencyAr[1]);
      const firstRate = res.data.filter((obj) => obj.currency === "BLUR")[0]
        .price;
      setExchangeRate(firstRate);
    });
  }, []);

  //get API + currentcyRates from UI
  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      axios
        .get(`https://interview.switcheo.com/prices.json`)
        .then((res) => {
          const sourceExchange = res.data.filter(
            (obj) => obj.currency === fromCurrency
          )[0].price;
          const targetExchange = res.data.filter(
            (obj) => obj.currency === toCurrency
          )[0].price;
          const ratingExchange = targetExchange / sourceExchange;
          // Update exchangeRate after calculation
          setExchangeRate(ratingExchange);
          setFirstValue(firstValue);
          setSecondValue(firstValue * ratingExchange);
        })
        .catch((err) => console.log(err));
    }
  }, [fromCurrency, toCurrency]);

  return (
    <>
      <Box className="background">
        <div className="header_app">
          <h1>Currency Swap Application</h1>
        </div>
        <div className="body_app">
          <Stack spacing={3}>
            <div className="value_from">
              <Input
                id="value_first"
                value={firstValue}
                onChange={(e) => {
                  setFirstValue(e.target.value);
                  setSecondValue(e.target.value * exchangeRate);
                }}
                placeholder="Amount"
              />
              <Select
                id="value_first_type"
                placeholder="Pick type money"
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
              >
                {currencies.map((currency, index) => (
                  <option key={index} value={currency}>
                    {currency}
                  </option>
                ))}
              </Select>
            </div>
            <div className="value_to">
              <Input
                id="value_second"
                value={secondValue}
                onChange={(e) => {
                  setFirstValue(e.target.value / exchangeRate);
                  setSecondValue(e.target.value);
                }}
                placeholder="Amount"
              />
              <Select
                id="value_second_type"
                placeholder="Pick type money"
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
              >
                {currencies.map((currency, index) => (
                  <option key={index} value={currency}>
                    {currency}
                  </option>
                ))}
              </Select>
            </div>
          </Stack>
        </div>
      </Box>
    </>
  );
};

export default CurrencyConverter;
