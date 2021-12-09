import React, { useMemo } from "react";

interface ContextValues {
  value: IHighscores[];
  setHighscores: (highscores: IHighscores[]) => void;
}

export const PinBallContext = React.createContext<ContextValues>({
  value: [],
  setHighscores: () => undefined,
});

const PinBallContextProvider: React.FC = ({ children }: any) => {
  const [highscores, setHighscores] = React.useState<IHighscores[]>([]);
  
  const setScores: any = (scores: IHighscores[]) => {      
    setHighscores(scores);
    return highscores;
  };

  const memo = useMemo<ContextValues>(
    () => ({
      value: highscores,
      setHighscores: setScores,
    }),
    [highscores]
  );

  return <PinBallContext.Provider value={memo}>{children}</PinBallContext.Provider>;
};

export default PinBallContextProvider;
