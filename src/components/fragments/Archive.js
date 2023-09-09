import React from 'react';
import ArchiveTabs from "../tabs/ArchiveTabs";
import { useSearchParams } from 'react-router-dom';


export const Archive = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const type = searchParams.get("type");

    return (
        <div>
            <br/>
            <center>
                <h1>Archive</h1>
            </center>

            { type ? <ArchiveTabs type={type}/> : <ArchiveTabs />}
        </div>
    );
}