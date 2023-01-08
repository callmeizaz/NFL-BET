import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';

import { ReactComponent as TrophyOutlineIcon } from '../icons/trophy-outline.svg';
import { ReactComponent as GroupOutlineIcon } from '../icons/group-outline.svg';
import { ReactComponent as ProfileOutlineIcon } from '../icons/profile-outline.svg';
import { ReactComponent as LobbyOutlineIcon } from '../icons/lobby-outline.svg';
import { ReactComponent as TopPropIcon } from '../icons/TopProp-log.svg';
import { ReactComponent as AccountOtlineIcon } from '../icons/account-outline.svg';

export const mainListItems = (
  <div>
     <ListItem button style={{"marginButtom": "auto"}}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="TopProp" />
    </ListItem>
    <ListItem button></ListItem>
    <ListItem button>
      <ListItemIcon>
        <LobbyOutlineIcon />
      </ListItemIcon>
      <ListItemText primary="Battle Ground" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ProfileOutlineIcon />
      </ListItemIcon>
      <ListItemText primary="My Contest" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <TrophyOutlineIcon />
      </ListItemIcon>
      <ListItemText primary="League" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <GroupOutlineIcon />
      </ListItemIcon>
      <ListItemText primary="Private Group" />
    </ListItem>
    <ListItem button style={{"marginTop": "auto"}} >
      <ListItemIcon>
        <AccountOtlineIcon />
      </ListItemIcon>
      <ListItemText primary="$1,940" />
    </ListItem>
  </div>
);