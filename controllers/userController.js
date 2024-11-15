import User from "../models/User.js"
export const createAdmin=async(req,res) => {
    try {
        const {name,email,password}=req.body;
    
    const user=new User({
        name,
        email,
        password,
        role:"Admin"
    })
    
    const savedUser=await user.save();
    res.json({
        savedUser,
        message:"User created Successfully"
    });
    
    } catch (error) {
        res.json({
            error:"error occured",
        });
    }
    };
    export const createAlumni = async (req, res) => {
        try {
          const { name, email, password } = req.body;
      
          
          const existingUser = await User.findOne({ email });
          if (existingUser) {
            return res.status(400).json({ message: "Alumni already exists!" });
          }
      
          // Create Alumni User
          const user = new User({
            name,
            email,
            password,
            role: "Alumni",
          });
      
          const savedUser = await user.save();
          res.status(201).json({
            savedUser,
            message: "Alumni created successfully",
          });
        } catch (error) {
          res.status(500).json({
            error: "An error occurred",
            details: error.message,
          });
        }
      };
      
      // Create Student Function
      export const createStudent = async (req, res) => {
        try {
          const { name, email, password } = req.body;
      
          // Check if Student already exists
          const existingUser = await User.findOne({ email });
          if (existingUser) {
            return res.status(400).json({ message: "Student already exists!" });
          }
      
          // Create Student User
          const user = new User({
            name,
            email,
            password,
            role: "Student",
          });
      
          const savedUser = await user.save();
          res.status(201).json({
            savedUser,
            message: "Student created successfully",
          });
        } catch (error) {
          res.status(500).json({
            error: "An error occurred",
            details: error.message,
          });
        }
      };

      export const getAllUsers=async(req,res)=>{
        try {
           const getusers= await User.find() 
           res.json({
            getusers
           })
        } catch (error) {
            res.json({
                error:"Cannot fetch data"
               })
              console.log(error)
        }
      }