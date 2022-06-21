import { Reducer } from 'react';
import { Skill, State } from './models';

interface AddSkill {
  type: 'ADD_SKILL';
  skill: Skill;
}

interface RemoveSkill {
  type: 'REMOVE_SKILL';
  index: number;
}

type Action = AddSkill | RemoveSkill;

export const reducer: Reducer<State, Action> = (
  state = { skills: [], attackSpeed: 1 },
  action
) => {
  switch (action.type) {
    case 'ADD_SKILL':
      return {
        ...state,
        skills: [...state.skills, action.skill],
      };
    case 'REMOVE_SKILL':
      return {
        ...state,
        skills: state.skills.filter((_, i) => i !== action.index),
      };
    default:
      return state;
  }
};
