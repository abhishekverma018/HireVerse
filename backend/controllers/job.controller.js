import { Job } from "../models/job.model.js";
import { Application } from "../models/application.model.js";

// admin post karega job
export const postJob=async(req,res)=>{
    try{
    const {title,description,requirements,salary,location,jobType,experience,position,companyId}=req.body;
    const userId=req.id;

    if(!title || !description|| !requirements || !salary || !location || !jobType || !experience || !position || !companyId){
        return res.status(400).json({
            message:"Something is missing",
            success:false,
        })
    };
    const job=await Job.create({
        title,
        description,
        requirements:requirements.split(","),
        salary:Number(salary),
        location,
        jobType,
        experienceLevel:Number(experience),
        position:Number(position),
        company:companyId,
        createdBy:userId,
    });
    return res.status(201).json({
        message:"New Job created successfully",
        job,
        success:true,
    })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message:"Internal server error",
            success:false,
        });
    }
}


// students ke liye
export const getAllJobs=async(req,res)=>{
    try{
        const keyword=req.query.keyword || "";
        const query={
            $or:[
                {title:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword,$options:"i"}},
            ]
        };
        const jobs=await Job.find(query).populate({
            path:"company"
        }).sort({createdAt:-1});
    if(!jobs)
        return res.status(404).json({
        message:"Jobs not found",
        success:false,
        });
        return res.status(200).json({
            jobs,
            success:true,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message:"Internal server error",
            success:false,
        });
    }
}
//students le liye
export const getJobById=async(req,res)=>{
    try{
        const jobId=req.params.id;
        const job=await Job.findById(jobId).populate({
            path:"company"
        }).populate({
            path:"applications"
        });
        if(!job){
            return res.status(404).json({
            message:"Job not found",
            success:false,
    })
    };
    return res.status(200).json({job,success:true});

    }catch(error){
        console.log(error);
        return res.status(500).json({
            message:"Internal server error",
            success:false,
        });
    }
}


//admin kitne job create kara abhi taak

export const getAdminJobs=async(req,res)=>{
    try{
        const adminId=req.id;
        const jobs =await Job.find({createdBy:adminId}).populate({
            path:"company"
        });
        if(!jobs){
            return res.status(404).json({
            message:"Jobs not found",
            success:false,
    })
    };
    return res.status(200).json({
        jobs,
        success:true
    })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message:"Internal server error",
            success:false,
        });
    }
}

// delete job
export const deleteJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }
        
        // Delete the job from the DB
        await Job.findByIdAndDelete(jobId);
        
        // Delete all applications linked to this job
        await Application.deleteMany({ job: jobId });
        
        return res.status(200).json({
            message: "Job deleted successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// update job
export const updateJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        const updateData = {
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: Number(experience),
            position: Number(position),
            company: companyId
        };

        const job = await Job.findByIdAndUpdate(jobId, updateData, { new: true });
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Job details updated successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};