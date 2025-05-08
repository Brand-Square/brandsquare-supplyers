 import { create } from "zustand";

type ContextStore = {
  mobileSidebar: boolean;
  setMobileSidebar: (mobileSidebar: boolean) => void;
  collapseSidebar: boolean;
  setCollapseSidebar: (collapseSidebar: boolean) => void;
};

const useContextStore = create<ContextStore>((set) => ({
  mobileSidebar: false,
  setMobileSidebar: (mobileSidebar) => set(() => ({ mobileSidebar })),
 collapseSidebar: false,
  setCollapseSidebar: (collapseSidebar) => set(() => ({ collapseSidebar })),
}));

export default useContextStore;
