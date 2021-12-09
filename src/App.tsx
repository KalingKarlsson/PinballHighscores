import { Container, ImageListItem } from "@mui/material";
import "./App.css";
import PinBallContextProvider from "./Context/PinBallContextProvider";
import Highscores from "./Highscores";

function App() {
  return (
    <Container className="App">
      <header className="App-header">
        <p className="title-style">PinBall HighScores</p>
      </header>
      <PinBallContextProvider>
        <Highscores />
      </PinBallContextProvider>
      <ImageListItem>
        <img src="https://cdn.shopify.com/s/files/1/0342/1649/products/Demolition-man-pinball-topper.jpg?v=1571438681" />
      </ImageListItem>
    </Container>
  );
}

export default App;
