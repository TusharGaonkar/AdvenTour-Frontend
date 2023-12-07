export default function customApiQueryBuilder(obj: Record<string, any>) {
  const queryString = [];

  if (obj.searchToursString && obj.searchToursString.length > 0) {
    queryString.push(`search=${obj.searchToursString}`);
  }

  if (obj.priceInRupees && obj.priceInRupees.length === 2) {
    queryString.push(
      `priceInRupees[gte]=${obj.priceInRupees[0]}&priceInRupees[lte]=${obj.priceInRupees[1]}`
    );
  }

  const selectedDifficulty = Object.entries(obj.tourDifficulty)
    .filter(([, isSelected]) => isSelected)
    .map(([difficulty]) => difficulty);
  if (selectedDifficulty.length > 0) {
    queryString.push(`tourDifficulty[in]=${selectedDifficulty.join(',')}`);
  }

  const selectedDays = Object.entries(obj.tourDurationInDays)
    .filter(([day, isSelected]) => isSelected && day !== '4')
    .map(([day]) => day);
  if (selectedDays.length > 0) {
    queryString.push(`tourDurationInDays[in]=${selectedDays.join(',')}`);
  }

  if (obj.tourDurationInDays['4']) {
    queryString.push('tourDurationInDays[gte]=4');
  }

  const selectedAgeGroups = Object.entries(obj.ageGroup)
    .filter(([, isSelected]) => isSelected)
    .map(([ageGroup]) => ageGroup);

  if (selectedAgeGroups.length > 0) {
    const ageGroupMap = {
      Children: 12,
      Teenagers: 18,
      Adults: 65,
      Seniors: 100,
    };
    const ageKeys = selectedAgeGroups.map((age) => ageGroupMap[age]);
    const maxAge = Math.max(...ageKeys);
    queryString.push(`ageGroups.maxAge[lte]=${maxAge}`);
  }

  if (obj.tourRating !== null) {
    queryString.push(`tourRating[gte]=${obj.tourRating}`);
  }

  if (obj.getNearbyTours) {
    const [longitude, latitude] = obj.getNearbyTours;
    if (latitude && longitude)
      queryString.push(
        `getNearbyTours[latitude]=${latitude}&getNearbyTours[longitude]=${longitude}`
      );
  }

  if (obj.tourGroupSize) {
    queryString.push(`tourMaxCapacity[gte]=${obj.tourGroupSize}`);
  }

  if (obj.tourStartDate) {
    queryString.push(`tourStartDates[eq]=${obj.tourStartDate}`);
  }

  return queryString.join('&');
}
