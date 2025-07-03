import React, { createContext, useState, useEffect, useContext } from "react";
import { getReviewHistory } from "../services/historyService";
import { AuthContext } from "./AuthContext";

export const HistoryContext = createContext();

export function HistoryProvider({ children }) {
    const { isLoggedIn } = useContext(AuthContext);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchHistory = async () => {
            if (!isLoggedIn) return;
            setLoading(true);
            try {
                const data = await getReviewHistory(); // ✅ now fetches real DB data
                setHistory(data || []);
            } catch (err) {
                console.error("❌ Error fetching review history:", err.message || err);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [isLoggedIn]);


    const addReviewToHistory = (review) => {
        setHistory((prev) => [review, ...prev]);
    };

    const clearHistory = () => {
        setHistory([]);
    };

    return (
        <HistoryContext.Provider
            value={{ history, loading, addReviewToHistory, clearHistory }}
        >
            {children}
        </HistoryContext.Provider>
    );
}
