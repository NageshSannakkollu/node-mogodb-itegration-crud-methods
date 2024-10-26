const Employee = require('../models/Employee')

const createEmployee =  async(req,res) => {
    try{
        const {name,email,phone,city} = req.body;
        const employee = new Employee ({
            name,
            email,
            phone,
            city
        })
        await employee.save()
        res.status(200).json(employee)
      
    }
    catch(error){
        console.log("There is an Error");
        res.status(500).json("Message Server Error",error)
    }
}

const getEmployees = async(req,res) => {
    try{
        const employees = await Employee.find()
        res.status(200).json(employees);
    }
    catch(error){
        console.log("There is an error",error)
        res.status(500).json({messageL: "Server error"})
    }
}

const singleEmployee = async(req,res) => { 
    try{
        const employee = await Employee.findById(req.params.id)
        if(!employee){
            return res.status(400).json({message:"Employee not found"})
        }
        res.status(200).json(employee)
    }
    catch(error){
        res.status(500).json({message:"server error"})
    }
    
}

const updateEmployee = async(req,res) => {
    try{
        const {name,email,phone,city} = req.body;
        const employeeUpdate = await Employee.findByIdAndUpdate(
            req.params.id,
            {name,email,phone,city}
        )
        if(!employeeUpdate){
             return res.status(400).json({message:"Employee not found"})
        }
        res.status(200).json(employeeUpdate)

    }catch(error){
        res.status(500).json({message:"server error"})
    }
}

const deleteEmployee = async(req,res) => {
    try{
        const deleteOneEmployee = await Employee.findByIdAndDelete(req.params.id)
        if(!deleteOneEmployee){
             return res.status(400).json({message:"Employee not found"})
        }
        res.status(200).send("Delete successfully")
    }catch(error){
         res.status(500).json({message:"server error"})
    }
}

module.exports = {createEmployee,getEmployees,singleEmployee,updateEmployee,deleteEmployee}