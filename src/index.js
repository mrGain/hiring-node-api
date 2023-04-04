require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/dbConnect');

// Import Routes
const authRoute = require('./routes/Student/auth');
const myAccountRoute = require('./routes/Student/myAccount');
const calenderRoute = require('./routes/Student/calender');
const kanbanRoute = require('./routes/Student/kanban_route');
const resumeRoute = require('./routes/Student/resume_route');
const jobsRoute = require('./routes/Company/jobs_route');
const collegeRoute = require('./routes/College/college_route');
const collegeStudentRoute = require('./routes/College/student_data');
const stdJobsRoute = require('./routes/Student/student_jobs').router;
const dashboardRoute = require('./routes/Student/dashboard_route');
const studentProfile = require('./routes/Student/profile_page');

var cors = require('cors')
const app = express();

// Middlewares

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Route Middlewares
app.use('/api/student/account',authRoute);
app.use('/api/student/account',myAccountRoute);
app.use('/api/student/calendar/events',calenderRoute);
app.use('/api/student/kanban',kanbanRoute);
app.use('/api/student/resume',resumeRoute);
app.use('/api/student/jobs',stdJobsRoute);
app.use('/api/company/jobs',jobsRoute);
app.use('/api/college',collegeRoute);
app.use('/api/college/student',collegeStudentRoute);
app.use('/api/student/dashboard',dashboardRoute);
app.use('/api/student/profile',studentProfile);

// Connect to MongoDB
connectDB();


app.listen(process.env.APP_PORT, () => {
    console.log('Server is up and running on port ' + process.env.APP_PORT);
});
