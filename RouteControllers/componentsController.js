const asyncHandler = require("express-async-handler");
const Components = require("../MongoModels/Components");

//fetching the components from the DB and reseding it as response
const getComponents = asyncHandler(async (req, res) => {
  const components = await Components.find().exec();

  if (!components) {jjjm
    return res.status(400).json({ message: "No Compenents found" });
  } else {
    return res.json(components);
  }
});

const createComponent = asyncHandler(async (req, res) => {
  const { name, description, pinout, image } = req.body;
  //validating the mandatory fields
  if (!name || !description || !pinout || !image) {
    return res.status(400).json({
      message: "name, description, pinout and image fields are mandatory ",
    });
  }
  //validating for the duplicate fields
  const duplicate = await Components.findOne({ name }).lean().exec();
  if (duplicate) {
    return res.status(400).json({
      message: "the Duplicate Component with the name alerady exists",
    });
  }
  try {
    const component = await Components.create({
      name,
      description,
      pinout,
      image,
    });
    if (component) {
      return res.status(201).json(component);
    } else {
      return res
        .status(400)
        .json({ message: "Component Creation failed due to invalid data" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = {
  getComponents,
  createComponent,
};
