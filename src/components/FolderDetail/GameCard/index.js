import React, {useState} from "react";
import { Link } from "react-router-dom";

const GameCard = (props) => {
  const { gameId, title, genres } = props.game;

  const genreItems = genres?.map((genre) => {
    <li classname="item">{genre}</li>
  }); 

  return (
    <div className="item">
      <div className="content">
        <Link
          to={{ pathname: `/games/${gameId}`, state: { game: props.game }}}
        >
          <div className="header">{title}</div>
        </Link>
      </div>
      <div className="content">
        <ul className="horizonal list">{genreItems}</ul>
      </div>
      <i
        className="trash alternate outline icon"
        style={{ color: "red", marginTop: "7px", marginLeft: "10px" }}
        onClick={() => props.clickHander("todo", gameId)}
      ></i>
    </div>
  );
};

export default GameCard;
