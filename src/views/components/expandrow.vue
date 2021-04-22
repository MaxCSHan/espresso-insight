<template>
  <div
    class="flex flex-col p-1 rounded-3xl bg-white font-medium p-2 dark:text-black"
  >
    <div class="text-m sm:text-xl font-medium m-3 sd:m-5 flex items-center">
      <div
        v-if="user.roasts === product.roast"
        class="h-1.5 w-1.5 md:w-2 md:h-2 rounded-full bg-green-500"
      ></div>
      <div class="w-full grid grid-cols-2 bg-orange leading-none">
        <div class="font-bold md:font-black">
          {{ product.name }}
        </div>

        <!-- <div
          class="mr-5"
          :class="product.roast === product.roast ? 'font-black' : ''"
        >
          {{ product.roast }}
        </div> -->
        <div class="font-bold content-center">
          {{ product.score }}
        </div>
      </div>
      <div class="sm:pl-3 cursor-pointer" @click="isOpen = !isOpen">
        <i
          class="align-middle transition-transform duration-200 transform fas fa-chevron-down"
          :class="isOpen ? 'rotate-180' : 'rotate-0'"
        ></i>
      </div>
    </div>
    <transition name="fade">
      <div v-if="isOpen" class="flex flex-col items-center sm:items-start px-5">
        <div class="flex items-center space-x-3">
          <div
            class="w-32 text-white rounded-3xl sm:rounded-full p-0.5 sm:p-1 shadow-xl mb-2"
            :class="'bg-' + product.roast"
          >
            {{ product.roast }}
          </div>
          <div>$ {{ product.price }}</div>
        </div>

        <div class="w-full min-h-40 h-full">
          <!-- <RadarChart
            :name="product.name"
            :chartData1="flavortoVector(user.flavors)"
            :chartData2="flavortoVector(product.flavors)"
          ></RadarChart> -->
          <BarChart
            class="h-40 md:h-full w-full"
            :name="product.name"
            :chartData="product.flavors"
          ></BarChart>
        </div>
        <!-- <div
          class="flex flex-wrap justify-center sm:justify-start space-x-3 w-full h-full transition-height duration-500 ease-in-out"
        >
          <div
            v-for="(flavor, name) in product.flavors"
            :key="flavor + name"
            class="rounded-3xl sm:rounded-full p-0.5 sm:p-1 shadow-xl mb-2"
            :class="'bg-' + name"
          >
            <div
              class="text-center text-white text-l font-medium mx-2 my-1 sm:mx-2.5 sm:my-1.5 flex"
            >
              {{ name }} {{ flavor }}
            </div>
          </div>
        </div> -->
        <!-- <div>{{ calculator(user, products) }}</div> -->
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Flavors } from "@/interface/iFlavors";
import { Product } from "../../interface/iProduct";
import { User } from "../../interface/iUser";
import { flavortoVector } from "../../services/calculator";
import BarChart from "./barChart.vue";

export default defineComponent({
  name: "Expandrow",
  components: {
    BarChart,
  },
  props: {
    product: {
      type: Object as () => Product,
      required: true,
    },
    user: {
      type: Object as () => User,
      required: true,
    },
  },
  computed: {},
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    flavortoVector(flavors: Flavors) {
      return flavortoVector(flavors);
    },
  },
});
</script>
<style lang="scss" scoped>
.fade-enter-active {
  transition: all 0.3s ease-in-out;
}
.fade-leave-active {
  transition: opacity 0.15s ease;
  transition: padding 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  height: 0;
  padding: 0;
}
</style>
