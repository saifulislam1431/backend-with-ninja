import { Request, Response } from "express";
import UserValidationSchema from "./users.validation";
import { userServicesData } from "./users.service";


const createNewUserData = async(req: Request, res: Response)=>{
    try{
        const userData = req.body;
        const validatedData = UserValidationSchema.parse(userData);
        // console.log(validatedData);
        const result = await userServicesData.createSingleUser(validatedData);
        res.status(200).json({
            success: true,
            message: "User created successfully",
            data: result,   
        })
    }catch(error: any){
        res.status(400).json({
            success: false,
            message: error.error || "User creation failed!",
            error: {
              code: 400,
              description: "User creation failed!",
              error: error,
            },
          });
    }
}


const findAllUserData = async(req: Request, res: Response)=>{
    try {
        const result = await userServicesData.findAllUser();
        res.status(200).json({
          success: true,
          message: "Users fetched successfully!",
          data: result,
        });
      } catch (error: any) {
        res.status(400).json({
          success: false,
          message: "User not found",
          error: {
            code: 404,
            description: "User not found!",
          },
        });
      } 
}


const findSingleUserData = async(req: Request, res:Response)=>{
    try {
        const { userId } = req.params;
        const result = await userServicesData.findSingleUser(userId);
        res.status(200).json({
          success: true,
          message: "User fetched successfully!",
          data: result,
        });
      } catch (error: any) {
        res.status(500).json({
          success: false,
          message: error.error || "User not found",
          error: {
            code: 404,
            description: "User not found!",
          },
        });
      }
}


const updateSingleUserData = async (req: Request, res: Response) =>{
    try {
      const { userId } = req.params;
      const userData = req.body;
      const result = await userServicesData.updateSingleUser(userId, userData);
      res.status(200).json({
        success: true,
        message: "User updated successfully!",
        data: result,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.error || "User not found",
        error: {
          code: 404,
          description: "User not found!",
          error: error,
        },
      });
    }
};


const deleteSingleUserData = async (req: Request, res: Response) =>{
    try {
      const { userId } = req.params;
      await userServicesData.deleteSingleUser(userId);
      res.status(200).json({
        success: true,
        message: "User deleted successfully!",
        data: null,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.error || "User not found",
        error: {
          code: 404,
          description: "User not found!",
          error: error,
        },
      });
    }
};


const createOrderToUser = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const order = req.body;
      const result = await userServicesData.createNewOrder(
        userId,
        order
      );
      res.status(200).json({
        success: true,
        message: "Order created successfully!",
        data: result,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.error || "User not found",
        error: {
          code: 404,
          description: "User not found!",
          error: error,
        },
      });
    }
};



const findUserOrderData = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const result = await userServicesData.findAllOrdersToUser(userId);
      res.status(200).json({
        success: true,
        message: "Order fetched successfully!",
        data: result,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.error || "User not found",
        error: {
          code: 404,
          description: "User not found!",
          error: error,
        },
      });
    }
};



const calculateAllUserOrderPrice = async (req: Request, res: Response) =>{
    try {
      const { userId } = req.params;
      const totalPrice = await userServicesData.calculateTotalOrderPrice(userId);
      res.status(200).json({
        success: true,
        message: "Total price calculated successfully!",
        data: {
          totalPrice,
        },
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.error || "User not found",
        error: {
          code: 404,
          description: "User not found!",
          error: error,
        },
      });
    }
};


export const userControllerData = {
 createNewUserData,
 findAllUserData,
 findSingleUserData,
 updateSingleUserData,
 deleteSingleUserData,
 createOrderToUser,
 findUserOrderData,
 calculateAllUserOrderPrice
};