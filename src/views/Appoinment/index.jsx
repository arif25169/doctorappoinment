import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import uuid from 'uuid'
import _ from 'lodash';
//import { useStoreState } from 'easy-peasy';
// import PropTypes from 'prop-types'
//import { Calendar } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import moment from 'moment'
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import './styles.css'


const Appoinment = () => {
  // const selectedDoctor = useStoreState(state => state.selectedDoctor)
  // const eventItems = JSON.parse(localStorage.getItem('itemsArray')) || [];
  //  const [eventItems, seteventItems] = useState(JSON.parse(localStorage.getItem('itemsArray')) || []);
  const currentDoctor = JSON.parse(localStorage.getItem('currentDoctor')) || []
  const alleventsItem = JSON.parse(localStorage.getItem('itemsArray')) || [];
  const [eventItems, seteventItems] = useState(alleventsItem.filter((item) => {
    return Object.keys(item).some((key) => item[key].includes(currentDoctor.name));
  }));
  let resultArray = [];

  if (currentDoctor.availibility !== undefined || null) {
    //configuring data to work with fullcalendar business hours
    let availibility = currentDoctor.availibility
    let keysAvailibility = Object.keys(availibility);
    for (let j = 0; j < keysAvailibility.length; j++) {
      let key = keysAvailibility[j];
      let value = availibility[key];
      delete availibility[key];
      key = key.replace("sun", 0);
      key = key.replace("mon", 1);
      key = key.replace("tue", 2);
      key = key.replace("wed", 3);
      key = key.replace("thu", 4);
      key = key.replace("fri", 5);
      key = key.replace("sat", 6);
      availibility[key] = value;
    }
    let arr = []
    for (let x in availibility) {
      let dateV = x;
      let startTime = moment((availibility[x]).slice(0, 8), ["h:mm A"]).format("HH:mm");
      let endTime = moment((availibility[x]).slice(11, 19), ["h:mm A"]).format("HH:mm");
      arr.push([dateV], startTime, endTime)
    }
    let values = _.chunk(arr, 3);
    let keys = ["daysOfWeek", "startTime", "endTime"];
    if (values) {
      for (let i = 0; i < values.length; i++) {
        let obj = {};
        for (let j = 0; j < keys.length; j++) {
          obj[keys[j]] = values[i][j];
        }
        resultArray.push(obj);
      }
    }
  }

  function onEventClick(event, element) {
    console.log(event)
    //alert(event.event.id);
    // get items for localStorage
    var items = JSON.parse(localStorage.getItem('itemsArray')) || [];
    // get items except for the one(s) you want to remove
    var newItems = items.filter(item => item.id !== event.event.id);
    // save back to localStorage
    localStorage.setItem('itemsArray', JSON.stringify(newItems));
    seteventItems(JSON.parse(localStorage.getItem('itemsArray')) || []);
  }


  const handleDateClick = arg => {

    //console.log(arg.dateStr);
  };
  function handleAppoinment(start, end, jsEvent, view) {
    console.log(start.start)
    let oldItems = JSON.parse(localStorage.getItem('itemsArray')) || [];
    let newItem = {
      'title': 'Appointed',
      'start': start.start.toISOString(),
      'end': start.end.toISOString(),
      'id': uuid.v4(),
      'name': currentDoctor.name
    };

    oldItems.push(newItem);

    localStorage.setItem('itemsArray', JSON.stringify(oldItems));
    console.log(currentDoctor.name)
    seteventItems(JSON.parse(localStorage.getItem('itemsArray')).filter((item) => {
      return Object.keys(item).some((key) => item[key].includes(currentDoctor.name));
    }) || []);

    // if (moment(start.start).isAfter()) {
    //   alert('Right');
    // } else {
    //   alert('Cannot book an appointment in the past');
    // }
  }


  return (
    <div className="mainDiv">
      <Helmet>
        <title>Appoinment</title>
        <meta
          name="description"
          content="Make an appoinment"
        />
      </Helmet>
      <div className="calendarDiv" >
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
          eventClick={onEventClick}
          dateClick={handleDateClick}
          header={{
            right: "prev,next",
            center: "title",
            left: "dayGridMonth,timeGridWeek,listWeek"
          }}
          slotDuration='00:15:00'
          slotLabelInterval='00:05:00'
          minTime="06:00:00"
          maxTime="24:00:00"
          contentHeight="auto"
          allDaySlot={false}
          selectable={true}
          initialView="timeGridWeek"
          defaultView={'timeGridWeek'}
          editable={true}
          businessHours={resultArray}
          events={eventItems}
          //displayEventTime={false}
          selectConstraint={resultArray}
          eventResize={false}
          eventDurationEditable={false}
          eventStartEditable={false}
          select={handleAppoinment}

        />
      </div>

    </div>
  )
}

// Appoinment.propTypes = {
//   todo: PropTypes.object.isRequired
// }

export default Appoinment
