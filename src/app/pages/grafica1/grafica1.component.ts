import { Component } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [],
})
export class Grafica1Component {
  public backgroundColor = ['#6857E6', '#009FEE', '#F02059'];

  public doughnutChartData1: ChartData<'doughnut'> = {
    labels: ['Descargas', 'Tienda', 'Envios'],
    datasets: [
      {
        data: [350, 450, 100],
        backgroundColor: this.backgroundColor,
      },
    ],
  };
  public doughnutChartData2: ChartData<'doughnut'> = {
    labels: ['Salidas', 'Entradas', 'Perdidas'],
    datasets: [
      {
        data: [200, 150, 50],
        backgroundColor: this.backgroundColor,
      },
    ],
  };
  public doughnutChartData3: ChartData<'doughnut'> = {
    labels: ['Capacidad', 'Progreso', 'Control'],
    datasets: [
      {
        data: [300, 100, 100],
        backgroundColor: this.backgroundColor,
      },
    ],
  };
}
