export default class ProgressBar {
  constructor(scene) {
    this.scene = scene;
    this.init();
  }

  init() {
    this.progressBox = this.scene.add.graphics();
    this.progressBar = this.scene.add.graphics();

    this.showProgressBox();
    this.showProgressBar();

    this.scene.load.on('progress', this.showProgressBar, this)
  }

  showProgressBox() {
    this.progressBoxWidth = this.scene.sys.game.config.width * 0.8;
    this.progressBoxHeight = 30;
    this.progressBoxX = (this.scene.sys.game.config.width - this.progressBoxWidth) / 2;
    this.progressBoxY = this.scene.sys.game.config.height * 0.9;

    this.progressBox.fillStyle(0x2f2f2f, 1);
    this.progressBox.fillRect(this.progressBoxX, this.progressBoxY, this.progressBoxWidth, this.progressBoxHeight);
  }

  showProgressBar(progress = 0) {
    this.indent = 5;
    const x = this.progressBoxX + this.indent;
    const y = this.progressBoxY + this.indent;
    const width = this.progressBoxWidth - this.indent * 2;
    const height = this.progressBoxHeight - this.indent * 2;

    this.progressBar.fillStyle(0xb755b9, 1);
    this.progressBar.fillRect(x, y, width * progress, height);
  }
}