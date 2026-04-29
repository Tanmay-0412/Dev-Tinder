const AdminAuth  = (req, res, next)=>{
    console.log('Admin Auth is getting executed')
    const token = "xyz"
    const isAdminAuthorized = token === "xyz"
    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized Request")
    }else{
    next()
    }
}

const UserAuth  = (req, res, next)=>{
    console.log('User Auth is getting executed')
    const token = "xyz"
    const isAdminAuthorized = token === "xyz"
    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized Request")
    }else{
    next()
    }
}
// module.exports = AdminAuth
module.exports = { 
    AdminAuth, UserAuth
}
