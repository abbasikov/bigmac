import React, { Component, useEffect } from 'react';
import './App.css';
import Loader from './Loader';
import Pricing from './Pricing';
import Error from './Error';

class App extends Component {
	state = { loading: true, error: false };

	fetchPricing = () => {
		fetch('http://localhost:3001/')
			.then((res) => res.json())
			.then((res) => {
				this.setState({
					user_country: res.userCountry,
					user_local_price: res.userPricing.local_price,
					random_local_price: res.randomPricing.local_price,
					user_dollar_ex: res.userPricing.dollar_ex,
					random_dollar_ex: res.randomPricing.dollar_ex,
					user_dollar_price: res.userPricing.dollar_price,
					random_dollar_price: res.randomPricing.dollar_price,
					user_dollar_ppp: res.userPricing.dollar_ppp,
					random_dollar_ppp: res.randomPricing.dollar_ppp,
					user_dollar_valuation: res.userPricing.dollar_valuation,
					random_dollar_valuation: res.randomPricing.dollar_valuation,
					random_country: res.randomPricing.country,
					loading: false,
					error: false
				});
				this.setState({
					loading: false,
					error: false
				});
			})
			.catch((error) => {
				this.setState({
					error: true,
					loading: false,
				});
			});
	};

	componentDidMount() {
		this.fetchPricing();
	}

	render() {
		if (this.state.loading) return <Loader />;

		if (this.state.error) return <Error />;

		console.log(`(((STATE USER COUNTRY => ))) ${this.state.userCountry}`)
		
		const { user_country, user_local_price, random_local_price,
			user_dollar_ex, random_dollar_ex, user_dollar_price,
			random_dollar_price, user_dollar_ppp, random_dollar_ppp,
			user_dollar_valuation, random_dollar_valuation, random_country} = this.state;
		
			const pricing = { user_country, user_local_price, random_local_price,
			user_dollar_ex, random_dollar_ex, user_dollar_price,
			random_dollar_price, user_dollar_ppp, random_dollar_ppp,
			user_dollar_valuation, random_dollar_valuation, random_country};
		return <Pricing pricing={pricing} />;
	}
}

export default App;
