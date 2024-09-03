import React from 'react';
import { quests } from './quests';
import QuestComponent from './components/Quest';
import { auth } from './firebase';
import Room from './components/Room';
import { ProgressProvider } from './context/ProgressContext';
import './App.css';

const App: React.FC = () => {
    const [user, setUser] =
        React.useState<firebase.User | null>(null);

    React.useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(
            (user) => setUser(user)
        );
        return unsubscribe;
    }, []);

    const signIn = async () => {
        const provider =
            new firebase.auth.GoogleAuthProvider();
        await auth.signInWithPopup(provider);
    };

    const signOut = () => {
        auth.signOut();
    };

    return (
        <ProgressProvider>
            <div className="App">
                <h1>
                    Code Quest: Learn JavaScript and
                    TypeScript
                </h1>
                {user ? (
                    <div>
                        <p>Welcome, {user.displayName}!</p>
                        <button onClick={signOut}>
                            Sign Out
                        </button>
                        <Room />
                    </div>
                ) : (
                    <button onClick={signIn}>
                        Sign In with Google
                    </button>
                )}
                {quests.map((quest) => (
                    <QuestComponent
                        key={quest.id}
                        quest={quest}
                    />
                ))}
            </div>
        </ProgressProvider>
    );
};

export default App;
