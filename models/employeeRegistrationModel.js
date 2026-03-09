import mongoose from "mongoose";

// Create the Employee schema
const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [2, "Name must be at least 2 characters"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+\@.+\..+/, "Please fill a valid email address"]
  },
  position: {
    type: String,
    required: [true, "Position is required"],
    trim: true
  },
  subCategoryPosition: {
    type: String,
    required: [true, "Subcategory position is required"],
    trim: true
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"]
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

// Export the model
const Employee = mongoose.model("employee-registration", employeeSchema);

export default Employee;