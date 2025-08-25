import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PropertyList from "../components/PropertyList";
import { URL } from "../url";
const Home = () => {
  const [filters, setFilters] = useState({
    state: "",
    city: "",
    BHK: "",
    furnishingStatus: "",
    purchaseType: "",
    amenities: [],
    price: "",
    size: "",
  });
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    const activeFilters = {};
    for (const key in filters) {
      const value = filters[key];
      if (
        key === "amenities" &&
        Array.isArray(filters[key]) &&
        filters[key].length > 0
      ) {
        activeFilters[key] = filters[key].join(",");
      } else if (value && key !== "amenities") {
        activeFilters[key] = filters[key];
      }
    }
    const fetchProperties = async () => {
      const res = await axios.get(URL + "/getproperties", {
        params: {
          ...activeFilters,
        },
        withCredentials: true,
      });

      setProperties(res.data);
    };
    fetchProperties();
  }, [filters]);

  return (
    <div>
      <Navbar />
      <div className="flex flex-1">
        <Sidebar currentFilters={filters} onFiltersChange={setFilters} />
        <div className="flex-1 p-4">
          <PropertyList properties={properties} />
        </div>
      </div>
    </div>
  );
};

export default Home;
