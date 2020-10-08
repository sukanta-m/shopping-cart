import Cart from './Cart';
import Item from './Item';
import items from './items.json';
import './app.scss';

let itemsTable, cartEl;

export default class App {
	constructor() {
		this.cart = new Cart();
	}

	itemRowClick = (event) => {
		let dataset = event.target.parentNode.dataset;
		this.cart.addItem(
			new Item(dataset['name'], parseInt(dataset['price']).toFixed(2))
		);
		let cartTotalEl = document.getElementById('cart-total');
		cartTotalEl.innerText = this.cart.getTotal().toFixed(2);
		this.displayCartItems();
	}

	generateTable = () => {
		document.body.insertAdjacentHTML(
			'afterbegin',
			`<table>
				<thead>
					<tr>
						<td>Name</td>
						<td>Price</td>
					</tr>
				</thead>
				<tbody></tbody>
			</table>`
		);

		itemsTable = document.getElementsByTagName('table')[0];
		itemsTable.setAttribute('id', 'items-table');
		itemsTable.insertAdjacentHTML('beforebegin', '<h2>Items list</h2>');
		itemsTable.insertAdjacentHTML('afterend', '<h2>Cart</h2>');
		itemsTable.querySelector('tbody').addEventListener('click', this.itemRowClick);
	};

	displayItems = () => {
		let tableBody = itemsTable.querySelector('tbody');
		items.forEach(item => {
			tableBody.insertAdjacentHTML(
				'beforeend',
				`<tr data-name=${item.name} data-price='${item.price}'><td>${
					item.name
				}</td><td>${parseInt(item.price).toFixed(2)}</td></tr>`
			);
		});
	};

	removeItemFromCart = () => {
		let itemName = event.target.closest('.cart-row').dataset['name'];
		this.cart.removeItem(itemName);
		this.displayCartItems();
		let cartTotalEl = document.getElementById('cart-total');
		cartTotalEl.innerText = this.cart.getTotal().toFixed(2);
	};

	updateItemQuantity = () => {
		let itemName = event.target.closest('.cart-row').dataset['name'];
		let itemQuantity = parseInt(
			event.target.previousSibling.previousSibling.value
		);
		if (itemQuantity == 0) {
			this.cart.removeItem(itemName);
			displayCartItems();
		} else {
			this.cart.updateQuantity(itemName, itemQuantity);
		}
		let cartTotalEl = document.getElementById('cart-total');
		cartTotalEl.innerText = this.cart.getTotal().toFixed(2);
	};

	onCartRowClick = event => {
		if (event.target.dataset.action == 'remove') {
			this.removeItemFromCart();
		} else if (event.target.dataset.action == 'update') {
			this.updateItemQuantity();
		}
	};

	generateCart = () => {
		let cartTitle = document.getElementsByTagName('h2')[1];
		cartTitle.insertAdjacentHTML('afterend', '<div id="cart"></div>');
		cartEl = document.getElementById('cart');
		cartEl.insertAdjacentHTML(
			'afterbegin',
			`
			<div id="cart-header">
				<div>Name</div>
				<div>Price</div>
				<div>Quantity</div>
				<div>Options</div>
		</div>`
		);
		cartEl.insertAdjacentHTML(
			'beforeend',
			`
		<div>
			<div id="cart-rows"></div>
			<div id="total-row">Total: $<span id="cart-total">${this.cart
				.getTotal()
				.toFixed(2)}</span></div>
		</div>`
		);
		cartEl
			.querySelector('#cart-rows')
			.addEventListener('click', this.onCartRowClick);
	};

	displayCartItems = () => {
		let items = this.cart.getItems();
		let cartRowsContainer = cartEl.querySelector('#cart-rows');
		cartRowsContainer.textContent = '';
		items.forEach(item => {
			cartRowsContainer.insertAdjacentHTML(
				'beforeend',
				`
				<div class="cart-row" data-name="${item.name}">
					<div class="item-name-col">${item.name}</div>
					<div>$${parseInt(item.price).toFixed(2)}</div>
					<div>
						<input type="number" min="0" max="100" value="${item.quantity}">
						<button data-action="update">update</button>
					</div>
					<button data-action="remove">Remove Item</button>
				</div>
			`
			);
		});
	};
}

const mainApp = new App();
mainApp.generateTable();
mainApp.displayItems();
mainApp.generateCart();
mainApp.displayCartItems();
