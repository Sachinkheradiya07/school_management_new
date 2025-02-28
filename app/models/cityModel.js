import axios from "axios";
import dotenv from "dotenv";
import connection from "../../config/db.js";

dotenv.config();

class DistanceModel {
  static HERE_API_KEY = process.env.APP_KEY_MAP;

  // Fetch city coordinates
  static async getCoordinates(city) {
    try {
      const response = await axios.get(
        "https://geocode.search.hereapi.com/v1/geocode",
        {
          params: {
            q: city,
            apiKey: this.HERE_API_KEY,
          },
        }
      );
      if (response.data.items.length > 0) {
        return response.data.items[0].position;
      } else {
        throw new Error(`City not found: ${city}`);
      }
    } catch (error) {
      throw new Error("Error fetching coordinates: " + error.message);
    }
  }

  // Fetch distance between two cities
  static async getDistance(lat1, lon1, lat2, lon2) {
    try {
      const response = await axios.get("https://router.hereapi.com/v8/routes", {
        params: {
          transportMode: "car",
          origin: `${lat1},${lon1}`,
          destination: `${lat2},${lon2}`,
          return: "summary",
          apiKey: this.HERE_API_KEY,
        },
      });

      if (response.data.routes.length > 0) {
        const distanceMeters =
          response.data.routes[0].sections[0].summary.length;
        const distanceKm = (distanceMeters / 1000).toFixed(2); // Convert meters to KM and round to 2 decimal places
        return parseFloat(distanceKm);
      } else {
        throw new Error("Route not found");
      }
    } catch (error) {
      throw new Error("Error calculating distance: " + error.message);
    }
  }

  static getCityByName(cityName) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM cities WHERE name = ?";
      connection.query(sql, [cityName], (err, results) => {
        if (err) reject(err);
        resolve(results.length > 0 ? results[0] : null);
      });
    });
  }
}
export default DistanceModel;
