// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ScaleRepeatAnim from "../base/anim/ScaleRepeatAnim";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property([cc.Node])
    nodes: cc.Node[] = [];
    @property(cc.Node)
    hand: cc.Node = null;
    @property(cc.Node)
    light: cc.Node = null;
    @property(cc.Node)
    bg: cc.Node = null;
    @property(cc.Animation)
    Endcard: cc.Animation = null;
    onLoad () {
        this.Endcard.on('finished',  this.EndcardFinish, this);
    }
    start() {

        setTimeout(() => {
            this.test();
        }, 1000);
    }
    test() {
        // this.moveToCl(this.nodes[2]);
        // this.bg.zIndex = 1;
        // setTimeout(() => {

        //     this.moveToCl(this.nodes[1]);
        //     setTimeout(() => {
        //         this.nodes[1].getComponent(ScaleRepeatAnim).PlaySelf();
        //     }, 1200);
        // }, 1200);
        // this.node[3].position.y = 0;

    }
    moveToCl(target: cc.Node) {
        this.unMoveAll();
        let pos = target.position;
        let handMove = cc.moveTo(0.5, pos.x, pos.y);
        let callback = cc.callFunc(() => {
            target.setScale(0.85, 0.85, 0.85);
            target.stopAllActions();
            this.light.stopAllActions();
            this.light.position = pos;
            this.light.setScale(0.85, 0.85, 0.85);
            target.zIndex = 100;
            this.light.zIndex = 100;
            this.light.runAction(cc.scaleTo(1, 1, 1));
            target.runAction(cc.scaleTo(1, 1, 1));
            target.children[2].active = false;
            target.children[0].active = true;
        })

        let sche = cc.sequence(handMove, callback);
        this.hand.runAction(sche);
    }
    unMoveAll() {

        for (let index = 0; index < this.nodes.length; index++) {
            let scaleT = cc.scaleTo(0.5, 0.85, 0.85);
            this.nodes[index].runAction(scaleT);
            this.nodes[index].children[2].active = true;
            this.nodes[index].children[0].active = false;
            this.nodes[index].zIndex = 0;
        }
        this.light.runAction(cc.scaleTo(0.5, 0.85, 0.85));

    }
    EndcardFinish(){
        this.Endcard.play("hand");
    }

    // update (dt) {}
}
