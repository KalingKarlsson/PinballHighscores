import React, { useEffect } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { updateDoc } from "firebase/firestore";
import { documentRef } from "../Highscores";
import { PinBallContext } from "../Context/PinBallContextProvider";

interface Props {
  data: IHighscores[];
}

const AddHighscoreDialog: React.FC<Props> = ({ data }: Props) => {
  const pinBallContext = React.useContext(PinBallContext);

  const [open, setOpen] = React.useState(false);
  const [fetchedHighscores, setFetchedHighscores] = React.useState<IHighscores[]>(data);
  const [newScore, setNewScore] = React.useState<IHighscores>({ name: "", score: "" });

  let highscores: IHighscores[] = [];

  useEffect(() => {
    setFetchedHighscores(data);
  }, [data]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateHighScoreList = async () => {
    if (newScore.name !== "" && newScore.score !== "") {
      if (fetchedHighscores) {
        highscores = [...fetchedHighscores, newScore];

        highscores.sort((a, b) => (parseInt(a.score) < parseInt(b.score) ? 1 : -1));

        if (highscores.length > 5) {
          highscores.pop();
        }
        setFetchedHighscores(highscores);
        pinBallContext.setHighscores(fetchedHighscores);

        try {
          await updateDoc(documentRef, {
            highscores,
          });
        } catch (error) {
          console.log(error);
        }

        handleClose();

        if (highscores.some((user) => user.score !== newScore.score)) {
          alert("You did not get into the highscore list, better luck next time");
        }

        setNewScore({ name: "", score: "" });
      }
    } else {
      alert("All fields must be filled in");
    }
  };

  const inputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    propertyName: string
  ): void =>
    setNewScore((prev) => ({
      ...prev,
      [propertyName]: event.target.value,
    }));

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add new Highscore!
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter Details</DialogTitle>
        <form>
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
              value={newScore?.name}
              onChange={(e) => inputChangeHandler(e, "name")}
              inputProps={{ maxLength: 25 }}
              required
            />
            <TextField
              margin="dense"
              id="score"
              label="Score"
              type="text"
              fullWidth
              variant="standard"
              value={newScore?.score}
              onChange={(e) => inputChangeHandler(e, "score")}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={updateHighScoreList}>Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default AddHighscoreDialog;
