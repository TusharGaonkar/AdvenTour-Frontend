interface IAdventourApiQueryClientQuery {
  addSearchQuery(): this;
  addPriceQuery(): this;
  addDifficultyQuery(): this;
  addDurationQuery(): this;
  addAgeGroupsQuery(): this;
  addRatingQuery(): this;
  addNearbyToursQuery(): this;
  addGroupSizeQuery(): this;
  addStartDateQuery(): this;
  addTourCategoryQuery(): this;
  buildQuery(): string;
}

// A custom implementation of query builder for Adventour api
class AdventourApiClientQuery implements IAdventourApiQueryClientQuery {
  protected query: string[];

  protected queryObj: Record<string, unknown>;

  constructor(filterConfig: Record<string, unknown>) {
    this.query = [];
    this.queryObj = JSON.parse(JSON.stringify(filterConfig)); // deep copy
  }

  addSearchQuery() {
    if (this.queryObj.searchToursString && (this.queryObj.searchToursString as string).length > 0) {
      this.query.push(`search=${this.queryObj.searchToursString}`);
    }

    return this;
  }

  addPriceQuery() {
    if (this.queryObj.priceInRupees && (this.queryObj.priceInRupees as number[]).length === 2) {
      this.query.push(
        `priceInRupees[gte]=${this.queryObj.priceInRupees[0]}&priceInRupees[lte]=${this.queryObj.priceInRupees[1]}`
      );
    }
    return this;
  }

  addDifficultyQuery() {
    const selectedDifficulty = Object.entries(
      this.queryObj.tourDifficulty as Record<string, boolean>
    )
      .filter(([, isSelected]) => isSelected)
      .map(([difficulty]) => difficulty);

    if (selectedDifficulty.length > 0) {
      this.query.push(`tourDifficulty[in]=${selectedDifficulty.join(',')}`);
    }

    return this;
  }

  addDurationQuery() {
    const selectedDays = Object.entries(this.queryObj.tourDurationInDays as Record<string, boolean>)
      .filter(([day, isSelected]) => isSelected && day !== '4')
      .map(([day]) => day);

    if (selectedDays.length > 0) {
      this.query.push(`tourDurationInDays[in]=${selectedDays.join(',')}`);
    }

    if ((this.queryObj.tourDurationInDays as Record<string, boolean>)['4']) {
      this.query.push('tourDurationInDays[gte]=4');
    }

    return this;
  }

  addAgeGroupsQuery() {
    // array of selected age groups
    const selectedAgeGroups = Object.entries((this.queryObj as Record<string, boolean>).ageGroup)
      .filter(([, isSelected]) => isSelected)
      .map(([ageGroup]) => ageGroup);

    if (selectedAgeGroups.length > 0) {
      const ageGroupMap = {
        Children: { minAge: 0, maxAge: 11 },
        Teenagers: { minAge: 12, maxAge: 17 },
        Adults: { minAge: 18, maxAge: 64 },
        Seniors: { minAge: 65, maxAge: 100 },
      };

      const ageRanges = selectedAgeGroups.map((age) => ageGroupMap[age]);

      const minAges = ageRanges.map((range) => range.minAge);
      const maxAges = ageRanges.map((range) => range.maxAge);

      const minMinAges = Math.min(...minAges);
      const maxMaxAges = Math.max(...maxAges);

      this.query.push(`ageGroups.minAge[gte]=${minMinAges}`);
      this.query.push(`ageGroups.maxAge[lte]=${maxMaxAges}`);
    }

    return this;
  }

  addRatingQuery() {
    if (this.queryObj.tourRating !== null) {
      this.query.push(`ratingsAverage[gte]=${this.queryObj.tourRating}`);
    }

    return this;
  }

  addNearbyToursQuery() {
    if (this.queryObj.getNearbyTours) {
      const [longitude, latitude] = this.queryObj.getNearbyTours;
      if (latitude && longitude) {
        this.query.push(
          `getNearbyTours[latitude]=${latitude}&getNearbyTours[longitude]=${longitude}`
        );
      }
    }

    return this;
  }

  addGroupSizeQuery() {
    if (this.queryObj.tourGroupSize) {
      this.query.push(`maxPeoplePerBooking[gte]=${this.queryObj.tourGroupSize}`);
    }

    return this;
  }

  addStartDateQuery() {
    if (this.queryObj.tourStartDate) {
      this.query.push(`tourStartDates[eq]=${this.queryObj.tourStartDate}`);
    }

    return this;
  }

  addTourCategoryQuery() {
    const selectedTourCategories = this.queryObj.tourCategory as Array<string>;

    if (selectedTourCategories.length > 0) {
      this.query.push(`tourCategory[in]=${selectedTourCategories.join(',')}`);
    }

    return this;
  }

  buildQuery() {
    return this.query.join('&');
  }
}

// Query builder to abstract the query building process
const AdventourApiClientQueryBuilder = (filterConfigFromRedux: Record<string, unknown>) => {
  const query = new AdventourApiClientQuery(filterConfigFromRedux)
    .addAgeGroupsQuery()
    .addDifficultyQuery()
    .addDurationQuery()
    .addGroupSizeQuery()
    .addNearbyToursQuery()
    .addPriceQuery()
    .addRatingQuery()
    .addSearchQuery()
    .addStartDateQuery()
    .addTourCategoryQuery()
    .buildQuery();

  return query;
};

export default AdventourApiClientQueryBuilder;
