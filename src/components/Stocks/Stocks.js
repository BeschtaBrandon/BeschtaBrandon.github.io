import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import classNames from "classnames";

import callAPI from "../../shared/util";
import { formatPercent, formatCurrency } from "../../shared/formats";
import "./Stocks.scss";
const STOCK_LIST = ["baba", "aapl", "lnt", "cof", "fb", "tsla", "v"];

const Stocks = () => {
  const [currentState, setCurrentState] = useState({
    error: null,
    isLoaded: false,
    fb: {},
    cof: {},
    lnt: {},
    appl: {},
    tsla: {},
    baba: {},
    v: {},
    sectors: []
  });

  useEffect(() => {
    for (var i = 0; i < STOCK_LIST.length; i++) {
      callAPI(STOCK_LIST[i])
        .then(res => res.json())
        .then(
          result => {
            if (result.symbol === "LNT") {
              setCurrentState(Object.assign(currentState, { lnt: result }));
            } else if (result.symbol === "AAPL") {
              setCurrentState(Object.assign(currentState, { appl: result }));
            } else if (result.symbol === "BABA") {
              setCurrentState(Object.assign(currentState, { baba: result }));
            } else if (result.symbol === "COF") {
              setCurrentState(Object.assign(currentState, { cof: result }));
            } else if (result.symbol === "FB") {
              setCurrentState(Object.assign(currentState, { fb: result }));
            } else if (result.symbol === "TSLA") {
              setCurrentState(Object.assign(currentState, { tsla: result }));
            } else if (result.symbol === "V") {
              setCurrentState(Object.assign(currentState, { v: result }));
            }
            setCurrentState(
              Object.assign({}, currentState, { isLoaded: true })
            );
          },
          error => {
            setCurrentState(
              Object.assign({}, currentState, { isLoaded: true, error })
            );
          }
        );
    }
    // fetch("https://cloud.iexapis.com/stable/stock/market/sector-performance" + TOKEN)
    //   .then(res => res.json())
    //   .then(
    //     (result) => {
    //       setCurrentState(
    //         Object.assign(currentState, {
    //           isLoaded: true,
    //           sectors: result
    //         })
    //       )
    //     },
    //     // Note: it's important to handle errors here
    //     // instead of a catch() block so that we don't swallow
    //     // exceptions from actual bugs in components.
    //     (error) => {
    //     setCurrentState(
    //       Object.assign({}, currentState, {
    //         isLoaded: true,
    //         error
    //       })
    //     )
    //       });
  }, []);

  const renderStocksHeader = () => {
    return (
      <div className="stock-header">
        <h2 className="mt-3 mb-2">
          My Favorite Stocks <i className="fas fa-chart-line ml-3" />
        </h2>
      </div>
    );
  };

  const renderStocksContent = () => {
    const { error, isLoaded, appl, fb, cof, lnt, tsla, baba, v } = currentState;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      const tableHeader = classNames("text-center");
      const isAPPLStockUp = classNames({
        success:
          appl.previousClose && appl.iexRealtimePrice > appl.previousClose,
        danger: appl.previousClose && appl.iexRealtimePrice < appl.previousClose
      });
      const isFBStockUp = classNames({
        success: fb.previousClose && fb.iexRealtimePrice > fb.previousClose,
        danger: fb.previousClose && fb.iexRealtimePrice < fb.previousClose
      });
      const isLNTStockUp = classNames({
        success: lnt.previousClose && lnt.iexRealtimePrice > lnt.previousClose,
        danger: lnt.previousClose && lnt.iexRealtimePrice < lnt.previousClose
      });
      const isCOFStockUp = classNames({
        success: cof.previousClose && cof.iexRealtimePrice > cof.previousClose,
        danger: cof.previousClose && cof.iexRealtimePrice < cof.previousClose
      });
      const isTSLAStockUp = classNames({
        success:
          tsla.previousClose && tsla.iexRealtimePrice > tsla.previousClose,
        danger: tsla.previousClose && tsla.iexRealtimePrice < tsla.previousClose
      });
      const isBABAStockUp = classNames({
        success:
          baba.previousClose && baba.iexRealtimePrice > baba.previousClose,
        danger: baba.previousClose && baba.iexRealtimePrice < baba.previousClose
      });
      const isVStockUp = classNames({
        success: v.previousClose && v.iexRealtimePrice > v.previousClose,
        danger: v.previousClose && v.iexRealtimePrice < v.previousClose
      });

      return (
        <Table condensed="true">
          <thead>
            <tr>
              <th className={tableHeader}>Company</th>
              <th className={tableHeader}>Symbol</th>
              <th className={tableHeader}>Price (US Dollars)</th>
              <th className={tableHeader}>YTD</th>
            </tr>
          </thead>
          <tbody>
            <tr key={lnt.symbol}>
              <td>{lnt.companyName}</td>
              <td>{lnt.symbol}</td>
              <td className={isLNTStockUp}>
                {lnt.iexRealtimePrice
                  ? formatCurrency(lnt.iexRealtimePrice)
                  : formatCurrency(lnt.iexClose)}
              </td>
              <td>{formatPercent(lnt.ytdChange)}</td>
            </tr>
            <tr key={appl.symbol}>
              <td>{appl.companyName}</td>
              <td>{appl.symbol}</td>
              <td className={isAPPLStockUp}>
                {appl.iexRealtimePrice
                  ? formatCurrency(appl.iexRealtimePrice)
                  : formatCurrency(appl.iexClose)}
              </td>
              <td>{formatPercent(appl.ytdChange)}</td>
            </tr>
            <tr key={baba.symbol}>
              <td>{baba.companyName}</td>
              <td>{baba.symbol}</td>
              <td className={isBABAStockUp}>
                {baba.iexRealtimePrice
                  ? formatCurrency(baba.iexRealtimePrice)
                  : formatCurrency(baba.iexClose)}
              </td>
              <td>{formatPercent(baba.ytdChange)}</td>
            </tr>
            <tr key={cof.symbol}>
              <td>{cof.companyName}</td>
              <td>{cof.symbol}</td>
              <td className={isCOFStockUp}>
                {cof.iexRealtimePrice
                  ? formatCurrency(cof.iexRealtimePrice)
                  : formatCurrency(cof.iexClose)}
              </td>
              <td>{formatPercent(cof.ytdChange)}</td>
            </tr>
            <tr key={fb.symbol}>
              <td>{fb.companyName}</td>
              <td>{fb.symbol}</td>
              <td className={isFBStockUp}>
                {fb.iexRealtimePrice
                  ? formatCurrency(fb.iexRealtimePrice)
                  : formatCurrency(fb.iexClose)}
              </td>
              <td>{formatPercent(fb.ytdChange)}</td>
            </tr>
            <tr key={tsla.symbol}>
              <td>{tsla.companyName}</td>
              <td>{tsla.symbol}</td>
              <td className={isTSLAStockUp}>
                {tsla.iexRealtimePrice
                  ? formatCurrency(tsla.iexRealtimePrice)
                  : formatCurrency(tsla.iexClose)}
              </td>
              <td>{formatPercent(tsla.ytdChange)}</td>
            </tr>
            <tr key={v.symbol}>
              <td>{v.companyName}</td>
              <td>{v.symbol}</td>
              <td className={isVStockUp}>
                {v.iexRealtimePrice
                  ? formatCurrency(v.iexRealtimePrice)
                  : formatCurrency(v.iexClose)}
              </td>
              <td>{formatPercent(v.ytdChange)}</td>
            </tr>
          </tbody>
        </Table>
      );
    }
  };

  // const renderStocksSectorHeader = () => {
  //   return (
  //     <h2>
  //       <small>Sector Performance</small>
  //     </h2>
  //   );
  // };

  // const renderStocksSectorContent = () => {
  //   const { sectors } = currentState;
  //   return (
  //     <Table condensed>
  //       <thead>
  //         <tr>
  //           <th>Sector</th>
  //           <th>Performance</th>
  //           <th>Last Updated</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {sectors.slice(0, 5).map(item => (
  //           <tr key={item.name}>
  //             <td>{item.name}</td>
  //             <td>{parseFloat((item.performance * 100).toFixed(3))} %</td>
  //             <td>{moment(item.lastUpdated).format("l")}</td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </Table>
  //   );
  // };

  const renderStockAttribution = () => {
    return (
      <p>
        Data provided for free by{" "}
        <a href="https://iextrading.com/developer/">IEX</a>
      </p>
    );
  };

  return (
    <div className="stocks-page">
      {renderStocksHeader()}
      {renderStocksContent()}
      {renderStockAttribution()}
    </div>
  );
};

export default Stocks;
