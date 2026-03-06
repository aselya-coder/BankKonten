import { mockCmsData } from '../data/mockContent';

// In a real SaaS app, this service would fetch data from a backend API.
// For now, it simulates fetching data from our mock data file.

const fetchAllContent = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 50)); 
  return mockCmsData;
};

export const contentService = {
  fetchAllContent,
};
