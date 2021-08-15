import * as Mongoose from "mongoose";

export interface IUser extends  Mongoose.Document{
    firstName:string,
    lastName:string,
    userName:string,
    email:string,
    phone:number,
    password:string
}
const UserSchema: Mongoose.Schema = new Mongoose.Schema(
    {
                firstName :{
                    type: String,
                    required: true,
                },
                lastName : {
                    type: String,
                    required: true,
                },
                userName : {
                    type: String,
                    required: true,
                },
                email: {
                    type: String,
                    required: true,
                },
                phone:{
                    type: Number,
                    required: true,
                },
                password: {
                    type: String,
                    required: true,
                },
            },
    { timestamps: true }
)

export default Mongoose.model<IUser>("User",UserSchema)
