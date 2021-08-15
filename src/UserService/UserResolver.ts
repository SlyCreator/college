import {Query,Resolver} from "type-graphql"
import UserSchema from "./UserSchema"

@Resolver(()=> UserSchema)
export class UserResolver {
    @Query(() => String)
    sample(): String {
        return "Hello"
    }

}
