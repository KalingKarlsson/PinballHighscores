import React from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
import { dummyData, HighscoreDetails } from "../Database";
import { initializeApp } from "firebase/app";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyC4CRMzaZH6rwpVD0tkB1XzR4wqmIohHjw",
  authDomain: "pinballhighscores.firebaseapp.com",
  projectId: "pinballhighscores",
  storageBucket: "pinballhighscores.appspot.com",
  messagingSenderId: "720311068860",
  appId: "1:720311068860:web:e144f91e2f2a3145adc8b9",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const FormDialog: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState<File>();
  const [highscores, setHighscores] = React.useState<HighscoreDetails[]>(dummyData);

  const INITIALVALUES: HighscoreDetails = {
    rank: 0,
    name: "",
    score: "",
    evidence: new File([""], ""),
  };

  const NAME_MINLEN = 3;
  const NAME_MAXLEN = 25;

  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

  const VALIDATIONSCHEMA = Yup.object().shape({
    name: Yup.string().min(NAME_MINLEN).max(NAME_MAXLEN).required(),
    score: Yup.string().required(),
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const setup = async () => {
    try {
      const docRef = await addDoc(collection(db, "highscores"), {
        dummyData,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>): any => {
    if (event.currentTarget.files && SUPPORTED_FORMATS.includes(event.currentTarget.files[0].type)) {
      setFile(event.currentTarget.files[0]);
    }
  };

  const handleSubmit = (values: HighscoreDetails, { resetForm }: FormikHelpers<HighscoreDetails>) => {
    dummyData.push({ rank: values.rank, name: values.name, score: values.score, evidence: file! });
    setHighscores(dummyData);
    console.log(highscores);
    
   // highscores.map((score) => score.evidence === score.evidence.name)
    setup();
    resetForm();
  };

  const formik = useFormik<HighscoreDetails>({
    initialValues: INITIALVALUES,
    validationSchema: VALIDATIONSCHEMA,
    onSubmit: handleSubmit,
  });

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add new Highscore!
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter Details</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <DialogContentText>
              It seems like you managed to get a highscore! (╯°□°）╯︵ ┻━┻
              <br />
              Fill in your info and upload a picture of your score. ╰(*°▽°*)╯
            </DialogContentText>
            <TextField
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <TextField
              margin="dense"
              id="score"
              label="Score"
              type="text"
              fullWidth
              variant="standard"
              value={formik.values.score}
              onChange={formik.handleChange}
            />
            <label title="Evidence" style={{ marginRight: 8 }}>
              Evidence
            </label>
            <input
              type="file"
              id="file"
              name="file"
              accept=".png"
              onChange={(event) => {
                handleFileUpload(event);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" onClick={handleClose}>
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default FormDialog;
