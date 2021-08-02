CREATE TABLE buttons (
	button_id INTEGER PRIMARY KEY AUTO_INCREMENT,
	uuid TEXT NOT NULL
);

CREATE TABLE  developers (id INTEGER PRIMARY KEY AUTO_INCREMENT, name TEXT, is_admin BOOLEAN DEFAULT false);

CREATE TABLE reasons (id INTEGER PRIMARY KEY AUTO_INCREMENT, reason TEXT);

CREATE TABLE developer_pairings (
	pairing_id INTEGER PRIMARY KEY AUTO_INCREMENT,
	button_id INTEGER,
	FOREIGN KEY (button_id) REFERENCES buttons (button_id),
	developer_id INTEGER,
	FOREIGN KEY (developer_id) REFERENCES developers (id),
	CURRENT BOOLEAN DEFAULT 1
);

CREATE TABLE reason_pairings (
	pairing_id INTEGER PRIMARY KEY AUTO_INCREMENT,
	button_id INTEGER,
	FOREIGN KEY (button_id) REFERENCES buttons (button_id),
	reason_id INTEGER,
	FOREIGN KEY (reason_id) REFERENCES reasons (id),
	CURRENT BOOLEAN DEFAULT 1
);

CREATE TABLE events (
	button_id INTEGER NOT NULL,
	timestamp DATETIME NOT NULL,
	developers_id INTEGER NOT NULL,
	reason_id INTEGER NOT NULL,
	to_ignore BOOLEAN DEFAULT FALSE,
	PRIMARY KEY (button_id, timestamp),
	FOREIGN KEY (button_id) REFERENCES buttons (button_id),
	FOREIGN KEY (developers_id) REFERENCES developers (id),
	FOREIGN KEY (reason_id) REFERENCES reasons (id)
);

CREATE TABLE timeblocks (
	timeblock_id INTEGER PRIMARY KEY AUTO_INCREMENT,
	developer_id INTEGER NOT NULL,
	reason_id INTEGER NOT NULL,
	FOREIGN KEY (developer_id) REFERENCES developers(id)
);

CREATE TABLE event_grouping (
	mapping_id INTEGER PRIMARY KEY AUTO_INCREMENT,
	timeblock_id INTEGER NOT NULL,
	button_id INTEGER NOT NULL,
	timestamp DATETIME NOT NULL,
	FOREIGN KEY (timeblock_id) REFERENCES timeblocks (timeblock_id),
	FOREIGN KEY (button_id,
		timestamp) REFERENCES events (button_id,
		timestamp)
);

CREATE TABLE explanations (
	explanation_id INTEGER PRIMARY KEY AUTO_INCREMENT,
	timeblock INTEGER NOT NULL,
	keyword TEXT NOT NULL,
	details TEXT NOT NULL,
	FOREIGN KEY (timeblock) REFERENCES timeblocks (timeblock_id)
);
