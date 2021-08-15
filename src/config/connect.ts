import * as Mongoose from "mongoose";

type DBInput = {
    db: string,
}
export default ({ db }: DBInput) => {
    const connect = () => {
        Mongoose.connect(db,{
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        ).then(() =>{
            console.log(`Mongo server connected successfully to ${db}`)

        }).catch(err =>{
            console.error(`Error connecting to database :`, err)
            return process.exit(1)
            })
    }
    connect()
    Mongoose.connection.on("disconnected", connect)
}
