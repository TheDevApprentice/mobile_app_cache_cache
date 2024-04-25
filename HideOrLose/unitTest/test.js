// import React from 'react';
// import { render } from '@testing-library/react-native';
// import ExampleComponent from './ExampleComponent';

// describe('ExampleComponent', () => {
//   it('renders correctly', () => {
//     const { getByText } = render(<ExampleComponent />);
//     const textElement = getByText('Hello, World!');
//     expect(textElement).toBeTruthy();
//   });
// });


// on test ce que l'utilisateur voit, donc le comportement de l'application 
// exemple : 
//  Un bouton click qui permet à l'user de se rendre sur une page. 
//  On va tester que le bouton, modifie bien une valeur qui permet de se rendre à l'écran par exemple. 
//  on use les mocks 
//  
//  
//  expect : a chaque fois qu'une valeur est tester : expect(best).not.toBe(1)
//  FireEvent 
//  jest.spyOn(object, methodName)