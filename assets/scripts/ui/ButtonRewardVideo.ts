


const { ccclass, property } = cc._decorator;

@ccclass
export default class ButtonRewardVideo extends cc.Component {

    @property(cc.Node)
    loading: cc.Node = null;

    btn: cc.Button = null;

    protected onLoad(): void {
        this.btn = this.getComponent(cc.Button);
        this.loading.active = false; //todo
    }

    protected onEnable(): void {

        this._onLoadingRewardVideo = this.onLoadingRewardVideo.bind(this);

    }

    protected onDisable(): void {
        if (this._onLoadingRewardVideo) {

        }
    }

    _onLoadingRewardVideo;
    onLoadingRewardVideo(isLoading) {
        // this.loading.active = isLoading;
        this.btn.interactable = !isLoading;
        this.btn.node.opacity = isLoading ? 0 : 255;
    }
}
