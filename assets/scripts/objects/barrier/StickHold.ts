import { GroupConfig } from "../../config/GroupConfig";
import GUIUtil from "../../base/utils/GUIUtil";
import ColliderCallback from "../../base/ColliderCallback";
import easeInOut = cc.easeInOut;
import easeOut = cc.easeOut;
import MainScene from "../../MainScene";
import { AudioPlayId } from "../../config/AudioPlayId";
import PlayScreen from "../../PlayScreen";
import MapLevel from "../../level/MapLevel";

const { ccclass, property } = cc._decorator;

export enum StickHoldType {
    FREE = 0,
    SLIDER = 1
}

@ccclass
export default class StickHold extends cc.Component {

    @property({
        type: cc.Enum(StickHoldType)
    })
    stickHoldType: StickHoldType = StickHoldType.FREE;

    @property({
        type: [cc.Node],
        visible() {
            return this.stickHoldType === StickHoldType.SLIDER;
        }
    })
    points: cc.Node[] = [];

    @property(ColliderCallback)
    headCollider: ColliderCallback = null;

    @property(cc.Node)
    hand: cc.Node = null;
    @property(cc.Boolean)
    isKeyPin: boolean = false;
    p0: cc.Vec3;
    p1: cc.Vec3;

    _active: boolean = true;
    private headRootPos: cc.Vec3 = null;
    private holdCallback: Function = null;

    protected onLoad(): void {
        let circlePhysics = this.getComponent(cc.PhysicsCircleCollider);
        let boxPhysics = this.getComponent(cc.PhysicsBoxCollider);
        let boxCollider = this.getComponent(cc.BoxCollider);

        let widthBox = this.node.width - circlePhysics.radius * 2;
        boxCollider.size.height += 8;
        boxCollider.size.width = this.node.width - 10;
        boxPhysics.size.width = widthBox;

        let offsetX = circlePhysics.radius * 2 + widthBox / 2;
        boxPhysics.offset.x = -offsetX;
        boxCollider.offset.x = -widthBox / 2 - circlePhysics.radius;

        if (this.stickHoldType === StickHoldType.SLIDER) {
            this.p0 = this.points[0].position;
            this.p1 = this.points[1].position;

            this.p0.x += this.node.x;
            this.p0.y += this.node.y;

            this.p1.x += this.node.x;
            this.p1.y += this.node.y;
        }

        if (this.headCollider) {
            this.headCollider.setColliderCallback(this.onHeadCollider.bind(this));
        }
    }

    protected onEnable(): void {
        this.headRootPos = this.node.position;
    }

    onClick() {
        if (!this._active) {
            return;
        }
        // cc.Tween.stopAll();
        if (this.isKeyPin) {
            // cc.Tween.stopAll();
        }
        this._active = false;
        MainScene.instance.audioPlayer.playAudio(AudioPlayId.stick_move)
        if (this.stickHoldType === StickHoldType.FREE) {
            let dstPos = this.node.position;
            dstPos.x += 1600;
                cc.Tween.stopAllByTarget(this.node);
                cc.tween(this.node).to(0.5, {
                    position: dstPos
                }, easeInOut(2.0)).call(() => {
                    if (this.holdCallback) this.holdCallback(this);
                }).start();

            if (this.hand)
                this.hand.active = false;

        } else if (this.stickHoldType === StickHoldType.SLIDER) {

            let root = this.node;
            let d0 = GUIUtil.getDistancePoints(root.position, this.p0);
            let d1 = GUIUtil.getDistancePoints(root.position, this.p1);
            let dstPos = d1 > d0 ? this.p1 : this.p0;

            cc.Tween.stopAllByTarget(root);
            cc.tween(root).to(1.2, {
                position: dstPos

            }, easeInOut(3.0)).call(() => {
                if (this.holdCallback) this.holdCallback(this);
                this._active = true;
            }).start();
        }
    }

    onHeadCollider(other, self) {
        console.log(other.node);
        console.log(this.node);
        if (other.node.group === GroupConfig.BERRIE && other.node != this.node|| other.node.group === GroupConfig.LAVA && other.node != this.node) {
            cc.log("onHeadCollider: " + other.node.name);
            let root = this.node;

            this.scheduleOnce(() => {
                cc.Tween.stopAllByTarget(root);
                cc.tween(root).to(0.5, {
                    position: this.headRootPos

                }, easeOut(1.0)).call(() => {
                    this._active = true;
                }).start();
            }, 0.01);
        }
    }

    setHoldCallback(cb: Function) {
        this.holdCallback = cb;
    }
    onCollisionEnter(other, self) {
        if (other.node.group === GroupConfig.TOUCH) {
            this.onClick();
        }
}
