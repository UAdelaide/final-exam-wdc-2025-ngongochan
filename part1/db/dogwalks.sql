DROP DATABASE IF EXISTS DogWalkService;
CREATE DATABASE DogWalkService;
USE DogWalkService;
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('owner', 'walker') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Dogs (
    dog_id INT AUTO_INCREMENT PRIMARY KEY,
    owner_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    size ENUM('small', 'medium', 'large') NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES Users(user_id)
);

CREATE TABLE WalkRequests (
    request_id INT AUTO_INCREMENT PRIMARY KEY,
    dog_id INT NOT NULL,
    requested_time DATETIME NOT NULL,
    duration_minutes INT NOT NULL,
    location VARCHAR(255) NOT NULL,
    status ENUM('open', 'accepted', 'completed', 'cancelled') DEFAULT 'open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (dog_id) REFERENCES Dogs(dog_id)
);

CREATE TABLE WalkApplications (
    application_id INT AUTO_INCREMENT PRIMARY KEY,
    request_id INT NOT NULL,
    walker_id INT NOT NULL,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
    FOREIGN KEY (request_id) REFERENCES WalkRequests(request_id),
    FOREIGN KEY (walker_id) REFERENCES Users(user_id),
    CONSTRAINT unique_application UNIQUE (request_id, walker_id)
);

CREATE TABLE WalkRatings (
    rating_id INT AUTO_INCREMENT PRIMARY KEY,
    request_id INT NOT NULL,
    walker_id INT NOT NULL,
    owner_id INT NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comments TEXT,
    rated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (request_id) REFERENCES WalkRequests(request_id),
    FOREIGN KEY (walker_id) REFERENCES Users(user_id),
    FOREIGN KEY (owner_id) REFERENCES Users(user_id),
    CONSTRAINT unique_rating_per_walk UNIQUE (request_id)
);




-- Part1-5: populate data
INSERT INTO Users (username, email, password_hash, role) VALUES
  ('alice123', 'alice@example.com', 'hashed123', 'owner'),
  ('bobwalker', 'bob@example.com', 'hashed456', 'walker'),
  ('carol123', 'carol@example.com', 'hashed789', 'owner'),
  ('walkerkrixi', 'krixi@example.com', 'hashed012', 'walker'),
  ('taara', 'taara@example.com', 'hashed456', 'walker')
;

INSERT INTO Dogs (name, size, owner_id) VALUES
  (
    'Max',
    'medium',
    (SELECT user_id FROM Users WHERE username = 'alice123')
  ),
  (
    'Bella',
    'small',
    (SELECT user_id FROM Users WHERE username = 'carol123')
  ),
  (
    'Min',
    'small',
    (SELECT user_id FROM Users WHERE username = 'alice123')
  ),
  (
    'Toro',
    'large',
    (SELECT user_id FROM Users WHERE username = 'alice123')
  ),
  (
    'Noel',
    'large',
    (SELECT user_id FROM Users WHERE username = 'carol123')
  )
;

INSERT INTO WalkRequests (requested_time, duration_minutes, location, status, dog_id) VALUES
  (
    '2025-06-10 08:00:00',
    30,
    'Parklands',
    'open',
    (SELECT dog_id FROM Dogs WHERE name = 'Max')
  ),
  (
    '2025-06-10 08:00:00',
    45,
    'Beachside Ave',
    'accepted',
    (SELECT dog_id FROM Dogs WHERE name = 'Bella')
  ),
  (
    '2025-10-10 11:00:00',
    30,
    'Prospect Rd',
    'accepted',
    (SELECT dog_id FROM Dogs WHERE name = 'Toro')
  ),
  (
    '2025-07-27 06:25:00',
    10,
    'Rundle Street',
    'accepted',
    (SELECT dog_id FROM Dogs WHERE name = 'Min')
  ),
  (
    '2025-06-24 10:30:00',
    30,
    'North Terrace',
    'open',
    (SELECT dog_id FROM Dogs WHERE name = 'Noel')
  )
;