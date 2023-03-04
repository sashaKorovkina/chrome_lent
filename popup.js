const currentDate = new Date();
const startDate = new Date('2023-02-27');
const endDate = new Date('2023-04-08');

const daysSinceStart = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
const fastDuration = Math.floor((endDate - startDate) / (24 * 60 * 60 * 1000));

const allowedFoods = document.getElementById('allowed-foods');
const currentDateElement = document.getElementById('current-date');

function canEatMeat() {
  // Check if the current day is a Sunday or a holiday
  const dayOfWeek = currentDate.getDay();
  const holidays = [
    new Date('2023-03-25'), // Annunciation
    new Date('2023-04-02'), // Palm Sunday
  ];
  const isHoliday = holidays.some((holiday) => holiday.getTime() === currentDate.getTime());
  return dayOfWeek === 0 || isHoliday;
}

function canEatDairy() {
  // Check if the current day is a Sunday or a holiday, or if it's within the first week
  const dayOfWeek = currentDate.getDay();
  const holidays = [
    new Date('2023-03-25'), // Annunciation
    new Date('2023-04-02'), // Palm Sunday
  ];
  const isHoliday = holidays.some((holiday) => holiday.getTime() === currentDate.getTime());
  return dayOfWeek === 0 || isHoliday || daysSinceStart < 7;
}

function updatePopup() {
  // Update current date
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  currentDateElement.innerText = currentDate.toLocaleDateString('en-US', options);

  // Update allowed foods
  let html = '';
  if (daysSinceStart >= 0 && daysSinceStart <= fastDuration) {
    const canEatFish = !canEatMeat();
    const canEatCaviar = canEatFish && daysSinceStart >= 25;
    const canEatShellfish = canEatFish && daysSinceStart < 39;
    const canEatWine = !canEatDairy();

    if (canEatFish) {
      html += '<tr><td>Fish</td><td>Not allowed all day</td></tr>';
    }
    if (canEatCaviar) {
      html += '<tr><td>Caviar</td><td>Not allowed all day</td></tr>';
    }
    if (canEatShellfish) {
      html += '<tr><td>Shellfish</td><td>Not allowed all day</td></tr>';
    }
    if (canEatDairy()) {
      html += '<tr><td>Dairy</td><td>Not allowed all day</td></tr>';
    }
    if (canEatWine) {
      html += '<tr><td>Wine</td><td>Not allowed all day</td></tr>';
    }
  } else {
    html += '<tr><td colspan="2">The Great Lent is not currently active.</td></tr>';
  }
  allowedFoods.innerHTML = html;
}

updatePopup();
