const getMean = (array) => array.reduce((acc, el) => acc + el, 0) / array.length;

const getMedian = (array) => {
  const sorted = array.slice().sort((a, b) => a - b);
  const median =
    array.length % 2 === 0
      ? getMean([sorted[array.length / 2], sorted[array.length / 2 - 1]])
      : sorted[Math.floor(array.length / 2)];
  return median;
}

const getMode = (array) => {
  const counts = {};
  array.forEach((el) => {
    counts[el] = (counts[el] || 0) + 1;
  })
  if (new Set(Object.values(counts)).size === 1) {
    return null;
  }
  const highest = Object.keys(counts).sort(
    (a, b) => counts[b] - counts[a]
  )[0];
  const mode = Object.keys(counts).filter(
    (el) => counts[el] === counts[highest]
  );
  return mode.join(", ");
}

const getRange = (array) => {
  return Math.max(...array) - Math.min(...array);
}

const getVariance = (array) => {
  const mean = getMean(array);
  const variance = array.reduce((acc, el) => {
    const difference = el - mean;
    const squared = difference ** 2;
    return acc + squared;
  }, 0) / array.length;
  return variance;
}

const getStandardDeviation = (array) => {
  const variance = getVariance(array);
  const standardDeviation = Math.sqrt(variance);
  return standardDeviation;
}

const calculateAndVisualize = () => {
  const value = document.querySelector("#numbers").value;
  const array = value.split(/,\s*/g);
  const numbers = array.map(el => Number(el)).filter(el => !isNaN(el));
  
  const mean = getMean(numbers);
  const median = getMedian(numbers);
  const mode = getMode(numbers);
  const range = getRange(numbers);
  const variance = getVariance(numbers);
  const standardDeviation = getStandardDeviation(numbers);

  document.querySelector("#mean").textContent = mean;
  document.querySelector("#median").textContent = median;
  document.querySelector("#mode").textContent = mode;
  document.querySelector("#range").textContent = range;
  document.querySelector("#variance").textContent = variance;
  document.querySelector("#standardDeviation").textContent = standardDeviation;

  createOrUpdateChart("meanChart", "Mean", [mean], "Mean");
  createOrUpdateChart("medianChart", "Median", [median], "Median");
  createOrUpdateChart("modeChart", "Mode", mode ? mode.split(", ") : [], "Mode");
  createOrUpdateChart("rangeChart", "Range", [range], "Range");
  createOrUpdateChart("varianceChart", "Variance", [variance], "Variance");
  createOrUpdateChart("standardDeviationChart", "Standard Deviation", [standardDeviation], "Standard Deviation");
}

const createOrUpdateChart = (chartId, title, data, xLabel) => {
  let chart = document.getElementById(chartId);
  if (chart) {
    chart.parentNode.removeChild(chart);
  }
  
  const div = document.createElement('div');
  div.id = chartId;
  div.style.width = '600px'; /* Set width of the chart */
  div.style.height = '400px'; /* Set height of the chart */
  document.querySelector(".chart-container").appendChild(div);

  Plotly.newPlot(chartId, [{
    x: [xLabel],
    y: data,
    type: 'bar',
    marker: {
      color: 'rgba(54, 162, 235, 0.6)'
    }
  }], {
    title: title,
    xaxis: {
      title: xLabel
    },
    yaxis: {
      title: 'Value'
    }
  });
}

