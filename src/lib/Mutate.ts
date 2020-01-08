import { deepClone } from 'helpers';
import { Calendar } from 'index';
import { Settings } from 'settings';
import { randomItems } from 'helpers/random';

const mutateCalendar = (calendar: Calendar): Calendar => {
  const mutatedCalendar = deepClone<Calendar>(calendar);

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
