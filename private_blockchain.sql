CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Blocks (
    block_id SERIAL PRIMARY KEY,
    block_number INT NOT NULL,
    previous_hash VARCHAR(64) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data TEXT NOT NULL,
    nonce INT NOT NULL
);

CREATE TABLE Transactions (
    transaction_id SERIAL PRIMARY KEY,
    block_id INT REFERENCES Blocks(block_id),
    sender VARCHAR(50) NOT NULL,
    receiver VARCHAR(50) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(10) CHECK (status IN ('pending', 'completed', 'failed')) NOT NULL
);

CREATE TABLE SmartContracts (
    contract_id SERIAL PRIMARY KEY,
    contract_address VARCHAR(42) NOT NULL,
    creator_id INT REFERENCES Users(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    source_code TEXT NOT NULL
);

CREATE TABLE ContractInteractions (
    interaction_id SERIAL PRIMARY KEY,
    contract_id INT REFERENCES SmartContracts(contract_id),
    user_id INT REFERENCES Users(user_id),
    method_name VARCHAR(50) NOT NULL,
    params TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Logs (
    log_id SERIAL PRIMARY KEY,
    level VARCHAR(10) CHECK (level IN ('info', 'warning', 'error')) NOT NULL,
    message TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
--SELECT * FROM Blocks;
--SELECT * FROM Users;
--SELECT * FROM Transactions;
--SELECT * FROM Logs;
--SELECT * FROM ContractInteractions;
--SELECT * FROM SmartContracts;

--SELECT * FROM users WHERE username = 'testuser';
--SELECT * FROM transactions WHERE sender = 'testuser';
--SELECT * FROM blocks WHERE block_number = 1;
--SELECT * FROM logs;
--SELECT * FROM smartContracts WHERE contract_address = '0x1234567890abcdef1234567890abcdef12345678';
--DELETE FROM SmartContracts WHERE contract_id = 16;
--DELETE FROM SmartContracts WHERE contract_id BETWEEN 5 AND 15;
--SELECT * FROM Transactions WHERE block_id = 4;
--DELETE FROM Transactions WHERE transaction_id = 17;


