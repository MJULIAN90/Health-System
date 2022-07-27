import React, { useState } from "react";
import {
  Container,
  FormControl,
  InputLabel,
  Input,
  Button,
  Grid,
  Typography,
  TextField,
} from "@mui/material";
import useAlerts from "../../../Hooks/useAlerts";

const Form = ({
  textButton,
  method,
  isName = false,
  modalClose = () => {},
  isDisable = false,
}) => {
  const [quantity, setQuantity] = useState(0);
  const [name, setName] = useState("");
  const { alertMessage } = useAlerts();

  const onSumit = async () => {
    if (isDisable) {
      alertMessage("You need active your contract");
    } else {
      await method(quantity, name);
      setQuantity(0);
      modalClose();
    }
  };

  return (
    <Container>
      <FormControl>
        <Grid container>
          {isName && (
            <Grid
              item
              style={{
                width: "100%",
              }}
            >
              <TextField
                margin='normal'
                required
                fullWidth
                label='Name service'
                name='Name service'
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </Grid>
          )}
          <Grid item style={{ width: "100%" }}>
            <TextField
              type={"number"}
              margin='normal'
              required
              fullWidth
              label='Quantity tockens'
              name='Quantity'
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Grid>

          <Grid item style={{ width: "100%", height: 30, marginTop:20 }}>
            <Button
              variant='contained'
              onClick={onSumit}
              disabled={quantity == 0}
              fullWidth
              type='submit'
              style={{ height: 50 }}
            >
              {textButton}
            </Button>
          </Grid>
        </Grid>
      </FormControl>
    </Container>
  );
};

export default Form;
