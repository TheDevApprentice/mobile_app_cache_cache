import React from "react";
import LobbyPage from "../../Components/LobbyPage";
import {render, fireEvent,screen} from "@testing-library/react-native"

describe("Exit pressable when pressed",()=>{

    it("Calls on press when pressed",()=>{
        const ExitRoom = jest.fn();
        render(<LobbyPage/>);
        fireEvent.press(screen.getByText("Quitter"));
        expect(ExitRoom).toHaveBeenCalled()
    })
})