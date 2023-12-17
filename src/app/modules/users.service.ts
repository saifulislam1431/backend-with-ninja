import { IUsers } from "./users.interface";
import { user } from "./users.model";


const createSingleUser = async(data: IUsers)=>{
    // console.log(data);
    
    const result = await user.create(data);
    console.log(result);
    return result
}



const findAllUser = async()=>{
    const result = await user.find().select("userId username fullName age email isActive address hobbies orders");
    return result
}


const findSingleUser = async(userId: number | string)=>{
    const existUser = await user.isUserAvailable(userId);
    if(!existUser){
        throw new Error("User not available!")
    }
    const result = await user.findOne({userId});
    return result;
}



const updateSingleUser = async(userId: number | string, userData: IUsers)=>{
    const existUser = await user.isUserAvailable(userId);
    if (!existUser) {
      throw new Error("User not found");
    }
    const result = await user.findByIdAndUpdate(
        {userId},
        {$set: userData},
        {new: true, runValidators: true}
        )
        return result;
}



const deleteSingleUser= async(userId: number | string)=>{
    const existUser = await user.isUserAvailable(userId);
    if (!existUser) {
      throw new Error("User not found");
    }
    const result = await user.findOneAndDelete({ userId });
    return result;
}



const createNewOrder = async(userId: number | string, orderData:{
    productName: string,
    price: number,
    quantity: number
})=>{
    const existUser = await user.isUserAvailable(userId);
    if (!existUser) {
      throw new Error("User not found");
    }

    const {productName, price, quantity} = orderData;

    const result = await user.findOneAndUpdate(
        {userId, orders:{$exists: true}},
        {
            $push:{
                orders:{
                    productName,
                    price,
                    quantity
                }
            }
        },
        {
            upsert: true,
            new: true
        }
    )
    return result;
}



const findAllOrdersToUser = async(userId: number | string)=>{
    const existUser = await user.isUserAvailable(userId);
    if (!existUser) {
      throw new Error("User not found");
    }
    const result = await user.findOne({ userId }).select("orders");
    return result;
}


const calculateTotalOrderPrice = async (userId: number | string) => {
    const existUser = await user.isUserAvailable(userId);
    if (!existUser) {
      throw new Error("User not found ");
    }
    const result = await user.findOne({ userId }).select("orders");
  
    const totalPrice = (result?.orders || []).reduce(
      (total: number, order: { price?: number }) => {
        return total + (order.price || 0);
      },
      0
    );
    return totalPrice;
  };

  export const userServicesData = {
    createSingleUser,
    findAllUser,
    findSingleUser,
    updateSingleUser,
    deleteSingleUser,
    createNewOrder,
    findAllOrdersToUser,
    calculateTotalOrderPrice
};
