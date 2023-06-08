

const { ccclass, property } = cc._decorator;

@ccclass
export default class BallSkin extends cc.Component {

    @property([cc.Material])
    Skin: cc.Material[] = [];

    private static _instance: BallSkin = null;
    public static get instance() {
        return BallSkin._instance;
    }
    protected onLoad() {
        BallSkin._instance = this;
    }

}
