import { Settings } from 'settings';
import { DefaultSkillSetting } from 'defaults/DefaultSettings';

export const transformSettings = (userSettings: Settings): Settings => {
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

  // Default Skill Name and Weighting
  if (settings.skillSettings && settings.skillSettings.length !== 0) {
    for (const skillSetting of settings.skillSettings) {
      if (!skillSetting.name) {
        skillSetting.name = DefaultSkillSetting.name;
      }
      if (skillSetting.weighting === undefined) {
        skillSetting.weighting = DefaultSkillSetting.weighting;
      }
      if (skillSetting.id === undefined || skillSetting.id === null) {
        throw 'At least one item in `settings.skillSettings` does not have an id assigned';
      }
    }
  }

  if (settings.selection.numberOfCalendars > settings.numberOfCalendars) {
    throw '"settings.selection.numberOfCalendars" cannot be greater than "settings.numberOfCalendars"';
  }

  return settings;
};
