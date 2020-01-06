import { deepClone, randomIndexAndItem } from 'helpers';
import { Calendar } from 'index';
import { Settings } from 'settings';

const mutateCalendar = (calendar: Calendar): Calendar => {
  const mutatedCalendar = deepClone<Calendar>(calendar);

  return mutatedCalendar;
};

export const mutate = (settings: Settings, calendars: Calendar[]): Calendar[] => {
  // todo random number of items from 1 to calendars.length
  const { item } = randomIndexAndItem(calendars);

  //const result = calendars.filter((calendar, calendarIndex) => calendarIndex !== index);

  const result: Calendar[] = [];
  const mutatedItem = mutateCalendar(item);
  result.push(mutatedItem);
  return result;
};
