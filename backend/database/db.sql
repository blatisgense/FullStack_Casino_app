CREATE DATABASE Data_base_Blatisgense;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


 CREATE TABLE Users (
     user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4() UNIQUE,
     user_name TEXT NOT NULL,
     user_email TEXT NOT NULL UNIQUE,
     user_password TEXT NOT NULL,
     user_role TEXT NOT NULL,
     user_wheel BIGINT NOT NULL,
     user_money BIGINT NOT NULL,
     user_meditation TEXT[] NOT NULL,
     user_list TEXT[] NOT NULL
 );

 CREATE TABLE PromoCodes (
     promo TEXT NOT NULL UNIQUE,
     promo_wheel BIGINT NOT NULL,
     promo_money BIGINT NOT NULL,
     promo_meditation TEXT[] NOT NULL,
     promo_list TEXT[] NOT NULL
 );

 CREATE TABLE Products (
     Products_meditation TEXT[] NOT NULL,
     Products_list TEXT[] NOT NULL
 );