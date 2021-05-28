import React from "react";
import Button from "elements/Button";
import Popover from "@material-ui/core/Popover";
import { database } from "../firebase";
import { ROOT_FOLDER } from "hooks/useFolder";
import { useAuth } from "contexts/AuthContext";

export default function AddFolder({ currentFolder }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [name, setName] = React.useState("");
  const { currentUser } = useAuth();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentFolder === null) return;

    const path = [...currentFolder.path];

    if (currentFolder !== ROOT_FOLDER) {
      console.log("Works");
      path.push({ name: currentFolder.name, id: currentFolder.id });
    }

    database.folders.add({
      name: name,
      userId: currentUser.uid,
      createdAt: database.getCurrentTimestamp(),
      path: path,
      parentId: currentFolder.id,
    });
    setName("");
    handleClose();
  };

  return (
    <>
      <Button onClick={handleClick} className="py-2 px-3 ">
        Add Folder
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <form onSubmit={handleSubmit} className="p-3">
          <input
            type="text"
            maxLength={20}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Folder Name"
            required
            className="border rounded py-2 px-2"
          />
          <Button className="mt-2 w-full py-2">Add Folder</Button>
        </form>
      </Popover>
    </>
  );
}
