// src/context/ProgressProvider.tsx

import React, { useState, ReactNode } from 'react';
import { ProgressContext } from './ProgressContext';

export const ProgressProvider: React.FC<{
    children: ReactNode;
}> = ({ children }) => {
    const savedProgress = JSON.parse(
        localStorage.getItem('completedQuests') || '[]'
    );
    const [completedQuests, setCompletedQuests] = useState<
        Set<number>
    >(new Set(savedProgress));

    const markQuestComplete = (questId: number) => {
        setCompletedQuests((prev) => {
            const newSet = new Set(prev).add(questId);
            localStorage.setItem(
                'completedQuests',
                JSON.stringify(Array.from(newSet))
            );
            return newSet;
        });
    };

    return (
        <ProgressContext.Provider
            value={{ completedQuests, markQuestComplete }}
        >
            {children}
        </ProgressContext.Provider>
    );
};

export default ProgressProvider;
