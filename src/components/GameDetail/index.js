import {React, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import './GameDetail.css';
import api from '../../api/backlog'

const GameDetail = (props) => {
  const {gameId} = useParams();
  const [game, setGame] = useState({});
  
  const retrieveGame = async (gameId) => {
    const response = await api.get(`http://localhost:8080/games/${gameId}`);
    const game = response.data;
    return game;
  }

  const getGame = async () => {
    const game = await retrieveGame(gameId);
    if (game) setGame(game);
  };

  getGame();
  
  return (
    <div className="main">
      <div className="ui card centered">
        <div className="image">
          <img src={game.imgUrl} alt="avatar" />
        </div>
        <div className="content">
          <div className="header">{game.title}</div>
          <div>
            <div className="header phone">Genres</div>
            <ul className="description">
              {
                game.genres?.map(genre => (<li key={genre}>{genre}</li>))
              }
            </ul>
          </div>
        </div>
      </div>
      <div className="center-div">
        <Link to="/users/1">
          <button className="ui button blue center">
            Back to Folders
          </button>
        </Link>
      </div>
    </div>
  );
};

export default GameDetail;