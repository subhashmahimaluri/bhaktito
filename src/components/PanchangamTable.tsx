"use client";

import React, { useEffect, useState } from 'react';
import { YexaaPanchang } from '../lib/panchangam';
import { formatTimeIST } from './utils';
import * as mrs from '@/lib/moonRiseSet';

type PanchangamItem = {
  label: string;
  value: string;
};

export default function PanchangamTable() {
  const [panchangamData, setPanchangamData] = useState<PanchangamItem[]>([]);
  const [sunTime, setSunTime] = useState<any>({});
  const [moonTime, setMoonTime] = useState<any>({});

  useEffect(() => {
    const calculatePanchangam = () => {
      try {
        const today = new Date();
        const latitude = 17.385044; // Hyderabad
        const longitude = 78.486671;

        const obj = new YexaaPanchang();
        const p = obj.calendar(today, latitude, longitude);

        let sunObj = obj.sunTimer(
          today,
          latitude,
          longitude
        );

        let dateForMoon = new Date(today);
         let dateForMoonFormat = new Date(dateForMoon.getFullYear(), dateForMoon.getMonth(), dateForMoon.getDate());
        let groundpos = mrs.ITRFCoord.fromGeodeticDeg(latitude, longitude, 0);
        const moonObj = mrs.moonRiseSet(dateForMoonFormat, groundpos);

        setMoonTime(moonObj);

        const data: PanchangamItem[] = [
          { label: 'Tithi', value: p.Tithi?.name_en_IN || p.Tithi?.name_en_IN || 'N/A' },
          { label: 'Nakshatra', value: p.Nakshatra?.name_en_IN || 'N/A' },
          { label: 'Yoga', value: p.Yoga?.name_en_IN || 'N/A' },
          { label: 'Karana', value: p.Karna?.name_en_IN || 'N/A' },
        ];

        setPanchangamData(data);
        setSunTime(sunObj);
      } catch (error) {
        console.error("Error calculating Panchangam:", error);
        setSunTime({});
        setMoonTime({});
        setPanchangamData([{ label: 'Error', value: 'Could not calculate' }]);
      }
    };

    calculatePanchangam();
  }, []);

  return (
    <div className="panchang-box-details">
      {/* Date Information */}
      <div className="panchang-box-data-block panchang-data-day">
        <ol className="text-sm">
          <li>
            <span className="font-bold">Vikram Samvat</span> - <span>Kalayukti 2082, Vaisakha 24</span>
          </li>
          <li>
            <span className="font-bold">Indian Civil Calendar</span> - <span>1947, Vaisakha 31</span>
          </li>
          <li>
            <span className="font-bold">Purnimanta Month</span> - <span>2082, Jyeshta 9</span>
          </li>
          <li>
            <span className="font-bold">Amanta Month</span> - <span>2082, Vaisakha 24</span>
          </li>
        </ol>
      </div>

      {/* Tithi Details */}
      <div className="panchang-box-data-block panchang-data-tithi">
        <span className="block font-bold">Tithi</span>
        <ol className="text-sm">
          <li>
            <span className="font-bold">
              Krishna Paksha Navami&nbsp;
            </span>
            &nbsp;-&nbsp;<span>May 21 04:55 AM – May 22 03:22 AM</span>
          </li>
          <li>
            <span className="font-bold">
              Krishna Paksha Dasami&nbsp;
            </span>
            &nbsp;-&nbsp;<span>May 22 03:22 AM – May 23 01:12 AM</span>
          </li>
        </ol>
      </div>

      {/* Nakshatra Details */}
      <div className="panchang-box-data-block panchang-data-nakshatra">
        <span className="block font-bold">Nakshatra</span>
        <ol className="text-sm">
          <li>
            <span className="font-bold">
              <a href="/astrology/nakshatra/satabhisha-nakshatra.htm">Shatabhisha</a>
            </span>
            &nbsp;-&nbsp;<span>May 20 07:32 PM – May 21 06:58 PM</span>
          </li>
          <li>
            <span className="font-bold">
              <a href="/astrology/nakshatra/purva-bhadrapada-nakshatra.htm">Purva Bhadrapada</a>
            </span>
            &nbsp;-&nbsp;<span>May 21 06:58 PM – May 22 05:47 PM</span>
          </li>
        </ol>
      </div>

      <div className="panchang-box-data-block panchang-date">
          <h4 className="gr-text-6 text-black block font-bold">Sun & Moon Timing</h4>
          <ul className="list-unstyled gr-text-8">
            <li><span className="font-bold">Sunrise</span> : {formatTimeIST(sunTime.sunRise)}</li>
            <li><span className="font-bold">Sunset</span> : {formatTimeIST(sunTime.sunSet)}</li>
            <li><span className="font-bold">Moonrise</span> : {formatTimeIST(moonTime.rise)}</li>
            <li><span className="font-bold">Moonset</span> : {formatTimeIST(moonTime.set)}</li>
          </ul>
        </div>

      {/* Karana Details */}
      <div className="panchang-box-data-block panchang-data-karana">
        <span className="block font-bold">Karana</span>
        <ol className="text-sm">
          <li>
            <span className="font-bold">Taitila</span> - <span>May 21 04:56 AM – May 21 04:13 PM</span>
          </li>
          <li>
            <span className="font-bold">Garija</span> - <span>May 21 04:13 PM – May 22 03:22 AM</span>
          </li>
          <li>
            <span className="font-bold">Vanija</span> - <span>May 22 03:22 AM – May 22 02:21 PM</span>
          </li>
        </ol>
      </div>

      {/* Yoga Details */}
      <div className="panchang-box-data-block panchang-data-yoga">
        <span className="block font-bold">Yoga</span>
        <ol className="text-sm">
          <li>
            <span className="font-bold">Vaidhruthi</span> - <span>May 21 02:50 AM – May 22 12:34 AM</span>
          </li>
          <li>
            <span className="font-bold">Vishkambha</span> - <span>May 22 12:34 AM – May 22 09:49 PM</span>
          </li>
        </ol>
      </div>

      {/* Vara Details */}
      <div className="panchang-box-data-block panchang-data-vaasara">
        <span className="block font-bold">Vara</span>
        <ol className="text-sm">
          <li>
            <span className="font-bold">Budhwar (Wednesday)</span>
          </li>
        </ol>
      </div>
    </div>
  );
}