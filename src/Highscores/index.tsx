import * as React from "react";
import { Stack } from "@mui/material";
import AddHighscoreDialog from "../AddHighscoreDialog";
import { getFirestore, DocumentReference, doc, getDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { useEffect } from "react";
import { PinBallContext } from "../Context/PinBallContextProvider";
import HighScoreList from "../HighScoreList";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const documentRef: DocumentReference = doc(db, "highscores", "rsjXQoQMGGKRT1eWX8ZJ");

const Highscores: React.FC = () => {
  const pinBallContext = React.useContext(PinBallContext);
  const [highscores, setHighscores] = React.useState<IHighscores[]>([]);

  useEffect(() => {
   const fetchDocs = async () => {
      try {
        const getDocs = await getDoc(documentRef);

        if (getDocs && getDocs.data()) {
          setHighscores(getDocs.data()?.highscores);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchDocs();
    pinBallContext.setHighscores(highscores);
  }, [pinBallContext]);

  return (
    <Stack style={{ alignItems: "center", width: "100%" }}>
      <HighScoreList data={highscores} />
      <AddHighscoreDialog data={highscores} />
    </Stack>
  );
};

export default Highscores;
