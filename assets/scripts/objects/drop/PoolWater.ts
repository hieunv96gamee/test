// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ColliderCallback from "../../base/ColliderCallback";
import { TagConfig } from "../../config/TagObject";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PoolWater extends cc.Component {

    @property(ColliderCallback)
    VanCollier: ColliderCallback = null;
    @property(cc.Node)
    water: cc.Node = null;
    @property(cc.Node)
    water2: cc.Node = null;
    @property(cc.Node)
    nodex: cc.Node = null;
    height: number = 0;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.VanCollier.setColliderCallback(this.onHitColliderVan.bind(this));
    }



    onHitColliderVan(other, self): void {
        if (other.node.name == TagConfig.BIG_ROCK) {

            this.nodex.position = cc.v3(0, 0, 0);
            // cc.tween().to(1, {

            //     position: {
            //         value: cc.v3(0, -100, 0),
            //         progress: (start, end, current, t) => {
            //             this.water.height--;
            //             this.water2.height++;
            //             return start.lerp(end, t, current);
            //         }
            //     }
            // }).start();
            this.height += 60;
            // cc.tween(this.water).by(0, { height: -120 }).start();
            // cc.tween(this.water2).by(0, { height: 120 }).start();

            var callback = other.node.getComponent(ColliderCallback);


            callback.setColliderCallbackStay(this.onHitColliderVan.bind(this));

            other.node.name = ".";
            // console.log("big");
            // if (this.water.height > 50) {


            // }



        }

    }
    UpWater() {
        cc.tween(this.water).by(0.2, { height: -180 }).start();
        cc.tween(this.water2).by(0.2, { height: 180 }).start();
    }

    update(dt) {
        if (this.height > 0) {
            var a = dt * 500;
            this.height -= a;
            this.water.height -= a;
            this.water2.height += a;
        }
    }
}
