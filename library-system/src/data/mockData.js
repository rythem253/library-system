/* =========================================================
   Mock data for the librarian pages (Milestone 2)
   Matches the Milestone 1 data model (ERD).
   In Milestone 4 this will be replaced by data from the REST API.
========================================================= */

// Fixed "today" so overdue loans and late fees always look the same in the demo
export const TODAY = "2026-11-15";

export const itemTypes = [
  { itemTypeId: "T-BOOK", typeName: "Book", loanDays: 30 },
  { itemTypeId: "T-ELEC", typeName: "Electronic", loanDays: 14 },
  { itemTypeId: "T-ART", typeName: "Article", loanDays: 7 },
  { itemTypeId: "T-RES", typeName: "Research Paper", loanDays: 7 },
];

export const itemStatuses = ["Available", "CheckedOut", "Damaged", "Lost"];

export const items = [
  { itemId: "I1001", itemTypeId: "T-BOOK", title: "The Hobbit", author: "J.R.R. Tolkien", isbn: "9780547928227", price: 25.3, status: "CheckedOut", description: "Bilbo Baggins joins a quest to reclaim a treasure guarded by a dragon." },
  { itemId: "I1002", itemTypeId: "T-BOOK", title: "To Kill a Mockingbird", author: "Harper Lee", isbn: "9780061120084", price: 18.99, status: "Available", description: "A classic novel about justice and growing up in the American South." },
  { itemId: "I1003", itemTypeId: "T-BOOK", title: "1984", author: "George Orwell", isbn: "9780451524935", price: 16.5, status: "CheckedOut", description: "A dystopian novel about surveillance and control." },
  { itemId: "I1004", itemTypeId: "T-BOOK", title: "Dune", author: "Frank Herbert", isbn: "9780441172719", price: 22.0, status: "Available", description: "An epic science fiction story set on the desert planet Arrakis." },
  { itemId: "I1005", itemTypeId: "T-BOOK", title: "Pride and Prejudice", author: "Jane Austen", isbn: "9780141439518", price: 12.99, status: "Damaged", description: "A romantic novel about manners, marriage and first impressions." },
  { itemId: "I1006", itemTypeId: "T-ELEC", title: "iPad (9th Generation)", author: "Apple", isbn: "", price: 459.0, status: "CheckedOut", description: "Tablet available for in-library and home use." },
  { itemId: "I1007", itemTypeId: "T-ELEC", title: "TI-84 Plus Calculator", author: "Texas Instruments", isbn: "", price: 149.99, status: "Available", description: "Graphing calculator for math and statistics courses." },
  { itemId: "I1008", itemTypeId: "T-ART", title: "Climate Change and Alberta Agriculture", author: "Dr. L. Chen", isbn: "", price: 15.0, status: "Available", description: "Journal article on drought and crop yields in the prairies." },
  { itemId: "I1009", itemTypeId: "T-RES", title: "Machine Learning in Healthcare", author: "A. Patel & R. Gomez", isbn: "", price: 20.0, status: "CheckedOut", description: "Research paper on predicting patient outcomes with ML models." },
  { itemId: "I1010", itemTypeId: "T-BOOK", title: "The Great Gatsby", author: "F. Scott Fitzgerald", isbn: "9780743273565", price: 14.99, status: "Lost", description: "A story of wealth and longing in the Jazz Age." },
];

export const borrowers = [
  { borrowerId: "B001", cardNumber: "29000123", firstName: "Ava", lastName: "Singh", email: "ava@example.com", phone: "780-555-0101", fineBalance: 0, violationCount: 0, blockedUntil: null, isBanned: false },
  { borrowerId: "B002", cardNumber: "29000124", firstName: "Liam", lastName: "Chen", email: "liam.chen@example.com", phone: "780-555-0102", fineBalance: 0, violationCount: 1, blockedUntil: null, isBanned: false },
  { borrowerId: "B003", cardNumber: "29000125", firstName: "Noah", lastName: "Brown", email: "noah.b@example.com", phone: "780-555-0103", fineBalance: 0, violationCount: 0, blockedUntil: null, isBanned: false },
  { borrowerId: "B004", cardNumber: "29000126", firstName: "Emma", lastName: "Wilson", email: "emma.w@example.com", phone: "780-555-0104", fineBalance: 34.99, violationCount: 5, blockedUntil: null, isBanned: true },
  { borrowerId: "B005", cardNumber: "29000127", firstName: "Olivia", lastName: "Martin", email: "olivia.m@example.com", phone: "780-555-0105", fineBalance: 0, violationCount: 0, blockedUntil: null, isBanned: false },
  { borrowerId: "B006", cardNumber: "29000128", firstName: "Ethan", lastName: "Patel", email: "ethan.p@example.com", phone: "780-555-0106", fineBalance: 2.0, violationCount: 1, blockedUntil: "2026-11-20", isBanned: false },
];

export const loans = [
  { loanId: "LN5001", borrowerId: "B001", itemId: "I1001", checkoutDate: "2026-10-20", dueDate: "2026-11-19", returnDate: null, renewCount: 0, status: "Active" },
  { loanId: "LN5002", borrowerId: "B002", itemId: "I1003", checkoutDate: "2026-10-01", dueDate: "2026-10-31", returnDate: null, renewCount: 0, status: "Active" },
  { loanId: "LN5003", borrowerId: "B003", itemId: "I1006", checkoutDate: "2026-11-01", dueDate: "2026-11-15", returnDate: null, renewCount: 0, status: "Active" },
  { loanId: "LN5004", borrowerId: "B006", itemId: "I1009", checkoutDate: "2026-10-28", dueDate: "2026-11-04", returnDate: null, renewCount: 1, status: "Active" },
  { loanId: "LN5005", borrowerId: "B005", itemId: "I1002", checkoutDate: "2026-09-15", dueDate: "2026-10-15", returnDate: "2026-10-14", renewCount: 0, status: "Returned" },
  { loanId: "LN5006", borrowerId: "B004", itemId: "I1010", checkoutDate: "2026-08-01", dueDate: "2026-08-31", returnDate: null, renewCount: 0, status: "Lost" },
];

export const fines = [
  { fineId: "F401", borrowerId: "B001", amount: 7.5, reason: "Late return (15 days)", status: "Paid" },
  { fineId: "F402", borrowerId: "B006", amount: 2.0, reason: "Late return (4 days)", status: "Unpaid" },
  { fineId: "F403", borrowerId: "B004", amount: 24.99, reason: "Lost item: The Great Gatsby ($14.99 + $10 fee)", status: "Unpaid" },
  { fineId: "F404", borrowerId: "B004", amount: 10.0, reason: "Damaged item fee", status: "Unpaid" },
  { fineId: "F405", borrowerId: "B003", amount: 3.0, reason: "Late return (6 days)", status: "Waived" },
];

export const wishlist = [
  { wishlistId: "W201", borrowerId: "B001", title: "Atomic Habits", author: "James Clear", requestDate: "2026-10-10", status: "Pending" },
  { wishlistId: "W202", borrowerId: "B003", title: "Project Hail Mary", author: "Andy Weir", requestDate: "2026-10-22", status: "Approved" },
  { wishlistId: "W203", borrowerId: "B005", title: "Raspberry Pi 5 Starter Kit", author: "Raspberry Pi", requestDate: "2026-11-02", status: "Pending" },
  { wishlistId: "W204", borrowerId: "B002", title: "Educated", author: "Tara Westover", requestDate: "2026-09-30", status: "Denied" },
];

/* ---------- Helper functions ---------- */

export function getBorrowerName(borrowerId) {
  const b = borrowers.find((x) => x.borrowerId === borrowerId);
  return b ? `${b.firstName} ${b.lastName}` : "Unknown";
}

export function getItem(itemId) {
  return items.find((x) => x.itemId === itemId);
}

export function getTypeName(itemTypeId) {
  const t = itemTypes.find((x) => x.itemTypeId === itemTypeId);
  return t ? t.typeName : "Unknown";
}

// Number of days from dateA to dateB (both "YYYY-MM-DD")
export function daysBetween(dateA, dateB) {
  const ms = new Date(dateB) - new Date(dateA);
  return Math.round(ms / (1000 * 60 * 60 * 24));
}

export function daysLate(loan) {
  if (loan.status !== "Active") return 0;
  return Math.max(0, daysBetween(loan.dueDate, TODAY));
}

export function isOverdue(loan) {
  return daysLate(loan) > 0;
}

// Business rule: $0.50 per day late, capped at the item's price
export function lateFeeEstimate(loan) {
  const item = getItem(loan.itemId);
  const fee = daysLate(loan) * 0.5;
  return item ? Math.min(fee, item.price) : fee;
}
