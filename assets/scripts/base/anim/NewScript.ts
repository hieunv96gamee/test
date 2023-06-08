// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { GlobalSignals } from "../../config/GlobalSignals";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    protected onEnable() {

        GlobalSignals.castleUpgradeSignal.add(this.onMouseDown.bind(this));
    }

    start() {

    }
    onMouseDown(event) {
        this.node.active = false;
    }

    // update (dt) {}
}
