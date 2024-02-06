import { create } from 'zustand';

export interface IUserStore {
    isAuthorised: boolean;
    nickname: string | null;
    setUser(nickname: string): void;
    removeUser(): void;
}

export const useUserStore = create<IUserStore>((set) => ({
    isAuthorised: false,
    nickname: null,
    setUser(nickname: string) {
        set({ nickname, isAuthorised: true });
    },
    removeUser() {
        set({ nickname: null, isAuthorised: false });
    },
}));
