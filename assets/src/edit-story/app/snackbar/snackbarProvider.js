/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

/**
 * Internal dependencies
 */
import Context from './context';
import SnackContainer from './snackbarContainer';

function SnackbarProvider({ children, animationTimeout, position }) {
  const [notifications, setNotifications] = useState([]);

  SnackbarProvider.timeouts = {};
  SnackbarProvider.startTimes = {};

  const remove = (notification) => {
    clearTimeout(SnackbarProvider.timeouts[notification.key]);
    setNotifications((currentNotifications) => {
      return currentNotifications.filter(
        (item) => item.key !== notification.key
      );
    });

    delete SnackbarProvider.timeouts[notification.key];
    delete SnackbarProvider.startTimes[notification.key];
  };

  const removeNotification = (notification) => {
    SnackbarProvider.startTimes[notification.key] = Date.now();
    const timeout = setTimeout(() => {
      remove(notification);
    }, notification.timeout);
    SnackbarProvider.timeouts[notification.key] = timeout;
  };

  const create = (notification) => {
    notification.key = uuidv4();
    if (typeof notification.timeout === 'undefined') {
      notification.timeout = 3000;
    }
    setNotifications([...notifications, notification]);
    removeNotification(notification);
  };

  const state = {
    createSnackbar: create,
  };

  return (
    <Context.Provider value={state}>
      <SnackContainer
        onRemove={remove}
        notifications={notifications}
        animationTimeout={animationTimeout}
        position={position}
      />
      {children}
    </Context.Provider>
  );
}

SnackbarProvider.propTypes = {
  animationTimeout: PropTypes.number,
  position: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

SnackbarProvider.defaultProps = {
  animationTimeout: 250,
  position: 'bottom-left',
};

export default SnackbarProvider;