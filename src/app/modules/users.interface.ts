import { Model } from "mongoose";


export interface IUsers{
    userId: number;
    username: string;
    password: string;
    fullName:{
        firstName: string;
        lastName: string;
    };
    age: number;
    email: string;
    isActive: boolean;
    hobbies: Array<string>;
    address:{
        street: string;
        city: string;
        country: string
    };
    orders?: Array<{
        productName: string;
        price: number;
        quantity: number;
    }>;
}

export interface UserModel extends Model<IUsers>{
    isUserAvailable(userId: number | string): Promise<IUsers> | null;
}