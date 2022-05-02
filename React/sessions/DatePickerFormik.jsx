import React from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import './css/date-picker-formik.css';

function DatePickerFormik({ start, end, onChange, name, value }) {
    return (
        <DatePicker
            selected={value}
            openToDate={new Date(start)}
            onChange={(val) => {
                onChange(name, val);
            }}
            includeDateIntervals={[
                {
                    start: new Date(start),
                    end: new Date(end),
                },
            ]}
            inline
        />
    );
}

DatePickerFormik.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
    onChange: PropTypes.func.isRequired,
    start: PropTypes.string.isRequired,
    end: PropTypes.string.isRequired,
};

export default DatePickerFormik;
