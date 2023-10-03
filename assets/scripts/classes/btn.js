export default class Btn extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, name, frameStatic, frameActive, textInner) {
    super(scene, x, y, name, frameStatic);
    this.scene = scene;
    this.frameStatic = frameStatic;
    this.frameActive = frameActive;
    this.setInteractive();
    this.scene.add.existing(this); //add the sprite to the stage

    scene.add.text(x, y, `${textInner}`, {
      fontFamily: 'Pixelify Sans',
      fontSize: '18px',
      color: '#b755b9',
    }).setOrigin(0.5)

    this.on('pointerover', () => {
      this.setTexture('btn', this.frameActive);
    })

    this.on('pointerout', () => {
      this.setTexture('btn', this.frameStatic);
    })
  }
}