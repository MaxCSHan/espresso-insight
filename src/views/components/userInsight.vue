<template>
  <div class="flex flex-col overflow-scroll">
    <div class="w-full text-left text-2xl md:text-3xl font-bold">
      User Insights
    </div>
    <div class="flex mb-2 h-2/5 overflow-scroll">
      <label class="mt-3 inline-flex items-center cursor-pointer">
        <span class="relative shadow-m">
          <span
            class="block w-10 h-6 rounded-full shadow-inner"
            :class="strictMode ? 'bg-white' : 'bg-gray-400'"
          ></span>
          <span
            class="absolute block w-4 h-4 mt-1 ml-1 rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out"
            :class="
              strictMode
                ? 'bg-green-500 transform translate-x-full'
                : 'bg-white'
            "
          >
            <input
              id="unchecked"
              type="checkbox"
              class="absolute opacity-0 w-0 h-0"
              @click="strictMode = !strictMode"
            />
          </span>
        </span>
        <span class="ml-3 text-sm">Strict Mode</span>
        <transition name="fade">
          <div class="mx-2" v-if="strictMode">
            <div
              class="bg-green-500 text-white text-xs rounded py-1 px-4 right-0 bottom-full"
            >
              Perfect Match Only
            </div>
          </div>
        </transition>
      </label>
    </div>

    <div class="font-bold md:font-black mr-5 text-xl md:text-2xl">
      {{ selectedProduct.name }}
    </div>

    <div class="mb-5 p-3 dark:bg-white rounded-3xl">
      <RadarChart
        :name="selectedUser.name"
        :chartData1="flavortoVector(selectedUser.flavors)"
        :chartData2="flavortoVector(selectedProduct.flavors)"
      ></RadarChart>
    </div>
    <div class="w-full text-center text-m md:text-l font-bold">
      Top 3 recommendations
    </div>
    <div
      class="flex flex-col justify-center text-lg sd:text-2xl space-y-2 bg-gray-100 rounded-3xl p-3 md:p-5"
    >
      <div
        v-for="(product, index) in resultOuput(
          selectedUser,
          products,
          strictMode
        )"
        :key="product.name + index"
      >
        <expandrow
          class="min-h-40"
          :class="
            selectedProduct.name === product.name
              ? 'border-4 border-green-500'
              : 'border-0'
          "
          :user="selectedUser"
          :product="product"
          @click="selectedProduct = product"
        ></expandrow>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Flavors } from "@/interface/iFlavors";
import { Product } from "../../interface/iProduct";
import { User } from "../../interface/iUser";
import {
  calcCompatibilityScore,
  flavortoVector,
} from "../../services/calculator";
import Expandrow from "./expandrow.vue";
import RadarChart from "./radarChart.vue";

export default defineComponent({
  name: "UserInsight",
  components: {
    Expandrow,
    RadarChart,
  },
  props: {
    products: {
      type: Array as PropType<Array<Product>>,
      required: true,
    },
    selectedUser: {
      type: Object as () => User,
      required: true,
    },
  },
  watch: {
    selectedUser: function (newVal, oldVal) {
      this.selectedProduct = this.resultOuput(
        this.selectedUser,
        this.products,
        this.strictMode
      )[0] as Product;
    },
    strictMode: function (newVal, oldVal) {
      this.selectedProduct = this.resultOuput(
        this.selectedUser,
        this.products,
        this.strictMode
      )[0] as Product;
    },
  },
  computed: {},
  data() {
    return {
      isOpen: false,
      selectedProduct: this.resultOuput(
        this.selectedUser,
        this.products,
        false
      )[0] as Product,
      strictMode: false,
    };
  },
  methods: {
    flavortoVector(flavors: Flavors) {
      return flavortoVector(flavors);
    },
    calculator(user: User, products: Product[]) {
      return products
        .map((product: Product) => {
          return {
            ...product,
            score: calcCompatibilityScore(user, product),
          };
        })
        .sort((a, b) => {
          return b.score - a.score;
        });
    },
    resultOuput(user: User, products: Product[], strict: boolean) {
      const res = strict
        ? this.calculator(user, products).filter(
            (product) => product.roast === user.roasts
          )
        : this.calculator(user, products);

      return res.slice(0, 3).map((ele) => {
        return { ...ele, score: ele.score.toFixed(2) };
      });
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
