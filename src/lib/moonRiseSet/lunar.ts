import { sind, cosd } from './astroutil.js'
const deg2rad = Math.PI / 180.
const rad2deg = 180. / Math.PI


// Julian date at given time scale (Default is UTC)
Date.prototype.jd = function (ts) {
    let timeshift_seconds = 0
    if (ts == undefined) {
        ts = 'UTC'
    }
    else if (ts == TimeScale.TAI) {
        timeshift_seconds = utc2tai(this)
    }
    else if (ts == 'TT') {
        timeshift_seconds = utc2tai(this) + 32.184
    }
    else if (ts == 'GPS') {
        const utcgps0 = new Date(Date.UTC(1980, 0, 6))
        if (this > utcgps0)
            timeshift_seconds = utc2tai(this) - 19
    }
    return ((this.valueOf() + timeshift_seconds * 1000) / 86400000)
        + 2440587.5
}

const gmst = (jd_ut1) => {
  // Convert seconds to radians
  // Expression below gives gmst in seconds
  let tut1 = (jd_ut1 - 2451545.0) / 36525.0

  let gmst = 67310.54841
      + tut1 * ((876600.0 * 3600.0 + 8640184.812866))
      + (tut1 * (0.093104 - tut1 * 6.2E-6));
  gmst = (gmst % 86400.0) / 240.0 * Math.PI / 180.0;
  if (gmst < 0) {
      gmst = gmst + 2.0 * Math.PI
  }
  return gmst;
}

const jd2Date = function (jdUTC) {
  return new Date((jdUTC - 2440587.5) * 86400 * 1000)
}

export const moonRiseSet = (thedate, coord) => {

  let observer_longitude = coord.longitude()
  let observer_latitude = coord.geocentric_latitude()

  // accurate to 10 seconds
  let tolerance = 10 / 86400
  let fields = ['rise', 'set']


  let [hrise, hset] = fields.map((v, riseidx) => {
      let cnt = 0
      let JDtemp = Math.floor(thedate.jd()) + 0.5 - observer_longitude / (2.0 * Math.PI)
      let deltaUT = .001
      let deltaJD = 0.0
      let deltaGHA = undefined
      let GHA = 0
      while ((cnt < 10) && (Math.abs(deltaUT) > tolerance)) {
          let T = (JDtemp - 2451545.0) / 36525.0
          let lambda_ecliptic = deg2rad *
              (218.32 + 481267.8813 * T +
                  6.29 * sind(134.9 + 477198.85 * T) -
                  1.27 * sind(259.2 - 413335.38 * T) +
                  0.66 * sind(235.7 + 890534.23 * T) +
                  0.21 * sind(269.9 + 954397.70 * T) -
                  0.19 * sind(357.5 + 35999.05 * T) -
                  0.11 * sind(186.6 + 966404.05 * T))

          let phi_ecliptic = deg2rad *
              (5.13 * sind(93.3 + 483202.03 * T) +
                  0.28 * sind(228.2 + 960400.87 * T) -
                  0.28 * sind(318.3 + 6003.18 * T) -
                  0.17 * sind(217.6 - 407332.20 * T))

          let obliquity = (23.439291 - 0.0130042 * T) * deg2rad

          let pX = Math.cos(phi_ecliptic) * Math.cos(lambda_ecliptic)
          let pY =
              Math.cos(obliquity) * Math.cos(phi_ecliptic) * Math.sin(lambda_ecliptic) - Math.sin(obliquity) * Math.sin(phi_ecliptic)
          let pZ =
              Math.sin(obliquity) * Math.cos(phi_ecliptic) * Math.sin(lambda_ecliptic) +
              Math.cos(obliquity) * Math.sin(phi_ecliptic)


          // Right ascension & declination of moon
          let ra = Math.atan2(pY, pX)
          let dec = Math.asin(pZ)

          let gmst_ = gmst(JDtemp)
          let GHAn = gmst_ - ra
          let LHA = GHAn + observer_longitude
          if (deltaGHA == undefined) {
              deltaGHA = 347.81 * deg2rad
          }
          else {
              deltaGHA = ((GHAn - GHA) / deltaUT)
          }
          if (deltaGHA < 0) {
              deltaGHA = deltaGHA + 2.0 * Math.PI / Math.abs(deltaUT)
          }
          let cosLHAn = (0.00233 - Math.sin(observer_latitude) * Math.sin(dec)) /
              (Math.cos(observer_latitude) * Math.cos(dec))
          if (Math.abs(cosLHAn) > 1.0) {
              deltaUT = 1;
          } // advance one day
          else {
              let LHAn = Math.acos(cosLHAn)
              if (riseidx == 0) {
                  LHAn = 2.0 * Math.PI - LHAn
              }
              deltaUT = (LHAn - LHA) / deltaGHA
              if (deltaUT < -0.5) {
                  deltaUT = deltaUT + 2.0 * Math.PI / deltaGHA
              }
              else if (deltaUT > 0.5) {
                  deltaUT = deltaUT - 2.0 * Math.PI / deltaGHA
              }
              if (deltaJD + deltaUT < 0.0) {
                  deltaUT = deltaUT + 1
              }
              GHA = GHAn
          } // end of not advancing one day
          JDtemp = JDtemp + deltaUT
          deltaJD = deltaJD + deltaUT
          cnt = cnt + 1
      }
      return jd2Date(JDtemp)
  })


  return {
      rise: hrise,
      set: hset
  }
}