export class Player {
  [k: string]: any;
  id: number | string = '';
  protagonistHealthPoint: number = 0;
  playerAmmo: number = 0;
  currentWeaponName: string = '';
  currentWeaponMinDamage: number = 0;
  currentWeaponMaxDamage: number = 0;
}
