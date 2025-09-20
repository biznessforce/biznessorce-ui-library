# @biznessforce/ui-lib

Biznessforce’s shared React UI library built on Ant Design v5. It provides reusable UI components, layout primitives, hooks, and utilities used across Biznessforce web apps.

## Table of Contents

- [Installation](#installation)
- [Peer dependencies](#peer-dependencies)
- [Quick start](#quick-start)
- [Components](#components)
- [Layouts](#layouts)
- [Hooks](#hooks)
- [Utilities](#utilities)
- [Development](#development)
- [Build](#build)
- [Release and publish](#release-and-publish)
- [FAQ](#faq)

## Installation

Install from GitHub Packages registry.

1) Configure your project’s `.npmrc` to point `@biznessforce` scope to GitHub Packages (and authenticate):

```ini
@biznessforce:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

2) Install the package and required peers in your app:

```bash
npm i @biznessforce/ui-lib react react-dom antd axios dayjs lodash react-router-dom react-redux
# or
yarn add @biznessforce/ui-lib react react-dom antd axios dayjs lodash react-router-dom react-redux
```

## Peer dependencies

This library expects the following packages to be present in the host app (see `package.json` peerDependencies):

- react ^18.3.1
- react-dom ^18.3.1
- antd ^5.27.3
- @ant-design/icons ^6.0.1
- axios ^1.11.0
- dayjs ^1.11.18
- lodash ^4.17.21
- react-redux ^9.2.0
- react-router-dom ^6.30.1

Note: React 18 is required. Ensure `react` and `react-dom` versions match 18.x to avoid peer warnings.

## Quick start

Import what you need from the library’s root entry `src/index.ts`, which re-exports `common`, `layouts`, and `hooks`:

```jsx
import React from 'react';
import {
  Button,
  GlobalErrorHandler,
  NetworkDetector,
  PageNotFound,
  NoDataContainer,
} from '@biznessforce/ui-lib';

function App() {
  return (
    <NetworkDetector>
      <GlobalErrorHandler
        globalError={{ type: 'success', msg: '' }}
        updateGlobalError={() => {}}
      >
        <Button type="primary">Click Me</Button>
      </GlobalErrorHandler>
    </NetworkDetector>
  );
}
```

## Components

All component exports live under `src/common/` and are re-exported by `src/common/index.ts`.

- **Button** (`common/Button/Button.tsx`)
  - A light wrapper around AntD `Button` with the same `ButtonProps`.
  - Usage:
    ```tsx
    import { Button } from '@biznessforce/ui-lib';

    <Button type="primary" loading={isLoading}>Save</Button>
    ```

- **ErrorBoundaries** (`common/ErrorBoundary/ErrorBoundaries.tsx`)
  - React Error Boundary that shows a full-screen fallback.
  - Usage:
    ```tsx
    import { ErrorBoundaries } from '@biznessforce/ui-lib';

    <ErrorBoundaries>
      <YourChildren />
    </ErrorBoundaries>
    ```

- **EzIdleTimer** (`common/IdeTimer/EzIdleTimer.tsx`)
  - Session idle timeout modal built on `react-idle-timer`.
  - Props: `{ defaultTimeout: number; enabled: boolean; onLogout: () => void }`
  - Usage:
    ```tsx
    import { EzIdleTimer } from '@biznessforce/ui-lib';

    <EzIdleTimer defaultTimeout={60} enabled onLogout={() => signOut()} />
    ```

- **NetworkDetector** (`common/NetworkDetector/NetworkDetector.tsx`)
  - Displays a banner when offline/online state changes.
  - Usage:
    ```tsx
    import { NetworkDetector } from '@biznessforce/ui-lib';

    <NetworkDetector>
      <AppRoutes />
    </NetworkDetector>
    ```

- **GlobalErrorHandler** (`common/GlobalErrorHandler/GlobalErrorHandler.tsx`)
  - Top-of-screen alert banner for global errors/success.
  - Props: `{ children, globalError: { type: 'success'|'danger'; msg: string }, updateGlobalError: (v: undefined) => void }`
  - Usage:
    ```tsx
    import { GlobalErrorHandler } from '@biznessforce/ui-lib';

    <GlobalErrorHandler
      globalError={{ type: 'danger', msg: 'Something failed' }}
      updateGlobalError={() => {/* clear state */}}
    >
      <App />
    </GlobalErrorHandler>
    ```

- **NoDataContainer** (`common/NoDataContainer/NoDataContainer.tsx`)
  - Reusable empty/error/loading states.
  - Type: one of `"loading" | "error" | "nodata" | "select" | "dev"`
  - Usage:
    ```tsx
    import NoDataContainer, { NO_DATA_CONTAINER_MESSAGES } from '@biznessforce/ui-lib';

    <NoDataContainer type={NO_DATA_CONTAINER_MESSAGES.NO_DATA.key} />
    ```

- **PageNotFound** (`common/PageNotFound/PageNotFound.tsx`)
  - 404 page built on AntD `Result`.
  - Props: `{ onBackClick: () => void }`

- **ProgressLine** (`common/ProgressLine/ProgressLine.tsx`)
  - Simple horizontal progress composed of visual parts.
  - Props: `{ visualParts: { percentage: string; color: string }[], classes?, styles? }`

- **InfoFooter** (`common/InfoFooter/InfoFooter.tsx`)
  - Shows audit info like created/updated by and timestamps.
  - Props: `{ info_1: { title, date: Dayjs|null, userBy }, info_2? }`

- **FileUploadContainer** (`common/FileUploadContainer/FileUploadContainer.tsx`)
  - Modal with drag/drop CSV (or configurable) file upload with validation.
  - Props include:
    - `title`, `visible`, `isLoading`,
    - `error: { type: 'success'|'error'; msg: string }`,
    - `onCloseHandle()`, `onSubmitHandle(file: File)`,
    - `accept?`, `validTypes?`, `children?`
  - Usage:
    ```tsx
    import { FileUploadContainer } from '@biznessforce/ui-lib';

    <FileUploadContainer
      title="Import"
      visible={show}
      isLoading={loading}
      error={{ type: 'error', msg: errorMsg }}
      onCloseHandle={() => setShow(false)}
      onSubmitHandle={(file) => upload(file)}
    />
    ```

- **HasPermissions** (`common/HasPermission/HasPermission.tsx`)
  - Conditional render based on user roles/permissions.
  - Props: `{ permissions: string[]; userRoles: string[]; SUPER_ADMIN: string; fallback: React.ReactNode }`

- **FormComponents** (`common/FormComponents/`)
  - Re-exports helper components: `FormColField`, `FormHorColAlign`, `FormHorColView`, `FormVerColAlign`, `FormSectionHeader`.

- **data** (`common/data/index.ts`)
  - Large list of `COUNTRIES` export for selects, etc.

## Layouts

Re-exports in `src/layouts/components/index.ts`.

- **Sidebar** (`layouts/components/Sidebar.tsx`)
  - Props `SidebarProps`:
    - `menus: { [key: string]: { key, label, icon, title, permission: boolean|string[], children } }`
    - `authorities: string[]`
    - `SUPER_ADMIN: string|null`
    - `logoBgColor?: string`
    - `logo?: string`
  - Uses `hasPermissions` to filter visible menu items and `react-router-dom` navigation.

- **Header** (`layouts/components/Header.tsx`)
  - Props `HeaderProps`: `{ title, toolSlot, rightToolSlot, loggedUserName, dropdownMenu }`
  - Includes fullscreen toggle via `toggleFullScreen` util.

- **Subheader** (`layouts/components/Subheader.tsx`)
  - Props `SubheaderProps`: `{ leftSlot?, rightSlot?, bgColor? }`

- **Footer** (`layouts/components/Footer.tsx`)
  - Props `FooterProps`: `{ version: string; buildStamp: Date; rightTools?: {link,label}[] }`
  - Uses `formatDate` util.

- **Layout** (`layouts/components/Layout.tsx`)
  - Wraps `Sidebar` and renders `children`.
  - Props: `{ sidebarProps: SidebarProps; children }`

- **PageLayout** (`layouts/components/PageLayout.tsx`)
  - Page shell: `Header` + optional `Subheader` + content area + `Footer`.
  - Props: `{ headerProps, footerProps, subheaderProps: SubheaderProps & { showSubheader: boolean }, bgColor? }`

Example combining providers and layout:

```tsx
import React from 'react';
import {
  EzDrawer,
  EzDrawerProvider,
  Header,
  Footer,
  PageLayout,
  Sidebar,
  UserDropdownProvider,
} from '@biznessforce/ui-lib';

export function Root() {
  return (
    <EzDrawerProvider>
      <UserDropdownProvider
        account={{ fullName: 'Jane', accountId: 'acc-1' }}
        disableChangePassword={false}
        changePasswordAPI={() => Promise.resolve({} as any)}
      >
        <Sidebar menus={{}} authorities={[]} SUPER_ADMIN={null} />
        <PageLayout
          headerProps={{
            title: 'Dashboard',
            toolSlot: null,
            rightToolSlot: <EzDrawer />, // Example
            loggedUserName: 'Jane',
            dropdownMenu: { items: [] },
          }}
          subheaderProps={{ showSubheader: false }}
          footerProps={{ version: '0.0.0', buildStamp: new Date() }}
        >
          <div />
        </PageLayout>
      </UserDropdownProvider>
    </EzDrawerProvider>
  );
}
```

## Hooks

All hooks are re-exported from `src/hooks/index.ts`.

- **useAPI** (`hooks/useAPI/useAPI.ts`)
  - Generic API-call lifecycle hook.
  - Signature:
    ```ts
    useAPI(
      APICall: (...props: any[]) => AxiosPromise,
      callback?: ({ resp, setStatus }: { resp: AxiosResponse; setStatus: any }) => void,
      errCallback?: (errMsg: string) => void,
      config?: {
        showGlobalLoader: boolean;
        showGlobalError: boolean;
        onLoader?: ({ isLoading }: { isLoading: boolean }) => void;
        onThrowError?: ({ type, msg }: { type: string; msg: string }) => void;
      }
    )
    ```
  - Returns: `{ loading, status, setStatus, submitted, submitting, onRefresh, onSubmit }`.

- **Drawer system** (`hooks/Drawer/`)
  - `EzDrawerProvider` context provider
  - `EzDrawer` component that renders the `antd` Drawer with close button
  - `useEzDrawer()` hook exposing `{ openDrawer, closeDrawer, openDispatchDrawer, visible, drawerContent, drawerProps }`
  - Example:
    ```tsx
    import { EzDrawerProvider, EzDrawer, useEzDrawer } from '@biznessforce/ui-lib';

    function OpenBtn() {
      const { openDrawer } = useEzDrawer();
      return (
        <button onClick={() => openDrawer(<div>Hi</div>, { placement: 'right' })}>
          Open Drawer
        </button>
      );
    }

    <EzDrawerProvider>
      <OpenBtn />
      <EzDrawer />
    </EzDrawerProvider>
    ```

- **SplashScreen** (`hooks/SplashScreen/`)
  - `SplashScreenProvider` manipulates a DOM element with id `splash-screen`.
  - `SplashScreen` component increments/decrements internal counter via context based on `visible`.

- **useDeviceQuery** (`hooks/useDeviceQuery/`)
  - Media-query helpers returning booleans like `isMobileScreen`, `isTabletPortrait`, etc.

- **useQueryParams** (`hooks/useQueryParams/useQueryParams.ts`)
  - Returns `URLSearchParams` from `react-router-dom` `useLocation()`.

- **UserDropdownProvider** (`hooks/UserDropdown/UserDropdownProvider.tsx`)
  - Context for header user dropdown, houses a change-password modal via AntD `Modal` and `Form`.
  - Props: `{ children, account: { fullName, accountId }, disableChangePassword, changePasswordAPI }`

## Utilities

Exported from `common/Utils/index.ts` and `common/index.ts`:

- **hasPermissions** (`common/Utils/PermissionHelper.tsx`): checks role arrays considering `SUPER_ADMIN`.
- **formatDate** (`common/Utils/utils.tsx`): `Dayjs|Date|string -> string`, uses `dayjs`.
- **toggleFullScreen** (`common/Utils/utils.tsx`): toggles browser fullscreen mode.
- Additional helpers: `removeEmptyProps`, `firstLettersPipe`, `firstLetterCaps`, `getFlagEmoji`, `convertMinstoHrs`, `dataURItoBlob`, `uuidv4`, `RateRuleValidator`, `getGreetingTime`, `getIcon`.
- Data: `COUNTRIES` (`common/data/index.ts`).

Import examples:

```ts
import { hasPermissions, formatDate, toggleFullScreen } from '@biznessforce/ui-lib';
```

## Development

Prerequisites:

- Node.js 18+
- Yarn or npm

Install dependencies:

```bash
yarn
# or
npm i
```

Run type build (Rollup is used for bundling library builds):

```bash
yarn build
# or
npm run build
```

Build outputs:

- JS bundle: `dist/cjs/index.js` (format set to `esm` in `rollup.config.js` output)
- Type declarations: `dist/index.d.ts` (generated via `rollup-plugin-dts` from `dist/cjs/types/...`)

Configuration highlights:

- Entry: `src/index.ts` re-exports `common`, `layouts`, `hooks`.
- Rollup plugins: TypeScript, peerDepsExternal, image, sourcemaps, commonjs, resolve, terser, and `rollup-plugin-dts` for typings.
- `tsconfig.json` emits declarations only for library authoring (`emitDeclarationOnly: true`).

## Release and publish

We use `standard-version` for versioning and changelog, and publish to GitHub Packages.

1) Bump version and create tag:

```bash
yarn release
# or
npm run release
```

2) Build and publish:

```bash
yarn push
# or
npm run push
```

`push` runs `release`, `build`, then `npm publish` to `https://npm.pkg.github.com/` (see `publishConfig.registry`).

## FAQ

- **Why do I see peer dependency warnings for React/AntD?**
  Ensure your app installs React 18 (`react@^18.3.1`, `react-dom@^18.3.1`) and `antd@^5.27.3` to match this library’s peers.

- **How do I use the drawer system?**
  Wrap your app (or a high-level tree) with `EzDrawerProvider`, render one `EzDrawer` at the root, and call `openDrawer()` via `useEzDrawer()`.

- **Does the splash screen do anything by itself?**
  It toggles a DOM element with id `splash-screen`. Provide that element in your host `index.html` and manage visibility using the `SplashScreen` component.

- **Tree-shaking and ESM/CJS?**
  The bundle is emitted as ESM from Rollup; consumers using modern bundlers will benefit from tree-shaking.

---

Happy building! If you need additional examples or run into issues, please open an issue or PR.
