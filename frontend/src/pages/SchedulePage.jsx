import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    Resources,
    WeekView,
    Appointments,
    AppointmentTooltip,
    Toolbar,
    ViewSwitcher,
    MonthView,
    DayView,
    DateNavigator,
    TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { getAllSchedules, createSchedule } from '../utils/api/api.js';

const Demo = () => {
    const [data, setData] = useState([]);
    const [allSchedules, setAllSchedules] = useState([]); // Store all schedules
    const [currentViewName, setCurrentViewName] = useState('Month');
    const [currentDate, setCurrentDate] = useState(
        new Intl.DateTimeFormat('en-CA', {
            timeZone: 'Asia/Singapore',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).format(new Date())
    );
    const [selectedSlot, setSelectedSlot] = useState('ALL'); // Add state for selected slot
    const [currentDateTime, setCurrentDateTime] = useState(new Date()); // Add state for current date and time

    // Form state for creating a new schedule
    const [newSchedule, setNewSchedule] = useState({
        date: '',
        remarks: '',
        type: 'WORK',
        slot: 'FULL',
    });

    // Function to handle the creation of a new schedule
    const handleCreateSchedule = async () => {
        const startDate = new Date(newSchedule.date);
        let endDate = new Date(startDate);

        if (newSchedule.type === 'FULL') {
            endDate.setHours(18, 0, 0);
        } else if (newSchedule.type === 'AM') {
            endDate.setHours(12, 0, 0);
        } else if (newSchedule.type === 'PM') {
            startDate.setHours(12, 0, 0);
            endDate.setHours(18, 0, 0);
        }

        const schedule = {
            date: startDate.toISOString(), // Send ISO string format to backend
            remarks: newSchedule.remarks,
            type: newSchedule.type,
        };

        await createSchedule(schedule); // Call your API to create the schedule
        fetchData(); // Refresh schedules after adding a new one
    };

    // Fetch schedules from the API
    const fetchData = async () => {
        try {
            const schedules = await getAllSchedules();
            const schedulesArray = schedules.data;

            // Ensure schedules is an array
            if (!Array.isArray(schedulesArray)) {
                throw new Error('API response is not an array');
            }

            // Process and add slot type for each schedule
            const schedulesWithSlot = schedulesArray.map(schedule => {
                const startDate = new Date(schedule.date);
                let endDate = new Date(startDate);

                if (schedule.type === 'FULL') {
                    endDate.setHours(18, 0, 0);
                } else if (schedule.type === 'AM') {
                    endDate.setHours(12, 0, 0);
                } else if (schedule.type === 'PM') {
                    startDate.setHours(12, 0, 0);
                    endDate.setHours(18, 0, 0);
                }

                return {
                    ...schedule,
                    startDate,
                    endDate,
                    title: schedule.remarks,
                };
            });

            setAllSchedules(schedulesWithSlot);
            setData(schedulesWithSlot);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (allSchedules.length > 0) {
            // Filter schedules based on selected slot
            const filteredSchedules = selectedSlot === 'ALL' ? allSchedules : allSchedules.filter(schedule => schedule.slot === selectedSlot);

            // Transform data for the Scheduler component
            const rawData = filteredSchedules.map(schedule => ({
                startDate: new Date(schedule.startDate),
                endDate: new Date(schedule.endDate),
                title: schedule.title,
                type: schedule.type,
            }));

            setData(rawData);
        }
    }, [selectedSlot, allSchedules]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000); // Update every second

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    // Custom appointment component to modify colors based on schedule type
    const Appointment = ({ children, style, ...restProps }) => {
        let backgroundColor = '#FFC107'; // Default color for WORK
        if (restProps.data.type === 'ORDER') {
            backgroundColor = '#3F51B5'; // Different color for ORDER
        }

        return (
            <Appointments.Appointment
                {...restProps}
                style={{ ...style, backgroundColor }}
            >
                {children}
            </Appointments.Appointment>
        );
    };

    return (
        <Paper>
            {/* Slot selection */}
            <div>
                <label htmlFor="slot-select">Select Slot: </label>
                <Select
                    id="slot-select"
                    value={selectedSlot}
                    onChange={(e) => setSelectedSlot(e.target.value)}
                >
                    <MenuItem value="ALL">All</MenuItem>
                    <MenuItem value="AM">AM</MenuItem>
                    <MenuItem value="PM">PM</MenuItem>
                    <MenuItem value="FULL">Full Day</MenuItem>
                </Select>
            </div>

            {/* Current date and time */}
            <div>
                <p>Current Date and Time: {currentDateTime.toLocaleString()}</p>
            </div>

            {/* Form to create a new schedule */}
            <div>
                <h3>Create New Schedule</h3>
                <TextField
                    type="date"
                    value={newSchedule.date}
                    onChange={(e) => setNewSchedule({ ...newSchedule, date: e.target.value })}
                    sx={{ marginBottom: 2, marginRight: 1 }}
                />
                <TextField
                    label="Remarks"
                    value={newSchedule.remarks}
                    onChange={(e) => setNewSchedule({ ...newSchedule, remarks: e.target.value })}
                    sx={{ marginBottom: 2, marginRight: 1 }}
                />
                <Select
                    value={newSchedule.type}
                    onChange={(e) => setNewSchedule({ ...newSchedule, type: e.target.value })}
                    sx={{ marginBottom: 2, marginRight: 1 }}
                >
                    <MenuItem value="WORK">Work</MenuItem>
                    <MenuItem value="ORDER">Order</MenuItem>
                    <MenuItem value="Medical">Medical</MenuItem>
                </Select>
                <Select
                    label="Slot"
                    value={newSchedule.slot}
                    onChange={(e) => setNewSchedule({ ...newSchedule, slot: e.target.value })}
                    sx={{ marginBottom: 2, marginRight: 1 }} // Add margin
                >
                    <MenuItem value="AM">AM</MenuItem>
                    <MenuItem value="PM">PM</MenuItem>
                    <MenuItem value="FULL">FULL</MenuItem>
                </Select>
                <Button variant="contained" onClick={handleCreateSchedule} sx={{ marginTop: 2 }}>
                    Create Schedule
                </Button>
            </div>

            {/* Scheduler */}
            <Scheduler data={data}>
                <ViewState
                    currentDate={currentDate}
                    currentViewName={currentViewName}
                    onCurrentViewNameChange={setCurrentViewName}
                    onCurrentDateChange={setCurrentDate}
                />
                <MonthView />
                <WeekView />
                <DayView />
                <Toolbar />
                <DateNavigator />
                <TodayButton />
                <ViewSwitcher />
                <Appointments appointmentComponent={Appointment} />
                <AppointmentTooltip />
            </Scheduler>
        </Paper>
    );
};

export default Demo;
