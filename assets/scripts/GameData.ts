import { LocalStorageManager } from "./base/LocalStorageManager";
import ItemLoot from "./objects/more/ItemLoot";


import { GlobalSignals } from "./config/GlobalSignals";
import { RoomConfig } from "./config/RoomConfig";
import { GameConfig } from "./config/GameConfig";
import { LevelConfig } from "./config/LevelConfig";
import UserPlayFab, { StatisticNameConfig } from "./UserPlayFab";



export class GameData {
    private static KEY_DATA = "hp_data";
    private static KEY_SHORTCUT = "hp_shortcut";

    private static KEY_LEVEL = "hp_level";
    private static KEY_LEVEL_REAL = "hp_level_real";
    private static KEY_LEVEL_SIZE = "hp_level_size";

    private static KEY_ROOM = "hp_room";
    private static KEY_ITEMS = "hp_items";
    private static KEY_COIN = "hp_coin";

    private static KEY_BOSS_CURRENT_SKIN = "hp_boss_current_skin";
    private static KEY_BOSS_SKINS = "hp_boss_skins";



    private static KEY_WIFE_CURRENT_SKIN = "hp_wife_current_skin";
    private static KEY_WIFE_SKINS = "hp_wife_skins";

    private static KEY_KINGDOM_SPRING = "hp_kingdom_spring";

    private static KEY_PETS_DATA = "pet_data";
    private static KEY_EGGS_DATA = "egg_data";

    private static KEY_CURRENT_PET = "current_pet"

    public static currentLevelReal = 25;
    public static currentLevelId = 25;
    public static currentRoomId = 0;

    public static myBossSkins = ['boss_52', 'boss_23', 'boss_24', 'boss_25'];
    public static myWifeSkins = [];
    public static currentSkinBoss = GameConfig.boss_skin_default;
    public static currentSkinWife = GameConfig.wife_skin_default;

    public static arrayItem = [];
    public static playerCoin = 1000;
    public static kingdoms = {};

    public static CURRENT_VERSION_CODE = 2;
    public static DELTA_TIME = 1 / 60;



    public static initPlayerData(callback: Function) {
        cc.log("initPlayerData");

        let dataStr = LocalStorageManager.getItem(GameData.KEY_DATA);
        if (dataStr) {
            cc.log("init Data from Local");
            let dataLocal = JSON.parse(dataStr);
            this.setPlayerData(dataLocal);
            LocalStorageManager.removeItem(GameData.KEY_DATA);

            //syn local with cloud

            if (callback) callback();
            return;
        }


    }

    private static setPlayerData(data: any) {
        this.currentLevelId = this.getValue(data, GameData.KEY_LEVEL, 0);
        this.currentRoomId = this.getValue(data, GameData.KEY_ROOM, 0);
        this.arrayItem = this.getValue(data, GameData.KEY_ITEMS, []);
        this.playerCoin = this.getValue(data, GameData.KEY_COIN, 0);

        this.currentSkinBoss = this.getValue(data, GameData.KEY_BOSS_CURRENT_SKIN, GameConfig.boss_skin_default);
        this.myBossSkins = this.getValue(data, GameData.KEY_BOSS_SKINS, []);
        this.myWifeSkins = this.getValue(data, GameData.KEY_WIFE_SKINS, []);


        this.kingdoms = null;
        this.currentSkinWife = this.getValue(data, GameData.KEY_WIFE_CURRENT_SKIN, GameConfig.wife_skin_default);

        //fix new level
        this.currentLevelReal = this.getValue(data, GameData.KEY_LEVEL_REAL, this.currentLevelId);
        let levelSize = this.getValue(data, GameData.KEY_LEVEL_SIZE, 100);
        if (this.currentLevelReal > levelSize) {
            this.currentLevelReal = levelSize;
        }

        if (levelSize < LevelConfig.levels.length) {
            let data = {};
            data[GameData.KEY_LEVEL_SIZE] = LevelConfig.realLevelSize;

        }


    }

    public static saveKingdomItem(kingdom, item, value, callback = null) {
        if (!this.kingdoms[kingdom]) {
            this.kingdoms[kingdom] = {};
        }
        this.kingdoms[kingdom][item] = value;
    }

    public static saveLevelUp() {
        this.currentLevelId++;
        this.currentLevelReal++;
        if (UserPlayFab.DisplayName != "" && UserPlayFab.UserCountryCode != "")
            UserPlayFab.setLeaderborad(this.currentLevelId, StatisticNameConfig.BEST_LEVEL, () => { })
        let data = {};
        data[GameData.KEY_LEVEL] = this.currentLevelId;
        data[GameData.KEY_LEVEL_REAL] = this.currentLevelReal;

    }

    public static saveCoin(coin) {
        this.playerCoin = coin;
        GlobalSignals.coinUpdateSignal.dispatch();

        let data = {};
        data[GameData.KEY_COIN] = coin;

    }

    public static addCoin(changeCoin) {
        this.saveCoin(this.playerCoin + changeCoin);
    }

    public static addRoomItem(itemId, roomId) {
        if (this.arrayItem.indexOf(itemId) != -1) {
            cc.log("ArrayItems already contains this id");
            return;
        }

        this.arrayItem.push(itemId);
        this.currentRoomId = roomId;

        if (this.arrayItem.length === RoomConfig.rooms[roomId].size) {
            this.currentRoomId = roomId + 1;
            this.arrayItem = [];
            cc.log("unlock roomId = " + this.currentRoomId);
        }

        let data = {};
        data[GameData.KEY_ITEMS] = this.arrayItem;
        data[GameData.KEY_ROOM] = this.currentRoomId;

    }

    public static setSkinBoss(skinId: string, callback) {
        if (this.currentSkinBoss === skinId) {
            return;
        }

        this.currentSkinBoss = skinId;

        let data = {};
        data[GameData.KEY_BOSS_CURRENT_SKIN] = this.currentSkinBoss;

    }

    public static setSkinWife(skinId: string, callback) {
        if (this.currentSkinWife === skinId) {
            return;
        }

        this.currentSkinWife = skinId;

        let data = {};
        data[GameData.KEY_WIFE_CURRENT_SKIN] = this.currentSkinWife;

    }

    public static addSkinBoss(skinId: string, callback) {
        if (this.myBossSkins.indexOf(skinId) != -1) {
            cc.log("myBossSkins already contains this skinId");
            return;
        }

        this.myBossSkins.push(skinId);

        let data = {};
        data[GameData.KEY_BOSS_SKINS] = this.myBossSkins;

    }

    public static addSkinWife(skinId: string, callback) {
        if (this.myWifeSkins.indexOf(skinId) != -1) {
            cc.log("myBossSkins already contains this skinId");
            return;
        }

        this.myWifeSkins.push(skinId);

        let data = {};
        data[GameData.KEY_WIFE_SKINS] = this.myWifeSkins;

    }

    public static clearData() {
        let data = {};
        data[GameData.KEY_LEVEL] = 0;
        data[GameData.KEY_ROOM] = 0;
        data[GameData.KEY_ITEMS] = [];
        data[GameData.KEY_COIN] = 0;


        LocalStorageManager.removeItem(GameData.KEY_DATA);
    }

    public static checkItemCollected(item: ItemLoot): boolean {
        let cfg = item.itemConfig;
        if (cfg.roomId - 1 < GameData.currentRoomId) {
            return true;
        }

        if (cfg.roomId - 1 === GameData.currentRoomId) {
            return GameData.arrayItem.indexOf(cfg.itemId) != -1;
        }

        return false;
    }

    public static get isCreatShortcut() {
        let dataStr = LocalStorageManager.getItem(GameData.KEY_SHORTCUT);
        if (dataStr) {
            return dataStr === "true";
        }
        return false;
    }

    public static set isCreatShortcut(value: boolean) {
        LocalStorageManager.setItem(GameData.KEY_SHORTCUT, value ? "true" : "false");
    }

    private static getValue(data: any, key: string, def: any) {
        if (data[key] === "" || data[key] === null || data[key] === undefined) {
            return def;
        }
        return data[key];
    }






}