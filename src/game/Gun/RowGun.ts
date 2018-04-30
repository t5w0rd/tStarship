class RowGun extends Gun {
	bulletNum: number = 5;
	bulletXDelta: number = 30;
	bulletYDelta: number = 20;

	public fire() {
		let firePos = this.getFirePosition();
		let n = this.bulletNum;
		for (let i=0; i<n; i++) {
			let bullet = this.createBullet();
			this.addBulletToWorld(bullet);
			bullet.x = firePos.x+(i-(n-1)/2)*this.bulletXDelta;
			bullet.y = firePos.y+(Math.abs(i-(n-1)/2))*this.bulletYDelta;
			bullet.moveStraight(0, this.bulletSpeed);
			
			// let tw2 = egret.Tween.get(bullet.gameObject, {loop: true});
			// let a = 50;
			// tw2.to({x: x-a}, 100, egret.Ease.sineOut);
			// tw2.to({x: x}, 100, egret.Ease.sineIn);
			// tw2.to({x: x+a}, 100, egret.Ease.sineOut);
			// tw2.to({x: x}, 100, egret.Ease.sineIn);
		}
	}
}