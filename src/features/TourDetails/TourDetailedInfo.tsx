import { Accordion, AccordionItem, Chip } from '@nextui-org/react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { RiCheckboxCircleLine } from 'react-icons/ri';

const TourDetailedInfo = ({ tour }: { tour: Record<string, unknown> }) => (
  <Accordion variant="splitted" selectionMode="multiple">
    <AccordionItem
      key="1"
      aria-label="Accordion 1"
      title="What's included"
      className="font-semibold "
    >
      <div className="flex flex-col gap-3">
        {(tour.whatsIncluded as string[]).map((item: string) => (
          <Chip
            key={item}
            color="success"
            variant="flat"
            startContent={<RiCheckboxCircleLine className="text-2xl" />}
          >
            {item}
          </Chip>
        ))}
      </div>
    </AccordionItem>
    <AccordionItem
      key="2"
      aria-label="Accordion 2"
      title="What's not included"
      className="font-semibold"
    >
      <div className="flex flex-col gap-2">
        {(tour.whatsNotIncluded as string[]).map((item: string) => (
          <Chip
            key="item"
            color="danger"
            variant="flat"
            startContent={<IoIosCloseCircleOutline className="text-2xl" />}
          >
            {item}
          </Chip>
        ))}
      </div>
    </AccordionItem>
    <AccordionItem
      key="3"
      aria-label="Accordion 3"
      title="Additional information"
      className="font-semibold"
    >
      <p className="font-normal">{tour.additionalInformation as string}</p>
    </AccordionItem>
    <AccordionItem key="5" aria-label="Accordion 3" title="FAQ" className="font-semibold">
      <div className="flex flex-col gap-4">
        {(tour.FAQ as { question: string; answer: string }[]).map(({ question, answer }, index) => (
          <div className="flex flex-col gap-1" key={question}>
            <p className="font-semibold">{`${index + 1}. ${question}`}</p>
            <p className="font-normal">{answer}</p>
          </div>
        ))}
      </div>
    </AccordionItem>
    <AccordionItem
      key="4"
      aria-label="Accordion 3"
      title="Cancellation policy"
      className="font-semibold"
    >
      <p className="font-normal">{tour.cancellationPolicy as string}</p>
    </AccordionItem>
  </Accordion>
);

export default TourDetailedInfo;
