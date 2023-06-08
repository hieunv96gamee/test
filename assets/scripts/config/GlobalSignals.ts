import { Signal } from "../base/Signal";


export class GlobalSignals {

    public static coinUpdateSignal = new Signal();

    public static collectGemsSignal = new Signal();
    public static autoMoveSignal = new Signal();
    public static autoMoveSignal2 = new Signal();


    public static questFailSignal = new Signal();
    public static questPassSignal = new Signal();

    public static castleUpgradeSignal = new Signal();
    public static changeSkinBossSignal = new Signal();

    public static changeSkinPetSignal = new Signal();

    public static girlGiveEggSignal = new Signal();
    public static bossAttackSignal = new Signal();
    public static bossWalkToTargetSignal = new Signal();
}