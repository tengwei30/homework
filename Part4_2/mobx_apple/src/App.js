import React from 'react'
import { inject, observer } from 'mobx-react'
import Apple from './apple_component.js'
import './app.css'

@inject('appleStore')
@observer
class App extends React.Component {
	getAppleItem(apples) {
		let data = [];
		apples.forEach(apple => {
			if (!apple.isEaten) {
				data.push( <Apple apple={apple} eatApple={apple.eatApple} key={apple.id} /> )
			}
		})
		if(!data.length) data.push(<div className="empty-tip" key="empty">苹果篮子空空如也</div>);
		return data;
	}
	render() {
		const { status, isPicking, buttonText, pickApple, apples, applelists } = this.props.appleStore
		let {
			appleNow: {quantity:notEatenQuantity,weight:notEatenWeight},
			appleEaten: {quantity:EatenQuantity,weight:EatenWeight}
		} = status;
		return (
			<div className="App">
				<section className="section">
					<h2 className="section__title">苹果篮子</h2>
					<div className="section__apple">
						<p className="section__apple__flex">
							<span>当前</span>
							<span>{ notEatenQuantity }个苹果, { notEatenWeight }克</span>
						</p>
						<p className="section__apple__flex">
							<span>已经吃掉</span>
							<span>{ EatenQuantity }个苹果，{ EatenWeight }克</span>
						</p>
					</div>
					{ this.getAppleItem(apples) }
					<button className={isPicking ? 'disabled' : 'get__apple_btn'}  onClick={() => pickApple()}>{ buttonText }</button>
				</section>
			</div>
		)
	}
}

export default App;
