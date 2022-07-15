import { Box, Button, List } from "@mui/material";
import { Container } from "@mui/material";
import React, { useEffect } from "react";
import { CreateService, Service } from "../../Common";

const Services = ({ getSpecialServices, specialServiceList, onChangeStatusSpecialService, getCreateSpecialService }) => {

  useEffect(() => {
    getSpecialServices();
  }, [])

  const onPressChangeStatus = (name) => {
    onChangeStatusSpecialService(name);
  }

  return (
    <Container>
      <CreateService getCreateService={getCreateSpecialService} />
      <Box>
        {specialServiceList.length === 0 ? 'we do not have basic services' :
          <List>
             {
              specialServiceList.map(service => {
                return (
                  <Service service={service} typeService onPressChangeStatus={onPressChangeStatus} />
                )
              })
            }
          </List>
        }
      </Box> 
    </Container>
  );
};

export default Services;
