// Updated seed.js
const db = require('./database');

// Sample data for technicians
const technicians = [
    { name: 'Arjun Sharma', photo: 'arjun.jpg', specialization: 'Refrigerator Repair', rating: 5, description: 'Expert in fixing refrigerators', contact_info: '555-1010' },
    { name: 'Priya Patel', photo: 'priya.jpg', specialization: 'Air Conditioner Repair', rating: 4, description: 'Specializes in air conditioner repairs', contact_info: '555-2020' },
    { name: 'Vikram Singh', photo: 'vikram.jpg', specialization: 'Washing Machine Repair', rating: 5, description: 'Experienced in washing machine repair', contact_info: '555-3030' },
    { name: 'Anjali Rao', photo: 'anjali.jpg', specialization: 'Microwave Oven Repair', rating: 4, description: 'Handles all microwave oven issues', contact_info: '555-4040' },
    { name: 'Rajesh Gupta', photo: 'rajesh.jpg', specialization: 'TV Repair Technician', rating: 5, description: 'TV repair specialist with years of experience', contact_info: '555-5050' }
];

// Sample data for locations
const locations = [
    { location_name: 'Mumbai' },
    { location_name: 'Delhi' },
    { location_name: 'Bangalore' },
    { location_name: 'Chennai' },
    { location_name: 'Kolkata' }
];

// Sample data for appliance types
const appliance_types = [
    { type_name: 'Refrigerator' },
    { type_name: 'Air Conditioner' },
    { type_name: 'Washing Machine' },
    { type_name: 'Microwave Oven' },
    { type_name: 'Television' }
];

// Insert sample data
db.serialize(() => {
    technicians.forEach(t => {
        db.run(`INSERT INTO technicians (name, photo, specialization, rating, description, contact_info) VALUES (?, ?, ?, ?, ?, ?)`,
            [t.name, t.photo, t.specialization, t.rating, t.description, t.contact_info]);
    });

    locations.forEach(l => {
        db.run(`INSERT INTO locations (location_name) VALUES (?)`, [l.location_name]);
    });

    appliance_types.forEach(a => {
        db.run(`INSERT INTO appliance_types (type_name) VALUES (?)`, [a.type_name]);
    });

    console.log('Database seeded successfully with Indian names');
});
