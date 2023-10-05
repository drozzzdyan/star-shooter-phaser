import shipsConfigs from "../constants/PlayerConfigs.js";

export default class SpecificationsWindow {
  constructor(scene) {
    this.scene = scene;
    this.init();
  }

  init() {
    this.box = this.scene.add.graphics();
    this.boxWidth = 200;
    this.boxHeight = 150;
    this.boxRadius = 10;
    this.boxLeftOffset = this.scene.sys.game.config.width / 2;
    this.boxTopOffset = 30;
  }

  clear() {
    this.box.clear()
  }

  renderText() {
    const specifications = ['Health', 'Speed', 'Attack', 'Damage'];
    let indent = 35;
    specifications.forEach(el => {
      this.scene.add.text(this.boxLeftOffset + 10, this.boxTopOffset + indent, el, {
        fontFamily: 'Pixelify Sans',
        fontSize: '16px',
        color: '#b755b9',
      })
      indent += 20;
    });
  }

  showSpecificationsWindow(shipType = 1) {
    this.box.strokeRect(this.boxLeftOffset, this.boxTopOffset, this.boxWidth, this.boxHeight, this.boxRadius);
    this.box.lineStyle(2, 0xb755b9, 1);

    let maxHealth = 0;
    let maxSpeed = 0;
    let maxAttackSpeed = 0;
    let maxDamage = 0;

    shipsConfigs.forEach(el => {
      maxHealth = maxHealth < el.health ? el.health : maxHealth;
      maxSpeed = maxSpeed < el.speed ? el.speed : maxSpeed;
      maxAttackSpeed = maxAttackSpeed < 1 / el.shotDelay ? 1 / el.shotDelay : maxAttackSpeed;
      maxDamage = maxDamage < el.damage ? el.damage : maxDamage;
    });

    const shipConfig = shipsConfigs.find(ship => ship.type === shipType);
    const maxBarWidth = 80;
    const barColors = [0xff0000, 0x6a0fab, 0x0f48ab, 0xad5c05];
    const barValues = [
      shipConfig.health / maxHealth * maxBarWidth,
      shipConfig.speed / maxSpeed * maxBarWidth,
      1 / shipConfig.shotDelay / maxAttackSpeed * maxBarWidth,
      shipConfig.damage / maxDamage * maxBarWidth
    ]

    let indent = 40;
    for (let i = 0; i < 4; i++) {
      this.box.fillStyle(barColors[i], 0.8);
      this.box.fillRect(this.boxLeftOffset + this.boxWidth / 2, this.boxTopOffset + indent, barValues[i], 4);
      indent += 21;
    }
  }
}