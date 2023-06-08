import Character from "../Character";
import { GlobalSignals } from "../../../config/GlobalSignals";
import MapLevel from "../../../level/MapLevel";

const { ccclass, property } = cc._decorator;
@ccclass
export default class Cat extends Character {
    idleCat: string = "Idle";
    failAnim: string = "Die";
    winAnim: string = "Win";

    _onQuestPass;
    _onQuestFail;

    protected onLoad() {
    }


    protected onEnable(): void {
        this._onQuestFail = this.onQuestFail.bind(this);
        this._onQuestPass = this.onQuestPass.bind(this);

        GlobalSignals.questPassSignal.add(this._onQuestPass);
        GlobalSignals.questFailSignal.add(this._onQuestFail);
    }

    protected onDisable(): void {
        GlobalSignals.questPassSignal.remove(this._onQuestPass);
        GlobalSignals.questFailSignal.remove(this._onQuestFail);
    }

    onQuestPass() {
        if (!this.isAlive) {
            return;
        }

        if (!MapLevel.instance.isQuestSaveHostage) {
            this.playAnimation(this.winAnim, true);
        }
    }

    onQuestFail() {
        this.stopMove();
        if (this.isAlive) {
            this.playAnimation(this.failAnim, false);
        }
    }
}