import React, { useState } from "react";
import {
    Container,
    FormControl,
    InputLabel,
    Input,
    Button,
    Grid,
    Typography,
} from "@mui/material";
import useAlerts from "../../../Hooks/useAlerts";

const Form = ({ textButton, method, isName = false, modalClose = () =>{}, isDisable = false}) => {
    const [quantity, setQuantity] = useState(0);
    const [name, setName] = useState('');
    const { alertMessage } = useAlerts()

    const onSumit = async () => {
        if (isDisable ) {
            alertMessage ('You need active your contract')
        }else{
            await method(quantity, name)
            setQuantity(0)
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
                            placeholder = {'0'}
                            value={quantity}
                            id="my-quaitity"
                            aria-describedby="my-helper-text"
                        />
                    </Grid>
                </Grid>
            </FormControl>
            <Grid item md={12}>
                <Button variant="contained" onClick={onSumit} disabled={quantity == 0}>
                    {textButton}
                </Button>
            </Grid>
        </Container>
    );
};

export default Form;