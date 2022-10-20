import React, { useState } from "react";
import FolderCard from "./FolderCard";

const FolderList = (props) => {
  const [name, setName] = useState("");
  const [addMode, setAddMode] = useState(false);


  const deleteFolderHandler = (folderId) => {
    props.getFolderId(folderId);
  };

  const add = (e) => {
    e.preventDefault();

    if (name === "") {
      alert("Name must be fulled in!");
      return;
    }

    const folder = {
      userId: "1",
      name: name
    }
    props.addFolderHandler(folder);
    setAddMode(false);
    setName("");
  }

  const inlineAddForm = (addMode) => {
    if (!addMode) return null;

    return (
      <form className="ui form" onSubmit={add}>
        <div className="field">
          <label>Name</label>
            <input 
              type="text" 
              name="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)} />
        </div>
        <button className="ui button green">Add</button>
      </form>
    )
  }

  const renderFolderList = props.folders.map((folder) => {
    return (
      <FolderCard
        folder={folder}
        clickHander={deleteFolderHandler}
        updateFolderHandler={props.updateFolderHandler}
        key={folder.folderId}
      />
    );
  });
  return (
    <div className="main">
      <h2>
        My Folders
          <button onClick={() => setAddMode(true)} className="ui button blue right">Add Folder</button>
      </h2>
      <div className="ui celled list">{renderFolderList}{inlineAddForm(addMode)}</div>
    </div>
  );
};

export default FolderList;
