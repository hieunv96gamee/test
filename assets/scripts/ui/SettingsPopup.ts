import ToggleSliderGroup from "../base/toggle/ToggleSliderGroup";
import AudioManager from "../base/audio/AudioManager";
import {GameData} from "../GameData";


const {ccclass, property} = cc._decorator;

@ccclass
export default class SettingsPopup extends cc.Component {

    @property(ToggleSliderGroup)
    btn_sound_effect: ToggleSliderGroup = null;

    @property(ToggleSliderGroup)
    btn_sound_music: ToggleSliderGroup = null;

    @property(cc.Button)
    btn_reset_data: cc.Button = null;

    protected onLoad(): void {
        this.btn_sound_effect.setOnClickCallback((isOn) => {
            AudioManager.EffectEnable = isOn;
        });

        this.btn_sound_music.setOnClickCallback((isOn) => {
            AudioManager.MusicEnable = isOn;
        });

        if (this.btn_reset_data) {
            this.btn_reset_data.node.active = window['isDev'] != undefined ? window['isDev'] : true;
        }
    }

    protected start(): void {
        this.btn_sound_effect.setToggleState(AudioManager.EffectEnable, false);
        this.btn_sound_music.setToggleState(AudioManager.MusicEnable, false);
    }

    onClearData() {
        cc.warn("onClearData");
        GameData.clearData();
    }
}
