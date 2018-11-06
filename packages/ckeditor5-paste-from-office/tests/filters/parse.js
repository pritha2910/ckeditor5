/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* globals CSSStyleSheet */

import DocumentFragment from '@ckeditor/ckeditor5-engine/src/view/documentfragment';

import { parseHtml } from '../../src/filters/parse';

describe( 'Filters', () => {
	describe( 'parse', () => {
		describe( 'parseHtml()', () => {
			it( 'correctly parses HTML with body and one style tag', () => {
				const html = '<head><style>p { color: red; } a { font-size: 12px; }</style></head><body><p>Foo Bar</p></body>';
				const { body, bodyString, styles, stylesString } = parseHtml( html );

				expect( body ).to.instanceof( DocumentFragment );
				expect( body.childCount ).to.equal( 1, 'body.childCount' );

				expect( bodyString ).to.equal( '<p>Foo Bar</p>' );

				expect( styles.length ).to.equal( 1, 'styles.length' );
				expect( styles[ 0 ] ).to.instanceof( CSSStyleSheet );
				expect( styles[ 0 ].cssRules.length ).to.equal( 2 );
				expect( styles[ 0 ].cssRules[ 0 ].style.color ).to.equal( 'red' );
				expect( styles[ 0 ].cssRules[ 1 ].style[ 'font-size' ] ).to.equal( '12px' );

				expect( stylesString ).to.equal( 'p { color: red; } a { font-size: 12px; }' );
			} );

			it( 'correctly parses HTML with body contents only', () => {
				const html = '<p>Foo Bar</p>';
				const { body, bodyString, styles, stylesString } = parseHtml( html );

				expect( body ).to.instanceof( DocumentFragment );
				expect( body.childCount ).to.equal( 1 );

				expect( bodyString ).to.equal( '<p>Foo Bar</p>' );

				expect( styles.length ).to.equal( 0 );

				expect( stylesString ).to.equal( '' );
			} );

			it( 'correctly parses HTML with no body and multiple style tags', () => {
				const html = '<html><head><style>p { color: blue; }</style><style>a { color: green; }</style></head></html>';
				const { body, bodyString, styles, stylesString } = parseHtml( html );

				expect( body ).to.instanceof( DocumentFragment );
				expect( body.childCount ).to.equal( 0 );

				expect( bodyString ).to.equal( '' );

				expect( styles.length ).to.equal( 2 );
				expect( styles[ 0 ] ).to.instanceof( CSSStyleSheet );
				expect( styles[ 1 ] ).to.instanceof( CSSStyleSheet );
				expect( styles[ 0 ].cssRules.length ).to.equal( 1 );
				expect( styles[ 1 ].cssRules.length ).to.equal( 1 );
				expect( styles[ 0 ].cssRules[ 0 ].style.color ).to.equal( 'blue' );
				expect( styles[ 1 ].cssRules[ 0 ].style.color ).to.equal( 'green' );

				expect( stylesString ).to.equal( 'p { color: blue; } a { color: green; }' );
			} );

			it( 'correctly parses HTML with no body and no style tags', () => {
				const html = '<html><head><meta name="Foo" content="Bar"></head></html>';
				const { body, bodyString, styles, stylesString } = parseHtml( html );

				expect( body ).to.instanceof( DocumentFragment );
				expect( body.childCount ).to.equal( 0 );

				expect( bodyString ).to.equal( '' );

				expect( styles.length ).to.equal( 0 );

				expect( stylesString ).to.equal( '' );
			} );

			it( 'correctly parses HTML with body contents and empty style tag', () => {
				const html = '<head><style></style></head><body><p>Foo Bar</p></body>';
				const { body, bodyString, styles, stylesString } = parseHtml( html );

				expect( body ).to.instanceof( DocumentFragment );
				expect( body.childCount ).to.equal( 1 );

				expect( bodyString ).to.equal( '<p>Foo Bar</p>' );

				expect( styles.length ).to.equal( 0 );

				expect( stylesString ).to.equal( '' );
			} );
		} );
	} );
} );
