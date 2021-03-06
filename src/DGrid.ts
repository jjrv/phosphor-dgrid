/// <reference path="typings.d.ts" />

// This file is part of phosphor-dgrid, copyright (c) 2017 BusFaster Ltd.
// Released under the MIT license, see LICENSE.

import 'dgrid/css/dgrid.css!';

import * as OnDemandGrid from 'dgrid/OnDemandGrid';
import * as Memory from 'dstore/Memory';

import { Message } from '@phosphor/messaging';
import { Widget } from '@phosphor/widgets';

export class DGrid extends Widget {

	constructor(public dgrid = new OnDemandGrid(), public store = new Memory()) {
		super({ node: DGrid.createNode() });

		dgrid.create(null, this.node);

		this.addClass('charto-DGrid');
	}

	protected onAfterAttach(msg: Message) {
		this.dgrid.startup();
	}

	static createNode(): HTMLElement {
		const node = document.createElement('div');
		return(node);
	}

	onResize(msg: Widget.ResizeMessage) {
		this.dgrid.resize();
	}

}
