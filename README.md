# @biznessforce/ui-lib

A React + TypeScript UI component library built on Ant Design, providing reusable components, hooks, and utilities for building business applications.

[![Version](https://img.shields.io/badge/version-0.0.34--beta.2-blue.svg)](https://github.com/biznessforce/@biznessforce/ui-lib)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Ant Design](https://img.shields.io/badge/Ant%20Design-5.14.2-blue.svg)](https://ant.design/)

## 📦 Installation

```bash
npm install @biznessforce/ui-lib
# or
yarn add @biznessforce/ui-lib
```

### Peer Dependencies

Ensure you have the following peer dependencies installed:

```bash
npm install react@^18.0.0 react-dom@^18.0.0 antd@^5.14.2 @ant-design/icons@^5.3.0 axios@^1.6.7 lodash@^4.17.21 react-redux@^9.1.0 react-router-dom@5.3.4 dayjs@^1.11.10
```

## 🚀 Quick Start

```typescript
import { Button, useAPI, Header, formatDate } from '@biznessforce/ui-lib';
import { fetchUsers } from './services/api';

function MyComponent() {
  const { loading, onSubmit } = useAPI(fetchUsers, ({ resp }) => {
    console.log('Users:', resp.data);
  });

  return (
    <Button onClick={onSubmit} loading={loading}>
      Fetch Users
    </Button>
  );
}
```

## 📚 Component Catalog

### Common Components

| Component             | Description                                                    |
| --------------------- | -------------------------------------------------------------- |
| `Button`              | Wrapper around Ant Design Button with extended functionality   |
| `ErrorBoundaries`     | React error boundary for graceful error handling               |
| `FileUploadContainer` | File upload component with drag-and-drop support               |
| `GlobalErrorHandler`  | Global error handling mechanism                                |
| `HasPermission`       | Permission-based conditional rendering                         |
| `EzIdleTimer`         | Idle timeout detection and handling                            |
| `InfoFooter`          | Display creation/modification metadata with user and timestamp |
| `NetworkDetector`     | Network connectivity status detection                          |
| `NoDataContainer`     | Empty state component                                          |
| `PageNotFound`        | 404 page component                                             |
| `ProgressLine`        | Progress indicator component                                   |

### Form Components

```typescript
import {
  FormSectionHeader,
  FormVerColAlign,
  FormHorColAlign,
  FormHorColView,
  FormColField,
} from "@biznessforce/ui-lib";
```

- **FormSectionHeader** - Section headers with customizable actions
- **FormVerColAlign** - Vertical column alignment for form fields
- **FormHorColAlign** - Horizontal column alignment for form fields
- **FormHorColView** - Horizontal view-only field display
- **FormColField** - Generic column field with optional dividers

### Layout Components

```typescript
import {
  Header,
  Footer,
  Sidebar,
  Layout,
  PageLayout,
  Subheader,
} from "@biznessforce/ui-lib";
```

- **Header** - Application header with user dropdown and fullscreen toggle
- **Footer** - Application footer
- **Sidebar** - Navigation sidebar
- **Subheader** - Secondary header component
- **Layout** - Main layout wrapper
- **PageLayout** - Page-level layout component

## 🪝 Custom Hooks

### useAPI

Manage API calls with loading states and error handling:

```typescript
import { useAPI } from "@biznessforce/ui-lib";

const { loading, status, onSubmit, onRefresh } = useAPI(
  apiFunction,
  ({ resp, setStatus }) => {
    // Success callback
    console.log(resp.data);
  },
  (errMsg) => {
    // Error callback
    console.error(errMsg);
  },
  {
    showGlobalLoader: true,
    showGlobalError: true,
    onLoader: ({ isLoading }) => console.log("Loading:", isLoading),
    onThrowError: ({ type, msg }) => console.error(msg),
  },
);
```

### Other Hooks

- **useEzDrawer** - Drawer/modal state management
- **useDeviceQuery** - Responsive device detection
- **useQueryParams** - URL query parameter management
- **SplashScreen** - Splash screen management
- **UserDropdown** - User dropdown menu management

## 🛠️ Utility Functions

```typescript
import {
  formatDate,
  constructErrorMessage,
  toggleFullScreen,
  convertMinstoHrs,
  getFlagEmoji,
  firstLetterCaps,
  uuidv4,
  COUNTRIES,
} from "@biznessforce/ui-lib";
```

### Key Utilities

- **formatDate(date, format)** - Format dates using Day.js
- **constructErrorMessage(error)** - Standardized error message construction
- **toggleFullScreen()** - Cross-browser fullscreen toggle
- **convertMinstoHrs(mins)** - Convert minutes to hours format
- **getFlagEmoji(countryCode)** - Get flag emoji from country code
- **firstLetterCaps(name)** - Capitalize first letter of each word
- **uuidv4()** - Generate UUID v4
- **COUNTRIES** - Complete countries dataset with codes and nationalities

## 📖 Usage Examples

### InfoFooter Component

```typescript
import { InfoFooter } from '@biznessforce/ui-lib';
import dayjs from 'dayjs';

<InfoFooter
  info_1={{
    title: 'Created by',
    userBy: 'John Doe',
    date: dayjs('2024-01-15')
  }}
  info_2={{
    title: 'Modified by',
    userBy: 'Jane Smith',
    date: dayjs('2024-02-10')
  }}
/>
```

### Header Component

```typescript
import { Header } from '@biznessforce/ui-lib';

<Header
  title="Dashboard"
  loggedUserName="John Doe"
  toolSlot={<Button>Action</Button>}
  rightToolSlot={<Button>Settings</Button>}
  dropdownMenu={{
    items: [
      { key: 'profile', label: 'Profile' },
      { key: 'logout', label: 'Logout' }
    ]
  }}
/>
```

### Form Components

```typescript
import { FormSectionHeader, FormVerColAlign } from '@biznessforce/ui-lib';
import { Form, Input } from 'antd';

<Form>
  <FormSectionHeader
    title="User Information"
    rightAction={<Button>Save</Button>}
  />
  <FormVerColAlign
    name="username"
    label="Username"
    formElement={<Input />}
    span={12}
  />
</Form>
```

## 📚 Storybook

This library includes Storybook for interactive component documentation and development.

### Running Storybook Locally

```bash
yarn storybook
# or
npm run storybook
```

Storybook will start on [http://localhost:6006/](http://localhost:6006/)

### Building Storybook

To build a static version of Storybook for deployment:

```bash
yarn build-storybook
# or
npm run build-storybook
```

The static build will be output to `storybook-static/` directory.

### What's in Storybook

- **Interactive Examples**: All components with live controls
- **Documentation**: Usage examples and API documentation
- **Visual Testing**: See components in different states
- **Code Snippets**: Copy-paste ready examples

## 🏗️ Development

### Build the Library

```bash
npm run build
```

### Release New Version

```bash
npm run release  # Bump patch version
npm run push     # Release + Build + Publish
```

### Project Structure

```
@biznessforce:ui-lib/
├── src/
│   ├── common/          # Reusable UI components
│   ├── hooks/           # Custom React hooks
│   ├── layouts/         # Layout components
│   ├── assets/          # Static assets
│   └── index.ts         # Main entry point
├── dist/                # Build output
├── package.json
├── tsconfig.json
└── rollup.config.js
```

## 🎨 Theming

This library uses Ant Design's theming system. Customize the theme in your application:

```typescript
import { ConfigProvider } from 'antd';

<ConfigProvider
  theme={{
    token: {
      colorPrimary: '#1890ff',
      borderRadius: 4,
    },
  }}
>
  <App />
</ConfigProvider>
```

## 📝 TypeScript Support

Full TypeScript support with exported type definitions:

```typescript
import type { HeaderProps, InfoFooterProps } from "@biznessforce/ui-lib";
```

## 🤝 Contributing

This is a private package for Biznessforce projects. For internal contributions:

1. Create a feature branch
2. Make your changes
3. Update CHANGELOG.md
4. Submit a pull request

## 📄 License

Private - Biznessforce Internal Use Only

## 🔗 Links

- [Ant Design Documentation](https://ant.design/)
- [React Documentation](https://reactjs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

---

**Version**: 0.0.34-beta.2  
**Author**: @ikismail  
**Registry**: GitHub Packages
