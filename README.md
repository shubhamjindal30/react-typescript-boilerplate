# React TypeScript Boilerplate
A boilerplate built with [React.js](https://reactjs.org), [Redux](https://redux.js.org), [Material UI](https://material-ui.com), [Firebase](https://firebase.google.com) and [TypeScript](https://www.typescriptlang.org) to help you start developing web applications.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation and Setup Instructions
The instructions below will help you run a copy of this project on your machine.

### Project Dependencies
In order to run this project, you will need the following dependencies installed on your machine:
- [Node.js](https://nodejs.org)
- [Yarn](https://yarnpkg.com)

### Installation
You can install the packages required by the application using:
```shell script
yarn install
``` 

### Environment Setup
Create a .env file using the example file provided using:
```shell script
cp .env.example .env
```
After this, update the Firebase config variables in the .env file created.

### Test Suite
The unit tests can be found in the respective `__test__` directories within the project.

To run the test suite, you can use the following command:
```shell script
yarn test
```
This will launch the test runner in an interactive watch mode.

To check the code coverage, you can run:
```shell script
yarn test:coverage
```

### Development Server
To run the application in development mode, you can simply use:
```shell script
yarn start
```
You can open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits. \
You will also see any lint errors in the console.

### Production Build
To create a production build for the application, you can run:
```shell script
yarn build
```
The build will be created in the ```build``` folder.
It will correctly bundle the React application and optimize the build for the best performance.

After this, the application will be ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Authors
- **[Shubham Jindal](https://github.com/shubhamjindal30)**

