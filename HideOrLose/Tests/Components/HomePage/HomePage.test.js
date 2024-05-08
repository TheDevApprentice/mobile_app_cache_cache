import React from 'react';
import HomePage from '../../../Components/HomePage';
import { render, fireEvent, screen } from '@testing-library/react-native';

describe("Navigate to Lobby when Pressed",()=>{
    it("calls the navigation to LobbyPage",()=>{
        const navigate = jest.fn();
        const navigateProp = { "navigate" : navigate};
        render(<HomePage navigate={navigateProp}/>);
        fireEvent.press(screen.getByText("Jouer"));
        expect(navigate).toHaveBeenCalledWith("LobbyPage");
    })
});