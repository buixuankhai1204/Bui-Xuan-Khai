db
.
createCollection
("todolists", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "score"],
      properties: {
        userId: {
          bsonType: "number"
        },
        score: {
          bsonType: "number"
        }
      }
    }
  }
});