import React from 'react'
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

const LandingPage = ({ roleUser, getNewLaboratory, getNewUser, getRole, onSumit }) => {
    const navigate = useNavigate();
    
    useEffect(() => {
        getRole()
    }, [])
    
    const hamdleSumit = () => {
        onSumit(navigate)
    }

    const onLaboratory = async ()=>{
        getNewLaboratory()
    }   

    const onNewUser = async () => {
        getNewUser()
    }

    return (
        <Container maxWidth={false} >
            <Box >
                {/* <img src={'https://ipfs.io/ipfs/QmaT53qTNZjgXdhxQv2S7r9xZro85YXh4ybLc9U8kRXLyu?filename=banner-vida-salud.png'} height={250} width={'100%'} alt='ERROR' /> */}
            </Box>

            <Grid container spacing={4} mt={4}>
                <Grid item xs={4} >
                    <Box variant="rectangular" width={"100%"} height={400}>
                        <Typography height={"70%"}>
                            carreta para laboratorio
                        </Typography>
                        <Button onClick={onLaboratory} >
                            Unirse
                        </Button>
                    </Box>
                </Grid>

                <Grid item xs={4}>
                    <Box variant="rectangular" width={"100%"} height={400}>
                        <Typography height={"70%"}>
                            Aca va la info d ela empresa y del pryecto
                        </Typography>
                        <Button height={"30%"} onClick={hamdleSumit}>
                            Ingresar
                        </Button>
                    </Box>
                </Grid>

                <Grid item xs={4}>
                    <Box variant="rectangular" width={"100%"} height={400} >
                        <Typography height={"70%"}>
                            carreta para user
                        </Typography>
                        <Button onClick={onNewUser} >
                            Aquirir Poliza
                        </Button>
                    </Box>
                </Grid>
            </Grid>

        </Container>
    )
}

export default LandingPage