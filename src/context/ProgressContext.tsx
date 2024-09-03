// src/context/ProgressContext.ts

import { createContext, useContext } from 'react';

interface ProgressContextType {
    completedQuests: Set<number>;
    markQuestComplete: (questId: number) => void;
}

export const ProgressContext = createContext<
    ProgressContextType | undefined
>(undefined);

export const useProgress = () => {
    const context = useContext(ProgressContext);
    if (!context) {
        throw new Error(
            'useProgress must be used within a ProgressProvider'
        );
    }
    return context;
};
