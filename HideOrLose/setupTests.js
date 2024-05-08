/*jest.mock("@react-native-async-storage/async-storage", () =>
    require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
);*/

jest.mock('@react-navigation/native', () => ({
    useNavigation: jest.fn(),
}));

jest.mock('expo-image-picker', () => ({
    launchImageLibraryAsync: jest.fn(),
}));

jest.mock('firebase/compat/app', () => ({
    initializeApp: jest.fn(),
    auth: jest.fn(() => ({
        currentUser: {
            uid: 'uid', // Simulez l'ID utilisateur actuel si nécessaire
        },
        signInWithEmailAndPassword: jest.fn(),
        sendPasswordResetEmail: jest.fn(),
    })),
    firestore: jest.fn(() => ({
        collection: jest.fn(() => ({
            doc: jest.fn(() => ({
                get: jest.fn(() => Promise.resolve({ /* Données simulées */ })),
            })),
        })),
    })),
}));

jest.mock('firebase/compat/auth', () => ({
    // Simulation de l'objet auth
}));

jest.mock('firebase/compat/firestore', () => ({
    // Simulation de l'objet firestore
}));

jest.mock('firebase/compat/storage', () => ({
    // Simulation de l'objet storage
}));