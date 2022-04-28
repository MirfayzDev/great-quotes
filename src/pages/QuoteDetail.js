import {useParams, Outlet, Link, useLocation} from "react-router-dom";
import {Fragment, useEffect} from "react";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import {getSingleQuote} from "../lib/api";
import useHttp from "../hooks/use-http";
import LoadingSpinner from "../components/ui/LoadingSpinner";

function QuoteDetail() {
    const params = useParams()
    const location = useLocation()

    const {sendRequest, status, data: loadedQuote, error} = useHttp(getSingleQuote, true)

    useEffect(() => {
        sendRequest(params.quoteId)
    }, [sendRequest, params.quoteId])

    if (status === 'pending') {
        return <div className={'centered'}>
            <LoadingSpinner/>
        </div>
    }

    if (error) {
        return <p className={'centered focused'}>{error}</p>
    }

    if (!loadedQuote.text) {
        return <p>No quote found!</p>
    }

    return (
        <Fragment>
            <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author}/>
            {
                location.pathname === `/quotes/${params.quoteId}` ? <div className="centered">
                    <Link className={'btn--flat'} to={`/quotes/${params.quoteId}/comments`}>Load Comments</Link>
                </div> : ''
            }
            <Outlet/>
        </Fragment>
    )
}

export default QuoteDetail