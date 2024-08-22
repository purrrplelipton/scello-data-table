import { createId } from "@paralleldrive/cuid2";
import { defineStore } from "pinia";

export const tabs = ["All", "Paid", "Unpaid", "Overdue"].map((label) => ({
  value: createId(),
  label,
}));

export const filter1 = [
  "Default",
  "First Name",
  "Last Name",
  "Due Date",
  "Last Login",
].map((label) => ({ value: createId(), label }));

export const filter2 = ["All", "Active", "Inactive"].map((label) => ({
  value: createId(),
  label,
}));

export interface IUser {
  id: string;
  name: string;
  email: string;
  user_status: boolean;
  last_login: string;
  payment_status: string;
  amount: number;
  currency: string;
  expanded_details: {
    id: string;
    date: string;
    activity: string;
    detail: string;
  }[];
};

export default defineStore(createId(), {
  state(): {
    activeTab: string;
    working: boolean;
    selectedAll: boolean;
    selectedRows: Array<string>;
    selectedFilter1: string;
    selectedFilter2: string;
    filter3: string;
    users: IUser[] | null;
  } {
    return {
      working: false,
      activeTab: tabs[0].value,
      selectedAll: false,
      selectedRows: [],
      selectedFilter1: filter1[0].value,
      selectedFilter2: filter2[0].value,
      filter3: "",
      users: null,
    };
  },
  actions: {
    startWorking() {
      this.working = true
    },
    stopWorking() {
      this.working = false
    },
    setActiveTab(tabId: string) {
      this.activeTab = tabId
    },
    setSelectedFilter1(value: string) {
      this.selectedFilter1 = value
    },
    setSelectedFilter2(value: string) {
      this.selectedFilter2 = value
    },
    setFilter3(value: string) {
      this.filter3 = value
    },
    setSelectedAll(hasSelectedAll: boolean) {
      this.selectedAll = hasSelectedAll
    },
    setSelectedRows(newSelectedRows: Array<string>) {
      this.selectedRows = newSelectedRows
    },
    setUsers(users: IUser[] | null) {
      this.users = users;
    },
  }
});
