const { ccclass, property } = cc._decorator;

@ccclass
export default class ColliderCallback extends cc.Component {

    private colliderEnterCb: Function = null;
    private colliderExitCb: Function = null;
    private colliderEnterCbStay: Function = null;

    setColliderCallback(enterCb: Function, exitCb: Function = null) {
        this.colliderEnterCb = enterCb;
        this.colliderExitCb = exitCb;
    }
    setColliderCallbackStay(enterCb: Function) {
        this.colliderEnterCbStay = enterCb;

    }

    onCollisionEnter(other, self) {
        if (this.colliderEnterCb) {
            this.colliderEnterCb(other, self);
        }
    }
    onCollisionStay(other, self) {
        if (this.colliderEnterCbStay) {
            this.colliderEnterCbStay(other, self);
        }
    }

    onCollisionExit(other, self) {
        if (this.colliderExitCb) {
            this.colliderExitCb(other, self);
        }
    }
}
