class ChartJS {
    constructor(chartType, data, container, options = {}, colors = []) {
      this.chartType = chartType;
      this.data = data;
      this.container = container;
      this.options = options;
      this.colors = colors;
  
      this.chart = null;
  
      if (this.data.length === 0) {
        this.noDataMessage();
        return;
      }
  
      this.init();
    }
  
    init() {
      const ctx = document.getElementById(this.container).getContext('2d');
      const datasets = this.parseData();
      const chartOptions = this.parseOptions();
      this.chart = new Chart(ctx, {
        type: this.chartType,
        data: {
          datasets,
        },
        options: chartOptions,
      });
    }
  
    parseData() {
      const datasets = [];
      const defaultColors = [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ];
      this.data.forEach((dataset, index) => {
        const dataObj = {
          label: dataset.label,
          data: dataset.data,
          backgroundColor: this.colors[index] || defaultColors[index % defaultColors.length],
        };
        datasets.push(dataObj);
      });
      return datasets;
    }
  
    parseOptions() {
      const defaultOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
            },
          }],
        },
      };
      return Object.assign({}, defaultOptions, this.options);
    }
  
    setData(data) {
      this.data = data;
      const datasets = this.parseData();
      this.chart.data.datasets = datasets;
      this.chart.update();
    }
  
    setOptions(options) {
      this.options = options;
      const chartOptions = this.parseOptions();
      this.chart.options = chartOptions;
      this.chart.update();
    }
  
    on(eventName, callback) {
      this.chart.config.options.on = this.chart.config.options.on || {};
      this.chart.config.options.on[eventName] = callback;
      this.chart.update();
    }
  
    addDataset(dataset) {
      const dataObj = {
        label: dataset.label,
        data: dataset.data,
        backgroundColor: this.colors[this.chart.data.datasets.length] || 'rgba(255, 99, 132, 0.2)',
      };
      this.chart.data.datasets.push(dataObj);
      this.chart.update();
    }
  
    noDataMessage() {
      const canvas = document.getElementById(this.container);
      canvas.style.display = 'none';
  
      const message = document.createElement('div');
      message.innerHTML = 'No data to display';
      message.style.textAlign = 'center';
  
      const parent = canvas.parentNode;
      parent.insertBefore(message, canvas);
    }
  }
  
  export default ChartJS;