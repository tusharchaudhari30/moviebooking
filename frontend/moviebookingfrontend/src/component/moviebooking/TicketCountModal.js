import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { bookTicketById } from "../restclient/MovieBookingClient";

const TicketCountModal = (props) => {
  const [ticketCount, setTicketCount] = useState(1);
  const [price, setPrice] = useState(props.movieTicket.price);
  const [selectedDate, setSelectedDate] = useState("");
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  useEffect(() => {
    const calculatedPrice = ticketCount * props.movieTicket.price;
    setPrice(calculatedPrice);
  }, [ticketCount, props.movieTicket.price]);

  const handleIncrease = () => {
    if (ticketCount < 10) {
      setTicketCount(ticketCount + 1);
    }
  };

  const handleDecrease = () => {
    if (ticketCount > 1) {
      setTicketCount(ticketCount - 1);
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const confirmSelection = () => {
    if (selectedDate === "") {
      toast.error("Please select a valid date!");
      return;
    }

    bookTicketById(props.movieTicket.id, ticketCount, selectedDate).then(
      (body) => {
        if (body.statuscode === "UNAUTHORIZED") {
          toast.error(body.message);
        } else {
          toast.success(body.message);
        }
      }
    );
    props.hideModal();
  };

  return (
    <div>
      <div className="modal fade" ref={props.refTicketCount}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Select Ticket Count
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={props.hideModal}
              ></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="date">Select Date:</label>
                <input
                  type="date"
                  id="date"
                  className="form-control"
                  value={selectedDate}
                  onChange={handleDateChange}
                  min={minDate.toISOString().split("T")[0]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="ticketCount">Ticket Count:</label>
                <div className="d-flex justify-content-center align-items-center">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handleDecrease}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="ticketCount"
                    className="form-control text-center"
                    value={ticketCount}
                    onChange={() => {}}
                    readOnly
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handleIncrease}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="price">Price:</label>
                <div className="text-center">
                  <strong>${price}</strong>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={confirmSelection}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCountModal;
