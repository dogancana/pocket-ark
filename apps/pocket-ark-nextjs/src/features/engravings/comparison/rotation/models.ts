export interface Skill {
  damage: number;
  shielded?: boolean;
  modifiers?: {
    crit?: number;
    critDamage?: number;
    attackSpeed?: number;
  };
}

export interface State {
  skills: Skill[];
  attackSpeed: number;
}
