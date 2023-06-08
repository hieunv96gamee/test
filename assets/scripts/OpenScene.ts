import { AudioPlayId } from "./config/AudioPlayId";
import MainScene from "./MainScene";
import PlayScreen from "./PlayScreen";

const { ccclass, property } = cc._decorator;

@ccclass
export default class OpenScene extends cc.Component {


    @property(cc.Node)
    Gems: cc.Node = null;
    @property([cc.Node])
    Pins: cc.Node[] = [];
    @property(cc.Node)
    bg: cc.Node = null;;

    onEnable() {
        // this.Gems.zIndex = 999;
        let dt = 0;
        if (PlayScreen.instance.isEnd == false) dt = 3;
        
        
        // for (let i = 0; i < this.Pins.length; i++) {
        //     let x = this.Pins[i].parent.position.x;
        //     let y = this.Pins[i].parent.position.y;
        //     cc.tween(this.Pins[i].parent).sequence(
        //         cc.tween(this.Pins[i].parent).to(0.4, { position: cc.v3(x + 50, y) }, { easing: 'quadIn' }).call(() => {
        //             MainScene.instance.audioPlayer.playAudio(AudioPlayId.stick_move, false, 0.6);
        //         }),
        //         cc.tween(this.Pins[i].parent).to(0.4, { position: cc.v3(x, y) }, { easing: 'quadOut' })
        //     ).repeat(2)
        //         .start()

        //     cc.tween(this.Pins[i]).sequence(
        //         cc.tween(this.Pins[i]).to(0.4, { opacity: 255 }, { easing: 'quadIn' }),
        //         cc.tween(this.Pins[i]).to(0.4, { opacity: 0 }, { easing: 'quadOut' })
        //     ).repeat(2)
        //         .to(0.4, { opacity: 0 }).call(() => {
        //             this.node.active = false;
        //         })
        //         .start()
        // }

    }
}
