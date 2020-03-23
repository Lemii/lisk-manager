//@ts-nocheck

/* To-do: port to TS */

export const askNotificationPermission = () => {
  const handlePermission = permission => {
    if (!('permission' in Notification)) {
      Notification.permission = permission;
    }
  };

  if (!('Notification' in window)) {
    console.log('This browser does not support notifications.');
  } else {
    if (checkNotificationPromise()) {
      Notification.requestPermission().then(permission => {
        handlePermission(permission);
      });
    } else {
      Notification.requestPermission(function(permission) {
        handlePermission(permission);
      });
    }
  }
};

const checkNotificationPromise = () => {
  try {
    Notification.requestPermission().then();
  } catch (e) {
    return false;
  }

  return true;
};
