export const calculateDamage = (attacker, defender) => {
  const randomFactor = Math.random();

  return (
    ((((2 * attacker.level) / 5 + 2) *
      attacker.base.Speed *
      (attacker.base.Attack / defender.base.Defense)) /
      50 +
      2) *
    randomFactor
  ).toFixed(0);
};
