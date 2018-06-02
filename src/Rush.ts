class Rush {
	delay: number;
	protected ships: Ship[];
	protected interval: number;
	protected duration: number;
	protected fixedRotation: boolean = true;

	protected callback: Function;
	protected callbackThisObj: any;

	public constructor(delay: number, ships: Ship[], interval: number, duration: number, fixedRotaion?: boolean, callback?: Function, callbackThisObj?: any) {
		this.delay = delay;
		this.ships = ships;
		this.interval = interval;
		this.duration = duration;
		this.fixedRotation = fixedRotaion===undefined ? false : fixedRotaion;
		this.callback = callback;
		this.callbackThisObj = callbackThisObj;
	}

	public start(world: World): void {
		if (this.ships && this.ships.length > 0) {
			if ((this.ships.length>2) && (this.ships[0] instanceof EnemyShip)) {
				let group = new EnemyGroup();
				group.incMember(this.ships.length);
				this.ships.forEach((ship, i, arr)=>{
					(<EnemyShip>ship).setGroup(group);
				});
			}
			
			let t = new tutils.Timer();
			t.setOnTimerListener((dt: number):void=>{
				let ship = this.ships.pop();
				world.addShip(ship);
				this.rushOne(ship);
			}, this);
			t.start(this.interval, true, this.ships.length);
		}

		if (this.callback) {
			this.callback.call(this.callbackThisObj);
		}
	}

	// override
	protected rushOne(ship: Ship): void {
		ship.status = UnitStatus.Dead;
	}

	protected convertPointToWorldPer(world: World, point: {x: number, y: number}): {x: number, y: number} {
		point.x *= world.width/100;
		point.y *= world.height/100;
		return point;
	}
}

class StraightRush extends Rush {
	protected from: {x: number, y: number};
	protected to: {x: number, y: number};

	public constructor(delay: number, ships: Ship[], interval: number, duration: number, from: {x: number, y: number}, to: {x: number, y: number}) {
		super(delay, ships, interval, duration);
		this.from = from;
		this.to = to;
	}

	public start(world: World): void {
		this.convertPointToWorldPer(world, this.from);
		this.convertPointToWorldPer(world, this.to);
		super.start(world);
	}

	// override
	protected rushOne(ship: Ship): void {
		ship.x = this.from.x;
		ship.y = this.from.y;
		let dis = ship.getDistance(this.to.x, this.to.y);
		let speed = dis / this.duration * tutils.SpeedFactor;
		ship.moveTo(this.to.x, this.to.y, speed, this.fixedRotation, null, ():void=>{
			ship.status = UnitStatus.Dead;
		}, this);
	}
}

class BezierRush extends Rush {
	protected from: {x: number, y: number};
	protected to: {x: number, y: number};
	protected k: {x: number, y: number};

	public constructor(delay: number, ships: Ship[], interval: number, duration: number, from: {x: number, y: number}, to: {x: number, y: number}, k: {x: number, y: number}) {
		super(delay, ships, interval, duration);
		this.from = from;
		this.to = to;
		this.k = k;
	}

	public start(world: World): void {
		this.convertPointToWorldPer(world, this.from);
		this.convertPointToWorldPer(world, this.to);
		this.convertPointToWorldPer(world, this.k);
		super.start(world);
	}

	// override
	protected rushOne(ship: Ship): void {
		let bezier = new BezierCurve(ship, this.from, this.k, this.to, this.fixedRotation);
		bezier.startMove(this.duration, ()=>{
			ship.status = UnitStatus.Dead;
		});
	}
}

class SineRush extends Rush {
	protected from: {x: number, y: number};
	protected to: {x: number, y: number};
	protected period: number;
	protected amplitude: number;

	public constructor(delay: number, ships: Ship[], interval: number, duration: number, from: {x: number, y: number}, to: {x: number, y: number}, period: number, amplitude: number) {
		super(delay, ships, interval, duration, true);
		this.from = from;
		this.to = to;
		this.period = period;
		this.amplitude = amplitude;
	}

	public start(world: World): void {
		this.convertPointToWorldPer(world, this.from);
		this.convertPointToWorldPer(world, this.to);
		super.start(world);
	}

	// override
	protected rushOne(ship: Ship): void {
		let sin = new SineCurve(ship, this.from, this.to, this.period, this.amplitude);
		sin.startMove(this.duration, ()=>{
			ship.status = UnitStatus.Dead;
		});
	}
}

class PathRush extends Rush {
	protected pts: {x: number, y: number}[];

	public constructor(delay: number, ships: Ship[], interval: number, duration: number, pts: {x: number, y: number}[]) {
		super(delay, ships, interval, duration);
		this.pts = pts;
	}
}

class GradientRush extends Rush {
	protected from: {x: number, y: number};
	protected to: {x: number, y: number};
	private total: number;

	public constructor(delay: number, ships: Ship[], interval: number, duration: number, from: {x: number, y: number}, to: {x: number, y: number}) {
		super(delay, ships, interval, duration);
		this.from = from;
		this.to = to;
		this.total = this.ships.length;
	}

	public start(world: World): void {
		this.convertPointToWorldPer(world, this.from);
		this.convertPointToWorldPer(world, this.to);
		super.start(world);
	}

	// override
	protected rushOne(ship: Ship): void {
		ship.x = this.total===1 ? this.from.x : this.from.x+(this.to.x-this.from.x) * (this.total-this.ships.length-1)/(this.total-1);
		ship.y = this.total===1 ? this.from.y : this.from.y+(this.to.y-this.from.y) * (this.total-this.ships.length-1)/(this.total-1);
		let toY = ship.world.height+ship.height;
		let dis = toY - ship.y;
		let speed = dis / this.duration * tutils.SpeedFactor;
		ship.moveTo(ship.x, toY, speed, this.fixedRotation, null, ():void=>{
			ship.status = UnitStatus.Dead;
		}, this);
	}
}

class CallbackRush extends Rush {
	public constructor(delay: number, callback: Function, callbackThisObj?: any) {
		super(delay, null, 0, 0, true, callback, callbackThisObj);
	}
}