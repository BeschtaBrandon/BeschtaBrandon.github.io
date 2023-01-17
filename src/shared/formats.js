export const formatPercent = value => {
  return value ? parseFloat(value * 100).toFixed(1) + ' %' : '';
}

export const formatCurrency = value => {
  return value ? '$ ' + parseFloat(value).toFixed(2) : '';
}