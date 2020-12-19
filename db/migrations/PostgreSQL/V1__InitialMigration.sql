CREATE TABLE Game (
	id VARCHAR (48) PRIMARY KEY
);

CREATE TABLE Player (
	username VARCHAR (48) NOT NULL,
	gameid VARCHAR (48) NOT NULL,
	scores TEXT,
	turn INT,
	PRIMARY KEY(username, gameid),
	CONSTRAINT fk_game
      FOREIGN KEY(gameid) 
	  REFERENCES Game(id)
);