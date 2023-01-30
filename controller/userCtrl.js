const {PrismaClient}=require('@prisma/client');
const prisma=new PrismaClient();
const responseData={
    "Status":"Success",
    "Response":null,
    "Message":null
}
const errorData={
    "Status":"Failed",
    "Response":null,
    "Message":null
}

const postFunc= async(req,res)=>{
    try{
        let postData=null;
        if(Array.isArray(req.body)){
            postData=await prisma.roles.createMany({data:req.body});
        }else{
            postData=await prisma.roles.create({data:req.body});
        }        
        responseData.Response=postData
        res.status(201).json(responseData);

    }catch(err){
        console.log("Error in POST FUNC ..",err);
        errorData.Message=err.message
        res.status(400).json(errorData)
    }
}
const getFunc= async(req,res)=>{
    try{
        let findAllData=null;
        let conditionData=await findByBody(req.body);        
        findAllData=await prisma.roles.findMany({where:conditionData});
        responseData.Response=findAllData.length !==0 ? findAllData : "No Data Found In Database"
        res.status(200).json(responseData);

    }catch(err){
        console.log("Error in GET FUNC ..",err);
        errorData.Message=err.message
        res.status(400).json(errorData)
    }
}
const findByBody=async(body)=>{
    let whereCondition={}
    if(body.roleId){
        whereCondition["roleId"]=body.roleId;
    }
    if(body.roleName){
        whereCondition["roleName"]=body.roleName;
    }
    return whereCondition;
}

const updateFunc=async(req,res)=>{
    try{
        let modifiedData=await prisma.roles.update({where:{roleId:Number(req.params.id)},data:{roleName:req.body.name}})
        responseData.Response=modifiedData;
        res.status(200).json(responseData);
    }catch(err){
        console.log("Error in UPDATE FUNC ..",err);
        errorData.Message=err.message
        res.status(400).json(errorData)
    }
}

const deleteFunc= async(req,res)=>{
    try{
        const removedData=await prisma.roles.delete({where:{roleId:Number(req.params.id)}});
        responseData.Response=removedData;
        res.status(200).json(responseData);

    }catch(err){
        console.log("Error in DELETE FUNC ..",err);
        errorData.Message=err.message
        res.status(400).json(errorData)
    }
}

const paginationFunc=async(req,res)=>{
    try{
        let findAllData=null;
        if(req.body.skip && req.body.take){
            let conditionData=await findByBody(req.body);        
            findAllData=await prisma.roles.findMany({skip:((req.body.skip-1) * req.body.take),take:req.body.take,where:conditionData});
        }else{
            errorData.Message=" Incorrect Body Skip and Take are Mandatory Fields"
            res.status(400).json(errorData);
            return
        }
        
        responseData.Response=findAllData.length !==0 ? findAllData : "No Data Found In Database"
        res.status(200).json(responseData);

    }catch(err){
        console.log("Error in PAGINATION FUNC ..",err);
        errorData.Message=err.message
        res.status(400).json(errorData)
    }
}

const postOneToOneFunc=async(req,res)=>{
    try{
        const data=await prisma.roles.create({data:req.body,include:{user:true}});
        responseData.Response=data
        res.status(201).json(responseData);
    }catch(err){
        console.log("Error in One To One Post FUNC ..",err);
        errorData.Message=err.message
        res.status(400).json(errorData)
    }
}

const getOneToOneFunc=async(req,res)=>{
    try{
        const data=await prisma.roles.findMany({include:{user:true}})
        responseData.Response=data
        res.status(201).json(responseData);
    }catch(err){
        console.log("Error in One To One GET FUNC ..",err);
        errorData.Message=err.message
        res.status(400).json(errorData) 
    }
}
const oneToOneDeleteFunc= async(req,res)=>{
    try{
        const data=await prisma.roles.delete({where:{roleId:Number(req.params.id)}});
        responseData.Response=data;
        res.status(200).json(responseData);

    }catch(err){
        console.log("Error in One To One DELETE FUNC ..",err);
        errorData.Message=err.message
        res.status(400).json(errorData)
    }
}

const oneToOneUpdateFunc=async(req,res)=>{
    try{
        const data=await prisma.roles.update({where:{roleId:Number(req.params.id)},data:{roleName:req.body.name}});
        responseData.Response=data;
        res.status(200).json(responseData);

    }catch(err){
        console.log("Error in One To One UPDATE FUNC ..",err);
        errorData.Message=err.message
        res.status(400).json(errorData)
    }
}

const oneToOnePaginationFunc=async(req,res)=>{
    try{
        const data=await prisma.roles.findMany({skip:((req.body.skip-1) * req.body.take),take:req.body.take,include:{user:true}})
        responseData.Response=data;
        res.status(200).json(responseData);
    }catch(err){
        console.log("Error in One To One PAGINATION FUNC ..",err);
        errorData.Message=err.message
        res.status(400).json(errorData)
    }
}

module.exports={
    postFunc,
    getFunc,
    updateFunc,
    deleteFunc,
    paginationFunc,
    postOneToOneFunc,
    getOneToOneFunc,
    oneToOneDeleteFunc,
    oneToOneUpdateFunc,
    oneToOnePaginationFunc
}