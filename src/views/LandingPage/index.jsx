import React from 'react'
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import { useNavigate } from "react-router-dom";

const LandingPage = ({ roleUser, getNewLaboratory, getNewUser }) => {
    
    const navigate = useNavigate();
    
    const onSumit = () =>{
        if (roleUser.role ){
            if (roleUser.status){
               return navigate("/home")
            }
            return alert ('debes activar tu cuenta')
        } 
        return alert ('debes incribirte')
    }

    const onLaboratory = async ()=>{
        await getNewLaboratory ()
    }

    const onNewUser = async () => {
        await getNewUser ()
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
                        <Button onClick={onLaboratory}>
                            Unirse
                        </Button>
                    </Box>
                </Grid>

                <Grid item xs={4}>
                    <Box variant="rectangular" width={"100%"} height={400}>
                        <Typography height={"70%"}>
                            Aca va la info d ela empresa y del pryecto
                        </Typography>
                        <Button height={"30%"} onClick={onSumit}>
                            Ingresar
                        </Button>
                    </Box>
                </Grid>

                <Grid item xs={4}>
                    <Box variant="rectangular" width={"100%"} height={400} >
                        <Typography height={"70%"}>
                            carreta para user
                        </Typography>
                        <Button onClick={onNewUser}>
                            Aquirir Poliza
                        </Button>
                    </Box>
                </Grid>
            </Grid>

        </Container>
    )
}

export default LandingPage