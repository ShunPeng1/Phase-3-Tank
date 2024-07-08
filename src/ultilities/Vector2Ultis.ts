

class Vector2Utils {

    // Reflect the vector off the surface with the given normal
    public static reflect(direction: Phaser.Math.Vector2, normal: Phaser.Math.Vector2): Phaser.Math.Vector2 {
        const dotProduct = direction.dot(normal);
        return direction.clone().subtract(normal.clone().scale(2 * dotProduct));
    }

    // Bounce the vector off the surface with the given normal and bounce factor
    public static bounce(direction: Phaser.Math.Vector2, normal: Phaser.Math.Vector2, bounce: number): Phaser.Math.Vector2 {
        const dotProduct = direction.dot(normal);
        return direction.clone().subtract(normal.clone().scale(2 * dotProduct)).scale(bounce);
    }
}

export default Vector2Utils;
