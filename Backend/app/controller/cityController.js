import DistanceModel from "../models/cityModel.js";

class DistanceController {
  static async calculateDistance(req, res) {
    const { city1, city2 } = req.body;

    if (!city1 || !city2) {
      return res.status(400).json({ error: "Both cities are required" });
    }

    try {
      const pos1 = await DistanceModel.getCoordinates(city1);
      const pos2 = await DistanceModel.getCoordinates(city2);
      const distance = await DistanceModel.getDistance(
        pos1.lat,
        pos1.lng,
        pos2.lat,
        pos2.lng
      );

      res.json({ from: city1, to: city2, distance_km: distance });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // databases
  static haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const toRad = (angle) => (angle * Math.PI) / 180;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  }

  // API to calculate distance
  static async getDistance(req, res) {
    try {
      const { city1, city2 } = req.body;

      if (!city1 || !city2) {
        return res
          .status(400)
          .json({ message: "Please provide both city names" });
      }

      // Get city details
      const cityData1 = await DistanceModel.getCityByName(city1);
      const cityData2 = await DistanceModel.getCityByName(city2);

      if (!cityData1 || !cityData2) {
        return res
          .status(404)
          .json({ message: "One or both cities not found" });
      }

      // Calculate distance
      const distance = DistanceController.haversineDistance(
        cityData1.latitude,
        cityData1.longitude,
        cityData2.latitude,
        cityData2.longitude
      );

      res.json({
        city1,
        city2,
        distance_km: distance.toFixed(2) + " km",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default DistanceController;
