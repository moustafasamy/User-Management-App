import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Button,
  Typography,
  Container,
} from "@material-ui/core";
import axios from "axios";
import UserDetails from './UserDetails.tsx';
import AddUser from './AddUser.tsx';
import { User } from '../types/User';


const Main = () => {
  const [users, setUsers] = useState<User>();
  const [selectedUser, setSelectedUser] = useState<any | undefined>();
  const [isAddingUser, setIsAddingUser] = useState(false);
  useEffect(() => {
    axios
      .get("https://reqres.in/api/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  const createUser = async (user: User): Promise<User> => {
    const response = await axios.post("https://reqres.in/api/users", { user });
    return response.data;
  };
  const handleUserClick = (user: any) => {
    setSelectedUser(user);
  };

  const handleAddUserClick = () => {
    setIsAddingUser(true);
  };

  const handleAddUserClose = () => {
    setIsAddingUser(false);
  };

  const handleUserAdded = async (user: any) => {
    const newUser = await createUser(user);
    setSelectedUser(newUser);
    setIsAddingUser(false);
  };

  return (
    <div>
      <Container
        style={{
          marginTop: "10%",
          paddingTop: "2%",
          display: selectedUser || isAddingUser ? "none" : "block",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} container justify="space-between">
            <Grid item>
              <Typography variant="h3">User Management</Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleAddUserClick}
              >
                Add User
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} container spacing={2}>
            {users?.data.map((user) => (
              <Grid item xs={12} sm={6} md={4} key={user.id}>
                <Card
                  style={{
                    backgroundColor: "#f0f0f0",
                    margin: "20px",
                    maxWidth: "500px",
                    height: "100%",
                  }}
                  onClick={() => handleUserClick(user)}
                >
                  <CardContent
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <img
                      src={user.avatar}
                      alt={`${user.first_name} ${user.last_name}`}
                      style={{
                        marginRight: "20px",
                        borderRadius: "50%",
                        width: "50px",
                        height: "50px",
                      }}
                    />
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
            ))}
          </Grid>
        </Grid>
      </Container>
      {selectedUser && (
        <UserDetails user={selectedUser} handleUserClick={handleUserClick} />
      )}
      {isAddingUser && (
        <AddUser
          onClose={handleAddUserClose}
          onUserAdded={handleUserAdded}
          open={isAddingUser}
        />
      )}
    </div>
  );
};

export default Main;
