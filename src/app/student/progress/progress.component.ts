import { ApiService } from '../../shared/services/api-service/api.service';
import { Component, Input, OnInit } from '@angular/core';
import { Chart } from "chart.js";
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {
  chart1: Chart;
  lengthOfArray = 0;
  constructor(private apiService: ApiService,
    private titleService: Title,
  ) {
    this.titleService.setTitle('Progress')

  }
  dynamicColors() {
    let tempArray = []
    for (let i = 0; i < this.lengthOfArray; i++) {
      var r = Math.floor(Math.random() * 255);
      var g = Math.floor(Math.random() * 255);
      var b = Math.floor(Math.random() * 255);
      tempArray.push("rgb(" + r + "," + g + "," + b + ")");
    }
    return tempArray;
  }
  labels = []
  chartData = []


  ngOnInit() {
    let labels = []
    let chartData = []
    const query = {
      username: localStorage.getItem('username')
    }
    this.apiService.getAnalysisData(query).subscribe(data => {
      if (data.status == 200) {
        this.lengthOfArray = data.body.length;
        data.body.forEach(element => {
          labels.push("Test " + element.testNumber)
          chartData.push(element.average)
        });
        if (chartData.length != 0) {

          this.chartData = chartData;
          this.labels = labels;
          this.showData()
        }
      }

    })
  }
  showData() {

    this.chart1 = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [
          {
            data: this.chartData,
            backgroundColor: this.dynamicColors()
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Test Analysis Data'
        },
        legend: {
          position: 'top',
          display: false,
          fullWidth: true,
          labels: {
            fontSize: 15
          }
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }]
        }
      }
    });
  }

}


