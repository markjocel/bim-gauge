import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, ChartType } from 'chart.js';
// import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  computationTable: any;
  totalScore: any;

  constructor(private router: Router) {
    this.computationTable = JSON.parse(localStorage.getItem('computationTable') || '{}')
    this.totalScore = parseInt(localStorage.getItem('totalScore') || '0')

    console.log(this.computationTable, this.totalScore)
  }

  ngOnInit(): void {
    window.scroll({ top: 0, behavior: 'smooth' })

    const gaugeChart = new Chart('gaugeChart', {
      type: 'doughnut',
      data: {
        // labels: ['Red'],
        datasets: [{
          label: 'BIM Maturity',
          data: [this.totalScore, this.totalScore - 100],
          backgroundColor: [
            "orangered",
            "black"
          ],
          hoverBackgroundColor: [
            'orangered',
            'black'
          ],
          hoverBorderColor: [
            'white'
          ]
        }]
      },
      options: {
        maintainAspectRatio: false,
        circumference: 180,
        rotation: -90,
        cutout: 95,
        plugins: {
          tooltip: {
            enabled: false
          }
        }
      }
    });

    const maturityChart = new Chart('maturityChart', {
      type: 'radar',
      data: {
        labels: this.computationTable.map((x: { fundamentalName: any; }) => x.fundamentalName.split(' ')[0]),
        datasets: [{
          label: 'Maturity Chart',
          data: this.computationTable.map((x: { fundamentalPercent: any; }) => x.fundamentalPercent),
          fill: false,
          borderColor: 'orangered',
          pointBackgroundColor: 'black',
          hoverBorderColor: 'red',
          hoverBackgroundColor: 'white',
          pointHoverBackgroundColor: 'black',
          pointHoverBorderColor: 'white'
        },
        {
          label: 'Maturity Chart',
          data: [100, 100, 100, 100, 100],
          // fill: false,
          borderColor: 'none',
          pointBackgroundColor: 'rgba(0,0,0,0)',
          pointBorderColor: 'rgba(0,0,0,0)',
          backgroundColor: 'rgba(0,0,0,.2)',
          hoverBorderColor: 'rgba(0,0,0,0)',
          hoverBorderWidth: 0,
          fill: true
        }, {
          // label: 'Maturity Chart',
          data: Array(5).fill(0),
          fill: false,
          borderColor: 'orangered',
          pointBackgroundColor: 'black',
          hoverBorderColor: 'red',
          hoverBackgroundColor: 'white',
          pointHoverBackgroundColor: 'black',
          pointHoverBorderColor: 'white',
        },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false
          },
        },
        scales: {
          r: {
            // pointLabels: {
            //   display: false
            // },
            ticks: {
              display: false,
            }
          },
        }
      }
    })

    const subFundamental = new Chart('subFundamental', {
      type: 'radar',
      data: {
        labels: this.computationTable.map((x: { subFundamentalInfo: any[]; }) => x.subFundamentalInfo.map(x => x.subName)).join().split(','),
        datasets: [{
          label: 'Sub-fundamental Components',
          data: this.computationTable.map((x: { subFundamentalInfo: any[]; }) => x.subFundamentalInfo.map(x => x.total)).join().split(','),
          fill: false,
          borderColor: 'orangered',
          pointBackgroundColor: 'black'
        },
        {
          label: 'Sub-fundamental Components',
          data: Array(this.computationTable.map((x: { subFundamentalInfo: any[]; }) => x.subFundamentalInfo.map(x => x.total)).join().split(',').length).fill(100),
          // fill: false,
          borderColor: 'none',
          pointBackgroundColor: 'rgba(0,0,0,0)',
          pointBorderColor: 'rgba(0,0,0,0)',
          backgroundColor: 'rgba(0,0,0,.2)',
          hoverBorderColor: 'rgba(0,0,0,0)',
          hoverBorderWidth: 0,
          fill: true
        },
        {
          data: Array(this.computationTable.map((x: { subFundamentalInfo: any[]; }) => x.subFundamentalInfo.map(x => x.total)).join().split(',').length).fill(0),
          fill: false,
          borderColor: 'orangered',
          pointBackgroundColor: 'black'
        },
        ],

      },
      options: {
        plugins: {
          legend: {
            display: false
          },
        },
        scales: {
          r: {
            // pointLabels: {
            //   display: false
            // },
            ticks: {
              display: false,
            }
          },
        }
      }
    })

  }

}
