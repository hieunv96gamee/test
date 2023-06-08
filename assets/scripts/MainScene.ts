import AudioPlayer from "./base/audio/AudioPlayer";
import { AudioPlayId } from "./config/AudioPlayId";
import PrefabManager from "./PrefabManager";
import { PrefabType } from "./PrefabType";
import { GameData } from "./GameData";
import { ResUtil } from "./ResUtil";

import ScreenManager, { ScreenId } from "./ScreenManager";
import { Task } from "./base/Task";

import { BackgroundLoader } from "./BackgroundLoader";






const { ccclass, property } = cc._decorator;

@ccclass
export default class MainScene extends cc.Component {

    @property(AudioPlayer)
    audioPlayer: AudioPlayer = null;

    @property(ScreenManager)
    screenManager: ScreenManager = null;

    @property(cc.Node)
    nodePopups: cc.Node = null;

    @property(cc.Node)
    loading: cc.Node = null;

    @property(cc.Prefab)
    testPrefab: cc.Prefab = null;

    @property(cc.Integer)
    testStartLevel: number = 0;

    settingPopup: cc.Node = null;
    selectRoomPopup: cc.Node = null;
    selectKingdomPopup: cc.Node = null;
    buildKingdomPopup: cc.Node = null;
    skinPopup: cc.Node = null;




    arrayPopup: cc.Node[] = [];

    loadLevelCallback;
    loadRoomSelectCallback;
    loadKingdomCallback;
    loadKingdomBuilderCallback;
    loadKingdomSelectCallback;
    loadSkinPopupCallback;
    loadEventPopupCallback;
    loadRankPopupCallback;
    loadDailyPopupCallback;

    loadEntryYourNamePopupCallback;
    loadPetPopupCallback;
    private static _instance: MainScene = null;
    public static get instance() {
        return MainScene._instance;
    }

    protected onLoad() {
        MainScene._instance = this;

        if (this.testStartLevel >= 1) {
            GameData.currentLevelId = this.testStartLevel - 1;
        }

        // GameData.playerCoin = 100000;
        // GameData.currentLevelReal = 79;
        // GameData.currentRoomId = 1;
        // GameData.arrayItem = [1, 2, 3, 4, 5, 6, 7];

    }

    protected onEnable(): void {
        if (this.testPrefab) {
            console.log("vao day");
            this.screenManager.showScreenById(ScreenId.PLAY_SCREEN,
                null, true);

        } else {
            this.screenManager.showScreenById(ScreenId.HOME_SCREEN,
                null, true);
        }
    }

    initStartGame() {
        let self = this;
        BackgroundLoader.addTask(new Task(function () {
            let task = this;
            self.loadLevelCallback = null;

            ResUtil.loadLevelById(GameData.currentLevelReal, (prefab) => {
                task.completed();

                if (self.loadLevelCallback) {
                    self.loadLevelCallback(prefab);
                }
            });
        }));

        BackgroundLoader.addTask(new Task(function () {
            let task = this;
            self.loadRoomSelectCallback = null;

            PrefabManager.instance.loadPrefabByType(PrefabType.SELECT_ROOM, (prefab) => {
                task.completed();

                if (self.loadRoomSelectCallback) {
                    self.loadRoomSelectCallback(prefab);
                }
            });
        }));







        BackgroundLoader.addTask(new Task(function () {
            let task = this;

        }));

        BackgroundLoader.addTask(new Task(function () {
            let task = this;

        }));

        BackgroundLoader.addTask(new Task(function () {
            let task = this;
            self.loadSkinPopupCallback = null;

            PrefabManager.instance.loadPrefabByType(PrefabType.SKIN_POPUP, (prefab) => {
                task.completed();

                if (self.loadSkinPopupCallback) {
                    self.loadSkinPopupCallback(prefab);
                }
            });
        }));



        BackgroundLoader.addTask(new Task(function () {
            let task = this;
            self.loadRankPopupCallback = null;

            PrefabManager.instance.loadPrefabByType(PrefabType.RANK_POPUP, (prefab) => {
                task.completed();

                if (self.loadRankPopupCallback) {
                    self.loadRankPopupCallback(prefab);
                }
            });
        }));




    }

    playAudioClick() {
        this.audioPlayer.playAudio(AudioPlayId.button_click);
    }

    showHomeScreen(callback = null) {
        this.screenManager.showScreenById(ScreenId.HOME_SCREEN, callback);
    }

    showGamePlayScreen(callback = null) {
        this.screenManager.showScreenById(ScreenId.PLAY_SCREEN, callback);
    }

    showCastleScreen(callback = null) {
        this.screenManager.showScreenById(ScreenId.CASTLE_SCREEN, callback);
    }

    showSettingPopup() {
        if (!this.settingPopup) {
            this.createPopupByType(PrefabType.SETTING, (popup) => {
                this.settingPopup = popup;
                this.settingPopup.active = true;
            });

        } else {
            this.settingPopup.active = true;
        }
    }

    showSelectRoomPopup() {
        if (!this.selectRoomPopup) {
            let funCreate = () => {
                this.showLoading();
                this.createPopupByType(PrefabType.SELECT_ROOM, (popup) => {
                    this.selectRoomPopup = popup;
                    this.selectRoomPopup.active = true;
                    this.hideLoading();
                });
            };

            if (this.loadRoomSelectCallback === undefined) {
                this.loadRoomSelectCallback = funCreate;

            } else {
                funCreate();
            }
        } else {
            this.selectRoomPopup.active = true;
        }
    }

    showSelectKingdomPopup() {
        if (!this.selectKingdomPopup) {
            let funCreate = () => {
                this.showLoading();
                this.createPopupByType(PrefabType.SELECT_KINGDOM, (popup) => {
                    this.selectKingdomPopup = popup;
                    this.selectKingdomPopup.active = true;
                    this.hideLoading();
                });
            };

            if (this.loadKingdomSelectCallback === undefined) {
                this.loadKingdomSelectCallback = funCreate;

            } else {
                funCreate();
            }

        } else {
            this.selectKingdomPopup.active = true;
        }
    }

    showBuildKingdomPopup() {
        if (!this.buildKingdomPopup) {
            let funCreate = () => {
                this.showLoading();
                this.createPopupByType(PrefabType.BUILD_KINGDOM, (popup) => {
                    this.buildKingdomPopup = popup;
                    this.buildKingdomPopup.active = true;
                    this.hideLoading();
                });
            };

            if (this.loadKingdomBuilderCallback === undefined) {
                this.loadKingdomBuilderCallback = funCreate;

            } else {
                funCreate();
            }
        } else {
            this.buildKingdomPopup.active = true;
        }
    }

    showSkinPopup() {
        if (!this.skinPopup) {
            let funCreate = () => {
                this.showLoading();
                this.createPopupByType(PrefabType.SKIN_POPUP, (popup) => {
                    this.skinPopup = popup;
                    this.skinPopup.active = true;
                    this.hideLoading();
                });
            };

            if (this.loadSkinPopupCallback === undefined) {
                this.loadSkinPopupCallback = funCreate;

            } else {
                funCreate();
            }

        } else {
            this.skinPopup.active = true;
        }
    }








    createPopupByType(type: PrefabType, callback: (popup) => void, zIndex: number = null) {
        if (zIndex === null) {
            zIndex = type;
        }
        PrefabManager.instance.loadPrefabByType(type, (prefab) => {
            let popup = cc.instantiate(prefab);
            this.nodePopups.addChild(popup, zIndex);
            this.arrayPopup.push(popup);
            callback(popup);
        });
    }

    showLoading() {
        if (this.loading) {
            this.loading.active = true;
        }
    }

    hideLoading() {
        if (this.loading) {
            this.loading.active = false;
        }
    }




}
