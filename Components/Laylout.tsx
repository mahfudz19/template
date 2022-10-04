import * as React from 'react';
import {
  Nightlight, Person, PowerSettingsNew, ViewHeadline, WbSunny, Drafts, ExpandLess, ExpandMore, MoveToInbox, Send, StarBorder, NavigateNext, Home
} from '@mui/icons-material';
import {
  Avatar, Box, Divider, ListItemText, MenuItem, Switch, Typography, useMediaQuery, useTheme, Breadcrumbs as MuiBreadcrumbs, Link as MuiLink 
} from '@mui/material/';
import Collapse from '@mui/material/Collapse';
import MuiList, { ListProps } from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MuiListItemButton, { ListItemButtonProps } from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu, { MenuProps } from '@mui/material/Menu';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import Link from 'next/link';


const sidebarMenu = [
  {
    id: 1,
    text: 'Home',
    icon: <Home />,
    path: '/'
  },
  {
    id: 3,
    text: 'Create',
    icon: <Person />,
    path: '/create'
  },
  {
    id: 4,
    text: 'Update',
    icon: <PowerSettingsNew />,
    path: '/update',
  },
  {
    id: 5,
    text: 'Delete',
    icon: <ViewHeadline />,
    path: '/delete'
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

const HeaderOne = ({auth, change, mode}: any) => {
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
        noWrap
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

const Breadcrumbs = () => {
  const { pathname } = useRouter();
  const pathnames = pathname.split('/').filter(x => x);
  return (
    <MuiBreadcrumbs
      maxItems={3}
      separator={<NavigateNext fontSize="small" />}
      aria-label="breadcrumb"
      sx={{ '& .MuiBreadcrumbs-ol': { flexWrap: 'nowrap', width: '100%', overflow: 'auto' } }}
    >
      <Link href='/'>
        <MuiLink noWrap underline="hover" color="white" sx={{ cursor: 'pointer' }}>Mahfudz Masyhur</MuiLink>
      </Link>
      <Link href='/'>
        <MuiLink noWrap underline="hover" color="white" sx={{ cursor: 'pointer' }}>Mahfudz Masyhur</MuiLink>
      </Link>
      <Link href='/'>
        <MuiLink noWrap underline="hover" color="white" sx={{ cursor: 'pointer' }}>Mahfudz Masyhur</MuiLink>
      </Link>
      <Link href='/'>
        <MuiLink noWrap underline="hover" color="white" sx={{ cursor: 'pointer' }}>Mahfudz Masyhur</MuiLink>
      </Link>
      <Link href='/'>
        <MuiLink noWrap underline="hover" color="white" sx={{ cursor: 'pointer' }}>Mahfudz Masyhur</MuiLink>
      </Link>
      <Link href='/'>
        <MuiLink noWrap underline="hover" color="white" sx={{ cursor: 'pointer' }}>Mahfudz Masyhur</MuiLink>
      </Link>
      {/* {pathnames.map((path, index) => {
        const routerTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const lastOne = index === pathnames.length - 1;
        return lastOne ? (
          <Typography color="white">
            <strong>
              {path}
            </strong>
          </Typography>
        ) : (
          <Link key={path} href={routerTo}>
            <MuiLink key={path} underline="hover" color="white" sx={{ cursor: 'pointer' }}>
              {path}
            </MuiLink>
          </Link>
        )}
      )} */}
    </MuiBreadcrumbs>
  );
};

export default function Laylout({ children, auth, setAuth, mode, change }: any) {
  const router = useRouter();
  const theme = useTheme();
  const xsOnly = useMediaQuery((t: any) => t.breakpoints.only('xs'));
  const [menus] = React.useState(sidebarMenu);
  const [openSidebar, setOpenSidebar] = React.useState(false);
  const [openNest, setOpenNest] = React.useState({id: '', open: false});
  const [title, setTitle] = React.useState<string>();

  React.useEffect(() => {
    setTitle(document.title);
  }, [title])
  const handleNestList = (id: string) => {
    setOpenNest({id, open: !openNest});
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
          <Box height={50} width='100%' display='flex' alignItems='center' justifyContent='flex-end' borderBottom={4} borderColor='grey.800' color='#fff' bgcolor='secondary.dark'>
            {/* Title */}
            <Box display={{ sm: 'block', xs: 'none' }} ml={theme.spacing(2)} fontSize={20} position='relative' flexGrow={1} height='50%'>
              <Box whiteSpace='nowrap' ml={theme.spacing(2)} height={43} position='absolute' top={-5} left={0} borderBottom={4} borderColor='primary.main'>
                {title}
              </Box>
            </Box>
            
            {/* breadcrumbs */}
            <Box role="presentation" mr={theme.spacing(2)} borderLeft={1} borderColor='grey.800' px={theme.spacing(2)} sx={xsOnly && {width: '100%'}} bgcolor='#d0d' overflow='auto'>
              <Breadcrumbs />
            </Box>
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
          <List sx={{minWidth: xsOnly ? '100%' : 300, maxWidth: xsOnly ? '100%' : 300}}>
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
                  <ListItemButton
                    key={index}
                    sx={router.pathname === menu.path ? activeListCSS : null}
                    onClick={() => router.push(menu.path)}
                  >
                    <ListItemIcon>
                      {menu.icon}
                    </ListItemIcon>
                    <ListItemText primary={menu.text} />
                  </ListItemButton>
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
              <ListItemButton
                sx={router.pathname === '/nest' || router.pathname === '/nest/nest1' || router.pathname === '/nest/nest2'  ? activeListCSS : null}
                onClick={() => handleNestList('nest')}
              >
                <ListItemIcon>
                  <MoveToInbox />
                </ListItemIcon>
                <ListItemText primary="Nest" />
                {openNest.id ===  'nest' && openNest.open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse
                sx={{ display: !openSidebar ? 'none' : 'block' }}
                in={openNest.id ===  'nest' || router.pathname === '/nest' || router.pathname === '/nest/nest1' || router.pathname === '/nest/nest2'}
                timeout="auto"
                unmountOnExit
              >
                <List disablePadding>
                  <ListItemButton
                    sx={router.pathname === '/nest' ? {...activeListCSS, pl: 5}: {pl: 5}}
                    onClick={() => router.push('/nest')}
                  >
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Nest Index" />
                  </ListItemButton>
                  <ListItemButton
                    sx={router.pathname === '/nest/nest1' ? {...activeListCSS, pl: 5}: {pl: 5}}
                    onClick={() => router.push('/nest/nest1')}
                  >
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Nest 1" />
                  </ListItemButton>
                  <ListItemButton
                    sx={router.pathname === '/nest/nest2' ? {...activeListCSS, pl: 5} : {pl: 5}}
                    onClick={() => router.push('/nest/nest2')}
                  >
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Nest 2" />
                  </ListItemButton>
                </List>
              </Collapse>
              <ListItemButton
                sx={router.pathname === '/sendEmail' ? activeListCSS : null}
                onClick={() => router.push('sendEmail')}
              >
                <ListItemIcon>
                  <Send />
                </ListItemIcon>
                <ListItemText primary="Sent mail" />
              </ListItemButton>
              <ListItemButton
                sx={router.pathname === '/drafts' ? activeListCSS : null}
                onClick={() => router.push('drafts')}
              >
                <ListItemIcon>
                  <Drafts />
                </ListItemIcon>
                <ListItemText primary="Drafts" />
              </ListItemButton>
              <ListItemButton
                sx={router.pathname === '/starBorder' || router.pathname === '/starBorder/starBorder1' || router.pathname === '/starBorder/starBorder2'  ? activeListCSS : null}
                onClick={() => handleNestList('starBorder')}
              >
                <ListItemIcon>
                  <MoveToInbox />
                </ListItemIcon>
                <ListItemText primary="Star Border" />
                {openNest.id ===  'starBorder' && openNest.open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse
                sx={{ display: !openSidebar ? 'none' : 'block' }}
                in={openNest.id ===  'starBorder' || router.pathname === '/starBorder' || router.pathname === '/starBorder/starBorder1' || router.pathname === '/starBorder/starBorder2'}
                timeout="auto" unmountOnExit
              >
                <List disablePadding>
                  <ListItemButton
                    sx={router.pathname === '/starBorder' ? {...activeListCSS, pl: 5}: {pl: 5}}
                    onClick={() => router.push('/starBorder')}
                  >
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Star Border Index" />
                  </ListItemButton>
                  <ListItemButton
                    sx={router.pathname === '/starBorder/starBorder1' ? {...activeListCSS, pl: 5}: {pl: 5}}
                    onClick={() => router.push('/starBorder/starBorder1')}
                  >
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Star Border 1" />
                  </ListItemButton>
                  <ListItemButton
                    sx={router.pathname === '/starBorder/starBorder2' ? {...activeListCSS, pl: 5} : {pl: 5}}
                    onClick={() => router.push('/starBorder/starBorder2')}
                  >
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Star Border 2" />
                  </ListItemButton>
                </List>
              </Collapse>
              <ListItemButton
                sx={router.pathname === '/other' || router.pathname === '/other/other1' || router.pathname === '/other/other2'  ? activeListCSS : null}
                onClick={() => handleNestList('other')}
              >
                <ListItemIcon>
                  <MoveToInbox />
                </ListItemIcon>
                <ListItemText primary="Other" />
                {openNest.id ===  'other' && openNest.open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse
                sx={{ display: !openSidebar ? 'none' : 'block' }}
                in={openNest.id ===  'other' || router.pathname === '/other' || router.pathname === '/other/other1' || router.pathname === '/other/other2'}
                timeout="auto"
                unmountOnExit
              >
                <List disablePadding>
                  <ListItemButton
                    sx={router.pathname === '/other' ? {...activeListCSS, pl: 5}: {pl: 5}}
                    onClick={() => router.push('/other')}
                  >
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Other Index" />
                  </ListItemButton>
                  <ListItemButton
                    sx={router.pathname === '/other/other1' ? {...activeListCSS, pl: 5}: {pl: 5}}
                    onClick={() => router.push('/other/other1')}
                  >
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Other 1" />
                  </ListItemButton>
                  <ListItemButton
                    sx={router.pathname === '/other/other2' ? {...activeListCSS, pl: 5} : {pl: 5}}
                    onClick={() => router.push('/other/other2')}
                  >
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Other 2" />
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
