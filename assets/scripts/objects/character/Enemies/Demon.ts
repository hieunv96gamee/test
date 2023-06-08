import Enemies from "./Enemies";
import {AudioPlayId} from "../../../config/AudioPlayId";
import MainScene from "../../../MainScene";


const {ccclass, property} = cc._decorator;

@ccclass
export default class Demon extends Enemies {

    playAttack(target: cc.Node) {
        super.playAttack(target);
        MainScene.instance.audioPlayer.playAudio(AudioPlayId.demon_punch);
    }

    onDieIce() {
        super.onDieIce();
        MainScene.instance.audioPlayer.playAudio(AudioPlayId.stealer_die);
    }

    onDieNormal() {
        super.onDieNormal();
        MainScene.instance.audioPlayer.playAudio(AudioPlayId.stealer_die);
    }

    onDieFire() {
        super.onDieFire();
        MainScene.instance.audioPlayer.playAudio(AudioPlayId.stealer_die);
    }

}
