import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { TextField, Select, MenuItem, Button } from '@mui/material';
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

import { getAllSchedules, createSchedule } from '../utils/api/api.js';

const Demo = () => {
    const [data, setData] = useState([]);
    const [allSchedules, setAllSchedules] = useState([]); // Store all schedules
    const [newSchedule, setNewSchedule] = useState({
        date: '',
        remarks: '',
        type: 'WORK', // Default type
        slot: 'AM', // Default slot
    });
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

    const handleCreateSchedule = async () => {
        console.log('Creating schedule:', newSchedule);
        const startDate = new Date(newSchedule.date);
        let endDate = new Date(startDate);

        // Calculate the end date based on the slot
        if (newSchedule.slot === 'FULL') {
            endDate.setHours(18, 0, 0);
        } else if (newSchedule.slot === 'AM') {
            endDate.setHours(12, 0, 0);
        } else if (newSchedule.slot === 'PM') {
            startDate.setHours(12, 0, 0);
            endDate.setHours(18, 0, 0);
        }

        const schedule = {
            date: startDate.toISOString(), // Send ISO string format to backend
            remarks: newSchedule.remarks,
            type: newSchedule.type,
            slot: newSchedule.slot, // Include the selected slot
        };

        await createSchedule(schedule); // Call your API to create the schedule
        fetchData(); // Refresh schedules after adding a new one
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch schedules for the specific user
                const schedules = await getAllSchedules();

                const schedulesArray = schedules.data;

                // Ensure schedules is an array
                if (!Array.isArray(schedulesArray)) {
                    throw new Error('API response is not an array');
                }

                // Calculate slot type and store all schedules
                console.log('Fetched schedules:', schedulesArray); // Log fetched schedules

                const schedulesWithSlot = schedulesArray.map(schedule => {
                    const startDate = new Date(schedule.date); // Start time based on schedule date
                    let endDate = new Date(startDate);

                    let text = schedule.remarks;

                    let slot = schedule.slot;
                    // Calculate endDate based on the slot
                    if (slot === 'FULL') {
                        endDate.setHours(18, 0, 0);
                    } else if (slot === 'AM') {
                        endDate.setHours(12, 0, 0);
                    } else if (slot === 'PM') {
                        startDate.setHours(12, 0, 0);;
                        endDate.setHours(18, 0, 0);
                    }

                    console.log(`Schedule: ${schedule.remarks}, Slot: ${slot}`); // Debug slot calculation

                    return {
                        ...schedule,
                        startDate,
                        endDate,
                        title: schedule.remarks,
                    };
                });

                setAllSchedules(schedulesWithSlot); // Store all schedules with slot type
                setData(schedulesWithSlot);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    useEffect(() => {
        if (allSchedules.length > 0) {
            // Filter schedules based on selected slot
            const filteredSchedules = selectedSlot === 'ALL' ? allSchedules : allSchedules.filter(schedule => schedule.slot === selectedSlot);
            console.log('Filtered schedules:', filteredSchedules); // Log filtered schedules

            // Transform data for the Scheduler component
            const rawData = filteredSchedules.map(schedule => {
                const startDate = new Date(schedule.startDate);
                const endDate = new Date(schedule.endDate);
                console.log('Parsed dates:', { startDate, endDate }); // Log parsed dates
                return {
                    startDate,
                    endDate,
                    title: schedule.title,
                };
            });
            console.log('Raw data:', rawData); // Log raw data

            setData(rawData);
        }
    }, [selectedSlot, allSchedules]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000); // Update every second

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    return (
        <Paper>
            <div style={{ marginTop: '60px' }}>
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
            <div>
                <p>Current Date and Time: {currentDateTime.toLocaleString()}</p>
            </div>

            <div>
                <h3>Create New Schedule</h3>
                <TextField
                    type="date"
                    value={newSchedule.date}
                    onChange={(e) => setNewSchedule({ ...newSchedule, date: e.target.value })}
                    sx={{ marginRight: 1 }}
                />
                <TextField
                    label="Remarks"
                    value={newSchedule.remarks}
                    onChange={(e) => setNewSchedule({ ...newSchedule, remarks: e.target.value })}
                    sx={{ marginRight: 1 }}
                />
                <Select
                    label="Type"
                    value={newSchedule.type}
                    onChange={(e) => setNewSchedule({ ...newSchedule, type: e.target.value })}
                    sx={{ marginRight: 1 }}
                >
                    <MenuItem value="WORK">Work</MenuItem>
                    <MenuItem value="ORDER">Order</MenuItem>
                </Select>
                {/* New Slot Dropdown */}
                <Select
                    label="Slot"
                    value={newSchedule.slot}
                    onChange={(e) => setNewSchedule({ ...newSchedule, slot: e.target.value })}
                    sx={{ marginRight: 1 }}
                >
                    <MenuItem value="AM">AM</MenuItem>
                    <MenuItem value="PM">PM</MenuItem>
                    <MenuItem value="FULL">Full Day</MenuItem>
                </Select>
                <Button variant="contained" onClick={handleCreateSchedule}>
                    Create Schedule
                </Button>
            </div>

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
                <Appointments />
                <AppointmentTooltip />
            </Scheduler>
        </Paper>
    );
};

export default Demo;