class MenuBtn extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, name, textInner) {
    super(scene, x, y, name);
    this.scene = scene;
    this.setInteractive();
    this.setTexture('btn-menu');
    this.scene.add.existing(this); //add the sprite to the stage

    scene.add.text(x, y, `${textInner}`, {
      fontFamily: 'Arial',
      fontSize: '20px',
      color: '#b755b9',
    }).setOrigin(0.5)

    this.on('pointerover', () => {
      this.setTexture('btn-menu-active');
    })

    this.on('pointerout', () => {
      this.setTexture('btn-menu');
    })
  }


}