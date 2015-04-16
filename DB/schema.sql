DROP TABLE IF EXISTS microposts;
CREATE TABLE microposts (
id INTEGER PRIMARY KEY,
title TEXT,
author TEXT,
body TEXT,
image TEXT,
tags TEXT,
);

DROP TABLE IF EXISTS postauthors;
CREATE TABLE postauthors (
id INTEGER PRIMARY KEY,
author TEXT);