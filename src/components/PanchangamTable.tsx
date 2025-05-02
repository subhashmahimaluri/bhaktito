"use client";

import React, { useState, useEffect } from 'react';
import { MhahPanchang } from 'mhah-panchang';

type PanchangamItem = {
  label: string;
  value: string;
};

export default function PanchangamTable() {
  const [panchangamData, setPanchangamData] = useState<PanchangamItem[]>([]);

  useEffect(() => {
    const calculatePanchangam = () => {
      try {
        const today = new Date();
        const latitude = 12.9716; // Bengaluru Latitude
        const longitude = 77.5946; // Bengaluru Longitude

        const obj = new MhahPanchang();
        const panchang = obj.calendar(today, latitude, longitude);

        const data: PanchangamItem[] = [
          { label: 'తిథి', value: panchang.Tithi?.name_en_IN || 'N/A' },
          { label: 'నక్షత్రం', value: panchang.Nakshatra?.name_en_IN || 'N/A' },
          { label: 'యోగం', value: panchang.Yoga?.name_en_IN || 'N/A' },
          { label: 'కరణం', value: panchang.Karna?.name_en_IN || 'N/A' },
        ];
        setPanchangamData(data);
      } catch (error) {
        console.error("Error calculating Panchangam:", error);
        setPanchangamData([{ label: 'Error', value: 'Could not calculate' }]);
      }
    };

    calculatePanchangam();
  }, []);

  return (
    <div className="p-4 border rounded shadow-sm bg-white">
      <h2 className="text-xl font-bold mb-4">📅 పంచాంగం</h2>
      <table className="w-full text-sm">
        <tbody>
          {panchangamData.map((item, index) => (
            <tr key={index} className="border-t">
              <td className="py-2 font-medium">{item.label}</td>
              <td className="py-2">{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}