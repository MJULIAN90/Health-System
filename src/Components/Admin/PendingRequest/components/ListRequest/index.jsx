import { Box, Button, Container, Icon } from '@mui/material'
import React, { useEffect } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import AccountBalanceWalletTwoToneIcon from '@mui/icons-material/AccountBalanceWalletTwoTone';

const ListRequest = ({ name, getPendintRequest, listPendingClient, listPendingLaboratory, getEnableSubscription }) => {

  useEffect(() => {
    getPendintRequest(name)
  }, [name])

  const Render = ({listItems}) => {
    const [checked, setChecked] = React.useState([1]);

    const handleToggle = (value) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      setChecked(newChecked);
    };

    if (listItems.length > 0) {

      return (
        <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {listItems.map((address) => {
            return (
              <ListItem
                key={address}
                // disablePadding
              >
                <ListItemButton style={{marginRight: 500}}>
                  <ListItemAvatar>
                    <Avatar>
                      <AccountBalanceWalletTwoToneIcon />
                    </Avatar>
                    
                  </ListItemAvatar>
                  <ListItemText id={address} primary={`Wallet # ${address}`} />

                </ListItemButton>
               
                <Button onClick={() => getEnableSubscription (address)}>
                    Add
                  </Button>
                  <Button >
                    Reject
                  </Button>

              </ListItem>
            );
          })}
        </List>
      )
    }
    return (
      <Container>
        we have no pending request
      </Container>
    )
  }

  return (
    <Container>
      {
        name === 'Client' ?
          <>
            <Render listItems={listPendingClient} />
          </>
          :
          <>
            <Render listItems={listPendingLaboratory} />
          </>

      }


    </Container>
  )
}

export default ListRequest