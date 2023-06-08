export class ItemSkinConfig {
    skinId: string
    skins: string[]
    type: string
    value: number
    constructor(_skinId: string,
        _skins: string[],
        _type: string,
        _value: number,) {
        this.skinId = _skinId;
        this.skins = _skins;
        this.type = _type;
        this.value = _value
    }
}
// 31  tuan loc
//,40, xanh la
//49, socer
//26,
//20 
export class GroupItemSkinConfig extends ItemSkinConfig {
    graph: string[]
    isRoot: boolean
    group: string
    constructor(_skinId: string,
        _skins: string[],
        _type: string,
        _value: number, _graph: string[], _isRoot: boolean, _group: string) {
        super(_skinId, _skins, _type, _value);
        this.graph = _graph;
        this.isRoot = _isRoot
        this.group = _group
    }
}
export class GroupItemSkinVsFeature extends GroupItemSkinConfig {
    idFeatures: string[]
    constructor(_skinId: string,
        _skins: string[],
        _type: string,
        _value: number, _graph: string[], _isRoot: boolean, _idFeature: string[], _group: string) {
        super(_skinId, _skins, _type, _value, _graph, _isRoot, _group);
        this.graph = _graph;
        this.isRoot = _isRoot
        this.idFeatures = _idFeature;
    }
}
export class ItemSkinHaveFeature extends ItemSkinConfig {
    idFeatures: string[]
    constructor(_skinId: string,
        _skins: string[],
        _type: string,
        _value: number, idFeature: string[]) {
        super(_skinId, _skins, _type, _value);
        this.idFeatures = idFeature
    }
}
export class SkinConfig {

    public static get_type = {
        free: "free",
        buy: "buy",
        claim_ad: "claim_ad",
        gift_code: "gift_code",
        share_fb: "share_fb",
        daily_reward: "daily_reward",
        event: "halloween"
    };

    public static arraySkinBoss: ItemSkinConfig[] = [
        //row 1
        new ItemSkinConfig(
            "boss_0",
            ["Boss0/Boss"],
            SkinConfig.get_type.free,
            0,
        ),
        new ItemSkinConfig(
            "boss_1",
            ["Boss1/Boss"],
            SkinConfig.get_type.claim_ad,
            0,
        ),
        new ItemSkinConfig(
            "boss_46",
            ["Boss46/Boss"],
            SkinConfig.get_type.claim_ad,
            0,
        ),
        //row 2
        new ItemSkinConfig(
            "boss_3",
            ["Boss3/Boss"],
            SkinConfig.get_type.buy,
            10000,
        ),
        new ItemSkinConfig(
            "boss_4",
            ["Boss4/Boss"],
            SkinConfig.get_type.buy,
            10000,
        ),
        new ItemSkinConfig(
            "boss_5",
            ["Boss5/Boss"],
            SkinConfig.get_type.buy,
            10000,

        ),
        //row 3
        new ItemSkinConfig(
            "boss_6",
            ["Boss6/Boss"],
            SkinConfig.get_type.buy,
            15000,

        ),
        new ItemSkinConfig(
            "boss_7",
            ["Boss7/Boss"],
            SkinConfig.get_type.buy,
            15000,
        ),
        new ItemSkinConfig(
            "boss_8",
            ["Boss8/Boss"],
            SkinConfig.get_type.buy,
            15000,
        ),
        //row 4
        new ItemSkinConfig(
            "boss_9",
            ["Boss9/Boss"],
            SkinConfig.get_type.buy,
            30000,

        ),
        new ItemSkinConfig(
            "boss_10",
            ["Boss10/Boss"],
            SkinConfig.get_type.buy,
            30000,

        ),
        new ItemSkinConfig(
            "boss_11",
            ["Boss11/Boss"],
            SkinConfig.get_type.buy,
            30000,
        ),
        //row 5
        new ItemSkinConfig(
            "boss_12",
            ["Boss12/Boss"],
            SkinConfig.get_type.buy,
            30000
        ),
        new ItemSkinConfig(
            "boss_13",
            ["Boss13/Boss"],
            SkinConfig.get_type.buy,
            30000,

        ),
        new ItemSkinConfig(
            "boss_14",
            ["Boss14/Boss"],
            SkinConfig.get_type.buy,
            30000,
        ),
        //row 6
        new ItemSkinConfig(
            "boss_15",
            ["Boss15/Boss"],
            SkinConfig.get_type.buy,
            40000,

        ),
        new ItemSkinConfig(
            "boss_16",
            ["Boss16/Boss"],
            SkinConfig.get_type.buy,
            40000,
        ),
        new ItemSkinConfig(
            "boss_17",
            ["Boss17/Boss"],
            SkinConfig.get_type.buy,
            40000,
        ),
        //row 7
        new ItemSkinConfig(
            "boss_19",
            ["Boss19/Boss"],
            SkinConfig.get_type.buy,
            50000,
        ),
        new GroupItemSkinConfig(
            "boss_40",
            ["Boss40/Boss"],
            SkinConfig.get_type.share_fb,
            0,
            ['boss_41,boss_42'],
            false,
            "Patrick"
        ),
        //gh skin
        new GroupItemSkinConfig(
            "boss_41",
            ["Boss41/Boss",],
            SkinConfig.get_type.share_fb,
            0,
            ['boss_40,boss_42'],
            false,
            "Patrick"
        ),
        new GroupItemSkinVsFeature(
            "boss_42",
            ["Boss41/Boss"],
            SkinConfig.get_type.share_fb,
            0,
            ['boss_41,boss_42'],
            true,
            ["feature_12"],
            "Patrick"
        ),
        new GroupItemSkinConfig(
            "boss_20",
            ["Boss20/Boss"],
            SkinConfig.get_type.buy,
            200000,
            ['boss_21', 'boss_22'],
            false,
            "Bat"
        ),
        new GroupItemSkinConfig(
            "boss_21",
            ["Boss21/Boss"],
            SkinConfig.get_type.buy,
            200000,
            ['boss_21', 'boss_22'],
            false,
            "Bat"
        ),
        new GroupItemSkinVsFeature(
            "boss_22",
            ["Boss21/Boss"],
            SkinConfig.get_type.buy,
            200000,
            ['boss_20', 'boss_21'],
            true,
            ["feature_2"],
            "Bat"
        ),
        //row 8
        {
            skinId: "boss_29",
            skins: ["Boss29/Boss"],
            type: SkinConfig.get_type.buy,
            value: 50000,

        },
        {
            skinId: "boss_30",
            skins: ["Boss30/Boss"],
            type: SkinConfig.get_type.buy,
            value: 50000,

        },
        new GroupItemSkinConfig(
            "boss_26",
            ["Boss26/Boss"],
            SkinConfig.get_type.buy,
            200000,
            ['boss_27'],
            false,
            "Noel"
        ),
        new GroupItemSkinConfig(
            "boss_27",
            ["Boss27/Boss"],
            SkinConfig.get_type.buy,
            200000,
            ['boss_26', 'boss_28'],
            false,
            "Noel"
        ),
        new GroupItemSkinVsFeature(
            "boss_28",
            ["Boss27/Boss"],
            SkinConfig.get_type.buy,
            200000,
            ['boss_27'],
            true,
            ["feature_11"],
            "Noel"
        ),
        //row 9
        {
            skinId: "boss_34",
            skins: ["Boss34/Boss"],
            type: SkinConfig.get_type.buy,
            value: 40000,

        },
        {
            skinId: "boss_35",
            skins: ["Boss35/Boss"],
            type: SkinConfig.get_type.gift_code,
            value: 0,

        },
        new GroupItemSkinConfig(
            "boss_31",
            ["Boss31/Boss",],
            SkinConfig.get_type.buy,
            200000,
            ['boss_32'],
            false,
            "MuaLan"
        ),
        //gh skin
        new GroupItemSkinConfig(
            "boss_32",
            ["Boss32/Boss"],
            SkinConfig.get_type.buy,
            200000,
            ['boss_32'],
            false,
            "MuaLan"
        ),
        new GroupItemSkinVsFeature(
            "boss_33",
            ["Boss32/Boss"],
            SkinConfig.get_type.buy,
            200000,
            ['boss_32'],
            true,
            ["feature_7"],
            "MuaLan",
        ),
        //row 10
        {
            skinId: "boss_36",
            skins: ["Boss36/Boss"],
            type: SkinConfig.get_type.share_fb,
            value: 0,

        },
        {
            skinId: "boss_37",
            skins: ["Boss37/Boss"],
            type: SkinConfig.get_type.gift_code,
            value: 0,

        },
        new GroupItemSkinConfig(
            "boss_38",
            ["Boss38/Boss"],
            SkinConfig.get_type.share_fb,
            0,
            ['boss_39'],
            false,
            "valentine",
        ),
        new GroupItemSkinConfig(
            "boss_39",
            ["Boss39/Boss"],
            SkinConfig.get_type.share_fb,
            0,
            ['boss_38,boss_60'],
            false,
            "valentine",
        ),
        new GroupItemSkinVsFeature(
            "boss_60",
            ["Boss39/Boss"],
            SkinConfig.get_type.share_fb,
            0,
            ['boss_39'],
            true,
            ['feature_13'],
            "valentine",
        ),
        //row 11
        {
            skinId: "boss_44",
            skins: ["Boss44/Boss"],
            type: SkinConfig.get_type.gift_code,
            value: 0,

        },
        {
            skinId: "boss_45",
            skins: ["Boss45/Boss"],
            type: SkinConfig.get_type.gift_code,
            value: 0,

        },
        {
            skinId: "boss_47",
            skins: ["Boss47/Boss"],
            type: SkinConfig.get_type.gift_code,
            value: 0,

        },
        //row 12
        new ItemSkinHaveFeature(
            "boss_23",
            ["Boss23/Boss"],
            SkinConfig.get_type.daily_reward,
            0,
            ['feature_4']
        ),
        new ItemSkinHaveFeature(
            "boss_24",
            ["Boss24/Boss"],
            SkinConfig.get_type.daily_reward,
            0,
            ['feature_1']
        ),
        new ItemSkinHaveFeature(
            "boss_25",
            ["Boss25/Boss"],
            SkinConfig.get_type.daily_reward,
            0,
            ['feature_3']
        ),
        new GroupItemSkinConfig(
            "boss_48",
            ["Boss48/Boss"],
            SkinConfig.get_type.buy,
            200000,
            ['boss_49'],
            false,
            "FootBall"
        ),
        new GroupItemSkinConfig(
            "boss_49",
            ["Boss49/Boss"],
            SkinConfig.get_type.buy,
            200000,
            ['boss_48', 'boss_50'],
            false,
            "FootBall"
        ),
        new GroupItemSkinVsFeature(
            "boss_50",
            ["Boss49/Boss"],
            SkinConfig.get_type.buy,
            200000,
            ['boss_49'],
            true,
            ["feature_7"],
            "FootBall"
        ),
        new GroupItemSkinConfig(
            "boss_52",
            ["Boss52/Boss"],
            SkinConfig.get_type.buy,
            200000,
            ['boss_52'],
            false,
            "Halloween"
        ),
        new GroupItemSkinConfig(
            "boss_53",
            ["Boss53/Boss"],
            SkinConfig.get_type.buy,
            200000,
            ['boss_52', 'boss_54'],
            false,
            "Halloween"
        ),
        new GroupItemSkinVsFeature(
            "boss_54",
            ["Boss53/Boss"],
            SkinConfig.get_type.buy,
            200000,
            ['boss_53'],
            true,
            ["feature_9"],
            "Halloween"
        ),

    ];
    public static arraySkinGirl: ItemSkinConfig[] =
        [
            //row 1
            {
                skinId: "wife_0",
                skins: ["Wife0"],
                type: SkinConfig.get_type.free,
                value: 0
            },
            {
                skinId: "wife_1",
                skins: ["Wife1"],
                type: SkinConfig.get_type.free,
                value: 0
            },
            {
                skinId: "wife_2",
                skins: ["Wife2"],
                type: SkinConfig.get_type.claim_ad,
                value: 0
            },
            //row 2
            {
                skinId: "wife_3",
                skins: ["Wife3"],
                type: SkinConfig.get_type.buy,
                value: 10000
            },
            {
                skinId: "wife_4",
                skins: ["Wife4"],
                type: SkinConfig.get_type.buy,
                value: 10000
            },
            {
                skinId: "wife_5",
                skins: ["Wife5"],
                type: SkinConfig.get_type.buy,
                value: 10000
            },
            //row 3
            {
                skinId: "wife_6",
                skins: ["Wife6"],
                type: SkinConfig.get_type.buy,
                value: 15000
            },
            {
                skinId: "wife_7",
                skins: ["Wife7"],
                type: SkinConfig.get_type.buy,
                value: 15000
            },
            {
                skinId: "wife_8",
                skins: ["Wife8"],
                type: SkinConfig.get_type.buy,
                value: 15000
            },
            //row 4
            {
                skinId: "wife_9",
                skins: ["Wife9"],
                type: SkinConfig.get_type.buy,
                value: 30000
            },
            {
                skinId: "wife_10",
                skins: ["Wife10"],
                type: SkinConfig.get_type.buy,
                value: 30000
            },
            {
                skinId: "wife_11",
                skins: ["Wife11"],
                type: SkinConfig.get_type.buy,
                value: 30000
            },
            //row 5
            {
                skinId: "wife_12",
                skins: ["Wife12"],
                type: SkinConfig.get_type.buy,
                value: 30000
            },
            {
                skinId: "wife_13",
                skins: ["Wife13"],
                type: SkinConfig.get_type.buy,
                value: 30000
            },
            {
                skinId: "wife_14",
                skins: ["Wife14"],
                type: SkinConfig.get_type.buy,
                value: 30000
            },
            //row 6
            {
                skinId: "wife_15",
                skins: ["Wife15"],
                type: SkinConfig.get_type.buy,
                value: 40000
            },
            {
                skinId: "wife_16",
                skins: ["Wife16"],
                type: SkinConfig.get_type.buy,
                value: 40000
            },
            {
                skinId: "wife_17",
                skins: ["Wife17"],
                type: SkinConfig.get_type.buy,
                value: 40000
            },
            //row 7
            {
                skinId: "wife_18",
                skins: ["Wife18"],
                type: SkinConfig.get_type.buy,
                value: 50000
            },
            {
                skinId: "wife_19",
                skins: ["Wife19"],
                type: SkinConfig.get_type.share_fb,
                value: 0
            },
            {
                skinId: "wife_20",
                skins: ["Wife20"],
                type: SkinConfig.get_type.buy,
                value: 200000
            },
            //row 8
            {
                skinId: "wife_21",
                skins: ["Wife21"],
                type: SkinConfig.get_type.buy,
                value: 50000
            },
            {
                skinId: "wife_22",
                skins: ["Wife22"],
                type: SkinConfig.get_type.buy,
                value: 50000
            },
            {
                skinId: "wife_23",
                skins: ["Wife23"],
                type: SkinConfig.get_type.buy,
                value: 200000
            },
            //row 9
            {
                skinId: "wife_24",
                skins: ["Wife24"],
                type: SkinConfig.get_type.event,
                value: 40000
            },
            {
                skinId: "wife_25",
                skins: ["Wife25"],
                type: SkinConfig.get_type.event,
                value: 0
            },
            {
                skinId: "wife_26",
                skins: ["Wife26"],
                type: SkinConfig.get_type.event,
                value: 0
            },

        ];

    public static getSkinNameById(skinId: string) {
        let arr = SkinConfig.arraySkinBoss;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].skinId === skinId) {
                let cfg = arr[i];
                return cfg.skins[cfg.skins.length - 1];
            }
        }
        return "Boss0/Boss";
    }

    public static getSkinConfigById(skinId: string) {
        let arr = SkinConfig.arraySkinBoss;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].skinId === skinId) {
                let cfg = arr[i];
                return cfg;
            }
        }

        return null;
    }

    public static getSkinGirlConfigById(skinId: string) {
        let arr = SkinConfig.arraySkinGirl;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].skinId === skinId) {
                let cfg = arr[i];
                return cfg;
            }
        }

        return null;
    }
    public static GetAllItemSampleGroup(_group: string) {
        let arr: GroupItemSkinConfig[] = [];
        SkinConfig.arraySkinBoss.forEach((item) => {
            if (item instanceof GroupItemSkinConfig) {
                item as GroupItemSkinConfig;
                if (item.group == _group) {
                    arr.push(item)
                }
            }
        })
        return arr;
    }
    public static CheckSkinInGroup(SkinCfg) {
        if (SkinCfg instanceof GroupItemSkinConfig) {
            return true
        }
        if (SkinCfg instanceof GroupItemSkinVsFeature) {
            return true
        }
        return false;
    }

    public static CheckSkinHaveFeature(SkinCfg) {
        if (SkinCfg instanceof ItemSkinHaveFeature) {
            return true
        }
        if (SkinCfg instanceof GroupItemSkinVsFeature) {
            return true
        }
        return false;
    }

}
