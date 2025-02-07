<script setup lang="ts">
import { ref } from 'vue';
import { useListStore } from './stores/list';
const listStore = useListStore();
const newItem = ref("");

// Funzione per aggiungere un prodotto alla lista
const addItem = () => {
  if (newItem.value.trim() === "") return;
  listStore.addItem(newItem.value);
  newItem.value = ""; // Resetta l'input dopo l'aggiunta
};
</script>

<template>
  <h1>Lista Spesa 🛒</h1>

  <div>
    <input type="text" v-model="newItem" placeholder="Nome prodotto" />
    <button @click="addItem">Aggiungi</button>
  </div>

  <ul>
    <li v-for="item in listStore.list" :key="item.id">
      <input
        type="checkbox"
        :checked="item.preso"
        @change="listStore.toggleItem(item.id)"
      />
      {{ item.name }}

      <!-- Solo se il prodotto è preso, si può inserire il prezzo -->
      <input
        v-if="item.preso"
        type="number"
        :value="item.prezzo ?? ''"
        @input="listStore.updatePrice(item.id, parseFloat(($event.target as HTMLInputElement).value) || null)"
        placeholder="Prezzo"
      />

      <button @click="listStore.removeItem(item.id)">❌</button>
    </li>
  </ul>

  <h2>Totale: {{ listStore.sommaTotale.toFixed(2) }}€</h2>
</template>

<style scoped></style>
