import {
  Nightlight, Person, PowerSettingsNew, ViewHeadline, WbSunny, Drafts, ExpandLess, ExpandMore, MoveToInbox, Send, StarBorder
} from '@mui/icons-material';
import {
  Avatar, Box, Divider, ListItemText, MenuItem, Switch, Typography, useMediaQuery, useTheme
} from '@mui/material/';
import Collapse from '@mui/material/Collapse';
import MuiList, { ListProps } from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MuiListItemButton, { ListItemButtonProps } from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu, { MenuProps } from '@mui/material/Menu';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import * as React from 'react';

const sidebarMenu = [
  {
    id: 1,
    text: 'Home',
    icon: <Nightlight />,
    path: '/'
  },
  {
    id: 2,
    text: 'Person',
    icon: <Person />,
    path: '/Person'
  },
  {
    id: 3,
    text: 'PowerSettingsNew',
    icon: <PowerSettingsNew />,
    path: '/PowerSettingsNew',
    expan: true,
    expenMenus: [
      'FireBase',
      'SQL',
    ]
  },
  {
    id: 4,
    text: 'ViewHeadline',
    icon: <ViewHeadline />,
    path: '/ViewHeadline'
  },
  {
    id: 5,
    text: 'WbSunny',
    icon: <WbSunny />,
    path: '/WbSunny'
  },
  {
    id: 6,
    text: 'Drafts',
    icon: <Drafts />,
    path: '/Drafts',
    expan: true,
    expenMenus: [
      'React-Router',
      'React-Navigation',
      'React-Native',
    ]
  },
  {
    id: 7,
    text: 'ExpandLess',
    icon: <ExpandLess />,
    path: '/ExpandLess'
  },
  {
    id: 8,
    text: 'ExpandMore',
    icon: <ExpandMore />,
    path: '/ExpandMore'
  },
  {
    id: 9,
    text: 'MoveToInbox',
    icon: <MoveToInbox />,
    path: '/MoveToInbox'
  },
  {
    id: 10,
    text: 'Send',
    icon: <Send />,
    path: '/Send'
  },
  {
    id: 11,
    text: 'StarBorder',
    icon: <StarBorder />,
    path: '/StarBorder'
  },
]

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

const List = styled((props: ListProps) => (
  <MuiList
    component="nav"
    {...props}
  />
))(({ theme }) => ({
  height: '100%',
  '& .MuiCollapse-root': {
    boxShadow: 'inset 0 -20px 50px -20px #111010'
  },
  '& .MuiHeadingLg-root': {
    display: 'none',
  },
  '& .MuiHeadingXs-root': {
    display: 'block',
  },
  ":hover": {
    '& .MuiCollapse-root': {
      display: 'block',
    },
    '& .MuiHeadingLg-root': {
      display: 'block',
    },
    '& .MuiHeadingXs-root': {
      display: 'none',
    },
  },
}));

const ListItemButton = styled((props: ListItemButtonProps) => (
  <MuiListItemButton
    {...props}
  />
))(({ theme }) => ({
  paddingInline: theme.spacing(3.5),
  '& .MuiListItemIcon-root':{
    minWidth: 41,
    color: '#fff',
    '& .MuiSvgIcon-root': {
      fontSize: 15,
    }
  },
  ":hover": {
    background: 'none',
    marginLeft: theme.spacing(0.5),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }
}));

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
        color: '#fff',
        backgroundColor: theme.palette.primary.main,
        '& .MuiSvgIcon-root': {
          color: '#fff'
        },
      },
    },
  },
}));

const activeListCSS = {
  backgroundColor: 'secondary.light',
  borderLeft: 2,
  borderColor: 'primary.main',
  color: 'primary.main',
  '& .MuiListItemIcon-root':{
    color: 'primary.main',
  },
  ":hover": {
    backgroundColor: 'secondary.light',
    marginLeft: 0, 
  }
};

const HeaderOne = ({auth, change, mode}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const openUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeUserMenu = () => {
    setAnchorEl(null);
  };
  return (
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
            aria-label="Device settings"
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
            <MenuItem onClick={change}>
              {mode === true ? (
                <>
                  <WbSunny/>
                  {' '}
                  <Typography>
                    Light
                  </Typography>
                </>
              ) : (
                <>
                <Nightlight/>
                  {' '}
                  <Typography>
                    Dark
                  </Typography>
                </>
              )}
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
  );
};

export default function Laylout({ children, auth, setAuth, mode, change }: any) {
  const router = useRouter();
  const theme = useTheme();
  const xsOnly = useMediaQuery((t: any) => t.breakpoints.only('xs'));
  const [menus, setMenus] = React.useState(sidebarMenu);
  const [openSidebar, setOpenSidebar] = React.useState(true);
  const [openNestedList, setOpenNestedList] = React.useState<object>({});

  const handleNestedList = (expen) => {
    // setOpenNestedList(prevState => ( [...prevState,]));
  };

  const handleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <Box>
      {/* header */}
      <Box position='fixed' top={0} zIndex={1} width='100%'>
        {/* header 1 */}
        <HeaderOne auth={auth} change={change} mode={mode}/>

        {/* header 2 */}
        <Box display='flex'>
          {/* sidebar controller */}
          <Box height={xsOnly ? 50 : 46} minWidth={xsOnly || !openSidebar ? 70 : 300} bgcolor='secondary.main' color={'text.secondary'}>
            {xsOnly || !openSidebar ? (
              <Box height='100%' width='100%' display='flex' alignItems='center' justifyContent='center' bgcolor={'secondary.dark'} borderRight={1} borderColor='grey.800' sx={{ cursor: 'pointer' }} onClick={handleSidebar}>
                <ViewHeadline />
              </Box>
            ) : (
              <Box height='100%' display='flex' alignItems='center' justifyContent='space-between'>
                <Box ml={theme.spacing(1)}>
                  <Typography> Navigation </Typography>
                </Box>
                <Box height='100%' width={80} display='flex' alignItems='center' justifyContent='center' bgcolor={'secondary.dark'} borderRight={1} borderColor='grey.800' borderRadius='0 0 0 10px' sx={{ cursor: 'pointer' }} onClick={handleSidebar}>
                  <ViewHeadline />
                </Box>
              </Box>
            )}
          </Box>

          {/* breadcrumbs */}
          <Box height={50} width='100%' display='flex' alignItems='center' justifyContent='space-between' borderBottom={4} borderColor='grey.800' color='#fff' bgcolor='secondary.dark'>
            <Box ml={theme.spacing(2)} fontSize={20} position='relative' height='100%'>
              <Box display={{ sm: 'block', xs: 'none' }} ml={theme.spacing(2)} height={43} position='absolute' top={7} left={0} borderBottom={4} borderColor='primary.main'>
                Tittle
              </Box>
            </Box>
            <Box mr={theme.spacing(2)} borderLeft={1} borderColor='grey.800' px={theme.spacing(2)}>Home \ Library \ Data</Box>
          </Box>
        </Box>
      </Box>

      <Box mt={14.2}>
        {/* sidebar */}
        <Box 
          display='inline-block'
          position='fixed'
          zIndex={1}
          top={110}
          minWidth={xsOnly ? openSidebar ? '100%' : 0 : openSidebar ? 300 : 70}
          maxWidth={xsOnly ? openSidebar ? '100%' : 0 : openSidebar ? 300 : 70}
          height='calc(100vh - 110px)'
          bgcolor='secondary.main'
          color={'#fff'}
          sx={xsOnly ? {
            overflowY: 'auto'
          } : {
            overflowX: 'hidden',
            overflowY: 'auto',
            ":hover": { minWidth: 300, maxWidth: 300 },
          }}
        >
          <List sx={{minWidth: xsOnly ? '100%' : 300,maxWidth: xsOnly ? '100%' : 300}}>
            {/* heading 1 */}
            <>
              <Box>
                {openSidebar ? (
                  <Box display='block' mx={theme.spacing(2)}>
                    <Typography color={'grey.800'}>Heading 1</Typography>
                    <Divider sx={{ bgcolor: "grey.800", my: theme.spacing(1) }}/>
                  </Box>
                ) : (
                  <>
                    <Box className='MuiHeadingLg-root' display={'none'} mx={theme.spacing(2)}>
                      <Typography color={'grey.800'}>Heading 1</Typography>
                      <Divider sx={{ bgcolor: "grey.800", my: theme.spacing(1) }}/>
                    </Box>
                    <Box className='MuiHeadingXs-root' display='block' ml={theme.spacing(2)} mr={theme.spacing(30.5)}>
                      <Typography color={'grey.800'} textAlign='center'>H 1</Typography>
                      <Divider sx={{ bgcolor: "grey.800", my: theme.spacing(1) }}/>
                    </Box>
                  </>
                )}
              </Box>
              {menus.map((menu, index) => (
                <>
                  <ListItemButton key={index} sx={router.pathname === menu.path ? activeListCSS: null} onClick={menu.expenMenus ? handleNestedList(!menu.expan) : () => router.push(menu.path)}>
                    <ListItemIcon>
                      {menu.icon}
                    </ListItemIcon>
                    <ListItemText primary={menu.text} />
                  </ListItemButton>
                  {menu.expenMenus && (
                    <Collapse sx={!openSidebar && {display: 'none'}} in={menu.expan} timeout="auto" unmountOnExit>
                      <List disablePadding>
                        {menu.expenMenus.map((expenMenu, index) => (
                          <ListItemButton key={index} sx={{ pl: theme.spacing(5) }}>
                            <ListItemIcon>
                              <StarBorder/>
                            </ListItemIcon>
                            <ListItemText primary={expenMenu[index]} />
                          </ListItemButton>
                        ))}
                      </List>
                    </Collapse>
                  )}
                </>
              ))}
            </>
            {/* heading 2 */}
            <>
              <Box>
                {openSidebar ? (
                  <Box display='block' mx={theme.spacing(2)}>
                    <Typography color={'grey.800'}>Heading 2</Typography>
                    <Divider sx={{ bgcolor: "grey.800", my: theme.spacing(1) }}/>
                  </Box>
                ) : (
                  <>
                    <Box className='MuiHeadingLg-root' display={'none'} mx={theme.spacing(2)}>
                      <Typography color={'grey.800'}>Heading 2</Typography>
                      <Divider sx={{ bgcolor: "grey.800", my: theme.spacing(1) }}/>
                    </Box>
                    <Box className='MuiHeadingXs-root' display='block' ml={theme.spacing(2)} mr={theme.spacing(30.5)}>
                      <Typography color={'grey.800'} textAlign='center'>H 2</Typography>
                      <Divider sx={{ bgcolor: "grey.800", my: theme.spacing(1) }}/>
                    </Box>
                  </>
                )}
              </Box>
              <ListItemButton onClick={() =>handleNestedList('list3', true)}>
                <ListItemIcon>
                  <MoveToInbox/>
                </ListItemIcon>
                <ListItemText primary="Inbox" />
                {openNestedList === 'list3' ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse sx={!openSidebar && {display: 'none'}} in={openNestedList === 'list3'} timeout="auto" unmountOnExit>
                <List disablePadding>
                  <ListItemButton sx={{ pl: theme.spacing(5) }}>
                    <ListItemIcon>
                      <StarBorder/>
                    </ListItemIcon>
                    <ListItemText primary="Starred" />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: theme.spacing(5) }}>
                    <ListItemIcon>
                      <StarBorder/>
                    </ListItemIcon>
                    <ListItemText primary="Starred" />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: theme.spacing(5) }}>
                    <ListItemIcon>
                      <StarBorder/>
                    </ListItemIcon>
                    <ListItemText primary="Starred" />
                  </ListItemButton>
                </List>
              </Collapse>
              <ListItemButton>
                <ListItemIcon>
                  <Send/>
                </ListItemIcon>
                <ListItemText primary="Sent mail" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <Drafts />
                </ListItemIcon>
                <ListItemText primary="Drafts" />
              </ListItemButton>
              <ListItemButton onClick={() =>handleNestedList('list4', true)}>
                <ListItemIcon>
                  <MoveToInbox/>
                </ListItemIcon>
                <ListItemText primary="Inbox" />
                {openNestedList === 'list4' ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse sx={!openSidebar && {display: 'none'}} in={openNestedList === 'list4'} timeout="auto" unmountOnExit>
                <List disablePadding>
                  <ListItemButton sx={{ pl: theme.spacing(5) }}>
                    <ListItemIcon>
                      <StarBorder/>
                    </ListItemIcon>
                    <ListItemText primary="Starred" />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: theme.spacing(5) }}>
                    <ListItemIcon>
                      <StarBorder/>
                    </ListItemIcon>
                    <ListItemText primary="Starred" />
                  </ListItemButton>
                  <ListItemButton sx={{ pl: theme.spacing(5) }}>
                    <ListItemIcon>
                      <StarBorder/>
                    </ListItemIcon>
                    <ListItemText primary="Starred" />
                  </ListItemButton>
                </List>
              </Collapse>
            </>
          </List>
        </Box>

        {/* content */}
        <Box ml={xsOnly ? 0 : openSidebar ? '300px' : '70px'} display='inline-block' width={xsOnly ? '100%' : openSidebar ? 'calc(100% - 300px)' : 'calc(100% - 70px)'} >
          <Box m={theme.spacing(1)}>
            { children }
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
