import React, { useState } from "react";
import GameCard from './GameCard';

const FolderDetail = (props) => {

  const folder = props.location.state.folder;
  const startingGames = folder.games === null ? [] : folder.games
  const [games, setGames] = useState(startingGames);
  const [addMode, setAddMode] = useState(false);
  const [gameId, setGameId] = useState("");

  const removeGameFromFolderHandler = (folderId, gameId) => {
    props.removeGameFromFolderHandler(folderId, gameId);
  };

  const getGame = (gameId) => {
   return props.allGames.find((game) => (game.gameId === gameId));
  }

  const renderDropdown = props.allGames?.map(
    (g) => { 
        return (
        <option value={g.gameId}>
            {g.title}
        </option>
    )});

  const add = (e) => {
    e.preventDefault();

    if (gameId === "") {
      alert("Select a game from the list!");
      return;
    }

    
    props.addGameToFolderHandler(folder.folderId, gameId);
    console.log(games);
    setAddMode(false);
    const newGame = getGame(gameId);
    setGames([...games, newGame]);
    setGameId("");
  };

  const inlineAddForm = (addMode) => {
    if (!addMode) return null;

    return (
      <form className="ui form" onSubmit={add}>
        <label className="ui label">Which game do you want to add?</label>
            <select className="ui dropdown" name="game" value={gameId} onChange={(e) => setGameId(e.target.value)}>
                <option value="">Game</option>
                {renderDropdown}
            </select>
        <input type="submit" className="ui button green inline"/>
      </form>
    )
  }

  const renderGameList = games?.map((game) => {
    return (
      <GameCard
        game={game}
        clickHander={() => removeGameFromFolderHandler(folder.folderId, game.gameId)}
        key={game.gameId}
        folderId={folder.folderId}
      />
    );
  });
  return (
    <div className="main">
      <h2>
        {folder.name}
          <button onClick={() => setAddMode(true)} className="ui button blue right">Add Game</button>
      </h2>

      <div className="ui celled list">{renderGameList}{inlineAddForm(addMode)}</div>
    </div>
  );
};

export default FolderDetail;
