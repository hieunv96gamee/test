import { QuestType, QuestUtil } from "./config/QuestType";
import MapLevel from "./level/MapLevel";
import { GlobalSignals } from "./config/GlobalSignals";
import { GameData } from "./GameData";
import MainScene from "./MainScene";
import { AudioPlayId } from "./config/AudioPlayId";
import { ResUtil } from "./ResUtil";
import WinPanel from "./level/WinPanel";
import Boss from "./objects/character/Boss/Boss";
import { IconQuest } from "./ui/IconQuest";



import ToastReward from "./ui/ToastReward";
import AnimationChar from "./objects/character/Animation";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PlayScreen extends cc.Component {

    @property(cc.RichText)
    labelQuest: cc.RichText = null;

    @property(cc.Sprite)
    iconQuest: cc.Sprite = null;

    @property([IconQuest])
    iconConfig: IconQuest[] = [];

    @property(cc.Node)
    levelRoot: cc.Node = null;

    @property(WinPanel)
    winPanel: WinPanel = null;

    @property(sp.Skeleton)
    videoCard: sp.Skeleton = null;

    @property(ToastReward)
    toastReward: ToastReward = null;

    @property(cc.Button)
    btnContiune: cc.Button = null;

    @property(cc.Button)
    btnTryAgain: cc.Button = null;
    @property(cc.Button)
    btnFullScreen: cc.Button = null;
    timeClickReplay: number = 0;
    @property(cc.Node)
    btnNode: cc.Node = null;
    @property(cc.Camera)
    camera: cc.Camera = null;

    levelPlay: number = -1;
    countPlayWin: number = 0;
    isContinue: boolean = false;
    backgroundMusic: any = null;
    isEnd: boolean = false;
    _questFailSignal;
    _questPassSignal;
    _girlGiveEgg;
    private static _instance: PlayScreen = null;
    public static get instance() {
        return PlayScreen._instance;
    }

    protected onLoad() {
        PlayScreen._instance = this;
        this.isContinue = false;
        this.toastReward.node.active = false;
    }

    protected onEnable(): void {
        if (this.isContinue) {
            cc.log("PlayScreen isContinue");
            return;
        }

        this._questFailSignal = this.onQuestFail.bind(this);
        this._questPassSignal = this.onQuestPass.bind(this);
        this._girlGiveEgg = this.onGirlGiveEgg.bind(this);

        GlobalSignals.questFailSignal.add(this._questFailSignal);
        GlobalSignals.questPassSignal.add(this._questPassSignal);
        GlobalSignals.girlGiveEggSignal.add(this._girlGiveEgg)

        if (this.levelRoot.childrenCount === 0) {
            this.loadCurrentLevel();
        }

    }

    protected onDisable(): void {
        MainScene.instance.audioPlayer.stopAllEffect();

        if (this.isContinue) {
            return;
        }
        GlobalSignals.questFailSignal.remove(this._questFailSignal);
        GlobalSignals.questPassSignal.remove(this._questPassSignal);
        GlobalSignals.girlGiveEggSignal.remove(this._girlGiveEgg)

        if (this.levelRoot.childrenCount > 0) {
            this.levelRoot.removeAllChildren();
        }
        this.unscheduleAllCallbacks();

        if (this.backgroundMusic) {
            // MainScene.instance.audioPlayer.stopAllAudio();
            this.backgroundMusic = null;
        }
    }

    onQuestFail() {
        this.isEnd = true;
        this.btnNode.active = true;
        this.scheduleOnce(() => {
            //  this.loadCurrentLevel();
            this.loadCurrentLevel();
            // this.winPanel.test();
            // setTimeout(() => {
            //     this.winPanel.unTest();
            //     this.loadCurrentLevel()
            // }, 800);
        }, 1.4);
    }

    onQuestPass() {
        this.isEnd = true;
        // if (MapLevel.instance.isQuestCollectGems) {
        //     this.scheduleOnce(() => {
        //         this.isContinue = true;
        //         this.countPlayWin++;

        //         // GameData.saveLevelUp();

        //         let itemConfig = MapLevel.instance.itemLoot.itemConfig;
        //         cc.log("onQuestPass: " + itemConfig.skin);




        //         MainScene.instance.showGamePlayScreen(() => {
        //             this.isContinue = false;
        //             if (GameData.currentLevelId == 25) {
        //                 this.loadCurrentLevel()
        //             } else
        //                 this.winPanel.showWin();
        //         });


        //     }, 0.8);
        //     return;
        // }

        // this.isContinue = false;

        this.scheduleOnce(() => {
            GameData.saveLevelUp();
            this.loadCurrentLevel();
            // this.countPlayWin++;
            // if (GameData.currentLevelId == 0) {
            //     this.winPanel.test();
            //     setTimeout(() => {
            //         // GameData.saveLevelUp();
            //         this.winPanel.unTest();
            //         this.loadCurrentLevel()
            //     }, 800);

            // } else {

            //     setTimeout(() => {
            //         this.winPanel.showWin();
            //     }, 1000)
            // }

            // GameData.saveLevelUp();
        }, 1.5);


    }

    onGirlGiveEgg(eggId: string) {

    }

    loadCurrentLevel() {
        this.unscheduleAllCallbacks();
        MainScene.instance.audioPlayer.stopAllEffect();
        this.loadLevel(GameData.currentLevelReal);
        ResUtil.releaseLevelById(GameData.currentLevelReal - 1);
        ResUtil.loadLevelById(GameData.currentLevelReal + 1); //load truoc
    }
    loadCurrentLevel2() {
        this.videoCard.node.active = true;
        this.unscheduleAllCallbacks();
        MainScene.instance.audioPlayer.stopAllEffect();
        // this.loadLevel(GameData.currentLevelReal);
        ResUtil.releaseLevelById(GameData.currentLevelReal - 1);
        ResUtil.loadLevelById(GameData.currentLevelReal + 1); //load truoc
        mraid.open("https://apps.apple.com/US/app/id6443933564");
    }

    loadLevel(id: number) {
        console.log("loadLevel: " + id);

        if (this.levelRoot.childrenCount > 0) {
            MainScene.instance.screenManager.showFlash(1);
        }

        this.clearLevelRoot();
        this.winPanel.hide();

        // if (MainScene.instance.testPrefab) {
        //     this.addLevelToRoot(MainScene.instance.testPrefab);
        //     // ResUtil.loadLevelById(MainScene.instance.testStartLevel, (prefab) => {
        //     //     this.addLevelToRoot(prefab);
        //     // });

        // } else {
        ResUtil.loadLevelById(id, (prefab) => {
            this.addLevelToRoot(prefab);
        });
        // }

        if (this.countPlayWin === 1 && !GameData.isCreatShortcut) {
        }
    }

    addLevelToRoot(prefab) {
        let level = cc.instantiate(prefab);
        this.levelRoot.addChild(level);
        this.levelPlay = parseInt(prefab.name.match(/\d+/)[0]);

        let mapLevel = level.getComponent(MapLevel);
        this.updateLevelInfo(GameData.currentLevelId, mapLevel.questType);
        if (!this.isEnd)
            // this.zoomCamrera();
    }

    clearLevelRoot() {
        if (this.levelRoot.childrenCount > 0) {
            try {
                this.levelRoot.removeAllChildren();
            } catch (e) {
                cc.warn(e);
            }
        }
    }

    gotoHomeScreen() {

    }

    replayGame() {
        mraid.open("https://apps.apple.com/US/app/id6443933564");
        // if (this.timeClickReplay >= 3) {
        //     this.loadCurrentLevel2();
        // } else {
        //     this.loadCurrentLevel();
        //     MainScene.instance.screenManager.showFlash(1);
        //     this.timeClickReplay++;
        // }

    }

    nextLevel() {
        mraid.open("https://apps.apple.com/US/app/id6443933564");
        // if (GameData.currentLevelReal == 2) {

        //     this.loadCurrentLevel2();



        // } else {
        //     this.loadCurrentLevel();
        // }

    }

    updateLevelInfo(levelId: number, questType: QuestType) {
        let questStr = QuestUtil.getQuestName(questType);
        let level = levelId + 1;
        let levelStr = level < 10 ? "0" + level : "" + level;
        this.labelQuest.string = "<color=#FFBC01> " + "</color> " + questStr;
    }

    showToastReward(value: number, timeShow: number, delay: number = 0) {
        this.scheduleOnce(() => {
            this.toastReward.show(value, timeShow);
        }, delay);
    }

    onClickEvent() {
        mraid.open("https://apps.apple.com/US/app/id6443933564");
    }
    onClickPlayAgain() {
        // GameData.currentLevelReal = 0;
        // this.loadCurrentLevel();
        mraid.open("https://apps.apple.com/US/app/id6443933564");
    }
    zoomCamrera() {
        let pos = AnimationChar.instance.node.position;
        pos.x += 110;
        this.scheduleOnce(() => {
            AnimationChar.instance.playAnim();
        }, 0.5);
        cc.tween(this.camera)
            .to(0, { zoomRatio: 1.9 })
            .delay(2)
            .to(1, { zoomRatio: 1 })
            .start();
        cc.tween(this.camera.node)
            .to(0, { position: pos })
            .delay(2)
            .to(1, { position: cc.v3(0, 0) })
            .start();
    }


}
