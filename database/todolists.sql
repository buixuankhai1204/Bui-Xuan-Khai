db
.
createCollection
("todolists", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "projectName"],
      properties: {
        title: {
          bsonType: "string"
        },
        projectName: {
          bsonType: "string"
        },
        isDone: {
          bsonType: "boolean"
        },
        createdAt: {
          bsonType: "date"
        }
      }
    }
  }
});