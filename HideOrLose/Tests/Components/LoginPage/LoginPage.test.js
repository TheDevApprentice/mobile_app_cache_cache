import React from "react";
import LoginPage from "../../../Components/LoginPage";
import { render, fireEvent, screen } from "@testing-library/react-native";

describe("Bouton connexion", () => {
    it("Information correcte, passe à la prochaine page", () => {
        const nagivate = jest.fn();
        const navigateProp = { "navigate" : navigate};
        render(<LoginPage navigation={navigateProp}/>);
        fireEvent.changeText(screen.getByPlaceholderText("Adresse courriel"), "mg@gmail.com");
        fireEvent.changeText(screen.getByPlaceholderText("Mot de passe"), "123456");
        fireEvent.press(screen.getByText("Se connecter"));
        expect(nagivate).toHaveBeenCalledWith("HomePage");
    });
});