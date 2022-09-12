import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import {
  Avatar, Box, Toolbar, Typography, Switch, Button, Divider,
  List, ListItem, ListItemText, MenuItem, useTheme,
} from '@mui/material';
import Menu, { MenuProps } from '@mui/material/Menu';
import { Nightlight, WbSunny, Logout, Person, PowerSettingsNew } from '@mui/icons-material';

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

export default function MenuAppBar({ mode, change, auth, setAuth }: {mode: boolean, auth: boolean, setAuth: any, change: any}) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number,
  ) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box position='fixed' top={0} width='100%'>
      <Toolbar>
        <Typography
          textTransform='uppercase'
          color={theme.palette.mode === 'light' ? 'primary.dark' : 'primary.light'}
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          name with style
        </Typography>
        <Divider orientation="vertical" flexItem sx={{ mx: 2, my: 'auto', height: 60 }} />
        {auth ? (
          <div>
            <List
              component="nav"
              aria-label="Device settings"
              sx={{ p: 0 }}
            >
              <ListItem
                button
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClickListItem}
              >
                <Avatar style={{marginRight: theme.spacing(1)}} {...stringAvatar('John Doe Junior')} />
                <ListItemText
                  primary={'John Doe Junior'}
                  secondary="admin"
                />
              </ListItem>
            </List>
            <StyledMenu
              id="lock-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'lock-button',
                role: 'listbox',
              }}
            >
              <ListItem onClick={handleClose} sx={{ p: theme.spacing(1) }}>
                <Avatar style={{marginRight: theme.spacing(1)}} {...stringAvatar('John Doe Junior')} />
                <ListItemText
                  primary={'John Doe Junior'}
                  secondary="admin"
                />
              </ListItem>
              <Divider sx={{ mb: theme.spacing(1) }}/>
              <MenuItem onClick={handleClose}>
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
              <MenuItem onClick={handleClose}>
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
      </Toolbar>
    </Box>
  );
}
