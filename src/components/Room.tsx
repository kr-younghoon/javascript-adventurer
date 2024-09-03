import React, { useState, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import { firestore, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/compat/app';

const Room: React.FC = () => {
    const [user] = useAuthState(auth);
    const [roomId, setRoomId] = useState<string>('');
    const [rooms, setRooms] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentRoom, setCurrentRoom] =
        useState<any>(null);
    const [code, setCode] = useState<string>(
        '// Start coding here'
    );

    useEffect(() => {
        const unsubscribe = firestore
            .collection('rooms')
            .onSnapshot((snapshot) => {
                const roomsData = snapshot.docs.map(
                    (doc) => ({ id: doc.id, ...doc.data() })
                );
                setRooms(roomsData);
                setLoading(false);
            });

        return () => unsubscribe();
    }, []);

    const createRoom = async () => {
        if (!user) return;
        const roomRef = firestore.collection('rooms').doc();
        await roomRef.set({
            owner: user.uid,
            members: [user.uid],
            code: code,
            createdAt:
                firebase.firestore.FieldValue.serverTimestamp(),
        });
        setRoomId(roomRef.id);
    };

    const joinRoom = async (id: string) => {
        if (!user) return;
        const roomRef = firestore
            .collection('rooms')
            .doc(id);
        await roomRef.update({
            members:
                firebase.firestore.FieldValue.arrayUnion(
                    user.uid
                ),
        });
        setRoomId(id);

        const unsubscribe = roomRef.onSnapshot((doc) => {
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
            firestore
                .collection('rooms')
                .doc(roomId)
                .update({
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
