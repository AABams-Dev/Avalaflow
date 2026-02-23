'use client';

import { useState, useEffect } from 'react';

export function useAvaxPrice() {
    const [price, setPrice] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrice = async () => {
            try {
                const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=avalanche-2&vs_currencies=usd');
                const data = await response.json();
                setPrice(data['avalanche-2'].usd);
            } catch (error) {
                console.error('Error fetching AVAX price:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPrice();
        const interval = setInterval(fetchPrice, 60000); // Update every minute
        return () => clearInterval(interval);
    }, []);

    return { price, loading };
}
