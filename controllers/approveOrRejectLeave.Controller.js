export const approveOrRejectLeave = (req,res) =>{
    console.log(req.body);
    res.status(200).json({
        message:"We reached to the approve or reject leave endpoint!",
        data: req.body
    })
}