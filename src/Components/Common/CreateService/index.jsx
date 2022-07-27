import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Form } from "../";
import { images } from "../../../Assets";
// import { images } from'../../../../../SystemLoteryFull-main/src/Assets';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 500,
  bgcolor: "background.paper",
  border: "3px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
  borderColor: "black",
  background: "#F5F5F5",
};

const CreateService = ({ getCreateService }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Box style={{ display: "flex", justifyContent: "end", margin: 10 }}>
        <Button
          onClick={handleOpen}
          variant='contained'
          style={{ marginRight: -10 }}
        >
          Create service
        </Button>
      </Box>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <img
              src={images.logo2}
              height={160}
              width={160}
              alt='ERROR'
              style={{ borderRadius: 20 }}
            />
          </Box>

          <Form
            textButton={"Send"}
            method={getCreateService}
            isName
            modalClose={handleClose}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default CreateService;
