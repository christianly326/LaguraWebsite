import { useState, useEffect } from "react";

function Exchange() {

    const [currency, setCurrency] = useState({ from: "Euro", to: "Peso", fromSymbol: "€", toSymbol: "₱" });
    const [amount, setAmount] = useState("");
    const [convertedAmount, setConvertedAmount] = useState("");
    const [rate, setRate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchConversionRate = async () => {
        // Caching the response to save on API requests as we are limited to a small fixed amount each month
        const cacheKey = `${currency.from}_to_${currency.to}` 
        const cached = localStorage.getItem(cacheKey);
        if (cached){
            const cachedData = json.parse(cached);
            const now = new Date().getTime();
            const cacheAge = now - cachedData.timestamp;
            if (cacheAge < 10800000) {// if the cache age is less than 3 hours then we can use it
                setRate(cachedData.rate);
                setLoading(false);
                return;
            }

        try {
            const url = `https://v6.exchangerate-api.com/v6/5cf5eb39026b945374800887/latest/${currency.from === "Euro" ? "EUR" : "PHP"}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Error with the network response');
            }
            const data = await response.json();
            const newRate = currency.from === "Euro" ? data.conversion_rates.PHP : data.conversion_rates.EUR;
            localStorage.setItem(cacheKey, JSON.stringify({
                rate: newRate,
                timestamp: Date.now()
            }))
            setRate(newRate)
            setLoading(false)
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
