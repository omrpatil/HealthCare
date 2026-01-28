function PaymentReceiptModal({ payment, onClose }) {
  return (
    <div className="modal-overlay">
      <div
        className="modal"
        style={{
          maxWidth: "420px",
          width: "90%",
          textAlign: "left",
        }}
      >
        <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
          🧾 Payment Receipt
        </h3>

        <div
          style={{
            background: "#f8fafc",
            border: "1px dashed #94a3b8",
            padding: "14px",
            borderRadius: "8px",
            fontFamily: "monospace",
            fontSize: "13px",
            whiteSpace: "pre-wrap",
            lineHeight: "1.6",
          }}
        >
{`--------------------------------
HelloDoc – Mock Payment Receipt
--------------------------------
Receipt ID : ${payment.receiptId}
Appointment: ${payment.appointmentId}

Amount Paid: ₹${payment.amount}
Commission : ₹${payment.commission}
Doctor Gets: ₹${payment.doctorAmount}

Payment Mode: ${payment.mode}
Status      : ${payment.status}
Date        : ${payment.date}
--------------------------------
This is a simulated payment.
--------------------------------`}
        </div>

        <button
          onClick={onClose}
          style={{
            marginTop: "14px",
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: "none",
            background: "linear-gradient(180deg,#0aa3b5,#0284c7)",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default PaymentReceiptModal;
