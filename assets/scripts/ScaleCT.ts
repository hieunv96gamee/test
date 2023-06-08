// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {



    start() {
        let scaleto = cc.scaleTo(0.5, 1.2, 1.2);
        let scaleBack = cc.scaleTo(0.5, 1, 1);
        let sche = cc.sequence(scaleto, scaleBack);
        let repeat = cc.repeatForever(sche);
        this.node.runAction(repeat);
    }

    // update (dt) {}
}
