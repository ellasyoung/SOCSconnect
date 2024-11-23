import React, { useState } from 'react';
import { Bckgrnd, OuterModal, InnerModal, Button, Form, Label, Input, FormGroup } from "./ReqTimeElements"
import CustomTimePicker from '../CustomTimePicker';
import CustomDatePicker from '../CustomDatePicker';

const ReqTimeModal = () => {

    const [formData, setFormData] = useState({
        recEmail: '',
        startTime: '',
        startPeriod: '', 
        endTime: '',
        endPeriod: '', 
        date: '',
        title: ''
    });

    const [errors, setErrors] = useState({});

    const handleDateChange = (date) => {
        setFormData((prev) => ({
          ...prev,
          date,
        }));
    };

    const handleStartTimeChange = (time, period) => {
        setFormData((prev) => ({
        ...prev,
        startTime: time,
        startPeriod: period,
        }));
    };

    const handleEndTimeChange = (time, period) => {
        setFormData((prev) => ({
        ...prev,
        endTime: time,
        endPeriod: period,
        }));
    };

    const validateTime = (time) => {
        const timeRegex = /^(0[1-9]|1[0-2]):[0-5][0-9]$/; 
        return timeRegex.test(time);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!validateTime(formData.startTime)) {
        newErrors.startTime = 'Please enter a valid start time in HH:mm format.';
        }

        if (!validateTime(formData.endTime)) {
        newErrors.endTime = 'Please enter a valid end time in HH:mm format.';
        }

        if (!formData.recEmail || !/\S+@\S+\.\S+/.test(formData.recEmail)) {
        newErrors.recEmail = 'Please enter a valid email address.';
        }

        if (!formData.title.trim()) {
        newErrors.title = 'Please enter a title.';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
        console.log('Form submitted with data:', formData);
        }
    };

    return(
        <Bckgrnd>
            <OuterModal>
                <InnerModal>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label>Recipient Email </Label>
                            <Input
                                type="text"
                                id="recEmail"
                                name="recEmail"
                                placeholder="Enter your McGill email address"
                                value={formData.recEmail}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, recEmail: e.target.value }))
                                }
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Start Time </Label>
                            <CustomTimePicker
                                onTimeChange={handleStartTimeChange}
                                width="200px"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>End Time </Label>
                            <CustomTimePicker
                                onTimeChange={handleEndTimeChange}
                                width="200px"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Date</Label>
                            <CustomDatePicker
                                value={formData.date}
                                onDateChange={handleDateChange}
                                width="200px"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                id="title"
                                name="title"
                                placeholder="Enter a title or message"
                                value={formData.title}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                                }
                                required
                            />
                        </FormGroup>
                        <Button type="submit">Request Time</Button>
                    </Form>
                </InnerModal>
            </OuterModal>
        </Bckgrnd>
    );
};

export default ReqTimeModal;