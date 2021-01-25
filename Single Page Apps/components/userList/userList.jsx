import React from 'react';
import {
  Divider,
  List,
  Typography,
}
from '@material-ui/core';
import {
  ListItem,
  ListItemText,
  ListItemIcon,
}
from '@material-ui/core';
import { Link as RouterLink } from "react-router-dom";
import './userList.css';

/**
 * Define UserList, a React componment of CS142 project #5
 */
class UserList extends React.Component {
  constructor(props) {
    super(props);
  }

  getUserList() {
    //Set vars
    const formattedUserList = [];
    const users = window.cs142models.userListModel();
    if(users) {
      //Append all formatted user links to list from model data
      for(let i = 0; i < users.length; i++) {
        //get user info
        const user = users[i];
        const userid = user._id;

        //Append user list item and divider
        formattedUserList.push((
          <ListItem
            key={i}
            button onClick={this.props.onUserChange(userid)}
            component={RouterLink}
            to={'/users/' + userid}
          > 
            <ListItemText primary={user.first_name + " " + user.last_name}/>
          </ListItem>
        ));
        formattedUserList.push((<Divider />));
      }
    } else {
      formattedUserList.push((
        <ListItem
          key="Error"
          alignItems="flex-start" 
          justify="center"
        >
          <ListItemText primary={"Error: List Not Found"} />
        </ListItem>
      ));
      formattedUserList.push((<Divider />))
    }

    return formattedUserList;
  }

  render() {
    return (
      <div>
        <Typography variant="h5">
          Users
        </Typography>
        <List>
          {this.getUserList()}
        </List>
      </div>
    );
  }
}

export default UserList;