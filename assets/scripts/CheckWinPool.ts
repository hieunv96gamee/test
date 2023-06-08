// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ColliderCallback from "./base/ColliderCallback";
import { AudioPlayId } from "./config/AudioPlayId";
import { GlobalSignals } from "./config/GlobalSignals";
import { GroupConfig } from "./config/GroupConfig";
import MapLevel from "./level/MapLevel";
import MainScene from "./MainScene";
import GemsGO from "./objects/drop/GemsGO";
import GemsPool from "./objects/drop/GemsPool";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CheckWinPool extends cc.Component {

    @property(cc.Label) lbRate: cc.Label = null;

    @property(ColliderCallback) boxCheck: ColliderCallback = null;
    @property(GemsPool) poolGem: GemsPool = null;
    @property(cc.Node) cup1: cc.Node = null;
    @property(cc.Node) cup2: cc.Node = null;
    @property(ColliderCallback) boxCheckCarrot: ColliderCallback = null;
    @property(cc.Prefab) pool: cc.Prefab = null;
    cupPosition: any = null;
    timeHitBox: number = 0;
    _onAutoCheck;
    rate: number = 0;
    ischeck: boolean = false;
    poolTemp: any;
    start() {
        this.boxCheck.setColliderCallback(this.onHitCollider.bind(this));
        this.boxCheckCarrot.setColliderCallback(this.onHitColliderCarrot.bind(this));
        this._onAutoCheck = this.onAutoCheck.bind(this);
        GlobalSignals.autoMoveSignal2.add(this._onAutoCheck);
        if (!!this.cup1)
            this.cupPosition = this.cup1.position.y - 20;
        this.lbRate.node.zIndex = 2;
    }
    onAutoCheck() {
        setTimeout(() => {
            if (this.rate < 95 && this.ischeck == false) {
                this.ischeck = true;
                GlobalSignals.questFailSignal.dispatch();
            }
        }, 3000);
    }
    onHitCollider(other, self) {
        if (other.node.group === GroupConfig.GEMS && other.node.getComponent("GemsGO").active && other.node.group != GroupConfig.LAVA) {
            this.onAutoCheck();
            this.timeHitBox++;
            MainScene.instance.audioPlayer.playAudio(AudioPlayId.effect_rock1, false, 0.6);
            if (this.cup1.position.y > this.cupPosition) {
                cc.tween(this.cup1).to(0.1, { position: cc.v3(this.cup1.position.x, this.cup1.y - 5) }).start();
                cc.tween(this.cup2).to(0.1, { position: cc.v3(this.cup2.position.x, this.cup2.y - 5) }).start();
            }
            this.rate = Math.ceil(this.timeHitBox / 30 * 100);
            if (this.rate <= 100) this.lbRate.string = this.rate + "%";
            if (this.rate > 97) {
                if (this.ischeck == false) {
                    GlobalSignals.questPassSignal.dispatch();
                    this.ischeck = true;
                }
            }
        }
    }
    onHitColliderCarrot(other, self) {
        if (!!other.node.getComponent("GemsGO")) {
            if (other.node.getComponent("GemsGO").isRb) {
                cc.tween(other.node)
                    .call(() => {
                        let fx = cc.instantiate(MapLevel.instance.fx);
                        other.node.addChild(fx);
                        other.node.children[0].active = false;
                        other.node.removeComponent(cc.PhysicsCircleCollider);
                        other.node.removeComponent(cc.CircleCollider);
                        other.node.removeComponent(cc.RigidBody);
                        fx.scale = 1;
                        MainScene.instance.audioPlayer.playAudio(AudioPlayId.stealer_attack);
                        let pool = cc.instantiate(this.pool);
                        pool.zIndex = 1;
                        pool.parent = this.node;
                        let newPos = other.node.parent.convertToWorldSpaceAR(other.node.position);
                        pool.position = pool.convertToNodeSpaceAR(newPos);
                        pool.active = true;
                        pool.children.forEach(element => {
                            let targetForce = cc.v2(element.position.x, element.position.y);
                            targetForce = targetForce.normalize();
                            targetForce = cc.v2(targetForce.x * 10000, targetForce.y * 10000);
                            let e = element.getComponent(cc.RigidBody);
                            e.applyForceToCenter(targetForce, true);
                        });
                    }).to(0.5, { opacity: 0 })
                    .start();
            }
        }
    }
    update(dt) {

    }
}
