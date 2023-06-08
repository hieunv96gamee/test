import BulletRock from "./BulletRock";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Gunman extends cc.Component {

    @property(cc.Prefab)
    bulletRockPrefab: cc.Prefab = null;
    @property(cc.Node)
    bulletRockParent: cc.Node = null;
    bulletRockNode: cc.Node = null;
    bulletRock: BulletRock = null;

    onLoad () {
    }

    start () {
        this.onAttack();
    }
    runAnimationAttack(){
        let anim = this.node.getComponent(sp.Skeleton);
        anim.setAnimation(0 ,"Attack", true);
    }
    onBulletRock(){
        let bullet = cc.instantiate(this.bulletRockPrefab);
        bullet.parent = this.bulletRockParent;
        this.bulletRock = bullet.getComponent(BulletRock);
        this.bulletRockNode= bullet;
        this.bulletRockNode.setPosition(cc.Vec3.ZERO);
    }
    onAttack(){
        cc.tween(this.bulletRockParent).repeatForever(cc.tween().to(1 ,{position : cc.v3(500, 0, 0)}).call(()=>{
            this.onBulletRock();
            this.bulletRock.resetPosion();
            this.runAnimationAttack();
        })).start();
    }
}
