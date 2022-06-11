let cChart;

function drawingCharts() {
  let context = document.getElementById("circleCharts").getContext('2d');
  cChart = new Chart(context, {
    type: 'doughnut',
    data: {
      labels: ["長考中", "取り組み中"],
      datasets: [{
        backgroundColor: ["#fa8072", "#f5f5f5"],
        data: [0, 100]
      }]
    },
    options: {
      responsive: false,
    }
  });
}

function updateChart(sum, SEATSIZE) {
  let cnt = sum  * 100 / SEATSIZE;
  cChart.data.datasets[0].data = [cnt, 100 - cnt];
  cChart.update();
  document.getElementById("rate").innerHTML = cnt;
  // 文字の色を変えるといいかも？
}


export {drawingCharts, updateChart};
