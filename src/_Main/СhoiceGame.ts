import EugeneMainElevator from "../Eugene/ProjectElevator/MainElevator";
import EugeneMainSlot from "../Eugene//SlotMachine/Main";
import EugeneMainShooter from "../Eugene//Shooter/Main";
import RitaMainElevator from "../Rita/lift/Lift";
import RitaMainSlot from "../Rita/Slot_machine/slot_machine";
import RitaMainShooter from "../Rita/scroll shooter/game";
import MarinaMainElevator from "../Marina/lift/Lift";
import MarinaMainSlot from "../Marina/slot-machine/slot-machine";
import MarinaMainShooter from "../Marina/Shooter/ShooterGame";
import MainMenu from "./MainMenu";

export default class ChoiceGame {
    public border: PIXI.Sprite[];
    public back: PIXI.Sprite;
    public game: PIXI.Sprite[];
    public gal: PIXI.Sprite;
    public mainMenu: MainMenu;
    public choice: number;
    public start: PIXI.Sprite;
    public elevator: any;
    public slot: any;
    public shooter: any;
    public autor: number;
    constructor(i: number, mainMenu: MainMenu) {
        this.border = [];
        this.game = [];
        this.autor = i;
        this.mainMenu = mainMenu;

        this.gal = new PIXI.Sprite(PIXI.Texture.from("./assets/Image/gal.png"));
        this.gal.x = sceneWidth;
        this.gal.width = sceneWidth / 8;
        this.gal.height = sceneHeight / 5;

        this.Create(i);
    }

    Create(i: number) {
        for (let j = 0; j < 3; j++) {
            this.border[j] = new PIXI.Sprite(PIXI.Texture.from("./assets/Image/ramka.png"));
            this.border[j].width = sceneWidth / 4;
            this.border[j].height = sceneHeight / 4;
            this.border[j].x = sceneWidth / 15 + (j * sceneWidth / 4 + sceneWidth / 15);
            this.border[j].y = sceneHeight / 4;

            this.game[j] = new PIXI.Sprite;
            this.game[j].width = sceneWidth / 4;
            this.game[j].height = sceneHeight / 4;
            this.game[j].x = sceneWidth / 15 + (j * sceneWidth / 4 + sceneWidth / 15);
            this.game[j].y = sceneHeight / 4;
            this.game[j].buttonMode = true;
            this.game[j].interactive = true;
            this.game[j].on("pointerdown", this.ClickButtonsGame.bind(this, j));

            switch (i) {
                case (0): this.game[j].texture = PIXI.Texture.from("./assets/Image/EugeneGames/" + j + ".png"); break;
                case (1): this.game[j].texture = PIXI.Texture.from("./assets/Image/MarinaGames/" + j + ".png"); break;
                case (2): this.game[j].texture = PIXI.Texture.from("./assets/Image/RitaGames/" + j + ".png"); break;
            }

            window.app.stage.addChild(this.game[j], this.border[j], this.gal);
        }

        this.back = new PIXI.Sprite(PIXI.Texture.from("./assets/Image/back.png"));
        this.back.width = sceneWidth / 8;
        this.back.height = sceneHeight / 5;
        this.back.x = sceneWidth - this.back.width - 20;
        this.back.y = 20;
        this.back.buttonMode = true;
        this.back.interactive = true;
        this.back.on("pointerdown", this.Back.bind(this));

        this.start = new PIXI.Sprite(PIXI.Texture.from("./assets/Image/play.png"));
        this.start.width = sceneWidth / 8;
        this.start.height = sceneHeight / 5;
        this.start.x = sceneWidth / 2 - this.start.width / 2;
        this.start.y = sceneHeight / 2 + this.start.height / 2;
        this.start.on("pointerdown", this.Start.bind(this));

        window.app.stage.addChild(this.back, this.start);
    }

    Start() {
        this.RemoveAll();

        switch (this.autor) {
            case (0):
                this.AddEugeneGames();
                break;
            case (1):
                this.AddRitaGames();
                break;
            case (2):
                this.AddMarinaGames();
                break;
        }
    }

    AddMarinaGames() {
        switch (this.choice) {
            case (0):
                this.elevator = new RitaMainElevator(this);
                break;
            case (1):
                this.slot = new RitaMainSlot(this);
                break;
            case (2):
                this.shooter = new RitaMainShooter(this);
                break;
        }
    }

    AddRitaGames() {
        switch (this.choice) {
            case (0):
                this.elevator = new MarinaMainElevator(this);
                break;
            case (1):
                this.slot = new MarinaMainSlot(this);
                break;
            case (2):
                this.shooter = new MarinaMainShooter(this);
                break;
        }
    }

    AddEugeneGames() {
        switch (this.choice) {
            case (0):
                this.elevator = new EugeneMainElevator(this);
                break;
            case (1):
                this.slot = new EugeneMainSlot(this);
                break;
            case (2):
                this.shooter = new EugeneMainShooter(this);
                break;
        }
    }

    ClickButtonsGame(i: number) {
        this.choice = i;

        this.start.buttonMode = true;
        this.start.interactive = true;

        this.gal.x = this.border[i].x + sceneWidth / 15;
        this.gal.y = this.border[i].y + sceneHeight / 30;
    }

    RemoveAll() {
        window.app.stage.removeChildren();
    }

    Back() {
        this.RemoveAll();
        this.mainMenu.AddButtons();
    }
}