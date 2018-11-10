import React from 'react';
import { Drawer, List, ListItem, IconButton, Divider } from "@material-ui/core";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import classNames from 'classnames';

interface Props {
    open: boolean,
    closeDrawer: any,
    classes: {
        drawerPaper: string,
        drawerPaperClose: string,
        toolbarIcon: string
    }
}
class SideBar extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        console.log(this.props.classes);
    }
    render() {
        return (
            <Drawer
                variant="permanent"
                // @ts-ignore
                classes={{
                    paper: classNames(this.props.classes.drawerPaper, !this.props.open && this.props.classes.drawerPaperClose),
                  }}
                open={this.props.open}
            >
                <div className={this.props.classes.toolbarIcon}>
                    <IconButton onClick={this.props.closeDrawer}>
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
}

export default SideBar;