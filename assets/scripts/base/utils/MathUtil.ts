export default class MathUtil {
    public static randomBeetWeenFloor (min,max) {
        return Math.floor(this.randomBeetWeen(min, max));
    }

    public static randomBeetWeenFloor1 (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    public static randomBeetWeen(min,max){
        return (Math.random() * (max - min)) + min;
    }

    public static getEuclidDistance(point1, point2){
        return Math.sqrt((point1.x-point2.x) * (point1.x - point2.x) + (point1.y-point2.y)*(point1.y - point2.y));
    }

    public static randomInt(value){
        return Math.floor(Math.random()*value);
    }
    public static getRandomFrom(arr: any[]) {
        return arr[this.randomInt(arr.length)];
    }
    public static getRandomSurround(pos: cc.Vec2, r: number) {
        let pointX = this.getRandomFrom([-1, 1])*Math.floor(Math.random() * r) + pos.x;
        let pointY = this.getRandomFrom([-1, 1])*Math.floor(Math.random() * r) + pos.y;
        return new cc.Vec2(pointX, pointY);
    }
    
    static getTimeRest(start: Date, end: Date) {
		var hours = Math.floor((end.getTime() - start.getTime()) / 1000);
		return hours;
	}
    
	static getTimeToString(hours: number) {
		if (hours < 0) return "00:00:00"
		var ho =
			Math.floor(
				(hours / 3600) %
				24
			) + "";
		var mi =
			Math.floor(
				(hours / 60) % 60
			) + "";
		var se =
			Math.floor(
				hours % 60
			) + "";

		if (ho.length < 2) ho = "0" + ho;
		if (mi.length < 2) mi = "0" + mi;
		if (se.length < 2) se = "0" + se;

		var _time = ho + ":" + mi + ":" + se;
		return _time
	}
};