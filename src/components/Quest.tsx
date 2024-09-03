import React, { useState } from 'react';
import { Editor } from '@monaco-editor/react';
import { Quest } from '../quests';
import { useProgress } from '../context/ProgressContext';

interface QuestProps {
    quest: Quest;
}

const QuestComponent: React.FC<QuestProps> = ({
    quest,
}) => {
    const { completedQuests, markQuestComplete } =
        useProgress();
    const [code, setCode] = useState<string>(
        quest.initialCode
    );
    const [feedback, setFeedback] = useState<string>('');
    const [showHint, setShowHint] =
        useState<boolean>(false);

    const handleEditorChange = (
        value: string | undefined
    ) => {
        setCode(value || '');
    };

    const checkSolution = () => {
        if (code.trim() === quest.solution.trim()) {
            setFeedback('Correct! Well done.');
            markQuestComplete(quest.id);
        } else {
            setFeedback('Incorrect. Try again.');
        }
    };

    const toggleHint = () => {
        setShowHint(!showHint);
    };

    if (completedQuests.has(quest.id)) {
        return (
            <p>You have already completed this quest!</p>
        );
    }

    return (
        <div>
            <h2>{quest.title}</h2>
            <p>{quest.description}</p>
            <Editor
                height="40vh"
                defaultLanguage="javascript"
                value={code}
                onChange={handleEditorChange}
                theme="vs-dark"
            />
            <button onClick={checkSolution}>
                Check Solution
            </button>
            <button onClick={toggleHint}>Show Hint</button>
            {showHint && <p>{quest.hint}</p>}
            <p>{feedback}</p>
        </div>
    );
};

export default QuestComponent;
