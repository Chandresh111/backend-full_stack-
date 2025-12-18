const express = require('express');  // imports express to create the server application.
const cors = require('cors');   // enables cross-origin resource sharing
const helmet = require('helmet'); // Add security http header
const morgan = require('morgan'); // logs http requests for debugging.
const routes = require('./routes');   // import all api route 
const errorMiddleware = require('./middlewares/error.middleware'); // Imports global error-handling middleware.

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'NewsCurate API running' });
});

app.use('/api', routes);

// error handler (should be last)
app.use(errorMiddleware);

module.exports = app;