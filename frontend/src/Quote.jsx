const dateOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
};

function Quote({ quote: { name, message, time } }) {
    const date = new Date(time);

    return (
        <div className="QuoteContainer">
            <div>
                <span className="QuoteName">
                    <strong>{name}</strong>
                </span>

                <span className="QuoteDate">
                    {date.toLocaleDateString('en-US', dateOptions)}
                </span>
                <br />
            </div>
            <div className="QuoteMessage">
                {message}
            </div>
        </div>
    );
}

export default Quote;