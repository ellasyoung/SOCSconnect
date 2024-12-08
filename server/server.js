const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const frontendUrl = process.env.REACT_APP_FRONTEND_URL;

// Middleware
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, 
}));
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const logoutRoute = require("./routes/logout");
const altTimeRoutne = require("./routes/alternaterequest");
const weeklyMeeting = require("./routes/weeklyMeeting");
const userInfo = require("./routes/userInfo");
const singleMeeting = require("./routes/singleBooking");
const monthlyMeeting = require("./routes/monthlyMeeting");
const poll = require("./routes/newPoll");
const privAppointments = require("./routes/privAppointments");

app.use("/api/register", registerRoute); 
app.use("/api/login", loginRoute);     
app.use("/api/logout", logoutRoute);     
app.use("/api/alternate-request", altTimeRoutne);     
app.use("/api", weeklyMeeting);     
app.use("/api/user-info", userInfo);
app.use("/api", singleMeeting);
app.use("/api", monthlyMeeting);
app.use("/api", poll);      
app.use("/api/priv-appointments", privAppointments);


app.get("/", (req, res) => {
  res.send("Backend is running!");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
