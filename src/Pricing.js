import React from 'react';

class Pricing extends React.Component {
	// {
	// 	user_country,
	// 	user_local_price,
	// 	random_local_price,
	// 	user_dollar_ex,
	// 	random_dollar_ex,
	// 	user_dollar_price,
	// 	random_dollar_price,
	// 	user_dollar_ppp,
	// 	random_dollar_ppp,
	// 	user_dollar_valuation,
	// 	random_dollar_valuation,
	// 	random_country,
	// } = props.pricing;

	state = {
		numberOfMacsInYourCountry: 0,
		numberOfMacsInRandomCountry: 0,
		user_ppp: 0,
		input: 0,
		worthInRandom: 0,
	};

	calculatePricing = (amount) => {
		console.log(amount);
		if (amount === '') {
			console.log('DO NOTHING');
			this.setState({
				numberOfMacsInYourCountry: 0,
				numberOfMacsInRandomCountry: 0,
				input: 0,
				worthInRandom: 0,
			});
			return;
		}
		let numOfMacsInRandom =
			(amount / this.props.pricing.random_local_price) *
			(this.props.pricing.random_dollar_price /
				this.props.pricing.random_dollar_ppp);

		let numOfMacsInLocal =
			(amount / this.props.pricing.user_local_price) *
			(this.props.pricing.user_dollar_price /
				this.props.pricing.user_dollar_ppp);

		let localToRandom =
			amount *
			(this.props.pricing.user_local_price /
				this.props.pricing.random_dollar_price);

		this.setState({
			numberOfMacsInRandomCountry: numOfMacsInRandom,
			input: amount,
			worthInRandom: localToRandom,
			numberOfMacsInYourCountry: numOfMacsInLocal,
		});
	};

	render() {
		return (
			<div className='App'>
				<div className='App-header'>
					<h3>You are in {this.props.pricing.user_country}</h3>
					<p>
						Please enter an amount of money in your local currency
					</p>
					<input
						style={{
							width: '400px',
							height: '40px',
							marginLeft: 15,
							fontSize: 24,
							padding: 5,
						}}
						type='number'
						placeholder='Amount here ...'
						onChange={(e) => this.calculatePricing(e.target.value)}
						maxLength='10'
						required
					/>
					<br />
					<br />
					<br />

					<div>
						<p>
							You could buy <b>{this.state.numberOfMacsInYourCountry}</b>{' '}
							of Big Macs in your country
							<br />
							Your Dollar Purchasing Parity (PPP) is{' '}
							<b>{this.props.pricing.user_dollar_ppp}</b>
							<br />
							This is a simple lookup to the table
						</p>
					</div>

					<br />
					<br />
					<br />

					<div>
						<strong>
							Random Country: {this.props.pricing.random_country}
						</strong>
						<p>
							You could buy{' '}
							{this.state.numberOfMacsInRandomCountry} number of
							Big Macs in {this.props.pricing.random_country} with{' '}
							{this.state.input}
							<br />
							Your {this.state.input} is worth about{' '}
							{this.state.worthInRandom} in{' '}
							{this.props.pricing.random_country}
						</p>
					</div>
				</div>
			</div>
		);
	}
}

export default Pricing;
