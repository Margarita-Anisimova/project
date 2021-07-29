export default class ButtonsEl {
    public button:PIXI.Graphics;

    constructor(i: number) {
        this.button = new PIXI.Graphics;
        this.button.beginFill(0x709fe9, 1);
        this.button.drawRect( window.sceneWidth/2 - window.sceneWidth/14, window.sceneHeight/2 + i * window.sceneHeight/18 + window.sceneHeight/27, window.sceneWidth/125, window.sceneHeight/75);
        this.button.endFill();
        this.button.buttonMode = true;
        this.button.interactive = true;
        window.app.stage.addChild(this.button);
    }
}