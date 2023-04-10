const asyncHandler = require("express-async-handler");
const Project = require("../MongoModels/Projects");

//GET -fetch note
const getProject = asyncHandler(async (req, res) => {
  const projects = await Project.find().exec();

  if (!projects) {
    return res.status(400).json({ message: "No posts Found" });
  } else {
    res.json(projects);
  }
});

//POST -new note
const createProject = asyncHandler(async (req, res) => {
  console.log(req.body)
  const {
    projectProcessor, //Type-ObjectId
    projectTitle, //String
    projectBrief, //String
    projectImage, //String
    projectCircuitImage, //String
    projectDescription, //String
    components, //Type-ObjectId-Array
  } = req.body;

  if (
    projectProcessor == null ||
    projectTitle == null ||
    projectBrief == null ||
    projectImage == null ||
    projectCircuitImage == null ||
    projectDescription == null ||
    components == null
  ) {
    return res.status(406).json({
      message: "Project information fields are mandatory",
    });
  }
  console.log("Project body is extracted and passes the mandatory validation")
  const duplicate = await Project.findOne({ projectTitle }).lean().exec();
  console.log("Duplication Check is complete, Duplidate:", duplicate)
  if (duplicate) {
    return res
      .status(400)
      .json({ message: "Duplicate Project found with the same title" });
  }
console.log("Trying to create the db entry in the database")
  try {
    const project = await Project.create({
      projectProcessor,
      projectTitle,
      projectBrief,
      projectImage,
      projectCircuitImage,
      projectDescription,
      components,
    });
    console.log("This is the creted project data",project)
    if (project) {
      return res.status(201).json(project);
    } else {
      console.log("The project creation failed in the database stage")
      return res
        .status(400)
        .json({ message: "Projection creation failed -Invalid data" });
    }
  } catch (error) {
    console.log(error)
    console.log("There is an error on the try catch block of the Project Creation")
    res.status(400).json(error);
  }
});

module.exports = {
  getProject,
  createProject,
};
