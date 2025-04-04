import { useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const REFRESH_INTERVAL = 60000; // 60 seconds

export const useAutoRefresh = () => {
    const navigate = useNavigate();
    const timerRef = useRef<NodeJS.Timeout>();

    const refresh = useCallback(() => {
        const currentPath = window.location.pathname;
        navigate(currentPath, { replace: true });
    }, [navigate]);

    useEffect(() => {
        timerRef.current = setInterval(() => {
            refresh();
        }, REFRESH_INTERVAL);

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [refresh]);

    return { refresh }; // Expose refresh function in case manual refresh is needed
};
