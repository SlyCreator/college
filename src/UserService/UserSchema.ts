import { Field, ObjectType, ID } from "type-graphql"
import { IsEmail, Length,IsMobilePhone } from "class-validator"

@ObjectType({ description: "User Schema" })
export default class User {
    @Field(() => ID)
    id: String

    @Field()
    @Length(1, 30)
    firstName: String

    @Field()
    @Length(1, 30)
    lastName: String

    @Field()
    @Length(1, 30)
    userName: String

    @Field()
    @IsEmail()
    @Length(1, 30)
    email: String

    @Field()
    @IsMobilePhone()
    phone: Number

    password: String

}
