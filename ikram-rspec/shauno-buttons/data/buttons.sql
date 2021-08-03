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
