// This file is part of phosphor-dgrid, copyright (c) 2017 BusFaster Ltd.
// Released under the MIT license, see LICENSE.

import 'dojo/resources/dnd.css!';

import * as OnDemandGrid from 'dgrid/OnDemandGrid';
import * as Keyboard from 'dgrid/Keyboard';
import * as Selection from 'dgrid/Selection';
import * as Editor from 'dgrid/Editor';
import * as Tree from 'dgrid/Tree';

import * as ColumnResizer from 'dgrid/extensions/ColumnResizer';
import * as DnD from 'dgrid/extensions/DnD';

import * as Memory from 'dstore/Memory';
import * as Trackable from 'dstore/Trackable';
import * as TreeStore from 'dstore/Tree';

import { DGrid } from './DGrid';

export interface TreeItem {
	id: number;
	parent: number | null;
	hasChildren: boolean;
	autoExpand: boolean;
}

export class TreeGrid extends DGrid {

	constructor(public dgrid = new TreeGrid.Grid(), public store = new TreeGrid.Store()) {
		super(dgrid, store);

		this.addClass('charto-TreeGrid');
	}

	static Grid = OnDemandGrid.createSubclass([ Keyboard, Selection, ColumnResizer ]).createSubclass([ Tree, Editor, DnD ]);
	static Store = Memory.createSubclass([ Trackable ]).createSubclass([ TreeStore ]);

}
