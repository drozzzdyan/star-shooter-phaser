import Enemy from "./Enemy.js";
import enemiesConfigs from "../constants/EnemyConfigs.js";

export default class Enemies extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);
    this.scene = scene;
    this.delayEnemyCreate = 17000;
    this.timer = this.scene.time.addEvent({
      delay: this.delayEnemyCreate,
      loop: true,
      callback: this.tick,
      callbackScope: this,
    })

    this.timerChanger = this.scene.time.addEvent({
      delay: this.delayEnemyCreate,
      loop: true,
      callback: this.timeChange,
      callbackScope: this,
    })
  }

  tick() {
    this.createEnemiesGroup();
  }

  timeChange() {
    if (this.timer.delay > 10000) {
      this.timer.delay -= 300;
    } else {
      this.timerChanger.destroy();
    }
  }

  createEnemiesGroup() {
    const randomEnemy = this.generateRandomEnemy();
    const enemyType = randomEnemy.type;
    const quantityEnemies = Phaser.Math.Between(randomEnemy.minQuantity, randomEnemy.maxQuantity);
    const startPositionX = this.scene.sys.game.config.width;
    const positionsY = this.generateRandomPositionsY(quantityEnemies);

    for (let i = 0; i < quantityEnemies; i++) {
      this.createEnemy(startPositionX + Phaser.Math.Between(0, 1200), positionsY[i], enemyType);
    }
  }

  createEnemy(x, y, enemyType) {
    let enemy = this.getFirstDead();


    if (!enemy) {
      enemy = Enemy.generate(this.scene, x, y, enemyType);
      this.add(enemy);
      enemy.move();
    } else {
      enemy.reset(x, y, enemyType);
    }
    enemy.move();
  }

  generateRandomPositionsY(quantity) {
    const spread = 10;
    const startY = 90;
    const endY = this.scene.sys.game.config.height - 20;
    const differenceY = endY - startY;
    const stepY = differenceY / quantity;

    let positionsY = [];
    for (let i = 0; i < quantity; i++) {
      const positionY = Math.ceil(startY + i * stepY + Phaser.Math.Between(-spread, spread));
      positionsY.push(positionY);
    }

    return positionsY;
  }

  generateRandomEnemy() {
    const randomValue = Math.random();
    let cumulativeProbability = 0;

    for (const enemy of enemiesConfigs) {
      cumulativeProbability += enemy.probability;
      if (randomValue <= cumulativeProbability) {
        return enemy;
      }
    }

    return null;
  }
}