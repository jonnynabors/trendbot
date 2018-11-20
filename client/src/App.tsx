import React, { Component } from "react";
import classNames from "classnames";
import NavBar from "./functions/NavBar";
import SideBar from "./classes/SideBar";
import { CssBaseline } from "@material-ui/core";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";
import Rankings from "./classes/Rankings";
import Dashboard from "./functions/Dashboard";
import { Route } from "react-router-dom";
import Parses from "./classes/Parses";

const drawerWidth = 240;
const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    toolbar: {
      paddingRight: 24 // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
      ...theme.mixins.toolbar
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 36
    },
    menuButtonHidden: {
      display: "none"
    },
    title: {
      flexGrow: 1
    },
    drawerPaper: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerPaperClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing.unit * 7,
      [theme.breakpoints.up("sm")]: {
        width: 0
      }
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3,
      height: "100vh",
      overflow: "auto"
    },
    chartContainer: {
      marginLeft: -22
    },
    tableContainer: {
      height: 320
    },
    h5: {
      marginBottom: theme.spacing.unit * 2
    }
  });

interface Props {
  classes: any;
}
interface State {
  open: boolean;
}
class App extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <CssBaseline />
        <NavBar
          classNames={{
            toolbarClasses: classNames(
              classes.appBar,
              this.state.open && classes.appBarShift
            ),
            navbarClasses: classNames(classes.toolbar),
            iconButtonClasses: classNames(
              classes.menuButton,
              this.state.open && classes.menuButtonHidden
            )
          }}
          openDrawer={this.handleDrawerOpen.bind(this)}
          open={this.state.open}
        />
        <SideBar
          classes={{
            drawerPaper: classes.drawerPaper,
            drawerPaperClose: classes.drawerPaperClose,
            toolbarIcon: classes.toolbarIcon
          }}
          open={this.state.open}
          closeDrawer={this.handleDrawerClose.bind(this)}
        />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Route path="/" exact component={Dashboard} />
          <Route path="/rankings" component={Rankings} />
          <Route path="/parses" component={Parses} />
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(App);
