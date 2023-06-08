import { GlobalSignals } from "../../config/GlobalSignals";
import Vec3 = cc.Vec3;
import easeBounceIn = cc.easeBounceIn;
import easeQuadraticActionIn = cc.easeQuadraticActionIn;
import GemsGO from "./GemsGO";
import Boss from "../character/Boss/Boss";


const { ccclass, property } = cc._decorator;

@ccclass
export default class GemsPool extends cc.Component {

    @property(cc.Prefab) Coins;

    _collectByBoss;

    private static _instance: GemsPool = null;
    public static get instance() {
        return GemsPool._instance;
    }

    protected onLoad() {
        GemsPool._instance = this;
    }

    protected onEnable(): void {
        this._collectByBoss = this.collectByBoss.bind(this);
        GlobalSignals.collectGemsSignal.add(this._collectByBoss);
    }

    protected onDisable(): void {
        GlobalSignals.collectGemsSignal.remove(this._collectByBoss);
    }

    collectByBoss() {
        cc.log("collectByBoss");
        let boss = Boss.instance.node;
        this.node.children.forEach((gem, i) => {
            gem.getComponent(GemsGO).moveToTarget(boss, 0.25 + i * 0.02);
        });
    }

    countPool() {
        return this.node.children.length
    }

    // createCoins() {
    //     let x = -60;
    //     let y = 50;
    //     for(let i = 0; i< 120; i++){
    //         x += 8;
    //         if(i%15==0){
    //             y-=10;
    //             x=-60;
    //         } 
    //         let coins = cc.instantiate(this.Coins);
    //         coins.position = cc.v2(x,y);
    //         coins.parent = this.node;
    //     }
    // }
}
