import { useState, useEffect } from "react";
import "./App.css";
import axios from 'axios';
import Quote from './Quote';

function App() {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [quotes, setQuotes] = useState([]);

    const handleSubmit = e => {
        e.preventDefault();

        console.log(name + ': ' + message);
    };

    const loadQuotes = async () => {
        const response = await axios.get('/api/quotes', {
            params: {
                max_age: -1
            }
        });

        setQuotes(response.data);
        setLoading(false);
    };

    useEffect(() => { loadQuotes(); }, []);

    return (
        <div className="App">
            {/* TODO: include an icon for the quote book */}
            <h1>Hack @ UCI Tech Deliverable</h1>

            <h2>Submit a quote</h2>
            {/* TODO: implement custom form submission logic to not refresh the page */}
            <form action="/api/quote" method="post">
                <label htmlFor="input-name">Name</label>
                <input type="text" name="name" id="input-name" value={name} onChange={e => setName(e.target.value)} required />
                <label htmlFor="input-message">Quote</label>
                <input type="text" name="message" id="input-message" value={message} onChange={e => setMessage(e.target.value)} required />
                <button type="submit" onClick={handleSubmit} disabled={name.length === 0 || message.length === 0}>Submit</button>
            </form>

            <h2>Previous Quotes</h2>
            <div className="messages">
                {
                    loading
                        ? <p>Loading...</p>
                        : quotes.map(quote => <Quote key={quote.time} quote={quote} />)
                }
            </div>
        </div>
    );
}

export default App;
