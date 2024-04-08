// UserData.ts
export interface UserCard {
    id: string;
    cardNumber: string;
    expirationDate: string;
    ccv: string;
}
  
export const userCardData: UserCard[] = [
    { id: '1', cardNumber: '1234 9012 5678 1234', expirationDate: '12/25', ccv: '123' },
    { id: '2', cardNumber: '9012 5678 1234 5678', expirationDate: '03/27', ccv: '456' },
    { id: '3', cardNumber: '5678 1234 5678 9012', expirationDate: '06/28', ccv: '789' },
];
