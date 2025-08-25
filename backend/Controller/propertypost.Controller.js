import { Property } from "../Model/propertypost.module.js";
export const getproperties = async (req, res) => {
  try {
    console.log("query", req.query);
    const query = {};
    if (req.query.state) {
      query.state = req.query.state;
    }
    if (req.query.city) {
      query.city = req.query.city;
    }
    if (req.query.BHK) {
      query.BHK = req.query.BHK;
    }
    if (req.query.furnishingStatus) {
      query.furnishingStatus = req.query.furnishingStatus;
    }
    if (req.query.purchaseType) {
      query.purchaseType = req.query.purchaseType;
    }
    if (req.query.amenities) {
      query.amenities = { $all: req.query.amenities.split(",") };
    }
    if (req.query.price) {
      switch (req.query.price) {
        case "0-1000000":
          query.price = { $gte: 0, $lte: 1000000 };
          break;
        case "1000000-5000000":
          query.price = { $gte: 1000000, $lte: 5000000 };
          break;
        case "5000000-10000000":
          query.price = { $gte: 5000000, $lte: 10000000 };
          break;
        case "10000000+":
          query.price = { $gte: 10000000 };
          break;
        default:
          break;
      }
    }
    if (req.query.size) {
      switch (req.query.size) {
        case "0-500":
          query.squarefeet = { $gte: 0, $lte: 500 };
          break;
        case "500-1000":
          query.squarefeet = { $gte: 500, $lte: 1000 };
          break;
        case "1000-2000":
          query.squarefeet = { $gte: 1000, $lte: 2000 };
          break;
        case "2000+":
          query.squarefeet = { $gte: 2000 };
          break;
        default:
          break;
      }
    }
    if (query) {
      console.log(query);
      const propertys = await Property.find(query);

      res.status(200).send(propertys);
    } else {
      const propertys = await Property.find();
      console.log(propertys);
      res.status(200).send(propertys);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const getPropertyById = async (req, res) => {
  try {
    console.log(req.params.id);
    const propertyId = req.params.id;
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const createProperty = async (req, res) => {
  try {
    const result = await Property.create(req.body);

    res.status(201).json({
      success: true,
      message: "Property created successfully!",
      data: result,
    });
  } catch (error) {
    console.error("Error in createProperty controller:", error);
    res.status(400).json({
      success: false,
      message: "An internal server error occurred.",
      error: error.message,
    });
  }
};
