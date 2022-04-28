import QuoteForm from "../components/quotes/QuoteForm";
import {useNavigate} from "react-router-dom";
import useHttp from "../hooks/use-http";
import {addQuote} from "../lib/api";
import {useEffect} from "react";

function NewQuote() {
    const {sendRequest, status} = useHttp(addQuote)
    const history = useNavigate()

    useEffect(() => {
        if (status === 'completed') {
           history('/quotes')
        }
    }, [status, history])

    const addQuoteHandler = quoteData => {
        sendRequest(quoteData)
    }

    return (
        <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHandler}/>
    )
}

export default NewQuote