import React from "react";
import { FolderIcon } from "@heroicons/react/solid";
import { useHistory } from "react-router-dom";
import { database } from "../firebase";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const initialState = {
  mouseX: null,
  mouseY: null,
};

function Folder({ folder }) {
  const [state, setState] = React.useState(initialState);
  const history = useHistory();

  const handleClick = (event) => {
    event.preventDefault();
    setState({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });
  };

  const handleClose = () => {
    setState(initialState);
  };

  const handleDelete = () => {
    database.folders.doc(folder.id).delete();
  };

  return (
    <>
      <div
        onClick={() => {
          history.push(`/folder/${folder.id}`, { folder: folder });
        }}
        onContextMenu={handleClick}
        className="p-5 border hover:bg-gray-100 cursor-pointer items-center flex bg-white mr-5"
      >
        <FolderIcon height="35px" width="35px" />
        <h4 className="ml-3">{folder.name}</h4>
      </div>
      <Menu
        keepMounted
        open={state.mouseY !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          state.mouseY !== null && state.mouseX !== null
            ? { top: state.mouseY, left: state.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </>
  );
}

export default Folder;
