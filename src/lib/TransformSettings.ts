import { Settings } from '../settings';

export const transform = (userSettings: Settings): Settings => {
  const settings = JSON.parse(JSON.stringify(userSettings)) as Settings;

  // add default room if user didnt add one
  if (!settings.roomSettings) {
    settings.roomSettings = [
      {
        ...settings.defaultRoom,
        id: 1
      }
    ];
  }

  // add room to day if user didnt add one
  for (const daySetting of settings.daySettings) {
    if (!daySetting.dayRoomSettings) {
      daySetting.dayRoomSettings = [
        {
          id: 0,
          roomSettingId: 1,
          // Default span if none defined
          spanSettings: daySetting.spanSettings ?? [{ ...settings.defaultSpan }]
        }
      ];
      delete daySetting.spanSettings;
    }
  }

  if (settings.selection.bestCalendarsToKeep > settings.numberOfCalendars) {
    throw '"settings.selection.bestCalendarsToKeep" cannot be greater than "settings.numberOfCalendars"';
  }

  return settings;
};
