import { makeAutoObservable } from "mobx";
import axios from "axios";

class CatFactsStore {
  facts = [];
  isLoading = false;
  page = 1;
  limit = 10;

  constructor() {
    makeAutoObservable(this);
  }

  fetchFacts = async () => {
    this.isLoading = true;
    try {
      const response = await axios.get(
        `https://catfact.ninja/facts?page=${this.page}&limit=${this.limit}`
      );
      const { data } = response.data;
      this.facts.push(...data);
      this.page++;
    } catch (error) {
      console.error("Error fetching cat facts:", error);
    } finally {
      this.isLoading = false;
    }
  };
}

const catFactsStore = new CatFactsStore();
export default catFactsStore;
