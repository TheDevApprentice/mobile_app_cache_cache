import React from "react";
import LoginPage from "../../../Components/LoginPage";
import { render, fireEvent, screen } from "@testing-library/react-native";
import { useNavigation } from "@react-navigation/native";

describe("Bouton connexion", () => {
    describe("Information correcte", () => {
        it("Passe à la Home Page", () => {
            const navigate = jest.fn();
            render(<LoginPage navigation={navigate}/>);
            fireEvent.changeText(screen.getByPlaceholderText("Adresse courriel"), "mg@gmail.com");
            fireEvent.changeText(screen.getByPlaceholderText("Mot de passe"), "123456");
            fireEvent.press(screen.getByText("Se connecter"));
            expect(navigate).toHaveBeenCalledTimes(1);
        });
    });

    describe("Information incorrecte", () => {
        it("Ne passe pas à la Home Page", () => {
            const navigateMock = jest.fn();
            render(<LoginPage navigation={navigate}/>);
            fireEvent.changeText(screen.getByPlaceholderText("Adresse courriel"), "mg@gmail.com");
            fireEvent.changeText(screen.getByPlaceholderText("Mot de passe"), "981647");
            fireEvent.press(screen.getByText("Se connecter"));
            expect(navigateMock).toHaveBeenCalledTimes(0);
        });
    });
});