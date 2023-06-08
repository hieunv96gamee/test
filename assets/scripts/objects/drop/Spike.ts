const { ccclass, property } = cc._decorator;

@ccclass
export default class GasGO extends cc.Component {


    @property(cc.RigidBody)
    body: cc.RigidBody = null;

    force: number = 6000;
    timeFly: number = 0;

    protected start(): void {
        this.timeFly = Math.random() * 2;
    }



}
