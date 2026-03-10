import mongoose from "mongoose";

const employeeLeaveSchema = new mongoose.Schema({
    leaveType:{
        type: String,
        required: [true, "Leave type is required"],
        trim: true,
        enum:{
            values: ["Sick","Casual","Emergency"],
            message: "{VALUE} is not a valid type"
        },
    },
        employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },
    startDate:{
     type: Date,
     required: [true, "Start date must be provided"]
    },
    endDate:{
        type: Date,
        required: [true, "End date must be provided"],
        validate: {
            validator: function(value){
                return value > this.startDate
            },
            message: "End date ({VALUE}) must be greater then start date"
        }
    },
    reason:{
       type: String,
       required: [true, 'You must give a valid reason']
    },
    status:{
        type: String,
        enum:{
            values: ["Pending","Approved","Rejected"],
            message: "{VALUE} is not a valid status"
        },
        default: "Pending"
    },
    remark:{
        type: String,
        default: ""
    },
    isLocked:{
        type: Boolean,
        default: false
    },
    appliedAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    }
        },{
    timestamps: true
})

const EmployeeLeave = mongoose.model("Leave", employeeLeaveSchema);

export default EmployeeLeave;