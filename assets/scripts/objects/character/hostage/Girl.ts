import Character from "../Character";
import { GroupConfig } from "../../../config/GroupConfig";
import { GlobalSignals } from "../../../config/GlobalSignals";
import TagObject, { TagConfig } from "../../../config/TagObject";
import { AudioPlayId } from "../../../config/AudioPlayId";
import MainScene from "../../../MainScene";
import { SkinConfig } from "../../../config/SkinConfig";
import { GameData } from "../../../GameData";
import GUIUtil from "../../../base/utils/GUIUtil";




const { ccclass, property } = cc._decorator;

@ccclass
export default class Girl extends Character {

    outAnim: string = "Out";
    winAnim: string = "Win";
    flowerAnim: string = "Flower";

    wonderSkin: string = "Wonder";
    wonderAppearAnim: string = "WonderAppear";
    wonderIdleAnim: string = "WonderIdle";
    wonderAttackAnim: string = "WonderAttack";
    wonderOutAnim: string = "WonderOut";
    wonderWinAnim: string = "WonderWin";

    protected onLoad(): void {
        super.onLoad();
        // this.initGirlSkin();
        if (this.hit) {
            this.hit.active = false;
        }
        this.node.zIndex = 100;
    }

    initGirlSkin() {
        let skinName = SkinConfig.getSkinGirlConfigById(GameData.currentSkinWife);

        // let rootSkin = skinName.split('/')[0];
        // this.stickSkin = rootSkin + "/Stick";
        this.changeSkin(skinName.skins[0]);
        let skinCfg = SkinConfig.getSkinGirlConfigById(GameData.currentSkinWife)


    }

    protected onEnable(): void {
    }

    onAttackCollider(other, self): void {
        super.onAttackCollider(other, self);

        if (other.node.group === GroupConfig.ITEM) {
            if (other.node.name == TagConfig.HOLY_WATER) {
                try {
                    other.node.removeComponent(cc.PhysicsCollider);
                    other.node.removeComponent(cc.BoxCollider);
                    other.node.removeFromParent();

                } catch (e) {
                    cc.warn(e);
                }
                this.stopMove();
                this.changeSkinToWonder();
                return;
            }
        }

        if (other.node.group === GroupConfig.CHARACTER) {
            if (this.getCurrentSkin() === this.wonderSkin) {

                if (other.node.name != TagConfig.BOSS) {
                    this.playAttack(other.node);
                    return;
                }
            }
            return;
        }
    }

    playOutAnimation(target: cc.Node) {
        this.rotateFaceToTarget(target);
        if (this.getCurrentSkin() === this.wonderSkin) {
            this.playAnimation(this.wonderOutAnim)
                .addAnimation(this.wonderWinAnim, true);

        } else {
            this.playAnimation(this.winAnim)
                .addAnimation(this.winAnim)
                .addAnimation(this.flowerAnim, true);
        }
    }

    playAnimationGiveEgg(target: cc.Node, eggRand, callBack) {
        this.rotateFaceToTarget(target);
        let animGive = this.flowerAnim;
        let animGive2 = animGive

        if (eggRand) {
            animGive = eggRand.skins;
            animGive2 = this.getNameAnimGive2(animGive)
            GlobalSignals.girlGiveEggSignal.dispatch(eggRand.eggId);
        }
        this.playAnimation(this.winAnim)
            // .addAnimation(this.winAnim)
            .addAnimation(animGive)
            .addAnimation(animGive2, true);
        let dt = this.skeleton.findAnimation(this.outAnim).duration;
        this.scheduleOnce(() => {
            callBack();
        }, dt)
    }

    changeSkinToWonder() {
        this.changeSkin(this.wonderSkin);
        this.playAnimation(this.wonderAppearAnim).addAnimation(this.wonderIdleAnim, true);

        let dt = this.skeleton.findAnimation(this.wonderAppearAnim).duration;
        cc.tween(this.skeleton.node).by(dt, {
            position: new cc.Vec3(0, 20, 0)
        }).start();

        this.attackCollider.node.getComponent(cc.BoxCollider).size.width += 40;
        MainScene.instance.audioPlayer.playAudio(AudioPlayId.boss_take_stick);

        let tagObj = this.groundCollider.node.getComponent(TagObject);
        if (tagObj) {
            tagObj.setTag(TagConfig.GIRL_WONDER);
            cc.log("changeSkinToWonder");
        }

        // this.scheduleOnce(() => {
        //     this.searchCollider.refreshPingToTarget();
        // }, 0.1);
    }

    playAttack(target: cc.Node) {
        if (!this.hit) {
            return;
        }

        cc.log("wonder playAttack");
        this.rotateFaceToTarget(target);
        this.playAnimation(this.wonderAttackAnim);
        this.stopMove();

        this.scheduleOnce(() => {
            this.hit.active = true;
        }, 0.35);

        this.skeleton.setCompleteListener(() => {
            this.skeleton.setCompleteListener(null);
            this.playAnimation(this.wonderIdleAnim, true);
            this.hit.active = false;
            this.stopMove();
        });
    }

    onHeadCollider(other, self): void {
        if (!this.isAlive) return;

        if (this.getCurrentSkin() === this.wonderSkin) {
            return;
        }

        if (other.node.group === GroupConfig.ROCK) {
            //this.onDieNormal();
            if (other.node.name == TagConfig.BIG_ROCK) {
                this.onDieNormal();
                this.disablePhysicsBody();
            }
            return;
        }

        if (other.node.group === GroupConfig.ITEM) {
            if (other.node.name == TagConfig.CHEST || other.node.name == TagConfig.ITEM) {
                this.onDieNormal();
                return;
            }
        }
    }

    onBodyCollider(other, self) {
        if (!this.isAlive) {
            return;
        }

        if (this.getCurrentSkin() === this.wonderSkin) {
            return;
        }

        // if (other.node.group === GroupConfig.LAVA) {
        //     this.onDieFire();
        //     return;
        // }

        if (other.node.group === GroupConfig.SNOW) {
            this.onDieIce();
            return;
        }

        if (other.node.group === GroupConfig.COLLIDER) {

            if (other.node.name == TagConfig.REDIRECT_RIGHT
                || other.node.name == TagConfig.REDIRECT_LEFT) {
                other.node.removeFromParent();
                return;
            }

            if (other.node.name == TagConfig.GAS || other.node.name == TagConfig.BOMB) {
                this.onDieNormal();
                return;
            }

            if (other.node.name == TagConfig.HIT) {
                this.onDieNormal();
                return;
            }
        }
    }

    onDieNormal() {
        this.stun.node.active = true;
        this.playAnimation(this.dieAnim);
        this.isAlive = false;
        GlobalSignals.questFailSignal.dispatch();
        MainScene.instance.audioPlayer.playAudio(AudioPlayId.girl_die);
    }

    onDieFire() {
        this.stun.node.active = true;
        this.playAnimation(this.dieFireAnim);
        this.isAlive = false;
        GlobalSignals.questFailSignal.dispatch();
        MainScene.instance.audioPlayer.playAudio(AudioPlayId.girl_die);
    }

    onDieIce() {
        this.stun.node.active = true;
        this.playAnimation(this.dieIceAnim);
        this.isAlive = false;
        GlobalSignals.questFailSignal.dispatch();
        MainScene.instance.audioPlayer.playAudio(AudioPlayId.girl_die);
    }

    private getNameAnimGive2(nameAnim1: string) {
        let split_string = nameAnim1.split(/(\d+)/);
        let nameAnim = split_string[0];
        let num = split_string[1];
        let anim: string = nameAnim + num + num;
        return anim;
    }


}
