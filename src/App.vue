<script setup lang="ts">
  import { onMounted, ref } from "vue";
  import axiosClient from "./utils/axios";
  import PageHeader from './components/PageHeader.vue';
  import CountryList from './components/CountryList.vue';
  import { Country } from "./types/country";

  const countries = ref<Country[]>([]);

  const search = ref("");
  const filteredCountries = ref<Country[]>([]);

  const getCountries = async () => {
    try {
      const { data } = await axiosClient.get("/all");
      countries.value = data;
    } catch(error) {
      console.log(error);
    }
  };

  const filterCountries = () => {
    filteredCountries.value = countries.value.filter((country) => {
      return country.name.common.toLowerCase().includes(search.value.toLowerCase());
    });
  };

  onMounted(() => {
    getCountries();
  });
</script>

<template>
  <PageHeader />

  <div class="container max-w-screen-lg mx-auto px-6">
    <div class="mb-8">
        <input 
            type="text"
            placeholder="Search Country..."
            v-model="search"
            @input="filterCountries"
            class="border border-gray-300 rounded w-full p-1 px-4"
        />
    </div>
  </div>

  <div class="container max-w-screen-lg mx-auto px-6">
    <CountryList :countries="filteredCountries.length > 0 ? filteredCountries : countries"/>
  </div>
</template>

<!-- <style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style> -->
