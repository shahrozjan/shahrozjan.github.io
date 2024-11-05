import { useEffect } from 'react';

const useBackButtonHandler = (onBack) => {
    useEffect(() => {
        const handlePopState = () => {
            onBack(); 
        };

        window.addEventListener('popstate', handlePopState);

    
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [onBack]);
};

export default useBackButtonHandler;
