import React, { useState } from 'react';
import classes from './Mortgage.module.css';
import Card from './UI/Card';
const Mortgage = () => {
	const [purchaseprice, setPurchaseprice] = useState(0);
	const [downpayment, setDownpayment] = useState(0);
	const [repaymenttime, setRepaymenttime] = useState(0);
	const [interestRate, setInterestRate] = useState(0);
	const [paymentInfo, setpaymentInfo] = useState(false);

	let principalLoanAmt = purchaseprice - downpayment;
	// Formula for mortgage payments: M = P[r(1+r)^n/((1+r)^n)-1)]
	let monthlyMortgagePayment = interestRate / 100 / 12;
	let repaid = repaymenttime * 12;
	let factor = Math.pow(monthlyMortgagePayment + 1, repaid);
	let numerator = monthlyMortgagePayment * factor;
	let denominator = factor - 1;
	let quotient = numerator / denominator;
	let payment = principalLoanAmt * quotient;
	let monthlyPayments =
		!isNaN(payment) &&
		payment !== Number.POSITIVE_INFINITY &&
		payment !== Number.NEGATIVE_INFINITY
			? Math.floor(payment)
			: 0;

	let totalPayments = monthlyPayments * repaid;
	let totalInterestPayments = monthlyPayments * repaid - principalLoanAmt;
	function submitHandler(e) {
		e.preventDefault();
		setpaymentInfo(true);
	}
	return (
		<Card>
			<form onSubmit={submitHandler}>
				<div className={classes.mortgage}>
					<h1>Mortgage calculator</h1>

					<label htmlFor="range">Purchase price: ${purchaseprice}</label>
					<input
						type="range"
						value={purchaseprice}
						id="range"
						min="0"
						max="1000000"
						step="1"
						onChange={(e) => setPurchaseprice(e.target.value)}
					/>

					<label htmlFor="range">Down payment: ${downpayment}</label>

					<input
						type="range"
						value={downpayment}
						id="range"
						min="0"
						max="1000000"
						step="1"
						onChange={(e) => setDownpayment(e.target.value)}
					/>

					<label htmlFor="range">
						Repayment time: {repaymenttime}
						{repaymenttime <= 1 ? 'year' : 'years'}
					</label>
					<input
						type="range"
						value={repaymenttime}
						id="range"
						min="0"
						max="30"
						onChange={(e) => setRepaymenttime(e.target.value)}
					/>

					<label htmlFor="range">Interest rate: {interestRate} %</label>
					<input
						type="range"
						value={interestRate}
						id="range"
						min="0"
						max="100"
						step="1"
						onChange={(e) => setInterestRate(e.target.value)}
					/>
					<div>
						<p>Loan amount:${principalLoanAmt}</p>
						<p>
							{/* Check that the result is a finite number. If so, display the
						results. or don't display anything */}
							Estimated per month:$
							{monthlyPayments}
						</p>
					</div>
				</div>
				<div className={classes.action}>
					<button>Get a mortgage quote</button>
					{paymentInfo && (
						<>
							<h1>Payment Information</h1>
							<p>
								your monthly payment will be <b>${monthlyPayments}</b>
							</p>
							<p>
								your total payment will be <b>${totalPayments}</b>
							</p>
							<p>
								your totalInterest payment will be{' '}
								<b>${totalInterestPayments}</b>
							</p>
						</>
					)}
				</div>
			</form>
		</Card>
	);
};

export default Mortgage;

// Formula for mortgage payments: M = P[r(1+r)^n/((1+r)^n)-1)]
// M = the total monthly mortgage payment
// P = the principal loan amount(Purchase Price - Down Payment)
// r = your monthly interest rate
// n = number of payments over the loan’s lifetime.
