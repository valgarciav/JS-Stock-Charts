function getColor(stock) {
  if (stock === "GME") {
    return "rgba(61, 161, 61, 0.7)";
  }
  if (stock === "MSFT") {
    return "rgba(209, 4, 25, 0.7)";
  }
  if (stock === "DIS") {
    return "rgba(18, 4, 209, 0.7)";
  }
  if (stock === "BNTX") {
    return "rgba(166, 43, 158, 0.7)";
  }
}

//Time Chart
async function main() {
  const timeChartCanvas = document.querySelector("#time-chart");
  const highestPriceChartCanvas = document.querySelector(
    "#highest-price-chart"
  );
  const averagePriceChartCanvas = document.querySelector(
    "#average-price-chart"
  );

  const response = await fetch(
    `https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1day&apikey=898ad9abff1f4256ac557432a3b5fb49`
  );
  const mockData = await response.json();
  const { GME, MSFT, DIS, BNTX } = mockData;
  const stocks = [GME, MSFT, DIS, BNTX];
}

const labels = ["January", "February", "March", "April", "May", "June"];
const data = {
  labels: labels,
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: [0, 10, 5, 2, 20, 30, 45],
    },
  ],
};

// === include 'setup' then 'config' above ===

stocks.forEach((stock) => stock.values.reverse());

new Chart(timeChartCanvas.getContext("2d"), {
  type: "line",
  data: {
    labels: stocks[0].values.map((value) => value.datetime),
    datasets: stocks.map((stock) => ({
      label: stock.meta.symbol,
      data: stock.values.map((value) => parseFloat(value.high)),
      backgroundColor: getColor(stock.meta.symbol),
      borderColor: getColor(stock.meta.symbol),
    })),
  },
});

var myChart = new Chart(document.getElementById("myChart"), config);

// Highest Stock Price Chart
new Chart(highestPriceChartCanvas.getContext("2d"), {
  type: "bar",
  data: {
    labels: stocks.map((stock) => stock.meta.symbol),
    datasets: [
      {
        label: "Highest",
        backgroundColor: stocks.map((stock) => getColor(stock.meta.symbol)),
        borderColor: stocks.map((stock) => getColor(stock.meta.symbol)),
        data: stocks.map((stock) => findHighest(stock.values)),
      },
    ],
  },
});

main();
