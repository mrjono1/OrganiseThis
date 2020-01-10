import { SkillWeighting } from 'types';

export interface SkillSetting {
  id: number;
  name: string;
  description?: string;
  weighting: SkillWeighting;
}
