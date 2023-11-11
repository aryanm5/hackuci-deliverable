import { useState, useEffect } from "react";
import "./App.css";
import axios from 'axios';
import Quote from './Quote';
import logo from './logo.png';

function App() {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [quotes, setQuotes] = useState([]);

    const submitQuote = async e => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('name', name);
        formData.append('message', message);

        const response = await axios.post('/api/quote', formData);

        setQuotes([...quotes, response.data]);
    };

    const loadQuotes = async max_age => {
        setLoading(true);

        const response = await axios.get('/api/quotes', {
            params: {
                max_age
            }
        });

        setQuotes(response.data);
        setLoading(false);
    };

    useEffect(() => { loadQuotes(-1); }, []);

    return (
        <div className="App">
            <div className="Container">
                <img src={logo} className="logo" />
                <h1>Hack @ UCI Tech Deliverable</h1>

                <h3>Submit a Quote</h3>
                <form>
                    <label htmlFor="input-name">Name: </label>
                    <input type="text" name="name" id="input-name" value={name} onChange={e => setName(e.target.value)} required />
                    <br /><br />
                    <label htmlFor="input-message">Quote: </label>
                    <input type="text" name="message" id="input-message" value={message} onChange={e => setMessage(e.target.value)} required />
                    <br /><br />
                    <button type="submit" onClick={submitQuote} disabled={name.length === 0 || message.length === 0}>Submit</button>
                </form>

                <h3>Previous Quotes</h3>

                <select
                    defaultValue={-1}
                    onChange={e => loadQuotes(e.target.value)}
                >
                    <option value={604800}>Past Week</option>
                    <option value={2630000}>Past Month</option>
                    <option value={31536000}>Past Year</option>
                    <option value={-1}>Show All</option>
                </select>

                <div className="messages">
                    {
                        loading
                            ? <p>Loading...</p>
                            : quotes.length === 0
                                ? <p>No Results</p>
                                : quotes.map(quote => <Quote key={quote.time} quote={quote} />)
                    }
                </div>
            </div>
        </div>
    );
}

export default App;
