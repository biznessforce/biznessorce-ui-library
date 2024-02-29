import React, { Fragment } from "react";
import { hasPermissions } from "../Utils";

type HasPermissionProps = {
  permissions: string[];
  userRoles: string[];
  SUPER_ADMIN: string;
  fallback: React.ReactNode;
};

function HasPermission({
  children,
  permissions,
  userRoles,
  SUPER_ADMIN,
  fallback,
}: React.PropsWithChildren<HasPermissionProps>) {
  return (
    <Fragment>
      {permissions.length > 0 &&
      hasPermissions(permissions, userRoles, SUPER_ADMIN) ? (
        <>{children}</>
      ) : (
        <>{fallback}</>
      )}
    </Fragment>
  );
}

export default HasPermission;
