import React, { useState, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import {
    getFirestore,
    collection,
    doc,
    onSnapshot,
    updateDoc,
    setDoc,
    arrayUnion,
    serverTimestamp,
    DocumentData,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

// Firebase 초기화 및 Firestore 인스턴스 가져오기
const auth = getAuth();
const firestore = getFirestore();

const Room: React.FC = () => {
    const [user] = useAuthState(auth);
    const [roomId, setRoomId] = useState<string>('');
    const [rooms, setRooms] = useState<DocumentData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentRoom, setCurrentRoom] =
        useState<DocumentData | null>(null);
    const [code, setCode] = useState<string>(
        '// Start coding here'
    );

    useEffect(() => {
        const roomsCollection = collection(
            firestore,
            'rooms'
        );
        const unsubscribe = onSnapshot(
            roomsCollection,
            (snapshot) => {
                const roomsData = snapshot.docs.map(
                    (doc) => ({ id: doc.id, ...doc.data() })
                );
                setRooms(roomsData);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    const createRoom = async () => {
        if (!user) return;
        const roomRef = doc(collection(firestore, 'rooms')); // 새 문서 참조 생성
        await setDoc(roomRef, {
            owner: user.uid,
            members: [user.uid],
            code: code,
            createdAt: serverTimestamp(),
        });
        setRoomId(roomRef.id);
    };

    const joinRoom = async (id: string) => {
        if (!user) return;
        const roomRef = doc(firestore, 'rooms', id);
        await updateDoc(roomRef, {
            members: arrayUnion(user.uid),
        });
        setRoomId(id);

        const unsubscribe = onSnapshot(roomRef, (doc) => {
            setCurrentRoom({ id: doc.id, ...doc.data() });
            setCode(doc.data()?.code || '');
        });

        return () => unsubscribe();
    };

    const handleEditorChange = (
        value: string | undefined
    ) => {
        setCode(value || '');
        if (roomId) {
            const roomRef = doc(firestore, 'rooms', roomId);
            updateDoc(roomRef, {
                code: value || '',
            });
        }
    };

    if (roomId && currentRoom) {
        return (
            <div>
                <h3>Room: {roomId}</h3>
                <p>
                    Members:{' '}
                    {currentRoom.members.join(', ')}
                </p>
                <Editor
                    height="40vh"
                    defaultLanguage="javascript"
                    value={code}
                    onChange={handleEditorChange}
                    theme="vs-dark"
                />
            </div>
        );
    }

    return (
        <div>
            <h2>Multiplayer Rooms</h2>
            {loading ? (
                <p>Loading rooms...</p>
            ) : (
                <div>
                    <button onClick={createRoom}>
                        Create New Room
                    </button>
                    <ul>
                        {rooms.map((room) => (
                            <li key={room.id}>
                                Room ID: {room.id} -
                                Members:{' '}
                                {room.members.length}
                                <button
                                    onClick={() =>
                                        joinRoom(room.id)
                                    }
                                >
                                    Join Room
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Room;
