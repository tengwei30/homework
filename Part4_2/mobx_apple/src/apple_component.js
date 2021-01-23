import React from 'react'
import { observer } from 'mobx-react';

@observer
class Apple extends React.Component {
	render() {
		let { apple, eatApple } = this.props;
		return (
			<div style={styles.apple_root}>
				<div style={styles.apple_item}>
					<img style={styles.apple_img} src="images/apple.png" alt=""/>
					<p style={styles.apple_item.item_content}>
						<span>红苹果 -  { apple.id }号</span>
						<span>{ apple.weight }克</span>
					</p>
					<button style={styles.item_btn} onClick={()=>eatApple(apple.id)}>吃掉</button>
				</div>
			</div>
		)
	}
}

const styles = {
	apple_root: {
		'padding': '15px',
		'boxSizing': 'border-box'
	},
	apple_item: {
		'border': "1px solid #cccccc",
		'marginBottom': '15px',
		'display': 'flex',
		'flexDirection': 'row',
		'alignItems': 'center',
		item_content: {
			'flex': '1',
			'display': 'flex',
			'flexDirection': 'column',
		}
	},
	apple_img: {
		'width': '48px',
		'height': '48px',
		'marginRight': '15px'
	},
	item_btn: {
		'flex': '0 1 120px',
		'width': '100px',
		'height': '44px',
		'lineHeight': '44px',
		'backgroundColor': '#cccccc',
		'border': 'none',
		'borderRadius': '10px',
		'alignSelf': 'center',
	}
}

export default Apple