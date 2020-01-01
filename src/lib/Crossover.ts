import { Settings } from '../settings';
import { Calendar } from './Calendar';
import { randomIndexAndItem, randomSplitArray } from '../helpers/random';
import { deepClone } from '../helpers/clone';
import { Day } from './Day';

const crossoverCalendars = (settings: Settings, calendarOne: Calendar, calendarTwo: Calendar): Calendar[] => {
  const calendarOneDays = deepClone(calendarOne.days());
  const calendarTwoDays = deepClone(calendarTwo.days());

  // Crossover Days
  const splitArray = randomSplitArray(settings.daySettings);
  // get just the Day ids from the first section
  const sectionDayIds = splitArray.array1.map(item => item.id);

  // get the specific Setting Day Id, Days from the second calendar, then add the rest from the first day
  const oneDays: Day[] = calendarTwoDays
    .filter(day => sectionDayIds.includes(day._daySetting.id))
    .concat(calendarOneDays.filter(day => !sectionDayIds.includes(day._daySetting.id)));

  // get the specific Setting Day Id, Days from the first calendar, then add the rest from the second day
  const twoDays: Day[] = calendarOneDays
    .filter(day => sectionDayIds.includes(day._daySetting.id))
    .concat(calendarTwoDays.filter(day => !sectionDayIds.includes(day._daySetting.id)));

  return [new Calendar(settings.idCounter++, settings, oneDays), new Calendar(settings.idCounter++, settings, twoDays)];
};

export const crossover = (settings: Settings, calendars: Calendar[]): Calendar[] => {
  const calendarOne = randomIndexAndItem(calendars, []);
  const calendarTwo = randomIndexAndItem(calendars, [calendarOne.index]);
  return crossoverCalendars(settings, calendarOne.item, calendarTwo.item);
};
