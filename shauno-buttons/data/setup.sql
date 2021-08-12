insert into buttons (uuid) values ('d167cd3a-2314-47d7-8d0a-e55bc69608df');
insert into buttons (uuid) values ('468b05df-c272-4a11-9f21-1c95f7e581e0');
insert into buttons (uuid) values ('f1900a18-b9a4-4b29-b948-364502feb3fe');
insert into buttons (uuid) values ('4278fe5f-9aaf-430b-be39-7d282e1f7227');
insert into buttons (uuid) values ('382dc5ab-c778-4ecd-87d3-978e9dd705df');
insert into buttons (uuid) values ('467fa190-d806-4d45-9eda-08e322d6fccf');

insert into developers (name, is_admin) values ("Ikram Saedi", 0);
insert into developers (name, is_admin) values ("Devon McKenzie", 0);
insert into developers (name, is_admin) values ("Shaun O'Keefe", 1);

insert into developer_pairings (button_id, developer_id) values (1, 2);
insert into developer_pairings (button_id, developer_id) values (2, 2);
insert into developer_pairings (button_id, developer_id) values (3, 1);
insert into developer_pairings (button_id, developer_id) values (4, 3);
insert into developer_pairings (button_id, developer_id) values (5, 1);
insert into developer_pairings (button_id, developer_id) values (6, 3);

INSERT INTO reasons (reason) VALUES ("CI is broken");
INSERT INTO reasons (reason) VALUES ("Developer sad");
INSERT INTO reasons (reason) VALUES ("Developer tired");

insert into reason_pairings (button_id, reason_id) values (1, 2);
insert into reason_pairings (button_id, reason_id) values (2, 2);
insert into reason_pairings (button_id, reason_id) values (3, 1);
insert into reason_pairings (button_id, reason_id) values (4, 3);
insert into reason_pairings (button_id, reason_id) values (5, 1);
insert into reason_pairings (button_id, reason_id) values (6, 3);

insert into events (button_id, timestamp, developers_id, reason_id) values (2, '2021-08-03 01:54:25', 3, 1);
insert into events (button_id, timestamp, developers_id, reason_id) values (4, '2021-08-03 05:56:56', 3, 3);
insert into events (button_id, timestamp, developers_id, reason_id) values (3, '2021-08-03 20:24:31', 3, 2);
insert into events (button_id, timestamp, developers_id, reason_id) values (5, '2021-08-03 13:34:35', 1, 3);
insert into events (button_id, timestamp, developers_id, reason_id) values (4, '2021-08-03 23:26:15', 2, 1);
insert into events (button_id, timestamp, developers_id, reason_id) values (5, '2021-08-03 01:52:24', 1, 1);
insert into events (button_id, timestamp, developers_id, reason_id) values (2, '2021-08-03 15:31:09', 3, 1);
insert into events (button_id, timestamp, developers_id, reason_id) values (1, '2021-08-03 00:36:30', 1, 2);
insert into events (button_id, timestamp, developers_id, reason_id) values (2, '2021-08-03 20:52:22', 1, 2);
insert into events (button_id, timestamp, developers_id, reason_id) values (6, '2021-08-03 09:24:11', 2, 1);
insert into events (button_id, timestamp, developers_id, reason_id) values (4, '2021-08-03 06:22:50', 2, 2);
insert into events (button_id, timestamp, developers_id, reason_id) values (6, '2021-08-03 05:39:47', 1, 3);
insert into events (button_id, timestamp, developers_id, reason_id) values (6, '2021-08-03 10:21:02', 1, 2);
insert into events (button_id, timestamp, developers_id, reason_id) values (5, '2021-08-03 01:46:15', 3, 3);
insert into events (button_id, timestamp, developers_id, reason_id) values (3, '2021-08-03 18:25:44', 1, 1);


INSERT INTO timeblocks (developer_id, reason_id) SELECT
	developers_id,
	reason_id
FROM
	events
GROUP BY
	developers_id,
	reason_id;


INSERT INTO timeblock_mapping (timeblock_id, button_id, `timestamp`)
SELECT
	timeblocks.timeblock_id,
	events.button_id,
	events. `timestamp`
FROM
	timeblocks
	JOIN events ON timeblocks.developer_id = events.developers_id
		AND timeblocks.reason_id = events.reason_id;