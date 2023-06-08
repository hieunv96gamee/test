// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    public followTarget: cc.Node = null;

    @property
    public isFollowRotation = true;

    @property
    public offset = new cc.Vec3();
    public moveSpeed = 3;

    isPlayingStart = false;

    constructor() {
        super();
    }

    public start() {

    }

    public showStart() {

    }

    public lateUpdate(deltaTime: number) {
        if (!this.followTarget) {
            return;
        }

        let posOrigin = this.node.position;
        this.node.scaleX = this.followTarget.scaleX;
        // if (!this.isPlayingStart) {
        let offset = this.offset;
        if (this.isFollowRotation) {
            // offset = cc.Vec3.transformQuat(new cc.Vec3(), this.offset, this.followTarget.);
        }
        console.log(this.followTarget.position);
        let posTarget = new cc.Vec3(this.followTarget.x + offset.x * this.followTarget.scaleX, this.followTarget.position.y + offset.y * this.followTarget.scaleY, this.followTarget.position.z + offset.z);

        // let dis = Vec3.subtract(new Vec3(), posOrigin, posTarget).length();

        this.node.setPosition(posTarget);
        this.node.lookAt(this.followTarget.position, new cc.Vec3(0, 1, 0));

        if (this.isFollowRotation) {
            let angle = new cc.Vec3(this.node.eulerAngles);
            angle.y = this.followTarget.eulerAngles.y;
            this.node.eulerAngles = angle;
        }

    }
}
