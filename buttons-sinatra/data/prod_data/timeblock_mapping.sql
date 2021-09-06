INSERT INTO timeblock_mapping (timeblock_id, button_id, timestamp)
			SELECT
				ROUND(RAND() * 15) AS timeblock_id, button_id, timestamp FROM events
			ORDER BY
				RAND()
			LIMIT 1;

-- unfortunately you have to run this once for each row you want, it's a  bit annoying