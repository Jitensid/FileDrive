import React from 'react';
import { Menu, MenuItem } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';

function LogoutMenu() {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleLogout = () => {
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
		handleClose();
		window.location.reload();
	};

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<React.Fragment>
			<IconButton color='inherit' onClick={handleClick}>
				<AccountCircleIcon />
			</IconButton>

			<Menu
				id='simple-menu'
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}>
				<MenuItem onClick={handleLogout}>Logout</MenuItem>
			</Menu>
		</React.Fragment>
	);
}

export default LogoutMenu;
