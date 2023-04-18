import React, { useState, useEffect, useRef } from "react";
import { Box, HStack, Container, Button, VStack, Input } from "@chakra-ui/react";
import Message from "./component/Message";
import { signOut, onAuthStateChanged, getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "./component/firebase";
import { getFirestore, addDoc, collection, serverTimestamp, onSnapshot, query, orderBy } from "firebase/firestore";
const auth = getAuth(app);
const db = getFirestore(app);
const signOutHandler = () => {
    signOut(auth);
};

const loginHandler = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
};

const App = () => {
    const [user, setUser] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const divForScroll = useRef(null);
    const q = query(collection(db, "Messages"), orderBy("createdAT", "asc"));

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            await addDoc(collection(db, "Messages"), {
                text: message,
                uid: user.uid,
                uri: user.photoURL,
                createdAT: serverTimestamp(),
            });
            setMessage("");
            divForScroll.current.scrollIntoView({ scrollBehavior: "smooth" });
        } catch (error) {
            alert(error);
        }
    };

    useEffect(() => {
        const unMount = onAuthStateChanged(auth, (data) => {
            setUser(data);
        });
        const unMountMessages = onSnapshot(q, (snap) => {
            setMessages(
                snap.docs.map((item) => {
                    const id = item.id;
                    return { id, ...item.data() };
                })
            );
        });

        return () => {
            unMount();
            unMountMessages();
        };
    }, [q]);

    return (
        <Box bg={"tomato"}>
            {user ? (
                <Container h={"100vh"} bg={"white"}>
                    <VStack h="full">
                        <Button onClick={signOutHandler} w="full" colorScheme="red">
                            Logout
                        </Button>
                        <VStack
                            h="full"
                            w={"full"}
                            overflowY={"auto"}
                            css={{
                                "&::-webkit-scrollbar": {
                                    display: "none",
                                },
                            }}
                        >
                            {messages.map((item) => (
                                <Message
                                    key={item.id}
                                    user={item.uid === user.uid ? "me" : "other"}
                                    text={item.text}
                                    uri={item.uri}
                                />
                            ))}
                            <div ref={divForScroll}></div>
                        </VStack>

                        <form
                            onChange={(e) => {
                                setMessage(e.target.value);
                            }}
                            onSubmit={submitHandler}
                            style={{ width: "100%" }}
                        >
                            <HStack>
                                <Input value={message} placeholder="Enter  your Message..." />
                                <Button colorScheme="red" type="submit">
                                    Send
                                </Button>
                            </HStack>
                        </form>
                    </VStack>
                </Container>
            ) : (
                <VStack bg="white" justifyContent={"center"} h="100vh">
                    <Button onClick={loginHandler} colorScheme="purple">
                        Sign with Google
                    </Button>
                </VStack>
            )}
        </Box>
    );
};

export default App;
