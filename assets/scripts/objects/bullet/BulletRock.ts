// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ColliderCallback from "../../base/ColliderCallback";
import { GroupConfig } from "../../config/GroupConfig";
import PhysicalEnable from "../../base/PhysicalEnable";
const { ccclass, property } = cc._decorator;

@ccclass
export default class BulletRock extends cc.Component {

    @property(ColliderCallback)
    shootCollider: ColliderCallback = null;

    private _positionParent: cc.Vec3 | cc.Vec2 = null;
    public set positionParent(pos: (cc.Vec2 | cc.Vec3)) {
        this._positionParent = pos;
    }
    public get positionParent() {
        return this._positionParent;
    }
    onLoad() {
        this.node.getComponent(cc.Sprite).node.active = true;
        this.shootCollider.setColliderCallback(this.onShootCollider.bind(this));
    }
    start() {

    }
    resetPosion() {
        this.node.setPosition(cc.Vec3.ZERO);
    }
    getPosion(){
        return this.node.getPosition();
    }
    onShootCollider(other, self) {
        if(other.node.group === GroupConfig.DEFAULT){
            
        }
    }
    protected onDestroy(): void {
        this.node = null;
    }
}
