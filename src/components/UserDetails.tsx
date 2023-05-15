import React, { useState } from 'react';
import { Button, Card, CardContent, Container, Grid, TextField, Typography } from '@material-ui/core';

type UserDetailsProps = {
  user: any;
  handleUserClick: (user: any) => void;
}

const UserDetails = ({ user, handleUserClick }: UserDetailsProps) => {
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);

  const handleDeleteClick = () => {
    fetch(`https://reqres.in/api/users/${user.id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        console.error('The user was deleted successfully.');
      }
    })
    .catch(error => {
      console.error('Error deleting user:', error);
    });
  }

  const handleUpdateClick = () => {
    const updatedUser = { id: user.id, first_name: firstName, last_name: lastName, email: email };
    fetch(`https://reqres.in/api/users/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedUser)
    })
    .then(response => {
      if (response.ok) {
        console.log('The user was updated successfully.');
      }
    })
    .catch(error => {
      console.error('Error updating user:', error);
    });
  }

  return (
    <Container style={{ marginTop: '10%', paddingTop: '2%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item>
          <Card style={{ alignContent: 'center', backgroundColor: '#f0f0f0', margin: '20px', maxWidth: '500px', height: '200px' }} onClick={() => handleUserClick(user)}>
            <CardContent style={{ display: 'flex', alignItems: 'center' }}>
              <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} style={{ marginRight: '20px' }} />
              <div>
                <Typography variant="h4" component="h3">
                  {user.first_name} {user.last_name}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {user.email}
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Grid container spacing={2}>
            <Grid item>
              <TextField
                label="First Name"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Last Name"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={2}>
            <Grid item>
              <Button variant="contained" color="primary" size='large' onClick={handleUpdateClick}>
                Update User
              </Button>            
            </Grid>
            <Grid item>
              <Button variant="contained" color="secondary" size='large' onClick={handleDeleteClick}>
                Delete User

              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>

  );
};

export default UserDetails;
