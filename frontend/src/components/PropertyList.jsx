import React from "react";
import { Link } from "react-router-dom";
import IndividualProperty from "./IndividualProperty";
const PropertyList = ({ properties }) => {
  console.log("properties", properties);

  return (
    <div className="flex-1 mb-4 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">Property list</h2>
      {/* Property cards will go here */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Example Property Card */}
        {properties.length !== 0
          ? properties?.map((property) => (
              <div key={property._id} className="border rounded-lg p-4 shadow">
                <img
                  src={
                    property.photos && property.photos
                      ? property.photos
                      : "https://tse2.mm.bing.net/th/id/OIP.Y3e-Gg5_ia3wRVJy86PvswHaHa?r=0&cb=thfvnext&rs=1&pid=ImgDetMain&o=7&rm=3"
                  }
                  alt={property.propertyname}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
                <h3 className="text-lg font-semibold mb-2">
                  {property.propertyname}
                </h3>
                <p className="text-gray-600 mb-2">
                  {property.location}, {property.city}, {property.state}
                </p>
                <p className="text-gray-800 font-bold">
                  ₹{property.price} - {property.BHK}- {property.squarefeet} sqft
                </p>
                <Link
                  to={`/property/` + property._id}
                  className="text-blue-500"
                >
                  Read More
                </Link>
              </div>
            ))
          : "No Properties Found"}
      </div>
    </div>
  );
};

export default PropertyList;
