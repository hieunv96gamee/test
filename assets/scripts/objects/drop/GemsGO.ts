import Vec3 = cc.Vec3;
import MapLevel from "../../level/MapLevel";
import { AudioPlayId } from "../../config/AudioPlayId";
import { GroupConfig } from "../../config/GroupConfig";
import MainScene from "../../MainScene";
import { PhysicsConfig } from "../../config/PhysicsConfig";
import { GlobalSignals } from "../../config/GlobalSignals";
import BallSkin from "./BallSkin";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GemsGO extends cc.Component {

    target: cc.Node = null;
    available: boolean = true;
    private static transformCount = 0;
    private static colliderBarrieCount = 0;
    rb: cc.RigidBody = null;
    canDrop: boolean = false;
    hitTime: number = 0;
    not3D: boolean = true;
    @property
    active: boolean = false;
    @property
    isRb: boolean = false;
    @property(cc.Prefab)
    rockPrefab: cc.Prefab = null;
    protected onLoad(): void {
        PhysicsConfig.initPhysicConfig(this.node, 'gems');
        this.rb = this.getComponent(cc.RigidBody);
        setTimeout(() => {
            this.canDrop = true;
        }, 1000);
    }

    protected start(): void {
        if (this.isRb) {
            cc.tween(this.node).repeatForever(cc.tween().to(0.8, { angle: +10 }).to(0.8, { angle: -10 })).call(()=>{
            }).start();
        }
        GemsGO.transformCount = 0;
        GemsGO.colliderBarrieCount = 0;
    }

    protected onDestroy(): void {
        this.unscheduleAllCallbacks();
    }

    onCollisionEnter(other, self) {
        // cc.log("onCharCollisionEnter: " + other.node.group);
        if (!this.available) {
            return;
        }

        if (other.node.group === GroupConfig.LAVA) {
            // this.available = false;
            // MapLevel.instance.countGemsDestroyed++;
            // this.startTransform();
            // this.node.removeFromParent();
            this.transformToRock();
            return;
        }
        if (other.node.group === GroupConfig.BERRIE || other.node.group === GroupConfig.ROCK) {
            // MainScene.instance.audioPlayer.playAudio(AudioPlayId.effect_gems);
            GemsGO.colliderBarrieCount++;
            if (GemsGO.colliderBarrieCount === 6) {
                this.scheduleOnce(() => {
                    GemsGO.colliderBarrieCount = 0;
                }, 2.0);
            }
            return;
        }
        if (other.node.group === GroupConfig.DEAD) {
            if (this.not3D) {
                this.node.removeComponent(cc.RigidBody);
                this.node.removeComponent(cc.PhysicsBoxCollider);
                this.node.addComponent(cc.RigidBody3D);
                this.node.addComponent(cc.SphereCollider3D);
                this.node.getComponent(cc.SphereCollider3D).radius = 10;
                this.node.getComponent(cc.RigidBody3D).angularDamping = 0;
                this.node.getComponent(cc.RigidBody3D).linearDamping = 0;
                this.node.getComponent(cc.SphereCollider3D).sharedMaterial = MapLevel.instance.physicMaterial;
                this.node.is3DNode = true;
                // this.node.getComponent(cc.RigidBody3D).linearFactor = cc.Vec3.ZERO;
                // this.node.getComponent(cc.RigidBody3D).angularFactor = cc.Vec3.ZERO;
                this.not3D = false;
                this.canDrop = false;
            }
        }
    }
    transformToRock() {

        let root = MapLevel.instance.rockContainer;
        let rock = cc.instantiate(this.rockPrefab);
        console.log(rock);
        rock.position = root.convertToNodeSpaceAR(this.node.getParent().convertToWorldSpaceAR(this.node.position));
        rock.parent = root;
        this.node.removeFromParent();
    }
    onCollisionStay(other, self) {
        //console.log("onCollisionStay " + other.node.group);
        if (other.node.group === GroupConfig.GEMS) {
            if (!this.active && other.node.getComponent("GemsGO").active && other.node.getComponent("GemsGO").not3D) {
                MainScene.instance.audioPlayer.playAudio(AudioPlayId.effect_rock1, false, 0.3)
                let fx = cc.instantiate(MapLevel.instance.fx);
                this.node.addChild(fx);
                let a = Math.floor(Math.random() * 5);
                if (a == 0) {
                    fx.color = cc.Color.BLUE;
                } else if (a == 1) {
                    fx.color = cc.Color.CYAN;
                } else if (a == 2) {
                    fx.color = cc.Color.GREEN;
                } else if (a == 3) {
                    fx.color = cc.Color.ORANGE;
                } else if (a == 3) {
                    fx.color = cc.Color.RED;
                }
                this.node.children[0].children[0].getComponent(cc.MeshRenderer).setMaterial(0, BallSkin.instance.Skin[a]);
                this.active = true;
            }
        }
    }

    onBeginContact(contact, self, other) {
        let targetPoint = this.rb.getLocalCenter();
        targetPoint = cc.v2(targetPoint.x, targetPoint.y);
        let targetForce = cc.v2(100, 100);
        this.rb.applyForce(targetForce, targetPoint, false);
    }

    startTransform() {
        GemsGO.transformCount++;
        if (GemsGO.transformCount === 8 && MapLevel.instance.isPlaying) {
            MainScene.instance.audioPlayer.playAudio(AudioPlayId.effect_lava_x_water);
        }
    }

    updatePositionToTarget() {
        if (!this.node.getParent()) {
            return;
        }
        let p = this.node.getParent().convertToNodeSpaceAR(
            this.target.getParent().convertToWorldSpaceAR(this.target.position));
        let p2 = new Vec3(p.x, p.y + 20, 0);

        let p1 = this.node.position;
        if (Math.abs(p1.x - p2.x) < 10 && Math.abs(p1.y - p2.y) < 10) {
            this.node.removeFromParent();

        } else {
            this.node.position = p1.lerp(p2, 0.1);
        }
    }

    moveToTarget(target: cc.Node, delay: number) {
        this.scheduleOnce(() => {
            if (!MapLevel.instance.isCollectGems) {
                return;
            }

            this.target = target;
            this.node.removeComponent(cc.RigidBody);
            this.node.removeComponent(cc.PhysicsCollider);
            this.schedule(this.updatePositionToTarget.bind(this));
        }, delay);
    }
    protected update(dt: number): void {
        if (this.canDrop)
            if (!!this.rb.linearVelocity)
                if (this.rb.linearVelocity.y < -350 || this.rb.linearVelocity.y > 350) {
                    this.rb.linearVelocity = cc.v2(this.rb.linearVelocity.x, this.rb.linearVelocity.y * 1.035);
                    this.canDrop = false;
                }

    }

}
