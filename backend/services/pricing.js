import csv from 'csvtojson';
import { v4 } from 'public-ip';
import iplocate from 'node-iplocate';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

class PricingService {
	PATH_TO_CSV     = '/../csv/pricing.csv';
	userCountry     = '';
	pricingList     = [];
	userPricing     = {};
	randomPricing   = {};

	constructor() {}

	getResults = async () => {
		this.pricingList    = await this.readCsv();
        console.log(`((((Pricing List)))) => `, this.pricingList);
		this.userCountry    = await this.getUserCountry();
		this.userPricing    = this.search(this.userCountry);
        this.randomPricing  = this.search();

        return {
            userCountry:    this.userCountry,
            userPricing:    this.userPricing,
            randomPricing:  this.randomPricing
        };
	};

    readCsv = async () => {
		let jsonArray = await csv().fromFile(join(__dirname, this.PATH_TO_CSV));
		return jsonArray.filter(
			(a, i, b) => b.findIndex((x) => x.country === a.country) === i
		);
	};

	getUserCountry = async () => {
        const ip = await v4();
        console.log(`((((Public IP)))) => `, ip);
        const results = await iplocate(ip);
        console.log(`((((IP LOCATE)))) => `, results);
        return results.country;
    };

	search = (
		country = this.pricingList[
			Math.floor(Math.random() * this.pricingList.length)
		].country
	) => {
		for (let i = 0; i < this.pricingList.length; i++) {
			if (this.pricingList[i].country === country) {
				return this.pricingList[i];
			}
		}
	};
}

export default PricingService;
