CREATE TABLE Game (
	id TEXT PRIMARY KEY,
	activeround INT,
	latestround INT
);

CREATE TABLE Player (
	username VARCHAR (48) NOT NULL,
	gameid VARCHAR (48) NOT NULL,
	scores TEXT,
	turnorder INT,
	PRIMARY KEY(username, gameid),
	CONSTRAINT fk_game
      FOREIGN KEY(gameid) 
	  REFERENCES Game(id)
);