export interface Quest {
    id: number;
    title: string;
    description: string;
    initialCode: string;
    solution: string;
    hint: string;
    chapter: number;
}

export const quests: Quest[] = [
    {
        id: 1,
        title: 'Quest 1: Basic Variables',
        description:
            'Declare a variable named "hello" and assign it the value "world".',
        initialCode: '// Write your code here\n',
        solution: 'const hello = "world";',
        hint: 'Use the const keyword to declare a constant variable.',
        chapter: 1,
    },
    {
        id: 2,
        title: 'Quest 2: Simple Function',
        description:
            'Write a function named "greet" that returns "Hello, World!".',
        initialCode: '// Write your code here\n',
        solution:
            'function greet() { return "Hello, World!"; }',
        hint: 'Define a function using the function keyword.',
        chapter: 1,
    },
    // Add more quests as needed
];
