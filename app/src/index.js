import Chart from 'chart.js/auto';
import {io} from 'socket.io-client';

const socket = io('ws://localhost:8080')

function createGraph(id, unit) {

   const data = {
      labels: [],
      datasets: [{
         label: unit,
         backgroundColor: 'rgb(255, 99, 132)',
         borderColor: 'rgb(255, 99, 132)',
         data: [],
      }]
   };

   const config = {
      type: 'line',
      data: data,
      options: {
         responsive: true
      }
   }

   const myChart = new Chart(
      document.getElementById(id),
      config
   );

   return myChart;
}
//let index = 0

function addData(chart, data) {
   //let date = new Date()
   chart.data.labels.push('')
   chart.data.datasets[0].data.push(data)

   chart.update()

   //index += 0.1
   //setTimeout(function () {bruh()}, 100)
}

let charts = [];

for (let i = 0; i < 4; i += 1) {
   charts.push(createGraph('myChart' + i, 'bruh'));
}


socket.on("connect", () => {
   console.log('connected')
})

socket.on("newdata", (data) => {
   console.log(data)
   addData(charts[0], data)
   addData(charts[1], Math.sin(data))
   addData(charts[2], Math.cos(data))
   addData(charts[3], Math.sqrt(data))
})
