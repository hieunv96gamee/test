import { Task, TaskManager } from "./base/Task";
import { GameData } from "./GameData";
import { ResUtil } from "./ResUtil";


import UserPlayFab from "./UserPlayFab";
export type LoadCompleteCallback<T> = (error: Error | null, data: T) => void;
window['Loading'] = {

    preloadScene: function (process, callback) {
        let tm = new TaskManager();

        tm.addTask(new Task(function () {
            let task = this;
            GameData.initPlayerData(function () {
                task.completed();
            });
        }));

        tm.addTask(new Task(function () {
            let task = this;
            ResUtil.loadRoomById(GameData.currentRoomId, function (prefab) {
                task.completed();
            });
        }));

        tm.addTask(new Task(function () {
            let task = this;
            UserPlayFab.SetUp();
            UserPlayFab.LoginWithFacebookInstantGamesId();
            task.completed();
        }));


        // tm.addTask(new Task(function () {
        //     let task = this;
        //     ResUtil.loadLevelById(GameData.currentLevelId, function (prefab) {
        //         task.completed();
        //     });
        // }));


        tm.addTask(new Task(function () {
            let task = this;
            let rCfg = window['remoteConfig'];
            rCfg.fetchAndActivate()
                .then(() => {
                    let enable_ads = rCfg.getValue("enable_ads");
                    if (enable_ads) {
                        console.log("Fetch remote config: enable_ads = " + JSON.stringify(enable_ads));

                    }
                    task.completed();
                })
                .catch((err) => {
                    console.warn("Fetch remote config: " + err);
                    task.completed();
                });
        }));

        tm.run(process, callback);
    },

    preloadAds: function () {
        // FBInstantAds.adsConfig = window['adsConfig'];
        // FBInstantAds.lastLevelShowAds = GameData.currentLevelId;
        // FBInstantAds.preloadInterstitialAd();
        // FBInstantAds.preloadRewardedVideoAd();
    },

    onQuitGame: function () {

    }
};