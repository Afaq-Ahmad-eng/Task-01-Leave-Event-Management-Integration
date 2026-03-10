import EmployeeLeave from "../models/Module-1-Leave-Management/employeeLeaveModel.js";

export const approveOrRejectLeave = async(req,res) =>{
    try{
        const { status, remark } = req.body
        if(status === "Approved"){

            
            if(!["Approved", "Rejected"].includes(status)){
                return res.status(400).json({
            success: false,
            message: "Invalid status value. Status must be either 'Approved' or 'Rejected'."
        })
    }
    const leaveId = req.params.leaveId;
    
    const employeeId = {
        employeeId: leaveId
    };
    const leave = await EmployeeLeave.findOne({ employeeId: employeeId.employeeId }).sort({ createdAt: -1 });
    console.log("leave:", leave);
    
    if(!leave){
        return res.status(404).json({
            success: false,
            message: "Leave request not found"
        })
    }

    if(["Approved", "Rejected"].includes(leave.status)){
        return res.status(400).json({
            success: false,
            message: `Leave request has already been ${leave.status.toLowerCase()}.`
        })
    }
    
    
    leave.status = status;
    leave.remark = remark || "";
    
    // If approved → update attendance
    if(status === "Approved") leave.isLocked = true;
    
    await leave.save();
    
    //         for(let d = new Date(start); d <= end; d.setDate(d.getDate()+1)){
        
    //             await EmployeeLeave.updateOne(
        //                 {
            //                     employeeId: leave.employeeId,
            //                     date: new Date(d)
            //                 },
            //                 {
                //                     status: "Leave",
                //             isLocked: true
                //         },
                //         { upsert: true } // create if not exists
//     )
    
// }
// const start = new Date(leave.startDate.setHours(0,0,0,0));
// const end = new Date(leave.endDate.setHours(0,0,0,0));

// let bulkOps = [];
// for(let d = new Date(start); d <= end; d.setDate(d.getDate()+1)){
    //     bulkOps.push({
        //         updateOne: {
            //             filter: { employeeId: leave.employeeId, date: new Date(d) },
            //             update: { status: "Leave", isLocked: true },
            //             upsert: true
            //         }
            //     });
            // }

            res.status(200).json({
                success: true,
                message:`Leave request ${status.toLowerCase()} successfully.`,
                leave
})
}else if(status === "Rejected"){
    return res.status(200).json({
        success: true,
        message: "Leave request rejected. Because there are many employee on leave!",
    })
}
}catch(error){
    console.error("Error in approveOrRejectLeave: ", error);
    res.status(500).json({
        success: false,
        message: "Internal Server Error",
        data: error
    })
}}
