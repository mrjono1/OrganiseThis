import { Settings } from 'settings';
import { Calendar, Day } from 'lib';
import { deepClone, randomIndexAndItem, randomIndex, randomTrueFalse } from 'helpers';

const crossoverCalendars = (settings: Settings, calendarOne: Calendar, calendarTwo: Calendar): Calendar[] => {
  const calendarOneDays = deepClone(calendarOne.days);
  const calendarTwoDays = deepClone(calendarTwo.days);

  // Get Random Crossover start point
  let startIndex = randomIndex(settings.daySettings, { cannotBeLastIndex: true });

  // Get Random Crossover end point
  let endIndex = randomIndex(settings.daySettings, { startIndex }) + 1;

  // if nothing is to be swapped then randomly chop from the start or end
  if (startIndex === 0 && endIndex === settings.daySettings.length) {
    if (randomTrueFalse()) {
      startIndex++;
    } else {
      endIndex--;
    }
  }

  // Crossover Days
  const splitArray = settings.daySettings.slice(startIndex, endIndex);
  // get just the Day ids from the first section
  const sectionDayIds = splitArray.map(item => item.id);

  const oneDays: Day[] = [];
  const twoDays: Day[] = [];

  // build up the new day lists
  for (const daySetting of settings.daySettings) {
    if (sectionDayIds.includes(daySetting.id)) {
      const twoDay = calendarTwoDays.find(day => day.daySetting.id === daySetting.id);
      if (twoDay) {
        oneDays.push(twoDay);
      }
      const oneDay = calendarOneDays.find(day => day.daySetting.id === daySetting.id);
      if (oneDay) {
        twoDays.push(oneDay);
      }
    } else {
      const oneDay = calendarOneDays.find(day => day.daySetting.id === daySetting.id);
      if (oneDay) {
        oneDays.push(oneDay);
      }
      const twoDay = calendarTwoDays.find(day => day.daySetting.id === daySetting.id);
      if (twoDay) {
        twoDays.push(twoDay);
      }
    }
  }

  return [new Calendar(settings.idCounter++, settings, oneDays), new Calendar(settings.idCounter++, settings, twoDays)];
};

export const crossover = (settings: Settings, calendars: Calendar[]): Calendar[] => {
  const resultItems: Calendar[] = [];
  const indexesUsed: number[] = [];

  // ensure we only corssover the amount of items that exist
  const crossovers =
    settings.crossover.numberOfCalendars < calendars.length ? settings.crossover.numberOfCalendars : calendars.length;

  for (let index = 0; index < crossovers; index++) {
    const calendarOne = randomIndexAndItem(calendars, indexesUsed);
    indexesUsed.push(calendarOne.index);

    // dont crossover with the current item
    const calendarTwo = randomIndexAndItem(calendars, [calendarOne.index]);
    const crossoverItems = crossoverCalendars(settings, calendarOne.item, calendarTwo.item);

    // add crossover items
    resultItems.push(crossoverItems[0]);
    resultItems.push(crossoverItems[1]);
  }

  return resultItems;
};
