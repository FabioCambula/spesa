import { defineStore } from "pinia";

export const useListStore = defineStore("listStore", {
  state: () => ({
    list: [] as {
      name: string;
      id: number;
      prezzo: number | null;
      preso: boolean;
    }[],
  }),
  actions: {
    addItem(name: string) {
      if (name.trim() === "") return;
      this.list.push({
        name,
        id: Date.now(),
        preso: false, // Il prodotto non è ancora stato preso
        prezzo: null, // Prezzo non ancora assegnato
      });
    },
    removeItem(id: number) {
      this.list = this.list.filter((item) => item.id !== id);
    },
    toggleItem(id: number) {
      const item = this.list.find((item) => item.id === id);
      if (item) item.preso = !item.preso;
    },
    updatePrice(id: number, prezzo: number | null) {
      const item = this.list.find((item) => item.id === id);
      if (item) item.prezzo = prezzo;
    },
  },
  getters: {
    sommaTotale: (state) =>
      state.list.reduce(
        (acc, item) => acc + (item.preso && item.prezzo ? item.prezzo : 0),
        0
      ),
  },
});
