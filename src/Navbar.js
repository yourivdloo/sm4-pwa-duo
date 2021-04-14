import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MapIcon from "@material-ui/icons/Map";
import TimelineIcon from "@material-ui/icons/Timeline";
import ListIcon from "@material-ui/icons/List";

const drawerWidth = 320;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  title: {
    flexGrow: 1,
  },
  bar: {
    height: "8vh",
  },
  footer: {
    bottom: 0,
    position: "absolute",
    marginLeft: "3%",
  },
  link: {
    fontSize: "20px",
    color: "gray",
  },
}));

function Navbar() {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const navigate = (index) => {
    switch (index) {
      case 2:
        history.push("/timeline");
        handleDrawerClose();
        break;
      case 1:
        history.push("/list");
        handleDrawerClose();
        break;
      case 0:
        history.push("/");
        handleDrawerClose();
        break;
      default:
        break;
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <AppBar position="static" className={classes.bar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Work in progress
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
          <IconButton
            color="inherit"
            aria-label="refresh"
            onClick={() => history.go(0)}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <RefreshIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <Typography className={classes.typo}>Work in progress</Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {["Map", "List", "Timeline"].map((text, index) => (
            <ListItem button onClick={() => navigate(index)} key={index}>
              <ListItemIcon>
                {index === 0 ? <MapIcon /> : null}
                {index === 1 ? <ListIcon /> : null}
                {index === 2 ? <TimelineIcon /> : null}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>

        <div className={classes.footer}>
          <Divider />
          <br />
          <Link
            to="/about-us"
            onClick={handleDrawerClose}
            className={classes.link}
          >
            About us
          </Link>
          <br />
          <Link
            to="/privacy"
            onClick={handleDrawerClose}
            className={classes.link}
          >
            Privacy
          </Link>
          <br />
          <br />
          <span>
            © 2021-2022, Work in progress. <br />
            All rights reserved.
          </span>
          <br />
          <br />
        </div>
      </Drawer>
      
    </div>
  );
}

export default Navbar;
