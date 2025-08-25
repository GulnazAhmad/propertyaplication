import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// --- Helper Icon Components (using SVG for performance and style) ---
const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const ChevronLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const IndividualProperty = () => {
  // Define the base URL for your API.
  const URL = "http://localhost:5000";

  const { propertyId } = useParams();
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  useEffect(() => {
    if (!propertyId) return;

    const fetchPropertyDetails = async () => {
      try {
        const response = await axios.get(`${URL}/getproperty/${propertyId}`, {
          withCredentials: true,
        });
        setPropertyDetails(response.data);
      } catch (e) {
        console.error("Error fetching property details:", e.message);
      }
    };

    fetchPropertyDetails();
  }, [propertyId, URL]);

  if (!propertyDetails) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-xl text-gray-600">Loading Property Details...</p>
      </div>
    );
  }

  // --- Data Preparation ---
  // This logic now runs only after the loading check ensures propertyDetails is not null.
  const photos = propertyDetails.photos
    ? Array.isArray(propertyDetails.photos)
      ? propertyDetails.photos
      : [propertyDetails.photos]
    : [];
  const videos = propertyDetails.videos
    ? Array.isArray(propertyDetails.videos)
      ? propertyDetails.videos
      : [propertyDetails.videos]
    : [];

  const mediaItems = [
    ...photos.map((url) => ({ url, type: "image" })),
    ...videos.map((url) => ({ url, type: "video" })),
  ];

  let ownerName = "";
  let ownerPhone = "";

  if (propertyDetails.ownerinfo && propertyDetails.ownerinfo.includes(",")) {
    const parts = propertyDetails.ownerinfo.split(",");
    ownerName = parts[0]?.trim();
    ownerPhone = parts[1]?.trim();
  } else {
    ownerName = propertyDetails.ownerinfo;
  }

  const handleNextMedia = () => {
    if (mediaItems.length === 0) return;
    setActiveMediaIndex((prevIndex) => (prevIndex + 1) % mediaItems.length);
  };

  const handlePrevMedia = () => {
    if (mediaItems.length === 0) return;
    setActiveMediaIndex(
      (prevIndex) => (prevIndex - 1 + mediaItems.length) % mediaItems.length
    );
  };

  const activeMedia = mediaItems[activeMediaIndex];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="container mx-auto p-4 lg:p-8">
        <div className="bg-white rounded-2xl shadow-2xl shadow-gray-300/30 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
            {/* --- Media Slider Section (Left) --- */}
            <div className="lg:col-span-3 bg-gray-900 relative">
              {activeMedia ? (
                <div className="relative w-full h-[300px] md:h-[500px] lg:h-full">
                  {activeMedia.type === "image" ? (
                    <img
                      src={activeMedia.url}
                      alt={propertyDetails.propertyname}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      src={activeMedia.url}
                      controls
                      autoPlay
                      loop
                      muted
                      className="w-full h-full object-cover"
                    />
                  )}
                  {/* Slider Navigation */}
                  {mediaItems.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevMedia}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition-all duration-300"
                      >
                        <ChevronLeftIcon />
                      </button>
                      <button
                        onClick={handleNextMedia}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition-all duration-300"
                      >
                        <ChevronRightIcon />
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <div className="w-full h-[300px] md:h-[500px] lg:h-full bg-gray-800 flex items-center justify-center">
                  <p className="text-gray-400">No Media Available</p>
                </div>
              )}
            </div>

            {/* --- Details Section (Right) --- */}
            <div className="lg:col-span-2 p-6 md:p-10 flex flex-col">
              <div className="flex-grow">
                <p className="text-indigo-600 font-semibold mb-1">
                  {propertyDetails.BHK} - {propertyDetails.purchaseType}
                </p>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
                  {propertyDetails.propertyname}
                </h1>
                <p className="text-gray-500 text-lg mb-6">
                  {propertyDetails.location}, {propertyDetails.city},{" "}
                  {propertyDetails.state}
                </p>

                <div className="grid grid-cols-2 gap-6 mb-8 text-center w-xl">
                  <div className="bg-gray-100 p-4 rounded-xl">
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="text-2xl font-bold text-gray-800">
                      ₹{propertyDetails.price.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <br />
                  <div className="bg-gray-100 p-4 rounded-xl">
                    <p className="text-sm text-gray-500">Size</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {propertyDetails.squarefeet}{" "}
                      <span className="text-base font-normal">sqft</span>
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-gray-700">
                  <p>
                    <strong>Furnishing:</strong>{" "}
                    <span className="font-light">
                      {propertyDetails.furnishingStatus}
                    </span>
                  </p>
                  <p>
                    <strong>Description:</strong>{" "}
                    <span className="font-light">
                      {propertyDetails.propertydescription}
                    </span>
                  </p>
                  <p>
                    <strong>Contact Person:</strong>{" "}
                    <span className="font-light">{ownerName || "N/A"}</span>
                  </p>
                  <div>
                    <p>
                      <strong>Amenities:</strong>
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {propertyDetails.amenities?.map((amenity) => (
                        <span
                          key={amenity}
                          className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-1 rounded-full"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* --- Contact Button --- */}
              <div className="mt-10">
                <a
                  href={`tel:${ownerPhone}`}
                  className="w-full flex items-center justify-center gap-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl px-6 py-4 shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
                >
                  <PhoneIcon />
                  Contact Owner
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualProperty;
