const { Schema, model, default: mongoose } = require("mongoose");

const userSchema = new Schema({
  email: { type: String, unique: true },
  password: { type: String },
  role: {
    type: String,
    // enum(Enumerator) means - any one out of these
    enum: ["reader", "author", "admin"],
    default: "reader",
  },
});

module.exports = mongoose.models.User || model("User", userSchema);
