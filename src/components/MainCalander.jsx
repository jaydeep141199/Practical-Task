import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventForm from "./EventForm";
import { modals } from "@mantine/modals";

const localizer = momentLocalizer(moment);

const MainCalander = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const storedEvents = localStorage.getItem("calendarEvents");
    if (storedEvents) {
      setEvents(
        JSON.parse(storedEvents).map((event) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }))
      );
    }
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem("calendarEvents", JSON.stringify(events));
    }
  }, [events]);

  const handleSelectSlot = ({ start }) => {
    const selected = new Date(start);
    modals.open({
      title: "Add Event",
      size: "lg",
      centered: true,
      children: (
        <EventForm
          date={selected}
          onSubmit={(values) => handleAdd(values, selected)}
        />
      ),
    });
  };

  const handleAdd = (values, selectedDate) => {
    const formattedDate = moment(selectedDate).format("YYYY-MM-DD");

    const newEvent = {
      id: Math.random().toString(36).substr(2, 9),
      title: values.title,
      start: new Date(`${formattedDate}T${values.start}`),
      end: new Date(`${formattedDate}T${values.end}`),
    };

    setEvents((prev) => [...prev, newEvent]);
    modals.closeAll();
  };

  const handleSelectEvent = (event) => {
    const eventDate = new Date(event.start);

    modals.open({
      title: "Edit Event",
      size: "lg",
      centered: true,
      children: (
        <EventForm
          date={eventDate}
          initialValues={{
            title: event.title,
            start: moment(event.start).format("HH:mm"),
            end: moment(event.end).format("HH:mm"),
          }}
          onSubmit={(values) => handleUpdate(event.id, values, eventDate)}
          onDelete={() => handleDelete(event.id)}
          isEdit
        />
      ),
    });
  };

  const handleUpdate = (id, values, selectedDate) => {
    const formattedDate = moment(selectedDate).format("YYYY-MM-DD");

    setEvents((prev) =>
      prev.map((event) =>
        event.id === id
          ? {
              ...event,
              title: values.title,
              start: new Date(`${formattedDate}T${values.start}`),
              end: new Date(`${formattedDate}T${values.end}`),
            }
          : event
      )
    );
    modals.closeAll();
  };

  const handleDelete = (id) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
    modals.closeAll();
  };

  return (
    <Calendar
      localizer={localizer}
      events={events}
      views={[Views.MONTH, Views.WEEK, Views.DAY]}
      defaultView={Views.MONTH}
      selectable
      onSelectSlot={handleSelectSlot}
      onSelectEvent={handleSelectEvent}
      startAccessor="start"
      endAccessor="end"
      style={{ height: "90vh", margin: "20px" }}
      popup
    />
  );
};

export default MainCalander;
