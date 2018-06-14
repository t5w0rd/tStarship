class SineCurve {
	private point0: {x: number, y: number} = {x: 0, y: 0};
	private point1: {x: number, y: number} = {x: 0, y: 0};
	private period: number;
	private amplitude: number;
	private duration: number;
	private readonly obj: Unit;
	private readonly objId: string;

	public constructor(obj: Unit, point0: {x: number, y: number},  point1: {x: number, y: number}, period: number, amplitude: number) {
		this.obj = obj;
		this.objId = obj.id;
		this.point0 = point0;
		this.point1 = point1;
		this.period = period;
		this.amplitude = amplitude;
	}

	public start(dur: number, onMoveEnd?: Function): void {
		this.duration = dur;
		this.factor = 0;
		let tw = egret.Tween.get(this);
		tw.to({factor: 1}, dur);
		if (onMoveEnd != undefined) {
			tw.call(onMoveEnd);
		}
	}

	public stop(): void {
		egret.Tween.removeTweens(this);
	}

	private get factor() {
		return 0;
	}

	private set factor(value: number) {
		if (this.obj.id != this.objId) {
			egret.Tween.removeTweens(this);
			return;
		}
		if ((this.obj instanceof HpUnit && !this.obj.alive) || (this.obj instanceof Supply && !this.obj.alive)) {
			egret.Tween.removeTweens(this);
			return;
		}
		let disX = this.point1.x - this.point0.x;
	    let disY = this.point1.y - this.point0.y;
		let temp = Math.sin(this.duration * value / this.period  * 2 * Math.PI) * this.amplitude;

		this.obj.x = this.point0.x + disX * value + temp;
		this.obj.y = this.point0.y + disY * value;
	}
}