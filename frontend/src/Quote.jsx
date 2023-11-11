function Quote({ quote: { name, message, time } }) {
    return (
        <p>{time} - {name}: {message}</p>
    );
}

export default Quote;