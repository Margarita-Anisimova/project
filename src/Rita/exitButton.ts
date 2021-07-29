import СhoiceGame from "../_Main/СhoiceGame";

export default class Lift {

    public exit: PIXI.Sprite;
    public choiceGame: СhoiceGame;
    private game: any

    constructor(choiceGame: СhoiceGame, game: any) {
        this.choiceGame = choiceGame;
        this.game = game
        this.exit = new PIXI.Sprite(PIXI.Texture.from("src/_Main/Image/back.png"));
        this.exit.width = 100;
        this.exit.height = 100;
        this.exit.x = window.app.screen.width - 100;
        this.exit.y = 0;
        this.exit.buttonMode = true;
        this.exit.interactive = true;
        this.exit.on('pointerdown', this.end.bind(this));
        window.app.stage.addChild(this.exit);
    }

    end() {
        PIXI.utils.clearTextureCache()
        window.app.loader.destroy();
        window.app.stage.removeChildren();
        if (this.game.ind) {
            this.game.ind.forEach((e) => window.app.loader.onComplete.detach(e))
        }

        window.app.ticker.remove;
        this.choiceGame.Create(this.choiceGame.autor);
    }
}