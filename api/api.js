export const fetchJobs = async () => {
  try {
    const response = await fetch('https://testapi.getlokalapp.com/common/jobs?page=1');
    const data = await response.json();
    return data.results.map(job => ({
      id: job.id,
      title: job.title,
      primary_details: job.primary_details,
      phone:job.whatsapp_no,
      creatives: job.creatives,
    }));
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw new Error('Failed to fetch jobs');
  }
};

