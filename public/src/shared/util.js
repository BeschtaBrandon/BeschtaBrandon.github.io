const stockAPIBase = 'https://cloud.iexapis.com/stable/stock/';
const TOKEN = '?token=pk_47cd9e66407f482eb6ef65a34254f072';

export default function callAPI(stock) {
  return fetch(stockAPIBase + stock + '/quote' + TOKEN);
}
