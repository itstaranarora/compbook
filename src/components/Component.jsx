import React from "react";
import { database } from "../firebase";
import { useHistory } from "react-router-dom";
import { CodeIcon } from "@heroicons/react/solid";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const initialState = {
  mouseX: null,
  mouseY: null,
};

function Component({ file }) {
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
    database.files.doc(file.id).delete();
  };

  return (
    <>
      <div
        onClick={() => {
          history.push(`/component/${file.id}`);
        }}
        onContextMenu={handleClick}
        className="p-5 border hover:bg-gray-100 cursor-pointer items-center flex bg-white mr-5"
      >
        <CodeIcon height="35px" width="35px" />
        <h4 className="ml-3">{file.name}</h4>
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

export default Component;
