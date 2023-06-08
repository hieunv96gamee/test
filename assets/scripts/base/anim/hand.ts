// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        let scaleto = cc.moveBy(1, -100, 0);
        let scaleBack = cc.moveBy(1, 100, 0);
        let sche = cc.sequence(scaleto, scaleBack);
        let repeat = cc.repeatForever(sche);
        this.node.runAction(repeat);
    }


    // update (dt) {}
}
