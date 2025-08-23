import { create } from 'zustand';

interface OpenLoadingModalDto {
  timeToClose?: number;
  infoMessage?: string;
}

interface OpenInfoModalDto {
  timeToClose?: number;
  infoMessage?: string;
}

interface ModalStore {
  type: 'loading' | 'info' | null;
  infoMessage: string | null;
  timeToClose: number | null;
  openLoadingModal: (dto: OpenLoadingModalDto) => void;
  openInfoModal?: (dto: OpenInfoModalDto) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>(set => ({
  type: null,
  infoMessage: null,
  timeToClose: null,

  openLoadingModal: (dto: OpenLoadingModalDto) =>
    set({
      type: 'loading',
      infoMessage: dto.infoMessage ?? null,
      timeToClose: dto.timeToClose ?? null,
    }),

  closeModal: () => set({ type: null, infoMessage: null, timeToClose: null }),
}));
