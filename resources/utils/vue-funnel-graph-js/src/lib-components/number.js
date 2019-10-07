const roundPoint = number => Math.round(number * 10) / 10;
const formatNumber = number => Number(number).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

export { roundPoint, formatNumber };
