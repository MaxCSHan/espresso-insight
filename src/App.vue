<template>
  <div class="flex flex-col min-h-screen">
    <div
      class="fixed w-screen h-16 flex justify-between items-center p-4 z-10 bg-primary text-white dark:bg-white"
    >
      <router-link to="/"
        ><div class="text-2xl font-extrabold dark:text-primary">
          Impresso Espresso
        </div></router-link
      >
    </div>
    <router-view />
    <div
      class="w-screen h-24 flex flex-col justify-between items-center p-4 z-10 bg-primary text-white dark:bg-white"
    >
      <div class="text-white dark:text-primary mb-2">Created by Max Chen</div>
      <div class="flex space-x-5">
        <div>
          <a
            class="text-3xl dark:text-primary"
            href="https://www.instagram.com/tsukasakasa1231/"
            target="_blank"
            ><i class="fab fa-instagram"></i
          ></a>
        </div>
        <div>
          <a
            class="text-3xl dark:text-primary"
            href="https://github.com/MaxCSHan"
            target="_blank"
            ><i class="fab fa-github"></i
          ></a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
