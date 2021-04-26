<template>
  <div
    class="w-screen flex-grow pt-20 bg-white dark:bg-green-900 dark:text-white flex flex-col items-center"
  >
    <div class="w-screen text-3xl md:text-4xl text-left pl-10 font-black">
      Overview
    </div>
    <div
      class="w-full flex flex-col lg:flex-row justify-around items-center lg:items-start pt-3 sm:p-5 dark:bg-green-900"
    >
      <div class="w-4/5 sm:w-3/5 max-w-2xl flex flex-col mb-5">
        <div class="w-full text-left text-2xl md:text-3xl font-bold">
          User Infos
        </div>
        <div class="flex cursor-pointer space-x-1">
          <div
            v-for="(option, index) in roastOption"
            :key="`${option}_${index}`"
            class="w-24 border-2 rounded-3xl sm:rounded-full p-0.5 sm:p-1 shadow-m mb-2 dark:text-black dark:bg-white"
            :class="[
              `border-${option}`,
              roastFilter.has(option)
                ? `bg-${option} dark:bg-${option} text-white dark:text-white`
                : `hover:text-white hover:bg-${option}`,
            ]"
            @click="selectRoast(option)"
          >
            {{ option }}
          </div>
        </div>
        <div class="flex md:jusity-center">
          <div class="w-full">
            <input
              class="h-12 p-2 w-full sm:w-10/12 rounded-full border-2 focus:outline-none focus:ring focus:border-blue-300 mb-4 dark:text-black"
              v-model="searchName"
              placeholder="Search customer"
            />
          </div>
        </div>

        <div
          class="flex flex-col h-full rounded-3xl bg-gray-100 shadow-xl divide-y transition-height duration-500 ease-in-out"
        >
          <div
            v-for="(user, index) in searchNames"
            :key="user.name + index"
            class="hover:bg-white first:rounded-t-3xl last:rounded-b-3xl p-3 sd:p-5 lg:block dark:text-black"
            :class="[
              isOpen === index
                ? 'bg-white rounded-3xl sm:rounded-0'
                : 'bg-gray-100',
              isOpen != index && isOpen >= 0 ? 'hidden' : '',
            ]"
            @click="selectUser(index, user)"
          >
            <div class="text-xl sd:text-2xl font-medium m-3 sd:m-5 flex">
              <div class="pl-5 align-middle">{{ user.name }}</div>
              <div class="pl-5">
                <i
                  class="align-middle transition-transform duration-200 transform fas fa-chevron-right"
                  :class="
                    isOpen === index
                      ? '-rotate-90 lg:rotate-0'
                      : 'rotate-90 lg:rotate-0'
                  "
                ></i>
              </div>
            </div>
            <transition name="fade" mode="out-in">
              <div
                v-if="isOpen === index"
                class="flex flex-col items-center sm:items-start px-5"
                :class="isOpen === index ? 'py-3' : 'py-0'"
              >
                <div class="mb-2">
                  Age <span class="font-bold">{{ user.age }}</span> Y
                </div>
                <div
                  class="w-32 text-white rounded-3xl sm:rounded-full p-0.5 sm:p-1 shadow-xl mb-2"
                  :class="'bg-' + user.roasts"
                >
                  {{ user.roasts }}
                </div>
                <div
                  class="flex flex-wrap justify-center sm:justify-start space-x-3 w-full h-full transition-height duration-500 ease-in-out"
                >
                  <div
                    v-for="(flavor, name) in user.flavors"
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
                </div>
                <!-- <div>{{ calculator(user, products) }}</div> -->
              </div>
            </transition>
          </div>
        </div>
        <div class="flex justify-center">
          <div
            class="hidden rounded-full h-10 w-10 items-center justify-center md:flex mt-5 bg-primary text-white"
          >
            1
          </div>
        </div>
      </div>
      <transition name="fader" mode="out-in">
        <div
          class="h-full w-5/6 sm:w-3/5 lg:w-2/5 max-w-xl mb-2"
          v-if="isOpen >= 0"
        >
          <UserInsight
            :selectedUser="selectedUser"
            :products="products"
          ></UserInsight>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import usersData from "../assets/data/users.json";
import productData from "../assets/data/products.json";
import { User } from "../interface/iUser";
import UserInsight from "./components/userInsight.vue";

export default defineComponent({
  name: "Home",
  components: {
    UserInsight,
  },
  watch: {
    searchNames: function (newVal, oldVal) {
      if (this.isOpen > newVal.length - 1) {
        this.isOpen = -1;
      } else {
        this.selectedUser = this.searchNames[this.isOpen];
      }
    },
  },
  data() {
    return {
      roastOption: ["light", "medium", "dark"],
      roastFilter: new Set(),
      searchName: "",
      users: usersData as User[],
      products: productData,
      isOpen: -1,
      selectedUser: usersData[0] as User,
    };
  },
  computed: {
    searchNames(): User[] {
      let res = this.users.filter((ele) =>
        ele.name.toLowerCase().includes(this.searchName.toLowerCase())
      );
      if (this.roastFilter.size > 0) {
        res = res.filter((ele) => this.roastFilter.has(ele.roasts));
      }
      return res;
    },
  },
  methods: {
    selectUser(index: number, user: User) {
      this.isOpen = this.isOpen === index ? -1 : index;
      this.selectedUser = user;
    },
    selectRoast(option: string) {
      this.roastFilter.has(option)
        ? this.roastFilter.delete(option)
        : this.roastFilter.add(option);
    },
  },
});
</script>

<style lang="scss" scoped>
.fade-enter-active {
  transition: all 0.3s ease;
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

.fader-enter-active .fader-leave-active {
  transition: all 0.3s ease;
}

.fader-enter-from,
.fader-leave-to {
  opacity: 0;
  height: 0;
  padding: 0;
}
</style>
