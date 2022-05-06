import React, { useCallback, useEffect, useState } from 'react';
import sessionFunctions from '../../services/sessionService';
import SessionModal from './SessionModal';
import SessionTable from './SessionTable';
import toastr from '../../utils/toastr';
import { useLocation } from 'react-router-dom';
import debug from 'sabio-debug';
const _logger = debug.extend('Session');

function Sessions() {
    const [sessions, setSessions] = useState({
        sArray: [],
        sComp: [],
    });

    const [showModal, setModal] = useState(false);

    const [refresh, setRefresh] = useState(0);

    const [formInfo, setFormInfo] = useState({
        workShopId: '',
        openSlots: '',
        totalSlots: '',
        date: '',
        startTime: '',
        endTime: '',
        id: '',
    });

    const [workShopInfo, setWorkShop] = useState({
        workShopId: '',
        workShopName: '',
        summary: '',
        shortDescription: '',
        imageUrl: '',
        numberOfSessions: '',
        startTime: '',
        endTime: '',
        externalSiteUrl: '',
    });

    const location = useLocation();

    useEffect(() => {
        //checking pathname for now since there's not StateForTransport yet
        const wsId = location.pathname
            .split('/')
            .filter((el) => el !== '')[1]
            .match(/^[0-9]+$/);
        if (wsId) {
            _logger(wsId);
            sessionFunctions.getByWorkShopId(wsId[0]).then(onWorkShopSuccess).catch(onWorkShopError);
        }
    }, [refresh]);

    const onWorkShopSuccess = (response) => {
        let temp = response.data.items;
        setSessions(() => {
            return { sArray: temp, sComp: temp.map(mapSessions) };
        });
        setFormInfo((prevState) => {
            return {
                ...prevState,
                workShopId: temp[0].workShopId,
                dateStart: temp[0].dateStart,
                dateEnd: temp[0].dateEnd,
            };
        });
        setWorkShop({
            workShopId: temp[0].workShopId,
            dateStart: temp[0].dateStart,
            dateEnd: temp[0].dateEnd,
            workShopName: temp[0].workShopName,
            summary: temp[0].summary,
            shortDescription: temp[0].shortDescription,
            imageUrl: temp[0].imageUrl,
            numberOfSessions: temp[0].numberOfSessions,
            externalSiteUrl: temp[0].externalSiteUrl,
        });
    };
    const onWorkShopError = () => {
        toastr.error('Unable to load sessions at this time...');

    };

    const mapSessions = (session) => {
        return (
            <SessionTable
                key={`${session.date}|${session.startTime}|${session.endTime}`}
                timeSpanChange={timeSpanToLocaleTime}
                session={session}
                refresh={refresh}
                editFunc={onEdit}
                deleteFunc={onDelete}
            />
        );
    };

    const onAddBtn = () => {
        setModal(!showModal);
    };

    const refreshTable = useCallback(() => {
        setRefresh(refresh + 1);
    },[]);

    const onDelete = useCallback((session) => {
        const deleteHandler = onDeleteSuccess(session.id);
        sessionFunctions.remove(session.id).then(deleteHandler).catch(onDeleteError);
    },[]);

    const onDeleteSuccess = (id) => {
        return () => {
            setSessions((prevState) => {
                const temp = { ...prevState };
                temp.sArray = [...prevState.sArray];

                const indOf = temp.sArray.findIndex((session) => {
                    if (session.id === id) {
                        return true;
                    } else {
                        return false;
                    }
                });

                if (indOf >= 0) {
                    temp.sArray.splice(indOf, 1);
                    temp.sComp = temp.sArray.map(mapSessions);
                }
                return temp;
            });
            toastr.success('Successfully deleted session!');
        };
    };

    const onDeleteError = () => {
        toastr.error('Unable to delete session...');
    };

    const onEdit = useCallback((session) => {
        setModal(true);
        setFormInfo(() => {
            let temp = {
                totalSlots: session.totalSlots,
                openSlots: session.openSlots,
                id: session.id,
                dateEnd: session.dateEnd,
                dateStart: session.dateStart,
                date: new Date(session.date),
                startTime: session.startTime,
                endTime: session.endTime,
                workShopId: session.workShopId,
            };
            return temp;
        });
    },[]);

    const timeSpanToLocaleTime = useCallback((time) => {
        //converts military time to standard
        let temp = new Date();
        temp.setHours(time.slice(0, 2), time.slice(3, 5), time.slice(6));
        return temp.toLocaleTimeString();
    },[]);

    return (
        <React.Fragment>
            <h1>{workShopInfo.workShopName}</h1>
            <div
                aria-live="polite"
                aria-atomic="true"
                className="d-flex justify-content-end align-items-center position-relative"></div>
            <SessionModal
                timeSpanChange={timeSpanToLocaleTime}
                refreshonadd={refreshTable}
                formstuff={formInfo}
                show={showModal}
                onHide={() => setModal(!showModal)}
            />
            <div className="row">
                <div className="col-lg-5">
                    <div className="card">
                        <div className="card-body">
                            <img className="img-fluid" src={workShopInfo.imageUrl} alt="" />
                            <h3>{workShopInfo.summary}</h3>
                            <p>{workShopInfo.shortDescription}</p>
                            <a href={workShopInfo.externalSiteUrl}>For More Info...</a>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <table className="table  text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">Total Slots</th>
                                        <th scope="col">Open Slots</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Start Time</th>
                                        <th scope="col">End Time</th>
                                        <th></th>
                                        <th scope="col">
                                            <button
                                                onClick={onAddBtn}
                                                type="button"
                                                className="btn-icon btn btn-lg btn-primary">
                                                Create
                                            </button>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>{sessions?.sComp}</tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Sessions;
