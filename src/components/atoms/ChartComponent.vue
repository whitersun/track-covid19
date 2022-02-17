<template>
  <LineChart v-if="chartArray.length" :chartData="chartColor" v-bind="LineChartProps" />
  <ion-skeleton-text
    v-else
    animated
    style="width: 100%; height: 20rem; border-radius: 8px"
  ></ion-skeleton-text>
</template>

<script>
export default {
  name: "ChartComponent",
  components: { LineChart },
};
</script>

<script setup>
import { IonSkeletonText } from "@ionic/vue";
import { Chart, registerables } from "chart.js";
import { LineChart, useLineChart } from "vue-chart-3";
import { computed, defineProps } from "vue";

Chart.register(...registerables);

const props = defineProps({
  chartLabel: {
    type: Object,
    required: false,
  },

  chartArray: {
    type: Object,
    required: false,
  },

  chartColor: {
    type: Object,
    required: false,
  },
});

const NUMBER_CFG = computed(() => props.chartArray);

const testData = computed(() => ({
  labels: props.chartLabel,

  datasets: [
    {
      label: "Dataset 1",
      data: NUMBER_CFG.value,
      // backgroundColor: ["#77CEFF", "#0079AF", "#123E6B", "#97B0C4", "#A5C8ED"],
      backgroundColor: props.chartColor,
    },
  ],
}));

const options = computed(() => ({
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: "bottom",
    },
    title: {
      display: false,
      text: "Chart.js Doughnut Chart",
    },
  },
}));

const { LineChartProps } = useLineChart({
  chartData: testData.value,
  options,
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
