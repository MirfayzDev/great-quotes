import {Route, Routes, Navigate} from "react-router-dom";
import React, {Suspense} from "react";

import LoadingSpinner from "./components/ui/LoadingSpinner";
import Layout from "./components/layout/Layout";

const AllQuotes = React.lazy(() => import("./pages/AllQuotes"))
const QuoteDetail = React.lazy(() => import("./pages/QuoteDetail"))
const NewQuote = React.lazy(() => import("./pages/NewQuote"))
const Comments = React.lazy(() => import("./components/comments/Comments"))
const NotFound = React.lazy(() => import("./pages/NotFound"))

function App() {
    return (
        <Layout>
            <Suspense fallback={<div className={'centered'}><LoadingSpinner/></div>}>
                <Routes>
                    <Route path={'/'} element={<Navigate replace to={'/quotes'}/>}/>
                    <Route path={'/quotes'} element={<AllQuotes/>}/>
                    <Route path={'/quotes/:quoteId'} element={<QuoteDetail/>}>
                        <Route path={'comments'} element={<Comments/>}/>
                    </Route>
                    <Route path={'/new-quote'} element={<NewQuote/>}/>
                    <Route path={'*'} element={<NotFound/>}/>
                </Routes>
            </Suspense>
        </Layout>
    );
}

export default App;
