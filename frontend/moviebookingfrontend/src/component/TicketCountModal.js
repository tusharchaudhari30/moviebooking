import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const TicketCountModal = (props) => {
  const [ticketCount, setTicketCount] = useState(1);
  const [price, setPrice] = useState(props.initialPrice);

  useEffect(() => {
    // Calculate the price based on the selected ticket count and the passed initial price
    const calculatedPrice = ticketCount * props.initialPrice;
    setPrice(calculatedPrice);
  }, [ticketCount, props.initialPrice]);

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

  const confirmSelection = () => {
    // You can use the selected ticketCount and price here
    console.log(`Selected ticket count: ${ticketCount}`);
    console.log(`Total price: $${price}`);
    toast.success("Ticket Booked Successfully.");
    // Close the modal or perform any other necessary actions
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
