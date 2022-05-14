export interface Engraving {
  name: string;
  requires?:
    | 'shield'
    | 'backAttack'
    | 'frontAttack'
    | 'neutralAttack'
    | 'stagger'
    | 'lowHealth';
  damageModifier: EngravingDamageModifier[];
}

export interface EngravingDamageModifier {
  attackPower?: number;
  attackSpeed?: number;
  critRatePerc?: number;
  critDamage?: number;
  damageMultiplier?: number;
  damageAddition?: number;
}
