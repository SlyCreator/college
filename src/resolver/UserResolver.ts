import {Arg, Mutation, Query, Resolver} from "type-graphql"
import UserSchema from "../schema/UserSchema";
import UserResponse from "../util/UserResponse";
import { IUser } from "../model/UserModel";
import * as bcrypt from "bcryptjs";
import { UserService } from "../service/UserService";
import {Service} from "typedi";

@Service()
@Resolver(()=> UserSchema)
export class UserResolver {
    constructor(private readonly userService: UserService) {}
    @Query(() => String)
    samples(): String {
        return "Hello world"
    }

    @Mutation(()=> UserSchema)
    async SignUp(
        @Arg("email") email:string,
        @Arg("phone") phone:number,
        @Arg("password") password:string,
      //  @Ctx() ctx: any
    ): Promise<IUser>{
        const  hashedPassword = await bcrypt.hash(password, 12);
        const user = await this.userService.insertUser({email,phone,password:hashedPassword});
        return user;

    }

    @Query(() => UserResponse)
    async loginUser(
        @Arg("email") email: string,
        @Arg("password") password: string,
       // @Ctx() ctx: any
    ): Promise<UserResponse> {
        const user = await this.userService.getByEmail(email);
        if (user) {
            const result = await bcrypt.compare(password, user.password);
            if (!result) {
                return {
                    success: false,
                    error: "Invalid Credetials",
                    data: null,
                };
            } else {
                return {
                    success: true,
                    error: null,
                    data: user,
                };
            }
        } else {
            return {
                success: false,
                error: "User Not Found",
                data: null,
            };
        }
    }

    // @Mutation(()=> UserSchema)
    // async insertUser(
    //     @Arg("email") email:string,
    //     @Arg("phone") phone:number,
    //     @Arg("password") password:string,
    //     @Ctx() ctx: any
    // ): Promise<IUser>{
    //     const  hashedPassword = await bcrypt.hash(password, 12);
    //     const user = await new ctx.UserModel({email,phone,password:hashedPassword});
    //     return user.save();
    //
    // }

}
