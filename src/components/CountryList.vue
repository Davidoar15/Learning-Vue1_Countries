<script setup lang="ts">
    import { defineProps } from 'vue/dist/vue.js';
    import { Country } from '../types/country';
    import CountryItem from './CountryItem.vue';

    interface Props {
        countries: Country[];
    };

    defineProps<Props>();
</script>

<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        <div 
            v-for="country in countries"
            class="border border-gray-300 rounded p-3"
        >
            <CountryItem :country="country"/>
        </div>
    </div>
</template>