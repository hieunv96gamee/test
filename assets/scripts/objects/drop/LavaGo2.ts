// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import ColliderCallback from "../../base/ColliderCallback";
import { GroupConfig } from "../../config/GroupConfig";
import MapLevel from "../../level/MapLevel";
const {ccclass, property} = cc._decorator;

@ccclass
export default class LavaGo2 extends cc.Component {

    @property(ColliderCallback)
    headCollider: ColliderCallback = null;

    onLoad () {
        this.headCollider.setColliderCallback(this.onCollider.bind(this));
    }

    start () {
        console.log(this.node);
    }
    onCollider(other , self){

    }

    // update (dt) {}
}
