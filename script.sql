-- Create the appdb database if it does not exist
CREATE DATABASE IF NOT EXISTS appdb;

-- Use the appdb database
USE appdb;

-- Create the apptb table only if it does not exist
CREATE TABLE IF NOT EXISTS apptb (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  PRIMARY KEY (id)
);
