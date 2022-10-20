import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import api from "../../api/backlog";
import "./App.css";
import Header from "../Header";
import FolderDetail from "../FolderDetail";
import FolderList from "../FolderList";
import GameDetail from "../GameDetail";

function App() {
  const [folders, setFolders] = useState([]);
  const [games, setGames] = useState([]);

  

  //RetrieveFolders
  const retrieveFolders = async () => {
    const response = await api.get("http://localhost:8080/users/1/folders");
    const folders = await getGamesForFolders(response.data);
    return folders;
    
  };


  const retrieveGames = async () => {
    const response =  await api.get("http://localhost:8080/games");
    const allGames = response.data;
    return allGames;
  }

  const getFolderHandler = async (folderId) => {
    return await api.get(`http://localhost:8080/users/1/folders/${folderId}`)
  }

  const addFolderHandler = async (folder) => {
    
    const request = {
      ...folder
    };

    const response = await api.post("http://localhost:8080/users/1/folders", request);
    //console.log(response);
    setFolders([...folders, response.data]);
  };

  const updateFolderHandler = async (folder) => {
    console.log(folder);
    await api.put(`http://localhost:8080/users/1/folders/${folder.folderId}`, folder);
    getAllFolders();
  };

  const removeFolderHandler = async (folderId) => {

    await api.delete(`http://localhost:8080/users/1/folders/${folderId}`);
    setFolders(folders.filter(c => c.folderId !== folderId));
  };

  const getAllFolders = async () => {
    const allFolders = await retrieveFolders();
    if (allFolders) setFolders(allFolders);
  };

  const getAllGames = async () => {
    const allGames = await retrieveGames();
    if (allGames) setGames(allGames);
  };

  const getGamesForFolders = async (folders) => {
    return await Promise.all(folders.map(async (folder) => { 
      const result = await api.get(`http://localhost:8080/games/folder/${folder.folderId}?userId=1`)
      return {...folder, games: result.data};
    }));
  }

  const addGameToFolderHandler = async(folderId, gameId) => {
    await api.post(`http://localhost:8080/folders/${folderId}?gameId=${gameId}`);  
  }

  const removeGameFromFolderHandler = async(folderId, gameId) => {
    await api.delete(`http://localhost:8080/folders/${folderId}?gameId=${gameId}`);
    getGamesForFolders();
  }

  useEffect(() => {
    getAllFolders();
    getAllGames();
  }, []);

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          <Route
            path="/users/1"
            exact
            render={(props) => (
              <FolderList
                {...props}
                folders={folders}
                getFolderId={removeFolderHandler}
                addFolderHandler={addFolderHandler}
                updateFolderHandler={updateFolderHandler}

              />
            )}
          />
          <Route
            path="/users/1/folders/:folderId"
            render={(props) => (
              <FolderDetail 
                {...props}
                allGames={games}
                addGameToFolderHandler={addGameToFolderHandler}
                removeGameFromFolderHandler={removeGameFromFolderHandler} />
            )}
          />

          <Route
            path="/games/:gameId"
            render={(props) => (
              <GameDetail
                {...props}
                addGameToFolderHandler={addGameToFolderHandler}
                allFolders={folders}
              />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
