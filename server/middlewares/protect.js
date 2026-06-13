import jwt from "jsonwebtoken"
export const protect=async(req,res,next)=>{
  try {
    const authHeader=req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer")){//Frontend sends - Authorization: Bearer eyJhbGc...
      return res.status(401).json({error:"Unauthorised"})
    }
    const token=authHeader.split(" ")[1];
    const session=jwt.verify(token,process.env.JWT_SECRET)
     if(!session){
      return res.status(401).json({error:"Unauthorised"})
     
    }
     req.session=session;
      next();
    
  } catch (error) {
  
      res.status(401).json({error:"Unauthorised"})
    
  }
}
export const protectAdmin=async(req,res,next)=>{
  //if req?.session?.role
  const role=req.session.role;
  if(role!="ADMIN") return res.status(403).json({error:"Admin access required"})
    next()

}