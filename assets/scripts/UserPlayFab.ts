const TitleData = {
    titleId: '77203', // put titleId here
    developerSecretKey: "7AN9OJHN9GYI7NYCSW4T5DPCBAWZG455JCQEGD798OSQY53GNM", // put secretKey here
    userEmail: "put valid email associated with an existing account here",
    extraHeaders: {}
}
import { Signal } from "./base/Signal";
import ArrayUtil from "./base/utils/ArrayUtil";
import { GameData } from "./GameData";
import { LoadCompleteCallback } from "./Loading";
export const StatisticNameConfig = {
    BEST_LEVEL: "BestLevel",
    DAILYDATA: "DailyData"
}
export default class UserPlayFab {
    public static titleData: any;
    public static loginsuccessful: boolean = false
    public static UserCountryCode: string = "";
    public static EventData: string = "";
    public static DailyData: string = "";
    public static PlayFabId: string = "";
    public static DisplayName: string = "";
    public static LoginCallBackSignal = new Signal();
    static SetUp(inputTitleData: any = {}) {

        var titleDataValid = inputTitleData.hasOwnProperty("titleId") && inputTitleData.titleId != null

        if (titleDataValid)
            this.titleData = inputTitleData;
        else {
            this.titleData = TitleData
            console.log("testTitleData input file did not parse correctly");
        }

        PlayFab.settings.titleId = this.titleData.titleId;
        PlayFab.settings.developerSecretKey = this.titleData.developerSecretKey;
        PlayFab.settings.GlobalHeaderInjection = this.titleData.extraHeaders;

        return titleDataValid;
    }

    static LoginWithFacebookInstantGamesId() {
        FBInstant.player.getSignedPlayerInfoAsync().then(function (result) {
            let sign = result.getSignature();
            var loginRequest = <PlayFabClientModels.LoginWithFacebookInstantGamesIdRequest>{
                TitleId: "",
                FacebookInstantGamesSignature: sign,
                CreateAccount: true,
                InfoRequestParameters: <PlayFabClientModels.GetPlayerCombinedInfoRequestParams>{
                    GetPlayerProfile: true,
                    ProfileConstraints: { "ShowAvatarUrl": true, "ShowDisplayName": true },
                    GetUserData: true,
                    GetPlayerStatistics: true,

                }
            };
            console.log('login fb')
            var loginPromise = Promise.resolve(PlayFabClientSDK.LoginWithFacebookInstantGamesId(loginRequest, UserPlayFab.OnLoginCallBack));
        })
    }
    static LoginWithCustomID() {
        var loginRequest = <PlayFabClientModels.LoginWithCustomIDRequest>{
            TitleId: "77203",
            CustomId: "155DCc669868",
            CreateAccount: true,
            InfoRequestParameters: <PlayFabClientModels.GetPlayerCombinedInfoRequestParams>{
                GetPlayerProfile: true,
                ProfileConstraints: { "ShowAvatarUrl": true, "ShowDisplayName": true },
                GetUserData: true,
                GetPlayerStatistics: true,
            }
        };
        var loginPromise = Promise.resolve(PlayFabClientSDK.LoginWithCustomID(loginRequest, UserPlayFab.OnLoginCallBack));
        return loginPromise;
    }

    public static UpdateUserCountryCode(code: string) {
        let data = { UserCountryCode: code }
        this.UpdateDataUser(data);
    }

    public static OnLoginCallBack(result: PlayFabModule.SuccessContainer<PlayFabClientModels.LoginResult>, error: PlayFabModule.IPlayFabError) {
        if (error) return;
        UserPlayFab.loginsuccessful = true;
        // result.data.InfoResultPayload
        UserPlayFab.LoginCallBackSignal.dispatch()
        UserPlayFab.PlayFabId = ArrayUtil.getValue(result.data, 'PlayFabId', "");
        UserPlayFab.DisplayName = ArrayUtil.getValue(result.data.InfoResultPayload.PlayerProfile, 'DisplayName', "");

        if (result.data.NewlyCreated) {

            FBInstant.player.getSignedPlayerInfoAsync().then(function (result) {
                let sign = result.getSignature();
                let reqest = <PlayFabClientModels.LinkFacebookInstantGamesIdRequest>{
                    FacebookInstantGamesSignature: sign,
                    ForceLink: true,
                }
                var callBack = (result: PlayFabModule.SuccessContainer<PlayFabClientModels.LinkFacebookInstantGamesIdResult>, error: PlayFabModule.IPlayFabError) => {
                    console.log(result, 'link');
                }
                PlayFabClientSDK.LinkFacebookInstantGamesId(reqest, callBack);
            });

        }
        if (result.data.InfoResultPayload) {
            let UserData = result.data.InfoResultPayload.UserData
            if (UserData) {
                UserPlayFab.UserCountryCode = ArrayUtil.getValue(UserData, 'UserCountryCode', "");
                let eventData = ArrayUtil.getValue(UserData, "EventData", null);
                if (eventData) {
                    UserPlayFab.EventData = eventData.Value;
                }
                let DailyData = ArrayUtil.getValue(UserData, "DailyData", null);
                if (DailyData) {
                    UserPlayFab.DailyData = DailyData.Value;
                }


            }
        }
        if (UserPlayFab.DisplayName == "") {
            UserPlayFab.UpdateAvatarVsDisPlayName();
        }
    }

    static UpdateAvatarVsDisPlayName() {
        try {
            // let avatarRequest = <PlayFabClientModels.UpdateAvatarUrlRequest>{
            //     ImageUrl: FBInstant.player.getPhoto()
            // }
            // var callUpAvatar = function (result: PlayFabModule.SuccessContainer<PlayFabClientModels.EmptyResponse>, error: PlayFabModule.IPlayFabError): void {
            //     if (!result) {
            //         let avatarRequest = <PlayFabClientModels.UpdateAvatarUrlRequest>{
            //             ImageUrl: FBInstant.player.getPhoto()
            //         }
            //         PlayFabClientSDK.UpdateAvatarUrl(avatarRequest, function(){});
            //         return
            //     };
            // }
            // PlayFabClientSDK.UpdateAvatarUrl(avatarRequest, callUpAvatar);

            let name = FBInstant.player.getName();
            if (UserPlayFab.UserCountryCode != "") {
                name = name + "_" + UserPlayFab.UserCountryCode
            }
            let displaynameRequest = <PlayFabClientModels.UpdateUserTitleDisplayNameRequest>{
                DisplayName: name
            }
            var callUpDisplayName = function (result: PlayFabModule.SuccessContainer<PlayFabClientModels.UpdateUserTitleDisplayNameResult>, error: PlayFabModule.IPlayFabError): void {
                if (!result) return;
                console.log('updatedisplayname')
            }
            PlayFabClientSDK.UpdateUserTitleDisplayName(displaynameRequest, callUpDisplayName)
        } catch (error) {

        }
    }

    public static SaveDailyData(obj: { day: number, time: Date }) {
        let data = JSON.stringify(obj);
        UserPlayFab.DailyData = data;
        UserPlayFab.UpdateDataUser({ DailyData: data });
    }

    public static UpdateDataUser(object: object) {
        var request = <PlayFabClientModels.UpdateUserDataRequest>{
            Data: object,
        }
        var callback = (result: PlayFabModule.SuccessContainer<PlayFabClientModels.UpdateUserDataResult>, err: any) => {
            if (err) { console.log('fail save data') };
            console.log('done save data');
        }

        PlayFabClientSDK.UpdateUserData(request, callback);

    }

    public static GetDataUser(keys: string[], callback: PlayFabModule.ApiCallback<PlayFabAdminModels.GetUserDataResult>) {
        let request = <PlayFabAdminModels.GetUserDataRequest>{
            PlayFabId: UserPlayFab.PlayFabId,
            Keys: keys
        }
        PlayFabAdminSDK.GetUserData(request, callback)
    }

    public static getMyRankLeadBoard(statisticName: string, callback: PlayFabModule.ApiCallback<PlayFabClientModels.GetLeaderboardAroundPlayerResult>) {
        var request = <PlayFabClientModels.GetLeaderboardAroundPlayerRequest>{
            StatisticName: statisticName,
            MaxResultsCount: 1,
            ProfileConstraints: { "ShowAvatarUrl": true, "ShowDisplayName": true }
        }
        PlayFabClientSDK.GetLeaderboardAroundPlayer(request, callback)
    }

    public static setLeaderborad(score: number, statisticName: string, callback: PlayFabModule.ApiCallback<PlayFabClientModels.UpdatePlayerStatisticsResult>) {
        var request = <PlayFabClientModels.UpdatePlayerStatisticsRequest>{
            Statistics: [{ StatisticName: statisticName, Value: score }]
        }
        PlayFabClientSDK.UpdatePlayerStatistics(request, callback)
    }

    public static getRankLeadBoard(statisticName: string, position, Max, callback: PlayFabModule.ApiCallback<PlayFabClientModels.GetLeaderboardResult>) {
        var reqestLeaderboard = <PlayFabClientModels.GetLeaderboardRequest>{
            StartPosition: position,
            StatisticName: statisticName,
            MaxResultsCount: Max,
            ProfileConstraints: { "ShowAvatarUrl": true, "ShowDisplayName": true }

        }
        PlayFabClientSDK.GetLeaderboard(reqestLeaderboard, callback);
    }

    public static UpdateDisPlayName(name: string, callback: PlayFabModule.ApiCallback<PlayFabClientModels.UpdateUserTitleDisplayNameResult>) {
        let displaynameRequest = <PlayFabClientModels.UpdateUserTitleDisplayNameRequest>{
            DisplayName: name,
        }
        PlayFabClientSDK.UpdateUserTitleDisplayName(displaynameRequest, callback)
    }

    public static UpdateAvatar(AvatarUrl: string, callback: PlayFabModule.ApiCallback<PlayFabClientModels.EmptyResponse>) {
        let avatarRequest = <PlayFabClientModels.UpdateAvatarUrlRequest>{
            ImageUrl: AvatarUrl
        }
        PlayFabClientSDK.UpdateAvatarUrl(avatarRequest, callback);
    }
}
