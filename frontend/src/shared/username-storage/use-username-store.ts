import { Dispatch, SetStateAction } from 'react';
import { useLocalStorage } from 'usehooks-ts';

export interface ILoginStorageResult {
    savedLogin: string | null;
    saveLogin: Dispatch<SetStateAction<string | null>>;
}

export function useLoginStorage(): ILoginStorageResult {
    const [savedLogin, saveLogin] = useLocalStorage<string | null>(
        '_login',
        null
    );

    return {
        savedLogin,
        saveLogin,
    };
}
