import { Textarea, Input, Button } from '@nextui-org/react';
import { useCallback, useState } from 'react';

const Question = ({ questionID }: { questionID: string }) => {
  return (
    <div className="flex flex-col items-start justify-center w-full gap-2">
      <Input
        type="text"
        label={`Question ${questionID}`}
        labelPlacement="outside"
        placeholder="Enter question"
      />
      <Textarea label="Answer" labelPlacement="outside" placeholder="Enter answer" />
    </div>
  );
};

const FAQ = () => {
  const [totalQuestions, setTotalQuestions] = useState(1);

  const handleAddQuestion = useCallback(() => {
    setTotalQuestions((prev) => prev + 1);
  }, [setTotalQuestions]);

  const handleDeleteQuestion = useCallback(() => {
    if (totalQuestions > 0) setTotalQuestions((prev) => prev - 1);
  }, [setTotalQuestions, totalQuestions]);

  return (
    <div className="flex flex-col items-start justify-center gap-2">
      {Array.from({ length: totalQuestions }).map((_, index) => (
        <Question key={index} questionID={(index + 1).toString()} />
      ))}

      <div className="flex items-center justify-start gap-2">
        <Button color="primary" variant="flat" onClick={handleAddQuestion}>
          Add Question
        </Button>
        <Button color="danger" variant="flat" onClick={handleDeleteQuestion}>
          Delete Question
        </Button>
      </div>
    </div>
  );
};
const TourAdditionalInfoForm = () => (
  <div className="flex flex-col gap-4">
    <p className="font-semibold text-md">Tour Additional Info</p>
    <div className="flex flex-col gap-2">
      <Textarea
        label="What's included"
        labelPlacement="outside"
        placeholder="Enter what's included"
      />
      <Textarea
        label="What's not Included"
        labelPlacement="outside"
        placeholder="Enter what's not included"
      />
      <div className="flex flex-col gap-3">
        <p className="font-semibold text-md">Frequently Asked Questions (FAQ)</p>
        <FAQ />
      </div>
    </div>
  </div>
);

export default TourAdditionalInfoForm;
