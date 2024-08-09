import { useState, useEffect } from "react";

function Exchange() {

    const [currency, setCurrency] = useState({ from: "Euro", to: "Peso", fromSymbol: "€", toSymbol: "₱" });
    const [amount, setAmount] = useState("");
    const [convertedAmount, setConvertedAmount] = useState("");
    const [rate, setRate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchConversionRate = async () => {
        try {
            const url = `https://v6.exchangerate-api.com/v6/5cf5eb39026b945374800887/latest/${currency.from === "Euro" ? "EUR" : "PHP"}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Error with the network response');
            }
            const data = await response.json();
            const newRate = currency.from === "Euro" ? data.conversion_rates.PHP : data.conversion_rates.EUR;
            setRate(newRate);
            setLoading(false);
        } catch (error) {
            setError(`Failed to fetch the conversion rate: ${error}`);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchConversionRate();
    }, [currency]);

    const handleExchange = () => {
        if (rate !== null) {
            const myNumber = (parseFloat(amount) * rate).toFixed(2);
            setConvertedAmount(myNumber);
        } else {
            alert('Fetching conversion rate, please try again.');
        }
    };
    const flipExchange = () => {
        setCurrency(prev => ({
            from: prev.to,
            to: prev.from,
            fromSymbol: prev.toSymbol,
            toSymbol: prev.fromSymbol
        }));
        setAmount("");
        setConvertedAmount("");
    };

    return (
        <div className="exchange-section">
            <div className="overlay">
                <label className="currency-title">{currency.from}</label>
                <span className="ml-3">|</span>
                <div className="input-wrapper">
                    <input
                        type="number"
                        className="form-control small-input no-spinners focus"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        placeholder="0.00"
                    />
                    <span className="currency-symbol">€</span>
                </div>
                <div className="btn-flip mt-4">
                    <button className="btn" onClick={flipExchange} style={{fontSize:"20px"}}>↕</button>                
                </div>
                <label className="currency-title mt-2">{currency.to}</label>
                <span className="ml-3">|</span>
                <div className="input-wrapper">
                    <input
                        type="number"
                        className="form-control small-input no-spinners focus"
                        value={convertedAmount}
                        readOnly
                        placeholder="0.00"
                    />
                    <span className="currency-symbol">₱</span>
                </div>


                <button 
                    className="btn btn-success btn-hover mt-4"
                    onClick={handleExchange}
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Exchange'}
                </button>
                {error && <p className="text-danger">{error}</p>}
            </div>
        </div>
    );
}

export default Exchange;
