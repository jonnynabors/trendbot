import React from 'react';
import { Drawer, List, ListItem, IconButton, Divider } from "@material-ui/core";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

export default function SideBar(props: any) {
    return (
        <Drawer
            variant="permanent"
            anchor="left"
            className={props.classes.paper}
            open={props.open}
        >
        <div className={props.classes.toolbarIcon}>
            <IconButton onClick={props.closeDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
            <List>
                <ListItem button>
                    Rankings
            </ListItem>
                <ListItem button>
                    Parses
            </ListItem>
            </List>
        </Drawer>
    )
}