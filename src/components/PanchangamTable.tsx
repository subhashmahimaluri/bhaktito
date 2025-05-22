"use client";

import React, { useEffect, useState } from 'react';
import { YexaaPanchang } from '../lib/panchangam';
import {
  formatFullDateWithWeekday,
  formatTimeIST,
  startEndDateFormat
} from './utils';
import { moonRiseSet, ITRFCoord } from '@/lib/moonRiseSet';

const LAT_HYDERABAD = 17.385044;
const LNG_HYDERABAD = 78.486671;
const today = new Date();
// const today = new Date("2026-03-20");

interface PanchangamData {
  tithi?: string;
  tithiTime?: string;
  nakshatra?: string;
  nakshatraTime?: string;
  yoga?: string;
  karana?: string;
  yogaTime?: string;
  karanaTime?: string;
  moonMasa?: string;
  masa?: string;
  paksha?: string;
  day?: string;
}

interface SunTime {
  sunRise?: string;
  sunSet?: string;
}

interface MoonTime {
  rise?: Date;
  set?: Date;
}

export default function PanchangamTable() {
  const [panchangamData, setPanchangamData] = useState<PanchangamData>({});
  const [sunTime, setSunTime] = useState<SunTime>({});
  const [moonTime, setMoonTime] = useState<MoonTime>({});

  useEffect(() => {
    const calculatePanchangam = () => {
      try {
        const panchang = new YexaaPanchang();

        const panchangamCalendar = panchang.calendar(today, LAT_HYDERABAD, LNG_HYDERABAD);
        const panchangamCalculate = panchang.calculate(today);

        console.log('panchangamCalendar', panchangamCalendar);

        const tithiDates = panchang.getTithiDates(today.getFullYear(), 0, LAT_HYDERABAD, LNG_HYDERABAD);

        console.log('tithiDates', tithiDates);

        const sunTimes = panchang.sunTimer(today, LAT_HYDERABAD, LNG_HYDERABAD);

        const dateForMoon = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const groundPosition = ITRFCoord.fromGeodeticDeg(LAT_HYDERABAD, LNG_HYDERABAD, 0);
        const moonTimes = moonRiseSet(dateForMoon, groundPosition);

        const data: PanchangamData = {
          tithi: panchangamCalculate.Tithi?.name_en_IN || '',
          tithiTime: startEndDateFormat(panchangamCalculate.Tithi.start, panchangamCalculate.Tithi.end),
          nakshatra: panchangamCalculate.Nakshatra?.name_en_IN || '',
          nakshatraTime: startEndDateFormat(panchangamCalculate.Nakshatra.start, panchangamCalculate.Nakshatra.end),
          yoga: panchangamCalculate.Yoga?.name_en_IN || '',
          yogaTime: startEndDateFormat(panchangamCalculate.Yoga.start, panchangamCalculate.Yoga.end),
          karana: panchangamCalculate.Karna?.name_en_IN || '',
          karanaTime: startEndDateFormat(panchangamCalculate.Karna.start, panchangamCalculate.Karna.end),
          moonMasa: panchangamCalendar.MoonMasa?.name_en_IN || '',
          masa: panchangamCalendar.Masa?.name_en_IN || '',
          paksha: panchangamCalculate.Paksha?.name_en_IN || '',
          day: panchangamCalculate.Day?.name_en_UK || ''
        };

        setPanchangamData(data);
        setSunTime(sunTimes);
        setMoonTime(moonTimes);
      } catch (error) {
        console.error("Error calculating Panchangam:", error);
        setSunTime({});
        setMoonTime({});
        setPanchangamData({});
      }
    };

    calculatePanchangam();
  }, []);

  return (
    <div className="panchang-box-details">
      {/* Date Information */}
      <div className="panchang-box-data-block panchang-data-day">
        <ol className="text-sm">
          <li><span className="font-bold">Date</span> - <span>{formatFullDateWithWeekday(today)}</span></li>
          <li><span className="font-bold">Vikram Samvat</span> - <span>Kalayukti 2082, Vaisakha 24</span></li>
          <li><span className="font-bold">Indian Civil Calendar</span> - <span>1947, Vaisakha 31</span></li>
          <li><span className="font-bold">Purnimanta Month</span> - <span>{panchangamData.moonMasa}</span></li>
          <li><span className="font-bold">Amanta Month</span> - <span>{panchangamData.masa}</span></li>
        </ol>
      </div>

      {/* Tithi */}
      <div className="panchang-box-data-block panchang-data-tithi">
        <span className="block font-bold">Tithi</span>
        <ol className="text-sm">
          <li>
            <span className="font-bold">{panchangamData.paksha} Paksha {panchangamData.tithi}</span>
            &nbsp;-&nbsp;<span>{panchangamData.tithiTime}</span>
          </li>
        </ol>
      </div>

      {/* Nakshatra */}
      <div className="panchang-box-data-block panchang-data-nakshatra">
        <span className="block font-bold">Nakshatra</span>
        <ol className="text-sm">
          <li>
            <span className="font-bold">
              <a href="/astrology/nakshatra/satabhisha-nakshatra.htm">{panchangamData.nakshatra}</a>
            </span>
            &nbsp;-&nbsp;<span>{panchangamData.nakshatraTime}</span>
          </li>
        </ol>
      </div>

      {/* Sun & Moon Timing */}
      <div className="panchang-box-data-block panchang-date">
        <h4 className="gr-text-6 text-black block font-bold">Sun & Moon Timing</h4>
        <ul className="list-unstyled gr-text-8">
          <li><span className="font-bold">Sunrise</span> : {formatTimeIST(sunTime.sunRise)}</li>
          <li><span className="font-bold">Sunset</span> : {formatTimeIST(sunTime.sunSet)}</li>
          <li><span className="font-bold">Moonrise</span> : {formatTimeIST(moonTime.rise)}</li>
          <li><span className="font-bold">Moonset</span> : {formatTimeIST(moonTime.set)}</li>
        </ul>
      </div>

      {/* Karana */}
      <div className="panchang-box-data-block panchang-data-karana">
        <span className="block font-bold">Karana</span>
        <ol className="text-sm">
          <li>
            <span className="font-bold">{panchangamData.karana}</span>
            &nbsp;-&nbsp;<span>{panchangamData.karanaTime}</span>
          </li>
        </ol>
      </div>

      {/* Yoga */}
      <div className="panchang-box-data-block panchang-data-yoga">
        <span className="block font-bold">Yoga</span>
        <ol className="text-sm">
          <li>
            <span className="font-bold">{panchangamData.yoga}</span>
            &nbsp;-&nbsp;<span>{panchangamData.yogaTime}</span>
          </li>
        </ol>
      </div>
    </div>
  );
}