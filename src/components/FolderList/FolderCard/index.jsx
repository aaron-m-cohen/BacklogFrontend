import React, {useState} from "react";
import { Link } from "react-router-dom";

const FolderCard = (props) => {
  const [editMode, setEditMode] = useState(false);
  const { folderId, name, games } = props.folder;
  const [folder, setFolder] = useState(props.folder);

  const EditButton = () => {
    if (editMode) {
      return(
        <i
          className="save alternate outline icon"
          style={{color: "blue", marginTop:"7px"}}
          onClick={() => {
            setEditMode(false);
            props.updateFolderHandler(folder);
          }}
        />
      )
    } else {
        return (
          <i
            className="edit alternate outline icon"
            style={{ color: "blue", marginTop: "7px" }}
            onClick={() => setEditMode(true)}
          />
        )
      }
  }

  const renderName = () => {
    if (editMode) {
      return <input type="text" name="name" value={folder.name} onChange={event => setFolder({...folder, name: event.target.value})} />
    }
      
    return (
      <div className="content">
        <Link
          to={{ pathname: `1/folders/${folderId}`, state: { folder: props.folder }}}
        >
          <div className="header">{name}</div>
        </Link>
      </div>
    )
    
  }

  const renderGameList = games?.map((game) => {
    return (
      <div className="item" key={game.gameId}>
        {game.title}
      </div>
    );
  });

  return (
    <div className="item">
      {renderName()}
      {renderGameList}

      <EditButton/>
      <i
        className="trash alternate outline icon"
        style={{ color: "red", marginTop: "7px", marginLeft: "10px" }}
        onClick={() => props.clickHander(folderId)}
      ></i>
    </div>
  );
};

export default FolderCard;
