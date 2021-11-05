import Chart from 'chart.js/auto';
import {io} from 'socket.io-client';

const socket = io('ws://localhost:8080')

let labels = [];

let data = {
   labels: labels,
   datasets: [{
      label: 'My First dataset',
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

//let index = 0

function bruh(data) {
   //let date = new Date()
   myChart.data.labels.push(data)
   myChart.data.datasets[0].data.push(Math.sin(data))

   myChart.update()

   //index += 0.1
   //setTimeout(function () {bruh()}, 100)
}

const myChart = new Chart(
   document.getElementById('myChart'),
   config
);

socket.on("connect", () => {
   console.log('connected')
})

socket.on("newdata", (data) => {
   console.log(data)
   bruh(data)
})
