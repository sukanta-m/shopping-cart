import { compareStrings } from './utils';

export default class Cart {
	constructor() {
		this.items = [];
		this.total = 0;
	}

	addItem(newItem) {
		let sameItem = this.items.filter(item => item.name == newItem.name);
		if (sameItem.length > 0) {
			const updatedItem = {
				...sameItem[0],
				quantity: sameItem[0].quantity + 1
			};
			this.items = [
				...this.items.filter(item => item.name !== newItem.name),
				updatedItem
			];
		} else {
			this.items = [...this.items, newItem];
		}
	}

	getItems() {
		return this.items.sort(compareStrings);
	}

	getTotal() {
		return this.items
			.map(item => item.price * item.quantity)
			.reduce(
				(accumulator, currentValue) => accumulator + currentValue,
				0
			);
	}

	removeItem(itemNameToRemove) {
		this.items = [
			...this.items.filter(item => {
				return item.name != itemNameToRemove;
			})
		];
	}

	updateQuantity(itemName, newQuantity) {
		this.items = this.items.map(item => {
			if (item.name == itemName)
				return { ...item, quantity: newQuantity };
			else return { ...item };
		});
	}
}
