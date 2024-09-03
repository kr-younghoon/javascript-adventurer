import React from 'react';
import { quests } from './quests';
import QuestComponent from './components/Quest';
import Room from './components/Room';
import './App.css';
import ProgressProvider from './context/ProgressProvider';

// Firebase 모듈 가져오기
import {
    getAuth,
    User,
    onAuthStateChanged,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
} from 'firebase/auth';

// 'auth' 이름 충돌을 피하기 위해 'firebaseAuth'로 변경
const firebaseAuth = getAuth();

const App: React.FC = () => {
    // 상태에 Firebase User 타입 사용
    const [user, setUser] = React.useState<User | null>(
        null
    );

    React.useEffect(() => {
        // 사용자 인증 상태 변경 리스너 설정
        const unsubscribe = onAuthStateChanged(
            firebaseAuth,
            (user) => setUser(user)
        );
        return unsubscribe;
    }, []);

    const signIn = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(firebaseAuth, provider);
    };

    const handleSignOut = () => {
        signOut(firebaseAuth);
    };

    return (
        <ProgressProvider>
            <div className="App">
                <h1>type-adventurer🏃🏻‍♀️‍➡️</h1>
                {user ? (
                    <div>
                        <p>Welcome, {user.displayName}!</p>
                        <button onClick={handleSignOut}>
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
