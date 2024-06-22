/**
 * @param {number[]} position
 * @param {number} m
 * @return {number}
 */
const maxDistance = (position, m) => {
    position.sort((a, b) => a - b)

    const canPutBalls = (gap) => {
        let ball = 1;
        let currentPosition = position[0];
        for (let p of position) {
            if (p - currentPosition >= gap) {
                currentPosition = p
                ball++
            }

            if (ball >= m) return true
        }
        return false
    }

    let left = 0;
    let right = position[position.length - 1]

    while (left < right - 1) {
        let mid = Math.floor((left + right) / 2)
        if (canPutBalls(mid)) {
            left = mid;
            continue
        }

        right = mid--
    }
    return left
};