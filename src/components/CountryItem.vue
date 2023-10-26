<script setup lang="ts">
    import { defineProps } from "vue";
    import { Country } from "../types/country";

    interface Props {
        country: Country;
    };

    defineProps<Props>();
</script>

<template>
    <div class="h-56 sm:h-36">
        <img  
            :src="country.flags.png" 
            :alt="country.flags.alt"
            class="h-56 sm:h-36 w-full border border-black"
        />
    </div>

    <h4 class="my-2 text-center text-xl font-bold text-gray-600">
        {{ country.name.common }}
    </h4>

    <p class="my-2 text-gray-500 text-center">
        <span 
            v-for="capital in country.capital"
            class="font-bold"
        >
            {{ capital }}
            <template> - </template>
        </span>
    </p>

    <p class="text-sm text-gray-500">
        - Population: 
        <span class="font-bold">
            {{ country.population?.toLocaleString() }}
        </span>
    </p>

    <p class="text-sm text-gray-500">
        - Region: 
        <span class="font-bold">
            {{ country.region }}
        </span>
    </p>
</template>