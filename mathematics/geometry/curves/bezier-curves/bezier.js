function create_range(start, end, step) {
    let range = [];

    for (let current = start; current <= end; current += step) {
        range.push(current);
    }

    return range;
}

function linear_bezier_point(p0, p1, t) {
    const x = p0.x + (p1.x - p0.x) * t;
    const y = p0.y + (p1.y - p0.y) * t;

    return new Particle(x, y);
}

function quadratic_bezier_point(p0, p1, p2, t) {
    const alpha = linear_bezier_point(p0, p1, t);
    const beta = linear_bezier_point(p1, p2, t);

    return linear_bezier_point(alpha, beta, t);
}

function cubic_bezier_point(p0, p1, p2, p3, t) {
    const alpha = quadratic_bezier_point(p0, p1, p2, t);
    const beta = quadratic_bezier_point(p1, p2, p3, t);

    return linear_bezier_point(alpha, beta, t);
}

function quartic_bezier_point(p0, p1, p2, p3, p4, t) {
    const alpha = cubic_bezier_point(p0, p1, p2, p3, t);
    const beta = cubic_bezier_point(p1, p2, p3, p4, t);

    return linear_bezier_point(alpha, beta, t);
}

class Bezier {
    constructor(particles) {
        this.particles = particles;
    }

    update() {
        for (const particle of this.particles) {
            particle.update();
        }
    }

    show(colour) {
        if (colour !== undefined) {
            colorMode(HSB);
            stroke(colour, 255, 255);
        }

        noFill();
        strokeWeight(4);
        beginShape();
        for (const particle of this.particles) {
            particle.show();
        }
        endShape();
    }
}

class LinearBezier extends Bezier {
    constructor(points) {
        super(points);
    }

    static createFromPoints(points) {
        if (points.length !== 2) {
            throw new Error("A linear bezier curve can only be constructed from 2 points.");
        }

        const p0 = points[0];
        const p1 = points[1];
        const linear_bezier_points = create_range(0, 1, 0.01).reduce((points, t) => {
            const point = linear_bezier_point(p0, p1, t);

            return points.concat(point);
        }, []);

        return new LinearBezier(linear_bezier_points);
    }
}

class QuadraticBezier extends Bezier {
    constructor(points) {
        super(points);
    }

    static createFromPoints(points) {
        if (points.length !== 3) {
            throw new Error("A quadratic bezier curve can only be constructed from 3 points.");
        }

        const p0 = points[0];
        const p1 = points[1];
        const p2 = points[2];
        const quadratic_bezier_points = create_range(0, 1, 0.01).reduce((points, t) => {
            const point = quadratic_bezier_point(p0, p1, p2, t);

            return points.concat(point);
        }, []);

        return new QuadraticBezier(quadratic_bezier_points);
    }
}

class CubicBezier extends Bezier {
    constructor(points) {
        super(points);
    }

    static createFromPoints(points) {
        if (points.length !== 4) {
            throw new Error("A cubic bezier curve can only be constructed from 4 points.");
        }

        const p0 = points[0];
        const p1 = points[1];
        const p2 = points[2];
        const p3 = points[3];

        const cubic_bezier_points = create_range(0, 1, 0.01).reduce((points, t) => {
            const point = cubic_bezier_point(p0, p1, p2, p3, t);

            return points.concat(point);
        }, []);

        return new CubicBezier(cubic_bezier_points);
    }
}

class QuarticBezier extends Bezier {
    constructor(points) {
        super(points);
    }

    static createFromPoints(points) {
        if (points.length !== 5) {
            throw new Error("A quartic bezier curve can only be constructed from 5 points.");
        }

        const p0 = points[0];
        const p1 = points[1];
        const p2 = points[2];
        const p3 = points[3];
        const p4 = points[4];

        const quartic_bezier_points = create_range(0, 1, 0.01).reduce((points, t) => {
            const point = quartic_bezier_point(p0, p1, p2, p3, p4, t);

            return points.concat(point);
        }, []);

        return new QuarticBezier(quartic_bezier_points);
    }
}