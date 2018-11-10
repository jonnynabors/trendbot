import React from 'react';
import { Drawer, List, ListItem } from "@material-ui/core";


export default function SideBar() {
    return(
        <Drawer
        variant="permanent"
        anchor="left"
        >
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