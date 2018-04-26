class Gun {
	ship: Ship;
	fireInterval: number = 200;
	bulletPower: number = 1;
	bulletSpeed: number = 50;
	bulletNum: number = 5;
	bulletXDelta: number = 30;
	bulletYDelta: number = 20;

	public constructor() {
	}

	public static createGun<GUN extends Gun>(t: new() => GUN): GUN {
		return new t();
	}

	public fire() {
		let firePos = this.getFirePosition();
		let n = this.bulletNum;
		for (let i=0; i<n; i++) {
			let bullet = new Bullet(this);
			this.ship.world.addBullet(bullet);
			bullet.x = firePos.x+(i-(n-1)/2)*this.bulletXDelta;
			bullet.y = firePos.y+(Math.abs(i-(n-1)/2))*this.bulletYDelta;
			let tw = egret.Tween.get(bullet.gameObject);
			let toY = -this.ship.world.height * 0.2
			tw.to({y: toY}, (bullet.y-toY)/this.bulletSpeed*tutils.SpeedFactor);
			tw.call(() => {
				this.ship.world.removeBullet(bullet.id);
			});
			// let tw2 = egret.Tween.get(bullet.gameObject, {loop: true});
			// let a = 50;
			// tw2.to({x: x-a}, 100, egret.Ease.sineOut);
			// tw2.to({x: x}, 100, egret.Ease.sineIn);
			// tw2.to({x: x+a}, 100, egret.Ease.sineOut);
			// tw2.to({x: x}, 100, egret.Ease.sineIn);
		}
	}

	public autofire() {
		let tw = egret.Tween.get(this);
		tw.call(this.fire, this);
		tw.wait(this.fireInterval);
		tw.call(this.autofire, this);
	}

	public cleanup() {
		egret.Tween.removeTweens(this);
	}

	public getFirePosition(): {x: number, y: number} {
		return {x: this.ship.x, y: this.ship.y-this.ship.height*0.5};
	}
}
