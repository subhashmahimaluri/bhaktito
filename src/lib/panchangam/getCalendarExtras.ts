/**
 * Helper to determine Ayana from solar longitude in degrees.
 * Makara Sankranti (~270°) and Karka Sankranti (~90°)
 */
export function getAyana(solarLongitudeDeg: number): string {
  if (solarLongitudeDeg >= 270 || solarLongitudeDeg < 90) {
    return 'Uttarayana';
  } else {
    return 'Dakshinayana';
  }
}

/**
 * Get Drik Ritu (season) from solar longitude in degrees.
 */
export function getDrikRitu(solarLongitudeDeg: number): string {
  const index = Math.floor(solarLongitudeDeg / 60) % 6;
  const rituList = ['Vasanta', 'Grishma', 'Varsha', 'Sharad', 'Hemanta', 'Shishira'];
  return rituList[index];
}

/**
 * Get Telugu year name from Saka year or any 60-year cycle number.
 * Cycle: Prabhava, Vibhava, etc. Wraps every 60 years.
 */
export function getTeluguYearName(sakaYear: number): string {
  const teluguYearNames = [
    'Prabhava', 'Vibhava', 'Shukla', 'Pramoda', 'Prajothpatti', 'Aangirasa',
    'Shrimukha', 'Bhava', 'Yuva', 'Dhathu', 'Eeshwara', 'Bahudhanya',
    'Pramathi', 'Vikrama', 'Vrisha', 'Chitrabhanu', 'Subhanu', 'Taarana',
    'Paarthiva', 'Vyaya', 'Sarvajit', 'Sarvadhari', 'Virodhi', 'Vikruti',
    'Khara', 'Nandana', 'Vijaya', 'Jaya', 'Manmatha', 'Durmukhi',
    'Hevilambi', 'Vilambi', 'Vikaari', 'Shaarvari', 'Plava', 'Shubhakrit',
    'Shobhakrith', 'Krodhi', 'Vishwavasu', 'Parabhava', 'Plavanga', 'Keelaka',
    'Saumya', 'Sadharana', 'Virodhikrith', 'Paridhavi', 'Pramadicha', 'Aananda',
    'Rakshasa', 'Nala', 'Pingala', 'Kalayukthi', 'Siddharthi', 'Raudra',
    'Durmathi', 'Dundubhi', 'Rudhirodgaari', 'Raktakshi', 'Krodhana', 'Akshaya'
  ];

  const index = (sakaYear - 1) % 60;
  return teluguYearNames[index];
}
