import СhoiceGame from "./СhoiceGame";

export default class MainMenu {
    public buttons: PIXI.Sprite[];
    public choice: СhoiceGame;
    constructor() {
        this.buttons = [];
        this.AddButtons();
    }

    AddButtons() {
        screen.orientation.lock('landscape');
        let a = new PIXI.Sprite(PIXI.Texture.WHITE)
        a.x = 50;
        a.y = 10;
        a.tint = 0xFF0000;
        window.app.stage.addChild(a);
        a.width = 100;
        a.height = 100;
        let b = new PIXI.Text();
        b.text = screen.width + 'x' + screen.height;
        b.x = b.y = 10;
        window.app.stage.addChild(b);
        this.buttons[0] = new PIXI.Sprite(PIXI.Texture.from("./assets/Image/Eugene.png"));
        this.buttons[1] = new PIXI.Sprite(PIXI.Texture.from("./assets/Image/Marina.png"));
        this.buttons[2] = new PIXI.Sprite(PIXI.Texture.from("./assets/Image/Rita.png"));
        for (let i = 0; i < 3; i++) {

            this.buttons[i].y = i * 100// window.app.screen.height - window.app.screen.height / 10 - (i * window.app.screen.height / 10 + 20);
            this.buttons[i].width = window.app.screen.width / 2;
            this.buttons[i].height = window.app.screen.height / 11;
            this.buttons[i].x = 0// -50
            // this.buttons[i].y = this.buttons[i].height * 3 - this.buttons[i].height * i;;// this.buttons[i].height * i
            this.buttons[i].buttonMode = true;
            this.buttons[i].interactive = true;
            this.buttons[i].on("pointerdown", this.ClickButton.bind(this, i));
            // this.buttons[i].x = 20;
            // this.buttons[i].y = window.app.screen.height - window.app.screen.height / 10 - (i * window.app.screen.height / 10 + 20);
            // this.buttons[i].width = window.app.screen.width / 4.5;
            // this.buttons[i].height = window.app.screen.height / 11;
            // this.buttons[i].buttonMode = true;
            // this.buttons[i].interactive = true;
            // this.buttons[i].on("pointerdown", this.ClickButton.bind(this, i));
            window.app.stage.addChild(this.buttons[i]);

        }
    }

    ClickButton(i: number) {
        this.RemoveButtons();
        this.choice = new СhoiceGame(i, this);
    }

    RemoveButtons() {
        for (let i = 0; i < 3; i++) {
            this.buttons[i].destroy();
        }
    }
}