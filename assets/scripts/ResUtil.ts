import { RoomConfig } from "./config/RoomConfig";
import { LevelConfig } from "./config/LevelConfig";

import { LoadCompleteCallback } from "./Loading";
import { FeatureSkinConfig } from "./config/FeatureSkinConfig";


export class ResUtil {

    private static mapPrefab: Map<string, cc.Prefab> = new Map<string, cc.Prefab>();
    private static iconCountry: Map<string, cc.SpriteFrame> = new Map<string, cc.SpriteFrame>();
    private static spineAnim: Map<string, sp.SkeletonData> = new Map<string, sp.SkeletonData>();
    public static loadPopupByDir(dir: string, callback: Function = null, errCb: Function = null) {
        let key = dir.split('/').pop();
        cc.log("loadPopupByDir: " + key);
        if (this.mapPrefab.has(key)) {
            if (callback) {
                callback(this.mapPrefab.get(key));
            }
            return;
        }
        this.loadPrefab(dir, (prefab) => {
            this.mapPrefab.set(key, prefab);
            if (callback) {
                callback(prefab);
            }
        }, errCb);
    }



    public static loadRoomById(id: number, callback: Function = null, errCb: Function = null) {
        if (id < 0 || id >= RoomConfig.rooms.length) {
            cc.warn("loadRoomById: " + id);
            if (errCb) errCb();
            return;
        }

        let name = RoomConfig.rooms[id].name;
        if (this.mapPrefab.has(name)) {
            if (callback) {
                callback(this.mapPrefab.get(name));
            }
            return;
        }

        this.loadRoomByName(name, (prefab) => {
            this.mapPrefab.set(name, prefab);
            if (callback) {
                callback(prefab);
            }
        }, errCb);
    }

    // public static releaseRoomById(id: number) {
    //     if (id < 0 || id >= RoomConfig.rooms.length) {
    //         return;
    //     }
    //     let name = RoomConfig.rooms[id].name;
    //     if (this.mapPrefab.has(name)) {
    //         this.mapPrefab.delete(name);
    //         cc.log("release: " + name);
    //     }
    // }

    public static loadLevelById(id: number, callback: Function = null, errCb: Function = null) {
        if (id < 0 || id >= LevelConfig.levels.length) {
            let rand = Math.floor(Math.random() * LevelConfig.levels.length);
            LevelConfig.levels[id] = LevelConfig.levels[rand];
        }

        let name = LevelConfig.levels[id];
        if (this.mapPrefab.has(name)) {
            if (callback) {
                callback(this.mapPrefab.get(name));
            }
            return;
        }

        this.loadLevelByName(name, (prefab) => {
            this.mapPrefab.set(name, prefab);
            if (callback) {
                callback(prefab);
            }
        }, errCb);
    }

    public static releaseLevelById(id: number) {
        if (id < 0 || id >= LevelConfig.levels.length) {
            return;
        }
        let name = LevelConfig.levels[id];
        if (this.mapPrefab.has(name)) {
            this.mapPrefab.delete(name);
            cc.log("release: " + name);
        }
    }

    private static loadLevelByName(name: string, callback: Function = null, errCb: Function = null) {
        let dir = "prefabs/levels/" + name;
        this.loadPrefab(dir, callback, errCb);
    }

    private static loadRoomByName(name: string, callback: Function = null, errCb: Function = null) {
        let dir = "prefabs/rooms/" + name;
        this.loadPrefab(dir, callback, errCb);
    }

    public static loadScreenByName(name: string, callback: Function = null, errCb: Function = null) {
        let dir = "prefabs/screens/" + name;
        this.loadPrefab(dir, callback, errCb);
    }

    public static loadPrefab(dir: string, callback: Function, errCb: Function) {
        cc.loader.loadRes(dir, (err, prefab: cc.Prefab) => {
            if (err) {
                cc.log(err);
                if (errCb) errCb(err);
                return;
            }

            if (callback) {
                cc.log("loadPrefab: " + dir);
                callback(prefab);
            }
        });
    }

    public static loadRes<T>(url: string, type: any | null, cb?: LoadCompleteCallback<T>) {
        if (type) {
            cc.loader.loadRes(url, type, (err, res) => {
                if (err) {
                    cc.error(err.message || err);
                    if (cb) {
                        cb(err, res);
                    }

                    return;
                }

                if (cb) {
                    cb(err, res);
                }
            });
        } else {
            cc.loader.load(url, (err, res) => {
                if (err) {
                    cc.error(err.message || err);
                    if (cb) {
                        cb(err, res as T);
                    }

                    return;
                }

                if (cb) {
                    cb(err, res as T);
                }
            });
        }
    }
    public static getIconCountry(idStr: string, cb: LoadCompleteCallback<cc.SpriteFrame>) {
        if (idStr == "" || !idStr) return;
        if (this.iconCountry.has(idStr)) {
            let icon = this.iconCountry.get(idStr);
            cb(null, icon);
        } else {
            this.loadRes<cc.SpriteFrame>("/sprites/CountryIcon/" + idStr, cc.SpriteFrame, (err, img) => {
                if (img) this.iconCountry.set(idStr, img);
                cb(err, img);
            })
        }

    }

    public static getSpineAnimFeature(_idFeature: string, cb: LoadCompleteCallback<sp.SkeletonData>) {
        let res = FeatureSkinConfig.getSkinConfigById(_idFeature);
        let url = res.pathDir + '/Bat'
        this.getSpineAnim(url, 'Bat', cb);
    }

    public static getSpineAnim(url: string, name: string, cb: LoadCompleteCallback<sp.SkeletonData>) {
        if (this.spineAnim.has(name)) {
            let icon = this.spineAnim.get(name);
            cb(null, icon);
        }
        else {
            this.loadRes<sp.SkeletonData>(url, sp.SkeletonData, (err, anim) => {
                if (anim) this.spineAnim.set(name, anim);
                cb(err, anim);
            })
        }
    }





}