# Template bottom tabs with auth flow (Typescript, Tailwind)

This is a TypeScript starter template for React Native applications utilizing React Navigation Bottom Tabs and Firebase authentication using React Context.

## Purpose

The purpose of this boilerplate is to provide a solid foundation for building React Native applications that require user authentication with Firebase and navigation using bottom tabs. It includes prebuilt UI screens for authentication (login, register, forget password) along with Firebase authentication functions, eliminating the need to create them from scratch. Additionally, it sets up React Context for managing authentication state and provides a clear structure for file management.

## Installation

1. **Install Node.js:** Ensure you have Node.js installed on your system.
2. **Install Expo CLI:** Install Expo CLI globally using npm.
    ```bash
    npm install --global expo-cli
    ```

3. **Download Repository:** Download or clone this repository to your local machine.
4. **Install Dependencies:** Navigate to the template folder and install dependencies using npm.
    ```bash
    npm install
   

5. **Start Environment:** Start the development environment using Expo.
    ```bash
    expo start
    ```

## Auth Flow

### Firebase Setup

To use Firebase authentication, follow these steps:

1. Set up a new Firebase project.
2. Go to Authentication and enable Email/Password under Sign-in Method.
3. Fill in the Firebase config details in `./src/navigation/index.tsx`.

```typescript
const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};
```