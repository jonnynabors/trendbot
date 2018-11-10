import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

export default function NavBar(props: any) {
  return (
    <AppBar
      position="absolute"
      color="primary"
      className={props.classNames.toolbarClasses}
    >
      <Toolbar
        className={props.classNames.navbarClasses}
        disableGutters={!props.open}
      >
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          onClick={props.openDrawer}
          className={props.classNames.iconButtonClasses}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={props.classNames.titleClassName}
        >
          TrendBot
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
