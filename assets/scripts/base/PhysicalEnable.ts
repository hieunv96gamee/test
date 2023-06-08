import { GameData } from "../GameData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PhysicalEnable extends cc.Component {

    @property(cc.Float)
    gravityScale: number = 1.0;

    @property(cc.Boolean)
    isDebugPhysics: boolean = false;

    @property(cc.Boolean)
    isDebugCollider: boolean = false;

    physicsManager;
    collisionManager;
    physicsManager3d;

    public static REAL_GRAVITY_SCALE = 1.0;

    protected onLoad(): void {
        this.physicsManager = cc.director.getPhysicsManager();
        this.physicsManager3d = cc.director.getPhysics3DManager();
        this.collisionManager = cc.director.getCollisionManager();
    }

    protected onEnable(): void {
        this.setPhysicsEnabled(true);
    }

    protected onDisable(): void {
        this.setPhysicsEnabled(false);
    }

    protected update(dt: number): void {
        // let scale = dt * 60 * this.gravityScale;
        // PhysicalEnable.REAL_GRAVITY_SCALE = scale;
        // this.physicsManager.gravity = cc.v3(0, -320 * scale, 0);
        // this.physicsManager3d.gravity = cc.v3(0, -320 * scale, 0);
    }

    setPhysicsEnabled(enable) {
        this.physicsManager.enabled = enable;
        this.physicsManager3d.enabled = enable;
        this.collisionManager.enabled = enable;
        if (this.isDebugCollider) {
            this.collisionManager.enabledDebugDraw = true;
            // cl.enabledDrawBoundingBox = true;
        }
        if (this.isDebugPhysics) {
            this.physicsManager.debugDrawFlags = cc.PhysicsManager.DrawBits['e_aabbBit'] |
                cc.PhysicsManager.DrawBits['e_pairBit'] |
                cc.PhysicsManager.DrawBits['e_centerOfMassBit'] |
                cc.PhysicsManager.DrawBits['e_jointBit'] |
                cc.PhysicsManager.DrawBits['e_shapeBit']
                ;
        }
    }
}
