import { deepClone } from 'helpers';
import { Calendar } from 'index';
import { Settings } from 'settings';
import { randomItems } from 'helpers/random';

// Find one person assigned or where one could be and replace it
const mutateCalendar = (calendar: Calendar): Calendar => {
  const mutatedCalendar = deepClone<Calendar>(calendar);

  // const day = randomItem(calendar.days);

  // const room = randomItem(day.rooms);

  // const span = randomItem(room.spans);

  // const person = span.person;

  return mutatedCalendar;
};

export const mutate = (settings: Settings, calendars: Calendar[]): Calendar[] => {
  const items = randomItems(calendars, { numberOfItems: settings.mutation.numberOfCalendars });

  const result: Calendar[] = [];
  for (const item of items) {
    const mutatedItem = mutateCalendar(item);
    result.push(mutatedItem);
  }
  return result;
};
