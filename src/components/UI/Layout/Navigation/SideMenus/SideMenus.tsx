import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText, List } from '@material-ui/core';
import clsx from 'clsx';

import ListIcon from '../../../ListIcon/ListIcon';
import styles from './SideMenus.module.css';
import { getUserRole, setUserRole, getRoleBasedAccess } from '../../../../../context/role';
import { GET_CURRENT_USER } from '../../../../../graphql/queries/User';
import { useLazyQuery } from '@apollo/client';

export interface SideMenusProps {
  opened: boolean;
}

const SideMenus: React.SFC<SideMenusProps> = (props) => {
  const location = useLocation();

  // This may not be the best way to implement this functionality (especially if the endpoints change in the URL),
  // but I couldn't find a better way to do this atm.
  const getCurrMenuItem = () => {
    let currUrl = window.location.pathname;
    let pathName = currUrl.split('/')[1]; // Gets the first part of the pathname.
    return '/'.concat(pathName);
  };

  // get the information on current user
  const [getCurrentUser, { data: userData }] = useLazyQuery(GET_CURRENT_USER);

  if (userData) setUserRole(userData.currentUser.user.roles);

  const role: any = getUserRole() ? getUserRole() : [];

  useEffect(() => {
    if (role.length === 0) getCurrentUser();
  }, []);

  const menu: any[] = getRoleBasedAccess() ? getRoleBasedAccess() : [];

  const menuList = menu.map((menu, i) => {
    let isSelected = location.pathname.startsWith(menu.path);
    return (
      <ListItem
        button
        disableRipple={true}
        selected={isSelected}
        className={clsx({
          [styles.OpenItem]: props.opened,
          [styles.ClosedItem]: !props.opened,
        })}
        classes={{
          root: styles.IconItem,
          selected: styles.SelectedItem,
        }}
        key={menu.icon}
        component={NavLink}
        to={menu.path}
      >
        <ListItemIcon className={styles.ListItemIcon}>
          <ListIcon icon={menu.icon} />
        </ListItemIcon>
        {props.opened ? (
          <ListItemText
            disableTypography
            className={clsx(styles.Text, {
              [styles.SelectedText]: isSelected,
              [styles.UnselectedText]: !isSelected,
            })}
            primary={menu.title}
          />
        ) : null}
      </ListItem>
    );
  });

  return <List className={styles.List}>{menuList}</List>;
};

export default SideMenus;
