# @biznessforce/ui-lib

This library contains common UI components built with React and Ant Design for Biznessforce applications. It provides a set of reusable components that can be utilized across different projects and applications.

## Installation

To install the library, use npm or yarn:

```bash
npm install @biznessforce/ui-lib
# or
yarn add @biznessforce/ui-lib
```

## Usage

Import components from the library:

```jsx
import { Button } from '@biznessforce/ui-lib';

function App() {
  return (
    <Button>Click Me</Button>
  );
}
```

## Available Components

- Button: Enhanced Ant Design button component
- ErrorBoundary: Component for handling React errors gracefully
- FileUploadContainer: Component for file uploads
- And more...

## Development

### Prerequisites

- Node.js
- Yarn or npm

### Building the Library

To build the library:

```bash
yarn build
# or
npm run build
```

This uses Rollup to bundle the components and generates output in the `dist` directory.

### Releasing a New Version

The project uses `standard-version` for versioning. To release a new version:

```bash
yarn release
# or
npm run release
```

This will:
1. Bump the version in package.json
2. Update the CHANGELOG.md file
3. Commit these changes
4. Create a new git tag

To push the changes and publish the package:

```bash
yarn push
# or
npm run push
```

Alternatively, you can run:

```bash
git push --follow-tags origin main && npm publish
```

## Dependencies

This library uses the following peer dependencies:
- React
- Ant Design
- React Router DOM
- And others as specified in package.json

Make sure to install these dependencies in your project.
