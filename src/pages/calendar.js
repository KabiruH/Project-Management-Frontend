import React, { useState } from 'react';
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import 'react-calendar/dist/Calendar.css';
import Layout from '../components/layout'

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventTitle, setEventTitle] = useState('');

  const openModal = (date) => {
    setSelectedDate(date);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEventTitle('');
  };

  const addEvent = () => {
    const dateString = selectedDate.toDateString();
    const newEvents = { ...events };
    if (!newEvents[dateString]) {
      newEvents[dateString] = [];
    }
    newEvents[dateString].push(eventTitle);
    setEvents(newEvents);
    closeModal();
  };

  const onDateClick = (date) => {
    openModal(date);
  };

  const renderEvents = (date) => {
    const dateString = date.toDateString();
    return events[dateString]?.map((event, index) => (
      <div key={index} className="bg-red-200 p-1 rounded mt-1 text-xs text-center">
        {event}
      </div>
    ));
  };

  const tileClassName = ({ date, view }) => {
    const dateString = date.toDateString();
    if (events[dateString]) {
      return 'bg-black text-black rounded-full';
    }
    return null;
  };

  return (
    <Layout>
    <div className="calendar-page p-5 h-screen flex flex-col items-center bg-gray-50">
      <h1 className="text-2xl mb-4">Calendar</h1>
      <div className="w-full flex justify-center">
        <Calendar
          onClickDay={onDateClick}
          value={date}
          tileContent={({ date, view }) => view === 'month' && renderEvents(date)}
          className="react-calendar w-3/4 md:w-2/3 lg:w-1/2 bg-black p-5 rounded-lg shadow-lg"
          tileClassName={tileClassName}
        />
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add Event"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <h2 className="text-xl mb-2">Add Event</h2>
        <p className="mb-4">Selected Date: {selectedDate?.toDateString()}</p>
        <input
          type="text"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
          className="input mb-2 p-2 border border-gray-400 w-full"
          placeholder="Event Title"
        />
        <div className="flex justify-end">
          <button onClick={addEvent} className="bg-blue-500 text-white p-2 rounded mr-2">
            Add Event
          </button>
          <button onClick={closeModal} className="bg-red-500 text-white p-2 rounded">
            Cancel
          </button>
        </div>
      </Modal>
    </div>
    </Layout>
  );
};

export default CalendarPage;
