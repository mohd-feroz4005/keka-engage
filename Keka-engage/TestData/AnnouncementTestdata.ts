export const TEST_ANNOUNCEMENT = {
  title: 'Test Announcement',
  taguser: '@aarthi',
  tagusername: 'Aarthi Mupp',
  description: 'Sample announcement description',
  department: 'Engineering',
  longTitle: 'A'.repeat(201), // Exceeds 200 character limit
  endDate: new Date().toISOString().split('T')[0] // Format: YYYY-MM-DD
  
};
