/**
 * Scales the component so that its sprite fills the entire screen.
 */
const { ccclass, property } = cc._decorator;
@ccclass
export default class BackgroundScaler extends cc.Component {

    private sprite: cc.Sprite;

    start() {
        this.sprite = this.getComponent(cc.Sprite);
        if (cc.sys.isMobile) {
            window.addEventListener('resize', this.onResized.bind(this));
        } else {
            cc.view.on('canvas-resize', this.onResized, this);
        }

        this.onResized();
    }

    onResized() {
        const mySize = cc.size(this.sprite.spriteFrame.getTexture().width + 600, this.sprite.spriteFrame.getTexture().height + 400);
        const deviceSize = cc.view.getFrameSize();
        // console.log(mySize);
        const scale = Math.max(mySize.width / deviceSize.width, mySize.height / deviceSize.height);
        this.node.setContentSize(deviceSize.width * scale, deviceSize.height * scale);
    }
}