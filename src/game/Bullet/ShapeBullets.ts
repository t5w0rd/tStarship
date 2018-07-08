class SoundWaveBullet extends Bullet {
    width: number = 100;
    height: number = 40;
    
	public constructor(gun: Gun) {
		super(gun, "SoundWaveBullet_png");
	}

	protected onCreate(): egret.DisplayObject {
		if (this.gameObject !== undefined) {
			this.gameObject.width = this.width;
			this.gameObject.height = this.height;
			this.gameObject.anchorOffsetX = this.width * 0.5;
			this.gameObject.anchorOffsetY = this.height * 0.5;
			return this.gameObject;
		}
		let gameObject = this.createModel();
		gameObject.width = this.width;
		gameObject.height = this.height;
		gameObject.anchorOffsetX = this.width * 0.5;
		gameObject.anchorOffsetY = this.height * 0.5;
		return gameObject;
	}
}

class EnergyWaveBullet extends Bullet {
	public constructor(gun: Gun) {
		super(gun, "ShakeWaveBullet_png", 1.2);
	}
}

class EnergyWave2Bullet extends Bullet {
	public constructor(gun: Gun) {
		super(gun, "ShakeWaveBullet2_png", 1.2);
	}
}

class RedEllipseBullet extends Bullet {
	public constructor(gun: Gun) {
		super(gun, "RedBullet1_png");
	}
}

class RedWaveBullet extends Bullet {
	public constructor(gun: Gun) {
		super(gun, "RedBullet2_png");
	}
}

class RedStarBullet extends Bullet {
	public constructor(gun: Gun) {
		super(gun, "RedBullet3_png");
	}
}

class RedDiamondBullet extends Bullet {
	public constructor(gun: Gun) {
		super(gun, "RedBullet4_png");
	}
}

class RedBallBullet extends Bullet {
	public constructor(gun: Gun) {
		super(gun, "RedBullet5_png");
	}
}

class BlueEllipseBullet extends Bullet {
	public constructor(gun: Gun) {
		super(gun, "BlueBullet1_png");
	}
}

class BlueWaveBullet extends Bullet {
	public constructor(gun: Gun) {
		super(gun, "BlueBullet2_png");
	}
}

class BlueStarBullet extends Bullet {
	public constructor(gun: Gun) {
		super(gun, "BlueBullet3_png");
	}
}

class BlueDiamondBullet extends Bullet {
	public constructor(gun: Gun) {
		super(gun, "BlueBullet4_png", 1.5);
	}
}

class BlueBallBullet extends Bullet {
	public constructor(gun: Gun) {
		super(gun, "BlueBullet5_png");
	}
}