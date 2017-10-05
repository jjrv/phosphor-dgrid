// This file is part of phosphor-dgrid, copyright (c) 2017 BusFaster Ltd.
// Released under the MIT license, see LICENSE.

import 'dojo/resources/dnd.css!';

import * as aspect from 'dojo/aspect';

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

export type TreeGridOptions = (
	OnDemandGrid.KwArgs &
	Keyboard.KwArgs &
	Selection.KwArgs &
	ColumnResizer.KwArgs &
	Tree.KwArgs &
	Editor.KwArgs &
	DnD.KwArgs
);

export interface TreeItem {
	id: number;
	parent: number | null;
	hasChildren: boolean;
	autoExpand: boolean;
}

export type TreeColumn = Tree.Column;

export class TreeGrid<Item extends TreeItem = TreeItem> extends DGrid {

	constructor(public dgrid = new TreeGrid.Grid(), public store = new TreeGrid.Store()) {
		super(dgrid, store);

		aspect.after(dgrid, 'renderRow', (row: HTMLElement, [ item, options ]: [ Item, TreeGridOptions ]) =>
			this.onRenderRow(row, item, options) || row
		);

		aspect.after(dgrid, '_showEditor', (result: undefined, [ element, column, cell, value ]: [ HTMLElement, TreeColumn, HTMLTableCellElement, any ]) =>
			this.onShowEditor(element, column, cell, value)
		);

		this.addClass('charto-TreeGrid');
	}

	onRenderRow(row: HTMLElement, item: Item, options: TreeGridOptions): void | HTMLElement {}

	onShowEditor(element: HTMLElement, column: TreeColumn, cell: HTMLTableCellElement, value: any) {}

	static Grid = OnDemandGrid.createSubclass([ Keyboard, Selection, ColumnResizer ]).createSubclass([ Tree, Editor, DnD ]);
	static Store = Memory.createSubclass([ Trackable ]).createSubclass([ TreeStore ]);

}
