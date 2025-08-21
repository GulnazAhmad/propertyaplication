import "dotenv/config";
import mongoose from "mongoose";
import { Property } from "../Model/propertypost.module.js";
import { connectDb } from "../db.js";

async function main() {
  try {
    console.log("MONGO_URL:", process.env.MONGO_URL);

    connectDb();
    const sampleDocs = [
      {
        propertyname: "Sunshine Residency",
        propertydescription:
          "3BHK apartment near tech park with clubhouse access.",
        state: "Odisha",
        city: "Bhubaneswar",
        location: "Patia",
        price: 6500000,
        squarefeet: 1200,
        BHK: "3BHK",
        ownerinfo: "Rahul Sharma, +91-9876543210",
        amenities: ["parking", "lift", "security", "club house"],
        furnishingStatus: "semifurnished",
        purchaseType: "resale",
        photos:
          "https://imagecdn.99acres.com/media1/24876/12/497532583M-1751978277543.jpg",
      },
      {
        propertyname: "Green Park Villas",
        propertydescription: "4BHK villa with private garden and gas pipeline.",
        state: "Odisha",
        city: "Bhubaneswar",
        location: "Khandagiri",
        price: 12500000,
        squarefeet: 2200,
        BHK: "4BHK",
        ownerinfo: "Anita Das, +91-9012345678",
        amenities: ["park", "gas pipeline", "security"],
        furnishingStatus: "unfurnished",
        purchaseType: "new booking",
        photos:
          "https://newprojects.99acres.com/projects/omm_estcon/omm_hemalata_mansion/images/ijk7h4h_1728370204_523319559_med.jpg",
      },
      {
        propertyname: "Skyline Heights",
        propertydescription: "2BHK with swimming pool and generator backup.",
        state: "Odisha",
        city: "Bhubaneswar",
        location: "Jayadev Vihar",
        price: 5200000,
        squarefeet: 950,
        BHK: "2BHK",
        ownerinfo: "S Banerjee, +91-9876543212",
        amenities: ["swimming pool", "generator", "parking"],
        furnishingStatus: "furnished",
        purchaseType: "resale",
        photos:
          "https://newprojects.99acres.com/projects/metro_builders/metro_kings_court/images/ecueaib_1699444206_455520008_med.jpg",
      },
      {
        propertyname: "City Center Nest",
        propertydescription: "Compact 2BHK near metro with lift and security.",
        state: "Odisha",
        city: "Bhubaneswar",
        location: "Master Canteen",
        price: 4200000,
        squarefeet: 800,
        BHK: "2BHK",
        ownerinfo: "Prakash Patnaik, +91-9876543213",
        amenities: ["lift", "security"],
        furnishingStatus: "unfurnished",
        purchaseType: "resale",
        photos:
          "https://newprojects.99acres.com/projects/utkal_builders/utkal_isquare/images/dfdq9tl_1710839945_481078112_med.jpg",

        videos: "https://youtu.be/-ZMhJfb4rLE?list=TLGG4tj6aB47w9MyMTA4MjAyNQ",
      },
      {
        propertyname: "Elite Towers",
        propertydescription:
          "3BHK luxury flat with clubhouse and swimming pool.",
        state: "Odisha",
        city: "Bhubaneswar",
        location: "Chandrasekharpur",
        price: 7800000,
        squarefeet: 1350,
        BHK: "3BHK",
        ownerinfo: "Niharika Mishra, +91-9876543214",
        amenities: ["club house", "swimming pool", "lift"],
        furnishingStatus: "furnished",
        purchaseType: "new booking",
        photos:
          "https://imagecdn.99acres.com/media1/31204/11/624091355O-1753557460624.jpg",

        videos: "https://youtu.be/5avpYf-_8FA?list=TLGGHFhi2ELNakUyMTA4MjAyNQ",
      },
      {
        propertyname: "Shanti Residency",
        propertydescription: "2BHK affordable housing near schools.",
        state: "Odisha",
        city: "Bhubaneswar",
        location: "Rasulgarh",
        price: 3500000,
        squarefeet: 700,
        BHK: "2BHK",
        ownerinfo: "Deepak Sahu, +91-9876543215",
        amenities: ["parking", "security"],
        furnishingStatus: "unfurnished",
        purchaseType: "resale",
        photos:
          "https://newprojects.99acres.com/projects/unknown/solitaire/images/awbpwcq_1743762603_583550669_large.jpg",

        videos: "https://youtu.be/XeM1Jzix5xM?list=TLGGl9s65cobNo8yMTA4MjAyNQ",
      },
      {
        propertyname: "Sai Enclave",
        propertydescription: "3BHK spacious flat with generator backup.",
        state: "Odisha",
        city: "Bhubaneswar",
        location: "Laxmi Sagar",
        price: 6000000,
        squarefeet: 1100,
        BHK: "3BHK",
        ownerinfo: "Ramesh Naik, +91-9876543216",
        amenities: ["generator", "lift", "security"],
        furnishingStatus: "semifurnished",
        purchaseType: "resale",
        photos:
          "https://imagecdn.99acres.com/media1/25275/9/505509597M-1742281533342.jpg",

        videos: "https://youtu.be/qcFFduYpN8s?list=TLGGD2SLnGcET-QyMTA4MjAyNQ",
      },
      {
        propertyname: "Royal Residency",
        propertydescription: "4BHK villa with modern design and clubhouse.",
        state: "Odisha",
        city: "Bhubaneswar",
        location: "Pokhariput",
        price: 15000000,
        squarefeet: 2500,
        BHK: "4BHK",
        ownerinfo: "Pooja Rani, +91-9876543217",
        amenities: ["club house", "park", "security"],
        furnishingStatus: "furnished",
        purchaseType: "new booking",
        photos:
          "https://newprojects.99acres.com/projects/urbanyx_infra/urbanyx_court/images/edqj4n5_1721194327_505057581_large.jpg",
        videos: "https://youtu.be/yoDr1ndIJA8?list=TLGGGsQ-tnLMtAgyMTA4MjAyNQ",
      },
      {
        propertyname: "Metro View Apartments",
        propertydescription: "2BHK apartment close to metro station.",
        state: "Odisha",
        city: "Bhubaneswar",
        location: "Vani Vihar",
        price: 4800000,
        squarefeet: 900,
        BHK: "2BHK",
        ownerinfo: "Amit Jena, +91-9876543218",
        amenities: ["lift", "parking"],
        furnishingStatus: "semifurnished",
        purchaseType: "resale",
        photos:
          "https://imagecdn.99acres.com/media1/30868/12/617372189O-1752133858191.jpg",
      },
      {
        propertyname: "Harmony Homes",
        propertydescription:
          "3BHK premium flat with gas pipeline and swimming pool.",
        state: "Odisha",
        city: "Bhubaneswar",
        location: "Patrapada",
        price: 8500000,
        squarefeet: 1400,
        BHK: "3BHK",
        ownerinfo: "Subhashree Panda, +91-9876543219",
        amenities: ["gas pipeline", "swimming pool", "security"],
        furnishingStatus: "furnished",
        purchaseType: "new booking",
        photos:
          "https://newprojects.99acres.com/projects/baishnodevi_engineers_and_consultancy/baishnodevi_sai_prashad_phase_i/images/5jro69w_1735882155_548929725_large.jpg",
      },
    ];
    const inserted = await Property.insertMany(sampleDocs);
    console.log(`✅ Inserted ${inserted.length} documents`);
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected");
  }
}

main();
