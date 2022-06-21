export type EngravingType =
  | 'adrenaline'
  | 'allOutAttack'
  | 'ambushMaster'
  | 'barricade'
  | 'cursedDoll'
  | 'disrespect'
  | 'grudge'
  | 'hitMaster'
  | 'increaseMass'
  | 'keenBluntWeapon'
  | 'masterBrawler'
  | 'mastersTenacity'
  | 'preciseDagger'
  | 'propulsion'
  | 'spiritAbsorption'
  | 'stabilizedStatus'
  | 'superCharge';

export interface Engraving {
  type: EngravingType;
  name: string;
  requires?:
    | 'shield'
    | 'backAttack'
    | 'frontAttack'
    | 'neutralAttack'
    | 'stagger'
    | 'lowHealth';
  damageModifier: DamageModifier[];
}

export interface DamageModifier {
  attackPower?: number;
  attackSpeed?: number;
  critRatePerc?: number;
  critDamage?: number;
  damageMultiplier?: number;
  damageAddition?: number;
}
