const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
// const ObjectId = mongodb.ObjectID;

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "taskmate";

// const id = new ObjectId();

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (err, client) => {
  if (err) {
    return console.log("Unable to connect" + err);
  }

  const db = client.db(databaseName);
  db.collection("users").insertOne(
    {
      // _id: id,
      name: "Prathmesh Sadake",
      age: 19,
    },
    (error, result) => {
      if (error) {
        return console.log("Unable to insert user");
      }
      console.log(result.ops);
    }
  );

  // db.collection("tasks").insertMany(
  //   [
  //     { description: "Wake up early", completed: true },
  //     { description: "Complete this module", completed: false },
  //     { description: "Complete this project", completed: false },
  //   ],
  //   (error, result) => {
  //     if (error) {
  //       return console.log(error);
  //     }
  //     console.log(result.ops);
  //   }
  // );
});
