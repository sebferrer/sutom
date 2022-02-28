export class ArrayUtil {
	public static get_index<T>(array: Array<T>, obj: T): number {
		let index = -1;
		let i = 0;
		while (index === -1 && i < array.length) {
			if (array[i] === obj) {
				index = i;
			}
			i++;
		}
		return index;
	}

	public static remove_from_array<T>(array: Array<T>, obj: T): boolean {
		if (array.indexOf(obj) >= 0) {
			array.splice(this.get_index(array, obj), 1);
			return true;
		}
		return false;
	}

	public static add_first_no_duplicate<T>(array: Array<T>, obj: T): boolean {
		if (!(array.indexOf(obj) >= 0)) {
			array.unshift(obj);
			return true;
		}
		return false;
	}

	public static diff<T>(array1: Array<T>, array2: Array<T>): Array<T> {
		return array1.filter(item => array2.indexOf(item) < 0);
	}

	public static find_nb_connected(x: number, y: number, array: Array<Array<number>>): number {
		const canUp = (x - 1 >= 0);
		const canDown = (x + 1 < array.length);
		const canRight = (y + 1 < array[0].length);
		const canLeft = (y - 1 >= 0);

		const value = array[x][y];

		let up = 0;
		let down = 0;
		let right = 0;
		let left = 0;

		array[x][y] = 2;

		if (canUp && array[x - 1][y] === value) {
			up = this.find_nb_connected(x - 1, y, array);
		}
		if (canDown && array[x + 1][y] === value) {
			down = this.find_nb_connected(x + 1, y, array);
		}
		if (canLeft && array[x][y - 1] === value) {
			left = this.find_nb_connected(x, y - 1, array);
		}
		if (canRight && array[x][y + 1] === value) {
			right = this.find_nb_connected(x, y + 1, array);
		}

		return up + left + right + down + 1;
	}
}