<template>
  <canvas :id="name" class="w-full h-full md:h-full"></canvas>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Chart, registerables, ChartItem } from "chart.js";

export default defineComponent({
  name: "BarChart",
  props: {
    name: {
      type: String,
      required: true,
    },
    chartData: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    Chart.register(...registerables);
    const ctx = document.getElementById(this.name) as ChartItem;
    const myChart = new Chart(ctx, {
      type: "bar",
      data: this.data,
      options: this.options,
    });
  },
  data() {
    return {
      data: {
        datasets: [
          {
            label: "user ratings",
            data: this.chartData,
            backgroundColor: [
              "rgba(255, 182, 0, 0.2)",
              "rgba(108, 80, 66, 0.2)",
              "rgba(172, 7, 53, 0.2)",
              "rgba(255, 182, 177, 0.2)",
              "rgba(184, 175, 242, 0.2)",
              "rgba(171, 128, 91, 0.2)",
            ],
            borderColor: [
              "rgba(255, 182, 0, 1)",
              "rgba(108, 80, 66, 1)",
              "rgba(172, 7, 53, 1)",
              "rgba(255, 182, 177, 1)",
              "rgba(184, 175, 242, 1)",
              "rgba(171, 128, 91, 1)",
            ],
            borderWidth: 1,
            minBarLength: 10,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };
  },
});
</script>
