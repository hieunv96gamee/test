
export class ItemFeatureConfig{
    skinId: string
    skins:string
    pathDir:string
    constructor(_skinId: string,_skins:string,_pathDir:string=""){
        this.skinId = _skinId;
        this.skins = _skins;
        this.pathDir = _pathDir;
    }
}
export class FeatureSkinConfig  {
    public static arrayFeatureBoss: ItemFeatureConfig[] = [
        new ItemFeatureConfig(
            "feature_1",
            "Angel",
            "spines/FeatureSkins/ExportPet"
        ),
        new ItemFeatureConfig(
            "feature_2",
            "Bat",
            "spines/FeatureSkins/ExportPet"
        ),
        new ItemFeatureConfig(
            "feature_3",
            "Demon",
            "spines/FeatureSkins/ExportPet"
        ),
        new ItemFeatureConfig(
            "feature_4",
            "Eagle",
            "spines/FeatureSkins/ExportPet"
        ),
        new ItemFeatureConfig(
            "feature_5",
            "Egg",
            "spines/FeatureSkins/ExportPet"
        ),
        new ItemFeatureConfig(
            "feature_6",
            "Egg",
            "spines/FeatureSkins/ExportPet"
        ),
        new ItemFeatureConfig(
            "feature_7",
            "FootBall",
            "spines/FeatureSkins/ExportPet"
        ),
        new ItemFeatureConfig(
            "feature_8",
            "FootBall",
            "spines/FeatureSkins/ExportPet"
        ),
        new ItemFeatureConfig(
            "feature_9",
            "Halloween",
            "spines/FeatureSkins/ExportPet"
        ),
        new ItemFeatureConfig(
            "feature_10",
            "Lunar",
            "spines/FeatureSkins/ExportPet"
        ),
        new ItemFeatureConfig(
            "feature_11",
            "Noel",
            "spines/FeatureSkins/ExportPet"
        ),
        new ItemFeatureConfig(
            "feature_12",
            "Patrick",
            "spines/FeatureSkins/ExportPet"
        )
        ,
        new ItemFeatureConfig(
            "feature_13",
            "Vlt",
            "spines/FeatureSkins/ExportPet"
        )
        
    ]
    public static getSkinConfigById(skinId: string) {
        let arr = FeatureSkinConfig.arrayFeatureBoss;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].skinId === skinId) {
                let cfg = arr[i];
                return cfg;
            }
        }
        return null;
    }
}
