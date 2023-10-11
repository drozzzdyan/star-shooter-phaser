export default class scoreBar {
  constructor(scene, x, y, value) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.value = value;
    this.render();
  }

  render() {
    this.scoreText = this.scene.add.text(this.x, this.y, `${this.value}`, {
      fontFamily: 'Pixelify Sans',
      fontSize: '30px',
      color: '#b755b9',
    })
  }

  update(value) {
    this.scoreText.text = `${value}`;
  }
}