/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as assert from 'assert';
import { ScrollbarState } from 'vs/base/browser/ui/scrollbar/scrollbarState';
//import { INewScrollPosition, Scrollable, ScrollbarVisibility } from 'vs/base/common/scrollable';
//import { VerticalScrollbar } from 'vs/base/browser/ui/scrollbar/verticalScrollbar';
//import { ScrollableElementResolvedOptions } from 'vs/base/browser/ui/scrollbar/scrollableElementOptions';
//import { AbstractScrollbar, ISimplifiedMouseEvent, ScrollbarHost } from 'vs/base/browser/ui/scrollbar/abstractScrollbar';
import { ScrollableElement } from 'vs/base/browser/ui/scrollbar/scrollableElement';
import { DefaultOptions } from 'vs/base/browser/ui/list/listView';
import { getOrDefault } from 'vs/base/common/objects';

suite('ScrollbarState', () => {
	test('inflates slider size', () => {
		let actual = new ScrollbarState(0, 14, 0);
		actual.setVisibleSize(339);
		actual.setScrollSize(42423);
		actual.setScrollPosition(32787);

		assert.equal(actual.getArrowSize(), 0);
		assert.equal(actual.getScrollPosition(), 32787);
		assert.equal(actual.getRectangleLargeSize(), 339);
		assert.equal(actual.getRectangleSmallSize(), 14);
		assert.equal(actual.isNeeded(), true);
		assert.equal(actual.getSliderSize(), 20);
		assert.equal(actual.getSliderPosition(), 249);


		assert.equal(actual.getDesiredScrollPositionFromOffset(259), 32849);
		actual.setScrollPosition(32849);
		assert.equal(actual.getArrowSize(), 0);
		assert.equal(actual.getScrollPosition(), 32849);
		assert.equal(actual.getRectangleLargeSize(), 339);
		assert.equal(actual.getRectangleSmallSize(), 14);
		assert.equal(actual.isNeeded(), true);
		assert.equal(actual.getSliderSize(), 20);
		assert.equal(actual.getSliderPosition(), 249);
	});

	test('fast scrolling test', () => {
		//let actual = new ScrollbarState(0, 14, 0);

		const domNode = document.createElement('div');

		let scrollable = new ScrollableElement(domNode, {
			alwaysConsumeMouseWheel: true,
			vertical: getOrDefault(DefaultOptions, o => o.verticalScrollMode, DefaultOptions.verticalScrollMode),
			lazyRender: true,
		});

		scrollable.setScrollPosition({ scrollLeft: 10, scrollTop: 0 });

		scrollable.simulateMouseScroll(3, 0);
		scrollable.renderNow();
		assert.equal(scrollable.getScrollPosition(), 0);
	});

	test('inflates slider size with arrows', () => {
		let actual = new ScrollbarState(12, 14, 0);
		actual.setVisibleSize(339);
		actual.setScrollSize(42423);
		actual.setScrollPosition(32787);

		assert.equal(actual.getArrowSize(), 12);
		assert.equal(actual.getScrollPosition(), 32787);
		assert.equal(actual.getRectangleLargeSize(), 339);
		assert.equal(actual.getRectangleSmallSize(), 14);
		assert.equal(actual.isNeeded(), true);
		assert.equal(actual.getSliderSize(), 20);
		assert.equal(actual.getSliderPosition(), 230);


		assert.equal(actual.getDesiredScrollPositionFromOffset(240 + 12), 32811);
		actual.setScrollPosition(32811);
		assert.equal(actual.getArrowSize(), 12);
		assert.equal(actual.getScrollPosition(), 32811);
		assert.equal(actual.getRectangleLargeSize(), 339);
		assert.equal(actual.getRectangleSmallSize(), 14);
		assert.equal(actual.isNeeded(), true);
		assert.equal(actual.getSliderSize(), 20);
		assert.equal(actual.getSliderPosition(), 230);
	});
});
