import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { subDays } from 'date-fns';
import PropTypes from 'prop-types';
import './css/time-picker-formik.css';

function TimePickerFormik({ name, onChange, value, timeSpanChange, startTime, isStart }) {
    const [time, setTime] = useState('Pick a time');
    useEffect(() => {
        if (value) {
            setTime(() => {
                return timeSpanChange(value);
            });
            if (!isStart && value <= startTime) {
                setTime('Pick a time');
                onChange(name, '');
            }
        } else {
            setTime('Pick a time');
        }
    }, [value, startTime]);

    const filterTime = (time) => {
        let start = new Date();
        let end = new Date(time);
        if (startTime) {
            start.setHours(startTime.slice(0, 2), startTime.slice(3, 5), startTime.slice(6));
        } else {
            start = subDays(start, 1);
            start.setHours(23, 30, 0);
        }
        return start.getTime() < end.getTime();
    };
    return (
        <DatePicker
            onChange={(val) => {
                setTime(val.toLocaleTimeString());
                onChange(name, val.toString().slice(16, 24));
            }}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            filterTime={filterTime}
            timeCaption="Time"
            dateFormat="hh:mm aa"
            placeholderText={`${time}`}
        />
    );
}
TimePickerFormik.propTypes = {
    isStart: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    timeSpanChange: PropTypes.func.isRequired,
    startTime: PropTypes.string,
};

export default TimePickerFormik;
