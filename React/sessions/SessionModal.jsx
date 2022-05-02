import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import sessionFunctions from '../../services/sessionService';
import PropTypes from 'prop-types';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import sessionValid from '../../schema/sessionSchema';
import toastr from '../../utils/toastr';
import DatePickerFormik from './DatePickerFormik';
import TimePickerFormik from './TimePickerFormik';
import debug from 'sabio-debug';
const _logger = debug.extend('Session');

function SessionModal(props) {
    const [formInfo, setFormInfo] = useState({
        openSlots: 0,
        workShopId: '',
        totalSlots: 0,
        date: '',
        startTime: '',
        endTime: '',
    });

    const [mode, setMode] = useState({
        className: 'btn-primary btn',
        text: 'Submit',
        heading: 'Create a Session',
    });

    const [sessionId, setSessionId] = useState();

    const formStuff = props.formstuff;

    const onSubmit = (values) => {
        if (mode.text === 'Edit') {
            sessionFunctions.update(sessionId, values).then(onUpdateSuccess).catch(onUpdateError);
        } else {
            sessionFunctions.add(values).then(onAddSuccess).catch(onAddError);
        }
    };

    const onUpdateSuccess = () => {
        toastr.success('Successfully updated session!');
        props.refreshonadd();
    };

    const onUpdateError = () => {
        toastr.error('Unable to update session...');
    };

    const onAddSuccess = (res) => {
        toastr.success('Successfully added session!');
        setSessionId(res.data.item);
        setMode({
            className: 'btn-info btn',
            text: 'Edit',
            heading: 'Edit Session',
        });
        props.refreshonadd();
    };

    const onAddError = () => {
        toastr.error('Unable to add session...');
    };

    useEffect(() => {
        if (formStuff.id) {
            _logger('in efect');
            setMode({
                className: 'btn-info btn',
                text: 'Edit',
                heading: 'Edit Session',
            });
            setFormInfo(() => {
                return {
                    openSlots: formStuff.openSlots,
                    totalSlots: formStuff.totalSlots,
                    date: new Date(formStuff.date),
                    startTime: formStuff.startTime,
                    endTime: formStuff.endTime,
                    workShopId: formStuff.workShopId,
                };
            });
            setSessionId(formStuff.id);
        } else {
            setFormInfo((prevState) => {
                return { ...prevState, workShopId: formStuff.workShopId };
            });
        }
    }, [props.formstuff]);

    const forReset = () => {
        setMode({
            className: 'btn-primary btn',
            text: 'Submit',
            heading: 'Create a Session',
        });
        setFormInfo({
            date: '',
            startTime: '',
            endTime: '',
            workShopId: formStuff.workShopId,
            openSlots: 0,
            totalSlots: 0,
        });
    };

    return (
        <React.Fragment>
            <div
                aria-live="polite"
                aria-atomic="true"
                className="d-flex justify-content-end align-items-center position-relative"></div>
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">{mode.heading}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        enableReinitialize={true}
                        initialValues={formInfo}
                        onSubmit={onSubmit}
                        validationSchema={sessionValid}>
                        {({ handleReset, setFieldValue, values }) => (
                            <Form>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-group mt-2">
                                            <label htmlFor="totalSlots">Total Slots</label>
                                            <Field name="totalSlots" type="number" className="form-control" />
                                            <ErrorMessage name="totalSlots" component="div" style={{ color: 'red' }} />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group mt-2">
                                            <label htmlFor="openSlots">Open Slots</label>
                                            <Field name="openSlots" type="number" className="form-control" />
                                            <ErrorMessage name="openSlots" component="div" style={{ color: 'red' }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col-lg-4">
                                        <DatePickerFormik
                                            start={formStuff.dateStart}
                                            end={formStuff.dateEnd}
                                            name="date"
                                            value={values.date}
                                            onChange={setFieldValue}
                                        />
                                        <ErrorMessage name="date" component="div" style={{ color: 'red' }} />
                                    </div>
                                    <div className="col">
                                        <div className="col">
                                            <label htmlFor={`startTime`}>Start Time</label>
                                            <TimePickerFormik
                                                isStart={true}
                                                onChange={setFieldValue}
                                                name={`startTime`}
                                                timeSpanChange={props.timeSpanChange}
                                                value={values.startTime}
                                            />
                                            <ErrorMessage name="startTime" component="div" style={{ color: 'red' }} />
                                        </div>
                                        <div className="col mt-2">
                                            <label htmlFor={`endTime`}>End Time</label>
                                            <TimePickerFormik
                                                isStart={false}
                                                onChange={setFieldValue}
                                                startTime={values.startTime}
                                                timeSpanChange={props.timeSpanChange}
                                                name={`endTime`}
                                                value={values.endTime}
                                            />
                                            <ErrorMessage name="endTime" component="div" style={{ color: 'red' }} />
                                        </div>
                                        <div className="row justify-content-end">
                                            <div className="col-lg-2 mt-4">
                                                <button
                                                    onClick={() => {
                                                        forReset();
                                                        handleReset();
                                                    }}
                                                    type="button"
                                                    className="btn btn-warning">
                                                    Reset
                                                </button>
                                            </div>
                                            <div className="col-lg-3 mt-4">
                                                <button type="submit" className={mode.className}>
                                                    {mode.text}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
}

SessionModal.propTypes = {
    formstuff: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        totalSlots: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        openSlots: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
        workShopId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        startTime: PropTypes.string.isRequired,
        endTime: PropTypes.string.isRequired,
        dateStart: PropTypes.string,
        dateEnd: PropTypes.string,
    }),
    refreshonadd: PropTypes.func,
    timeSpanChange: PropTypes.func,
};

export default SessionModal;
