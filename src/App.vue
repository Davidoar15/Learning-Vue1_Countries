<script setup lang="ts">
  import { onMounted, ref, watch } from "vue";
  import axiosClient from "./utils/axios";
  import PageHeader from './components/PageHeader.vue';
  import CountryList from './components/CountryList.vue';
  import { Country } from "./types/country";

  const countries = ref<Country[]>([]);

  const search = ref("");
  const filteredCountries = ref<Country[]>([]);

  const page = ref(1);
  const itemsPerPage = ref(15);
  const paginatedCountries = ref<Country[]>([]);
  const totalItems = ref(0);

  const getCountries = async () => {
    try {
      const { data } = await axiosClient.get("/all");
      countries.value = data;
      totalItems.value = countries.value.length;
    } catch(error) {
      console.log(error);
    }
  };

  const filterCountries = () => {
    page.value = 1;
    filteredCountries.value = countries.value.filter((country) => {
      return country.name.common.toLowerCase().includes(search.value.toLowerCase());
    });
    totalItems.value = filteredCountries.value.length
  };

  const sliceCountries = (currentCountries: Country[]) => {
    const start = ((page.value - 1) * itemsPerPage.value);
    const end = (page.value * itemsPerPage.value);
    paginatedCountries.value = currentCountries.slice(start, end);
  };

  const changePage = (newPage: number) => {
    page.value = newPage;
  };

  onMounted(() => {
    getCountries();
  });

  watch([countries, filteredCountries, page], () => {
    sliceCountries(
      filteredCountries.value.length <= 0 && search.value === ""
      ? countries.value
      : filteredCountries.value
    );
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

    <div class="mb-8 flex align-center justify-center space-x-20">
      <button
        :disabled="page <= 1"
        :class="{ 'opacity-50': page <= 1 }"
        @click="_$event => changePage(page - 1)"
        class="border border-gray-300 rounded px-2 py-0.5 hover:bg-gray-200"
      >
        Previous
      </button>

      <p>{{ page }}</p>

      <button
        :disabled="page >= totalItems/itemsPerPage"
        :class="{ 'opacity-50': page >= totalItems/itemsPerPage }"
        @click="_$event => changePage(page + 1)"
        class="border border-gray-300 rounded px-2 py-0.5 hover:bg-gray-200"
      >
        Next
      </button>
    </div>
  </div>

  <div 
    v-if="paginatedCountries.length === 0" 
    class="container max-w-screen-lg mx-auto px-6 text-center"
  >
      <p class="font-extrabold text-xl text-green-700">
        There are No Results...
      </p>
  </div>

  <div 
    v-else
    class="container max-w-screen-lg mx-auto px-6"
  >
    <CountryList :countries="paginatedCountries"/>
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
