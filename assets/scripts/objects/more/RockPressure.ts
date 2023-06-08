// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { GlobalSignals } from "../../config/GlobalSignals";
import { TagConfig } from "../../config/TagObject";
import PoolWater from "../drop/PoolWater";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RockPressure extends cc.Component {

    isHit: boolean = false;
    onCollisionEnter(other, self) {
        if (this.isHit == true) return;
        if (other.node.name == TagConfig.MEAT) {
            GlobalSignals.autoMoveSignal.dispatch();
        }
    }
}
