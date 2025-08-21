import { Property } from "../Model/propertypost.module.js";
export const getProperty = async (req, res) => {
  // your code here
  try {
    console.log(req.params.id);
    //console.log(req.params._id);

    const property = await Property.findById(req.params.id);

    res.status(200).json(property);
  } catch (e) {
    res.status(500).json(e.message);
  }
};
export const getPropertys = async (req, res) => {
  // your code here
  try {
    const propertyname = req.query.propertyname;
    console.log("🧠 Search propertyname query:", propertyname); // 🔍 debug log

    let Propertys;
    if (propertyname) {
      Propertys = await Property.find({
        propertyname: { $regex: propertyname, $options: "i" },
      });
    } else {
      Propertys = await Property.find();
    }
    console.log("📦 Propertys found:", Propertys.length); // 🧾 debug log
    res.status(200).json(Propertys);
  } catch (e) {
    res.status(500).json(e.message);
  }
};
//get all Propertys
/*export const getPropertys = async (req, res) => {
  // your code here
  try {
    const propertyname = req.query.propertyname;
    console.log("🧠 Search propertyname query:", propertyname); // 🔍 debug log

    let Propertys;
    if (propertyname) {
      Propertys = await Property.find({
        propertyname: { $regex: propertyname, $options: "i" },
      });
    } else {
      Propertys = await Property.find();
    }
    console.log("📦 Propertys found:", Propertys.length); // 🧾 debug log
    res.status(200).json(Propertys);
  } catch (e) {
    res.status(500).json(e.message);
  }
};
*/
