import { useEffect, useRef } from 'react';

export function useRoomCleanup(handleCleanup: () => void) {
    const cleanupRef = useRef(handleCleanup);

    const isFirstRender = useRef<boolean>(true);

    useEffect(() => {
        cleanupRef.current = handleCleanup;
    }, [handleCleanup]);

    useEffect(() => {
        return () => {
            if (isFirstRender.current) {
                isFirstRender.current = false;
            } else {
                cleanupRef.current();
            }
        };
    }, []);
}
