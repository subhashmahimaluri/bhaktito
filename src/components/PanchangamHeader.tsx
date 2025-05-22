import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Collapse,
  Autocomplete,
  TextField
} from '@mui/material';

interface PanchangamHeaderProps {
  yesterdayUrl: string;
  todayUrl: string;
  tomorrowUrl: string;
  yesterday: string;
  today: string;
  tomorrow: string;
  t: (key: string) => string;
  monthName: string;
  dateHeader: string;
  location: string;
  getGeoData: (city: string) => void;
  city: string;
}

const PanchangamHeader: React.FC<PanchangamHeaderProps> = ({
  yesterdayUrl,
  todayUrl,
  tomorrowUrl,
  yesterday,
  today,
  tomorrow,
  t,
  monthName,
  dateHeader,
  location,
  getGeoData,
  city,
}) => {
  const [openCollapse, setOpenCollapse] = useState<boolean>(false);

  return (
    <div className="panchang-header text-black bg-orange-500 text-white px-4 py-3 rounded-t-md shadow">
      <div className="flex flex-col md:flex-row items-start md:items-center w-full">
        <div className="flex-grow pl-2">

          {/* Nav Links */}
          <div className="panchang-nav mb-2">
            <ul className="flex gap-4 text-sm list-none p-0 m-0">
              <li className="nav-prev">
                <Link to={`/panchangam/${yesterdayUrl}`} className="hover:underline flex items-center gap-1">
                  <i className="icon icon-small-left" />
                  {yesterday}
                </Link>
              </li>
              <li className="nav-today">
                <Link to={`/panchangam/${todayUrl}`} className="hover:underline">
                  Today
                </Link>
              </li>
              <li className="nav-next">
                <Link to={`/panchangam/${tomorrowUrl}`} className="hover:underline flex items-center gap-1">
                  {tomorrow}
                  <i className="icon icon-small-right" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Title */}
          <div className="panchang-title flex items-center gap-2 mb-2">
            <span className="icon-sprite icon-sprite-balaji"></span>
            <h4 className="text-lg font-bold text-white">
              {t('panchang')} {t(monthName)} {dateHeader}
            </h4>
          </div>

          {/* Location Search Toggle */}
          <div className="collapse-search">
            <Button
              className="collapse-header text-sm bg-white text-black rounded px-3 py-1"
              aria-expanded={openCollapse}
              aria-controls="collapse-text"
              onClick={() => setOpenCollapse(!openCollapse)}
            >
              {location} <i className="icon icon-small-down ml-1" />
            </Button>

            <Collapse in={openCollapse}>
              <div id="collapse-text" className="mt-3">
                <Autocomplete
                  options={[]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search location"
                      variant="outlined"
                      size="small"
                      className="bg-white rounded"
                    />
                  )}
                  onInputChange={(_, value) => getGeoData(value || '')}
                  value={city}
                  sx={{ width: 300 }}
                />
              </div>
            </Collapse>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanchangamHeader;
