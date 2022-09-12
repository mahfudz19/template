import {
  Nightlight, Person, PowerSettingsNew, WbSunny, Mail, Menu as MenuIcon, MoveToInbox
} from '@mui/icons-material';
import {
  Avatar, Box, Divider, Switch, Typography, useMediaQuery, useTheme, ListItemButton, ListItemIcon,
  List, ListItemText, MenuItem, Drawer as MuiDrawer,
} from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Menu, { MenuProps } from '@mui/material/Menu';
import { CSSObject, styled, Theme } from '@mui/material/styles';
import { makeStyles } from "@mui/styles";
import * as React from 'react';

import { ArrowBackIos } from '@mui/icons-material';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiListItem, { ListItemBaseProps } from '@mui/material/ListItem';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Link from 'next/link';


const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));
const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    {...props}
  />
))(({ theme }) => ({
  height: 0,
  display: 'flex',
  justifyContent: 'initial',
  alignItems: 'center',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(-90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(0),
  },
}));

const ListItem = styled((props: ListItemBaseProps) => (
  <MuiListItem
    {...props}
  />
))(({ theme }) => ({
  height: 50,
  ":hover": {
    fontWeight: 600,
    marginLeft: theme.spacing(0.5),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: '0 0 0 20px',
  boxShadow: 'inset 0 -20px 50px -20px #111010'
}));

function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(-1.5),
    minWidth: 150,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '0 10px 10px 10px',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
      },
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
}));

const openedMixin = (theme: Theme): CSSObject => ({
  width: `100%`,
  [theme.breakpoints.up('sm')]: {
    width: 240,
  },
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(0)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  padding: theme.spacing(1.1),
  marginLeft: 65,
  top: 64,
  width: `calc(100% - 65px)`,
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: 240,
    width: `calc(100% - 240px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const useStyles = makeStyles(theme => ({
  paper: {
    top: 113,
    position: "fixed",
    height: "92.5vh",
    backgroundColor: '#1d2127'
  },
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: 240,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ":hover": {
      '& .MuiDrawer-paper': openedMixin(theme),
    },
    ...(open && {
      '& .MuiDrawer-paper': openedMixin(theme),
      [theme.breakpoints.up('sm')]: {
        ...openedMixin(theme),
      },
    }),
    ...(!open && {
      '& .MuiDrawer-paper': closedMixin(theme),
      ...closedMixin(theme),
    }),
  }),
);

export default function Sidebar({ children, auth, setAuth, mode, change }: any) {
  const theme = useTheme();
  const classes = useStyles(theme);
  const xsOnly = useMediaQuery((t: any) => t.breakpoints.only('xs'));
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const dropSideMenu = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
    setOpen(true);
  };

  const openUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeUserMenu = () => {
    setAnchorEl(null);
  };

  const handleSidebar = () => {
    setOpen(!open);
  };
  return (
    <>
    <Box sx={{ display: 'flex' }}>
      {/* navbar */}
      <Box position='fixed' top={0} zIndex={1} width='100%'>
        {/* header 1 */}
        <Box bgcolor={'background.default'} display='flex' justifyContent='center' alignItems='center' height={64} px={theme.spacing(3)}>
          <Typography
            textTransform='uppercase'
            color={theme.palette.mode === 'light' ? 'primary.dark' : 'primary.light'}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            name with style
          </Typography>
          <Divider orientation="vertical" flexItem sx={{ mx: 3, my: 'auto', height: 45 }} />
          {auth ? (
            <div>
              <List
                component="nav"
                aria-label="Device settings"
                sx={{ p: 0 }}
              >
                <Box onClick={openUserMenu}>
                  <ListItem
                    aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
                    sx={{
                      cursor: 'pointer',
                      p: 0,
                      ":hover": {
                        marginLeft: theme.spacing(0),
                      }
                    }}
                  >
                    <Avatar style={{marginRight: theme.spacing(1)}} {...stringAvatar('John Doe Junior')} />
                    <Box display={{ sm: 'block', xs: 'none' }}>
                      <ListItemText
                        primary={'John Doe Junior'}
                        secondary="admin"
                      />
                    </Box>
                  </ListItem>
                </Box>
              </List>
              <StyledMenu
                id="lock-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={closeUserMenu}
                MenuListProps={{
                  'aria-labelledby': 'lock-button',
                  role: 'listbox',
                }}
              >
                <ListItem sx={{ p: theme.spacing(1), ":hover": { marginLeft: theme.spacing(0) }}}>
                  <Avatar style={{marginRight: theme.spacing(1)}} {...stringAvatar('John Doe Junior')} />
                  <ListItemText
                    primary={'John Doe Junior'}
                    secondary="admin"
                  />
                </ListItem>
                <Divider sx={{ mb: theme.spacing(1) }}/>
                <MenuItem onClick={closeUserMenu}>
                  <Person />
                  {' '}
                  <Typography>
                    Profile
                  </Typography>
                </MenuItem>
                <MenuItem sx={{ py: 0 }}>
                  <Nightlight/>
                  <Switch
                    defaultChecked
                    color="primary"
                    onChange={change}
                    checked={mode}
                  />
                  <WbSunny/>
                </MenuItem>
                <Divider />
                <MenuItem onClick={closeUserMenu}>
                  {/* <Logout /> */}
                  <PowerSettingsNew sx={{ "&:hover": { color: "white" } }}/>
                  {' '}
                  <Typography>
                    Logout
                  </Typography>
                </MenuItem>
              </StyledMenu>
            </div>
          ) : (
            <>
              <Nightlight/>
              <Switch
                defaultChecked
                color="primary"
                onChange={change}
                checked={mode}
              />
              <WbSunny/>
            </>
          )}
        </Box>

        {/* header 2 */}
        <Box display='flex'>
          {xsOnly ? (
            <Box display='flex' position="fixed" top={64} alignItems='center' justifyContent={open ? 'space-between' : 'center'} height={49} width={'100%'} sx={{ backgroundColor: 'primary.main' }}>
              <Box height='100%' width={'100%'} py={1.5} px={2.5} sx={{cursor: 'pointer', backgroundColor: 'primary.dark', color: '#fff' }} onClick={handleSidebar}>
                <MenuIcon />
              </Box>
            </Box>
          ):(
            <Box display='flex' position="fixed" top={64} alignItems='center' justifyContent={open ? 'space-between' : 'center'} height={49} width={240} sx={{ backgroundColor: 'primary.main' }}>
              <Box ml={theme.spacing(2)} sx={{display: open ? 'static' : 'none'}}>
                Navigation
              </Box>
              <Box height='100%' width={open ? 50 : '100%'} py={1.5} px={!open ? 2.2 : 1.5} sx={{cursor: 'pointer', backgroundColor: 'primary.dark', color: '#fff', borderBottomLeftRadius: open ? 15 : 0 }} onClick={handleSidebar}>
                <MenuIcon />
              </Box>
            </Box>
          )}
          <AppBar position="fixed" elevation={0} open={xsOnly ? false : open}>
            <Typography variant="h6" noWrap component="div">
              Mini variant drawer
            </Typography>
          </AppBar>
        </Box>
      </Box>

      {/* sidebar */}
      <Drawer 
        variant="permanent"
        open={open}
        classes={{
          paper: classes.paper,
        }}
      >
        {/* <Divider /> */}
        <List>
          <Accordion expanded={expanded === 'panel1'} onChange={dropSideMenu('panel1')}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ArrowBackIos sx={{ color: '#fff',fontSize: '0.9rem' }} />}>
              <ListItem disablePadding >
                <ListItemIcon sx={{ color: '#fff', minWidth: 0, mr: 3, justifyContent: 'center', }}>
                  <MoveToInbox sx={{ fontSize: 20,  }}/>
                </ListItemIcon>
                <ListItemText primary={'Inbox'}/>
              </ListItem>
            </AccordionSummary>
            <AccordionDetails>
              <ListItem disablePadding  >
                <ListItemIcon sx={{ color: '#fff', minWidth: 0, mr: 3, justifyContent: 'center', }}>
                  <Mail sx={{ fontSize: 20,  }}/>
                </ListItemIcon>
                <ListItemText primary={'Starred'}/>
              </ListItem>
              <ListItem disablePadding >
                <ListItemIcon sx={{ color: '#fff', minWidth: 0, mr: 3, justifyContent: 'center', }}>
                  <Mail sx={{ fontSize: 20,  }}/>
                </ListItemIcon>
                <ListItemText primary={'Send email'}/>
              </ListItem>
            </AccordionDetails>
          </Accordion>

          <Accordion >
            <AccordionSummary>
              <ListItem disablePadding >
                <ListItemIcon sx={{ color: '#fff', minWidth: 0, mr: 3, justifyContent: 'center', }}>
                  <MoveToInbox sx={{ fontSize: 20,  }}/>
                </ListItemIcon>
                <ListItemText primary={'Inbox'}/>
              </ListItem>
            </AccordionSummary>
          </Accordion>

          <Accordion expanded={expanded === 'panel3'} onChange={dropSideMenu('panel3')}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ArrowBackIos sx={{ color: '#fff',fontSize: '0.9rem' }} />}>
              <ListItem disablePadding >
                <ListItemIcon sx={{ color: '#fff', minWidth: 0, mr: 3, justifyContent: 'center', }}>
                  <MoveToInbox sx={{ fontSize: 20,  }}/>
                </ListItemIcon>
                <ListItemText primary={'Inbox'}/>
              </ListItem>
            </AccordionSummary>
            <AccordionDetails>
              <ListItem disablePadding >
                <ListItemIcon sx={{ color: '#fff', minWidth: 0, mr: 3, justifyContent: 'center', }}>
                  <Mail sx={{ fontSize: 20,  }}/>
                </ListItemIcon>
                <ListItemText primary={'Starred'}/>
              </ListItem>
              <ListItem disablePadding >
                <ListItemIcon sx={{ color: '#fff', minWidth: 0, mr: 3, justifyContent: 'center', }}>
                  <Mail sx={{ fontSize: 20,  }}/>
                </ListItemIcon>
                <ListItemText primary={'Send email'}/>
              </ListItem>
            </AccordionDetails>
          </Accordion>
        </List>
        <Divider />
      </Drawer>

      {/* content */}
      <Box component="main" sx={{ flexGrow: 1, mt: theme.spacing(13) }}>
        <Box p={theme.spacing(2)}>
          {children}
        </Box>
      </Box>
    </Box>
    </>
  );
}
