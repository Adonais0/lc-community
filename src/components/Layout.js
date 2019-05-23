import React, { useState } from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import { Divider, AppBar, Toolbar } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronRightIcon from '@material-ui/icons/ChevronLeft';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { withStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 180;
const headerHeight = 58;

const styles = theme => ({
    root: {
      display: 'flex',
    },
    appBar: {
        zIndex: 10,
        height: `${headerHeight}px`
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
    },
    drawerClose: {
        zIndex: 5,
        overflowX: 'hidden',
        width: theme.spacing.unit * 7 + 1,
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        height: `${headerHeight}px`,
    },
    content: {
        flexGrow: 1,
        padding: 20,
        marginLeft: theme.spacing.unit * 7 + 1,
        width: `calc(100% - ${theme.spacing.unit * 7 + 1}px)`,
    },
    contentShrink: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
    }
});

function Layout (props) {
    const { classes } = props;
    const [open, setOpen ] = useState(true);

    const openDrawerHandler = () => {
        setOpen(true);
    }

    const closeDrawerHandler = () => {
        setOpen(false);
    }

    return (
        <div className={styles.root}>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                  })}
                >
                <Toolbar disableGutters={!open}>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={openDrawerHandler}
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                          })}
                        >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                paper: clsx({
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                }),
                }}
                open={open}
            >
            <div className={classes.toolbar}>
                <IconButton onClick={closeDrawerHandler}><ChevronRightIcon />
                </IconButton>
            </div>
            <Divider />
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            </Drawer>
            <main className={clsx(classes.content, {[classes.contentShrink]: open})}>{props.children}</main>
        </div>
    )
}


export default withStyles(styles)(Layout);