"use client";

import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function LeafletMap() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // If map exists → remove it
    if (L.DomUtil.get("map") !== null) {
      L.DomUtil.get("map")._leaflet_id = null;
    }

    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet/dist/images/marker-shadow.png",
    });

    const map = L.map("map").setView([26.8636123, 80.9946954], 15);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    L.marker([26.8636123, 80.9946954]).addTo(map).bindPopup("Zonvoir Technologies Pvt Ltd");
  }, []);

  return <div id="map" className="w-9/10 h-84 rounded-xl" />;
}
