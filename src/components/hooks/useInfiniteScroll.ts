import { useRef, useCallback, useEffect } from 'react';

function useInfiniteScroll(callback: () => void): [(node: HTMLElement | null) => void] {
    const observer = useRef<IntersectionObserver | null>(null);

    const lastElementRef = useCallback((node: HTMLElement | null) => {
        if (observer.current) observer.current.disconnect(); 

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                console.log('Intersecting, loading more items');
                callback();
            }
        }, {
            rootMargin: '0px',
            threshold: 0.1  
        });

        if (node) observer.current.observe(node);
    }, [callback]);  

    useEffect(() => {
        return () => {
            if (observer.current) observer.current.disconnect();
        };
    }, []);

    return [lastElementRef];
}

export default useInfiniteScroll;