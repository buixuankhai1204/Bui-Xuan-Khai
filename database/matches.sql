db.createCollection("matches", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "token"],
      properties: {
        userId: {
          bsonType: "number"
        },
        token: {
          bsonType: "string"
        }
      }
    }
  }
});