<template>
  <canvas
    :id="`${this.name}_radar`"
    class="w-full h-full md:h-full md:max-h-96 dark:bg-white"
  ></canvas>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Chart, registerables, ChartItem } from "chart.js";

export default defineComponent({
  name: "radarChart",
  props: {
    name: {
      type: String,
      required: true,
    },
    chartData1: {
      type: Array as PropType<Array<number>>,
      required: true,
    },
    chartData2: {
      type: Array as PropType<Array<number>>,
      required: false,
    },
  },
  mounted() {
    console.log(this.chartData1, this.chartData2);
    Chart.register(...registerables);
    const ctx = document.getElementById(`${this.name}_radar`) as ChartItem;
    let myChart = new Chart(ctx, {
      type: "radar",
      data: this.data,
      options: this.options,
    });
    this.$watch(
      () => {
        return this.$props.chartData1;
      },
      (newVal: [], oldVal: []) => {
        console.log("userChange", oldVal, newVal);
        myChart.data.datasets = this.datasetsOutput(
          this.chartData1,
          this.chartData2
        );
        myChart.update();
      }
    );
    this.$watch(
      () => {
        return this.$props.chartData2;
      },
      (newVal: [], oldVal: []) => {
        console.log("productChange", oldVal, newVal);
        myChart.data.datasets = this.datasetsOutput(
          this.chartData1,
          this.chartData2
        );
        myChart.update();
      }
    );
  },
  data() {
    return {
      data: {
        labels: ["Honey", "Cocoa", "Cranberry", "Peach", "Lavender", "Malt"],
        datasets: this.datasetsOutput(this.chartData1, this.chartData2),
      },
      options: {
        elements: {
          line: {
            borderWidth: 3,
          },
        },
      },
    };
  },
  methods: {
    datasetsOutput(chartData1: number[], chartData2?: number[]) {
      const template = [
        {
          label: "User Flavor Preference",
          data: chartData1,
          fill: true,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgb(255, 99, 132)",
          pointBackgroundColor: "rgb(255, 99, 132)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgb(255, 99, 132)",
        },
      ];
      if (chartData2) {
        template.push({
          label: "Product Flavor Composition",
          data: chartData2,
          fill: true,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgb(54, 162, 235)",
          pointBackgroundColor: "rgb(54, 162, 235)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgb(54, 162, 235)",
        });
      }
      return template;
    },
  },
});
</script>
