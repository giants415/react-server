// Main starting point of the app
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// App Set Up

// Server Set Up
const port = process.env.PORT || 3090;
