import { GroupConfig } from "../../config/GroupConfig";
import MainScene from "../../MainScene";
import { AudioPlayId } from "../../config/AudioPlayId";
import { PhysicsConfig } from "../../config/PhysicsConfig";
import { TagConfig } from "../../config/TagObject";
import { GlobalSignals } from "../../config/GlobalSignals";
import MapLevel from "../../level/MapLevel";
import { GameState } from "../../config/GameState";


const { ccclass, property } = cc._decorator;

@ccclass
export default class BigStone extends cc.Component {
    ischeck = false;
    protected onLoad(): void {
        PhysicsConfig.initPhysicConfig(this.node, 'big_stone');
    }

    onCollisionEnter(other, self) {
        // if (other.node.group === GroupConfig.BERRIE || other.node.group === GroupConfig.ROCK) {
        //     MainScene.instance.audioPlayer.playAudio(AudioPlayId.effect_rock1);
        // }
        // if (this.ischeck = true) return;
        if (MapLevel.instance.gameState == GameState.LOSE) return;
        console.log(other.node.name);
        if (other.node.name === "112") {
            GlobalSignals.questFailSignal.dispatch();
            this.ischeck = true;
        }
    }

}
