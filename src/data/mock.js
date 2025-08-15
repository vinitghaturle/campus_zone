// Mock data for demonstration

export const mockLostFoundItems = [
  { id: 1, title: "Student ID Card", location: "Library", time: "2 hours ago", status: "lost", image: "https://placehold.co/600x400" },
  { id: 2, title: "Blue Backpack", location: "Cafeteria", time: "5 hours ago", status: "found", image: "https://placehold.co/600x400" },
  { id: 3, title: "MacBook Charger", location: "Student Center", time: "1 day ago", status: "lost", image: "https://placehold.co/600x400" },
  { id: 4, title: "Water Bottle", location: "Gym", time: "2 days ago", status: "found", image: "https://placehold.co/600x400" },
  { id: 5, title: "Calculator", location: "Math Building", time: "3 days ago", status: "lost", image: "https://placehold.co/600x400" },
  { id: 6, title: "Wireless Earbuds", location: "Library", time: "4 days ago", status: "found", image: "https://placehold.co/600x400" }
];

export const mockEvents = [
  { id: 1, title: "Campus Career Fair", date: "Tomorrow, 10:00 AM", location: "Main Auditorium" },
  { id: 2, title: "Tech Workshop", date: "Thu, 2:00 PM", location: "Lab 205" },
  { id: 3, title: "Study Group Session", date: "Fri, 4:00 PM", location: "Library" }
];

export const mockPYQs = [
  { id: 1, subject: "Computer Science", title: "Data Structures Final Exam", year: "2.1k", downloads: "4.5" },
  { id: 2, subject: "Mathematics", title: "Calculus Midterm Solutions", year: "1.8k", downloads: "4.4" },
  { id: 3, subject: "Physics", title: "Quantum Mechanics Notes", year: "956", downloads: "4.2" }
];

export const mockRecentActivity = [
  { id: 1, type: "item", title: "New item reported", description: "Black Backpack found in Library", time: "2 hours ago" },
  { id: 2, type: "event", title: "Event registration", description: "Registered for Tech Career Fair", time: "5 hours ago" },
  { id: 3, type: "pyq", title: "New PYQ uploaded", description: "Data Structures PYQ 2023 added", time: "1 day ago" }
];
