import { connect } from "mongoose";
async function main() {
  await connect(process.env.MONGO_URI);
}

main()
  .then(() => {
    console.log("mongo db connected to local enviroment");
  })
  .catch((err) => {
    console.error(`Cantt conect to local enviroment:${err.message}`);
  });
