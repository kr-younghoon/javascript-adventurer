import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
} from 'react';

interface ProgressContextType {
    completedQuests: Set<number>;
    markQuestComplete: (questId: number) => void;
}

const ProgressContext = createContext<
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
