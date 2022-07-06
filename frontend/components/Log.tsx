import React, { useEffect, useState } from 'react'
import messagingLogService from '../services/MessagingLogService';

export type TLog = {
    room_uuid: string,
    member_uuid: string,
    timestamp: string
}

function Log() {
    const [logs, setLogs] = useState<TLog[]>([]);
    const [error, setError] = useState(false);
    useEffect(() => {
        messagingLogService.getMessagingLogs().then((res) => {
            setLogs(res.data);
            setError(false);
        }).catch(err => {
            setError(true);
        });
    }, []);
    return (
        <>
            { 
                error
                ?
                <div role="alert">
                    <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 my-2 text-red-700">
                        <p>Service Unavailable</p>
                    </div>
                </div>
                :
                <section className="antialiased bg-gray-100 text-gray-600 h-screen px-4" x-data="app">
                    <div className="flex flex-col justify-center h-full">
                        <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
                            <header className="px-5 py-4 border-b border-gray-100">
                                <div className="font-semibold text-gray-800">Messaging Logs</div>
                            </header>

                            <div className="overflow-x-auto p-3">
                                <table className="table-auto w-full">
                                    <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                        <tr>
                                            <th className="p-2">
                                                <div className="font-semibold text-left">Room UUID</div>
                                            </th>
                                            <th className="p-2">
                                                <div className="font-semibold text-left">Member UUID</div>
                                            </th>
                                            <th className="p-2">
                                                <div className="font-semibold text-left">Timestamp</div>
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="text-sm divide-y divide-gray-100">
                                        {
                                            logs?.map(log => {
                                                return(
                                                    <tr>
                                                        <td className="p-2">
                                                            <div className="font-medium text-gray-800">
                                                                { log.room_uuid }
                                                            </div>
                                                        </td>
                                                        <td className="p-2">
                                                            <div className="text-left">{ log.member_uuid }</div>
                                                        </td>
                                                        <td className="p-2">
                                                            <div className="text-left font-medium text-green-500">
                                                                { log.timestamp }
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            }
        </>
    )
}

export default Log
