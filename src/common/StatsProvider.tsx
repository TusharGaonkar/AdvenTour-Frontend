// Using render prop pattern render stats data
import React from 'react';
import { useGetTourRatingDistributionQuery } from '../redux/slices/getTourReviewsSlice';

const StatsProvider = ({ tourID, children }: { tourID: string; children: React.FC<unknown> }) => {
  if (!children || !tourID) throw new Error('No children or tourID provided for StatsProvider');

  const statsFetchResponse = useGetTourRatingDistributionQuery(tourID);

  return <>{children(statsFetchResponse)}</>;
};

export default StatsProvider;
