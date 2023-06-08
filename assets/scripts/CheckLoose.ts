// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ColliderCallback from "./base/ColliderCallback";
import { GlobalSignals } from "./config/GlobalSignals";
import { GroupConfig } from "./config/GroupConfig";
import GemsPool from "./objects/drop/GemsPool";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CheckLoosePool extends cc.Component {

    @property(ColliderCallback) boxCheck: ColliderCallback = null;
    @property(ColliderCallback) boxCheck2: ColliderCallback = null;
    end: boolean = false;
    timeHitBox: number = 0;

    start() {
        this.boxCheck.setColliderCallback(this.onHitCollider.bind(this));
    }

    onHitCollider(other, self) {
        if (other.node.group === GroupConfig.GEMS) {
            this.timeHitBox++;
        }
        if (this.timeHitBox > 20) {
            // setTimeout(() => {
            //     if (this.end == false) {
            //         GlobalSignals.questFailSignal.dispatch();
            //     }
            //     this.end = true;
            // }, 1500)
        }
    }

    // update (dt) {}
}
