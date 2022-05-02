import React from 'react';
import PropTypes from 'prop-types';

function SessionTable(props) {
    const session = props.session;
    const date = new Date(session.date);
    const startTime = props.timeSpanChange(session.startTime);
    const endTime = props.timeSpanChange(session.endTime);

    const deleteSession = () => {
        props.deleteFunc(session);
    };
    const editSession = () => {
        props.editFunc(session);
    };

    return (
        <React.Fragment>
            <tr>
                <td>{session.totalSlots}</td>
                <td>{session.openSlots}</td>
                <td>{date.toLocaleDateString()}</td>
                <td>{startTime}</td>
                <td>{endTime}</td>
                <td>
                    <button onClick={editSession} type="button" className="btn-icon btn-sm btn btn-info">
                        Edit
                    </button>
                </td>
                <td>
                    <button onClick={deleteSession} type="button" className="btn btn-sm btn-icon btn-danger">
                        Delete
                    </button>
                </td>
            </tr>
        </React.Fragment>
    );
}

SessionTable.propTypes = {
    session: PropTypes.shape({
        openSlots: PropTypes.number.isRequired,
        totalSlots: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired,
        date: PropTypes.string,
        endTime: PropTypes.string,
        startTime: PropTypes.string,
    }),
    editFunc: PropTypes.func.isRequired,
    deleteFunc: PropTypes.func.isRequired,
    refresh: PropTypes.number.isRequired,
    timeSpanChange: PropTypes.func.isRequired,
};

export default React.memo(SessionTable);
