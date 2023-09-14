import { useState, useEffect } from "react";

export interface ShowData {
    date: string;
    fees: { orderProcessingFee: number, serviceFee: number }
    location: string; 
    name: string;
    sellerNotes: string;
    ticketPrice: number;
    venue: string;
}

const useShowData = (): {showData: ShowData[], error: string, loading: boolean} => {
    const [showData, setShowData] = useState<ShowData[]>([]);
    const [loading, setLoading] = useState(true);

    const [error, setError] = useState<string>('');
    
    useEffect( () => {
        try {
            fetch('http://localhost:5173/showData.json').then((res) => res.json())
            .then((data) => setShowData(data));
        }
        catch (error) {
            setError('There was an error');
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    }, []);    

    return { showData, error, loading };
};

export { useShowData };