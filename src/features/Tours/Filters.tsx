/* eslint-disable implicit-arrow-linebreak */
import { Button } from '@nextui-org/react';
import { useDispatch } from 'react-redux';
import { HiMiniArrowsUpDown } from 'react-icons/hi2';
import { MdDeleteForever } from 'react-icons/md';
import { useDisclosure } from '@nextui-org/react';
import { resetToursQueryString } from '../../redux/slices/filterToursSlice';
import TourFilterForm from './TourFilterForm';
import MobileViewModal from './MobileViewModal';

const Filters = () => {
  const dispatch = useDispatch();
  const disclosureProps = useDisclosure();
  const { onOpen } = disclosureProps;
  return (
    <>
      {/* Mobile view */}
      <div className="flex items-center justify-start gap-3 p-2 lg:hidden flex-wrap">
        <Button
          size="md"
          variant="solid"
          color="default"
          radius="full"
          onClick={(event) => {
            event.preventDefault();
            onOpen();
          }}
        >
          <HiMiniArrowsUpDown />
          <span className="-ml-1">Show filters</span>
        </Button>
        <Button
          size="md"
          variant="flat"
          color="warning"
          radius="full"
          onPress={() => dispatch(resetToursQueryString())}
        >
          <MdDeleteForever />
          <span className="-ml-1">Clear all filters</span>
        </Button>
        <MobileViewModal title="Available Filters" disclosureProps={disclosureProps}>
          <TourFilterForm />
        </MobileViewModal>
      </div>
      {/* Desktop view */}
      <div className="lg:flex lg:flex-col lg:gap-2 lg:p-3 hidden">
        <div className="sticky top-[80px]">
          <div className="flex items-center gap-2">
            <p className="text-lg font-bold">Filters</p>
            <Button
              variant="flat"
              color="warning"
              size="sm"
              onClick={() => dispatch(resetToursQueryString())}
            >
              Clear all filters
            </Button>
          </div>

          <TourFilterForm />
        </div>
      </div>
    </>
  );
};

export default Filters;
