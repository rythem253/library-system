const Database = require('better-sqlite3');
const db = new Database('library.sqlite');

db.exec(`
  CREATE TABLE IF NOT EXISTS ItemType (
    ItemTypeID TEXT PRIMARY KEY,
    TypeName TEXT,
    LoanDays INTEGER
  );

  CREATE TABLE IF NOT EXISTS Borrower (
    BorrowerID TEXT PRIMARY KEY,
    CardNumber TEXT,
    FirstName TEXT,
    LastName TEXT,
    Email TEXT,
    PasswordHash TEXT,
    Phone TEXT,
    FineBalance NUMERIC,
    ViolationCount INTEGER,
    BlockedUntil DATE,
    IsBanned INTEGER
  );

  CREATE TABLE IF NOT EXISTS Librarian (
    LibrarianID TEXT PRIMARY KEY,
    Username TEXT,
    PasswordHash TEXT,
    FirstName TEXT,
    LastName TEXT
  );

  CREATE TABLE IF NOT EXISTS Item (
    ItemID TEXT PRIMARY KEY,
    ItemTypeID TEXT,
    Title TEXT,
    Author TEXT,
    Description TEXT,
    ISBN TEXT,
    Price NUMERIC,
    CoverURL TEXT,
    Status TEXT
  );

  CREATE TABLE IF NOT EXISTS Loan (
    LoanID TEXT PRIMARY KEY,
    BorrowerID TEXT,
    ItemID TEXT,
    CheckoutDate DATE,
    DueDate DATE,
    ReturnDate DATE,
    RenewCount INTEGER,
    LateFee NUMERIC,
    DamageFee NUMERIC,
    Status TEXT
  );

  CREATE TABLE IF NOT EXISTS Hold (
    HoldID TEXT PRIMARY KEY,
    BorrowerID TEXT,
    ItemID TEXT,
    HoldDate DATE,
    Status TEXT
  );

  CREATE TABLE IF NOT EXISTS Wishlist (
    WishlistID TEXT PRIMARY KEY,
    BorrowerID TEXT,
    Title TEXT,
    Author TEXT,
    RequestDate DATE,
    Status TEXT
  );

  CREATE TABLE IF NOT EXISTS Fine (
    FineID TEXT PRIMARY KEY,
    BorrowerID TEXT,
    Amount NUMERIC,
    Reason TEXT,
    Status TEXT
  );
`);

db.close();