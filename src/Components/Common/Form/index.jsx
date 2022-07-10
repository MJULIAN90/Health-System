import React, { useState } from "react";
import {
    Container,
    FormControl,
    InputLabel,
    Input,
    Button,
    Grid,
} from "@mui/material";
import useAlerts from "../../../Hooks/useAlerts";

const Form = ({ textButton, method, isName = false, modalClose = () =>{}, isDisable = false}) => {
    const [quantity, setQuantity] = useState(0);
    const [name, setName] = useState('');
    const { alertMessage } = useAlerts()

    const onSumit = () => {
        if (isDisable ) {
            alertMessage ('You need active your contract')
        }else{
            method(quantity, name)
            modalClose()
        }
    }

    return (
        <Container>
            <FormControl>
                <Grid container >
                    {isName &&
                        <Grid item>
                            <InputLabel htmlFor="my-input"> Name service</InputLabel>
                            <Input
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                id="my-input"
                                aria-describedby="my-helper-text"
                            />
                        </Grid>
                    }
                    <Grid item>
                        <InputLabel htmlFor="my-quaitity" >Quantity</InputLabel>
                        <Input
                            onChange={(e) => setQuantity(e.target.value)}
                            value={quantity}
                            id="my-quaitity"
                            aria-describedby="my-helper-text"
                        />
                    </Grid>
                </Grid>
            </FormControl>
            <Grid item md={12}>
                <Button variant="contained" onClick={onSumit} >
                    {textButton}
                </Button>
            </Grid>
        </Container>
    );
};

export default Form;