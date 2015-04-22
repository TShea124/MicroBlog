DROP TABLE IF EXISTS microposts;
CREATE TABLE microposts (
id INTEGER PRIMARY KEY,
title TEXT,
author TEXT,
body TEXT,
image TEXT,
tags TEXT
);

DROP TABLE IF EXISTS postauthors;
CREATE TABLE postauthors (
id INTEGER PRIMARY KEY,
author TEXT);

DROP TABLE IF EXISTS hashes;
CREATE TABLE hashes (
id INTEGER PRIMARY KEY,
hash TEXT);

DROP TABLE IF EXISTS combo;
CREATE TABLE combo (
id INTEGER PRIMARY KEY,
micropost_id INTEGER,
hash_id INTEGER);