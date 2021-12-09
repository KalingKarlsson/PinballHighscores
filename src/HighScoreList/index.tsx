import { List } from '@mui/material';
import React from 'react';
import HighscoreListItem from '../HighScoreListItem';

interface Props {
    data: IHighscores[];
  }
const HighScoreList: React.FC<Props> = ({data}: Props) => {    
    const displayHighscores = data.map((entry, rank) => (
        <HighscoreListItem rank={rank + 1} name={entry.name} score={entry.score} />
        ));
        
        return (
            <List>{displayHighscores}</List>
        )
    }

    export default HighScoreList;