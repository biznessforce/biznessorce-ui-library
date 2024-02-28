/**
 * To Check the element has given permission
 * @param permissions [] of user permission
 * @param userRoles [] to check permission
 */
const hasPermissions = (
  permissions: string[],
  userRoles: string[],
  SUPER_ADMIN: string | null = null
) => {
  const result = false;
  if (!userRoles || !permissions) return result;
  if (userRoles.length === 0 || permissions.length === 0) return result;

  if (
    SUPER_ADMIN &&
    (permissions.includes(SUPER_ADMIN) || userRoles.includes(SUPER_ADMIN))
  )
    return true;

  let value;

  if (permissions.length > userRoles.length) {
    value = permissions.some((r) => userRoles.includes(r));
  } else {
    value = userRoles.some((r) => permissions.includes(r));
  }
  // if (from !== 'helper') console.log({ permissions, userRoles, value, from });
  return value;
};

export default hasPermissions;
