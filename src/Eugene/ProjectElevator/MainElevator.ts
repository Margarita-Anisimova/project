import Lines from "./Lines";
import Elevator from "./Elevator";
import ButtonsEl from "./ButtonsElelevator";
import ChoiceGame from "_Main/СhoiceGame";

export default class MainElevator {
    public elevator:Elevator;
    public lines:Lines[];
    public buttonsEl:ButtonsEl[];
    public up: number;
    public choice: ChoiceGame;

    constructor(choiceGame: ChoiceGame) {
        this.elevator = new Elevator();
        this.lines = new Array();
        this.buttonsEl = new Array();
        this.choice = choiceGame;

        this.up = -1;

        for (var i = 0; i < 5; i++) {
            this.buttonsEl[i] = new ButtonsEl(i);
            this.buttonsEl[i].button.on('pointerdown', this.CallElevat.bind(this, i));
            this.lines[i] = new Lines(i);
        }
        this.AddTicker();

        let back = new PIXI.Sprite(PIXI.Texture.from("src/_Main/Image/back.png"));
        back.width = window.app.screen.width/8; 
        back.height = window.app.screen.height/5; 
        back.x = window.app.screen.width - back.width - 20;
        back.y = 20;
        back.buttonMode = true;
        back.interactive = true;
        back.on("pointerdown", this.end.bind(this));
        window.app.stage.addChild(back);
    }

    end() {
        PIXI.utils.clearTextureCache()
        window.app.loader.destroy();
        window.app.stage.removeChildren();

        this.choice.Create(this.choice.autor);
    }

    CallElevat (i: number) {
        this.elevator.AddFloor(this.lines[i].getCoordinatLine(), this.lines[this.lines.length-1].getCoordinatLine(), this.up);
    }

    AddTicker() {
        window.app.ticker.add ((d) => {
            this.elevator.movement = !this.elevator.eldoor.open;

            if (this.elevator.movement && this.elevator.floors.length != 0){
                this.up = 1;
                if(this.elevator.rect.position.y + this.elevator.rect.height - 12 > this.elevator.floors[0])
                    this.up = -1;
                this.elevator.SetPosition(this.elevator.floors[0], d, this.up, this.lines[this.lines.length-1].getCoordinatLine());
            }

            if (this.elevator.eldoor.open) {
                this.elevator.eldoor.AnimationDoors(d, this.elevator.rect);
            }
        })

        window.app.ticker.start();
    }
}