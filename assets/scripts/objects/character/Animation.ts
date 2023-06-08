// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { AudioPlayId } from "../../config/AudioPlayId";
import { GameState } from "../../config/GameState";
import MapLevel from "../../level/MapLevel";
import MainScene from "../../MainScene";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AnimationChar extends cc.Component {

    @property(cc.SkeletonAnimation)
    skeleton: cc.SkeletonAnimation = null;

    @property([cc.SkeletonAnimationClip])
    anim: cc.SkeletonAnimationClip[] = [];

    @property([cc.SpriteFrame])
    chatSprite: cc.SpriteFrame[] = [];

    @property(cc.Sprite)
    chatBox: cc.Sprite = null;
    inter: any = null;

    private static _instance: AnimationChar = null;
    public static get instance() {
        return AnimationChar._instance;
    }
    protected onLoad() {
        AnimationChar._instance = this;
        this.skeleton.addClip(this.anim[0], "Idle");
        this.skeleton.addClip(this.anim[1], "Think");
        this.skeleton.addClip(this.anim[2], "Win");
        this.skeleton.addClip(this.anim[3], "Lose");
    }
    start() {
        this.inter = setInterval(() => {
            this.playAnim();
        }, 5000);
    }
    playAnim() {
        let random = Math.floor(Math.random() * 2);
        let animState = this.skeleton.play("Think");
        this.scheduleOnce(() => {
            this.chatBox.node.active = true;
            if (random == 0) {
                MainScene.instance.audioPlayer.playAudio(AudioPlayId.boss_die);
                this.chatBox.spriteFrame = this.chatSprite[2];
            }
            else {
                MainScene.instance.audioPlayer.playAudio(AudioPlayId.boss_take_stick);
                this.chatBox.spriteFrame = this.chatSprite[3];
            }
            this.scheduleOnce(() => {
                if (MapLevel.instance.gameState == GameState.PLAYING)
                    this.chatBox.node.active = false;
            }, 2.4);
        }, 0.4);
        animState.wrapMode = cc.WrapMode.Normal;
    }
    lose() {
        if (MapLevel.instance.gameState == GameState.PLAYING) {
            this.chatBox.node.active = true;
            MainScene.instance.audioPlayer.stopAllAudio();
            clearInterval(this.inter);
            this.inter = null;
            let animState = this.skeleton.play("Lose");
            MainScene.instance.audioPlayer.playAudio(AudioPlayId.game_lose);
            animState.wrapMode = cc.WrapMode.Normal;
            this.chatBox.spriteFrame = this.chatSprite[1];
            MainScene.instance.audioPlayer.playAudio(AudioPlayId.boss_crying);
        }
    }
    win() {
        if (MapLevel.instance.gameState == GameState.PLAYING) {
            this.chatBox.node.active = true;
            MainScene.instance.audioPlayer.stopAllAudio();
            clearInterval(this.inter);
            this.inter = null;
            let animState = this.skeleton.play("Win");
            MainScene.instance.audioPlayer.playAudio(AudioPlayId.game_win);
            animState.wrapMode = cc.WrapMode.Normal;
            this.chatBox.spriteFrame = this.chatSprite[0];
            MainScene.instance.audioPlayer.playAudio(AudioPlayId.boss_jump_win);
        }
    }
    // update (dt) {}
}
