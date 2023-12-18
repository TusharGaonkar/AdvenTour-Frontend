/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
import { Textarea, Input, Button } from '@nextui-org/react';
import { useCallback, useEffect, useState } from 'react';
import { FieldErrors, UseFormGetValues, UseFormRegister } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ContributeTourFormSchemaType } from '../../validators/ContributeTourFormValidator';
import {
  addQuestion,
  deleteQuestion,
  updateQuestion,
  updateAnswer,
} from '../../redux/slices/FAQSlice';

const Question = ({
  index,
  question,
  answer,
  handleUpdateQuestion,
  handleUpdateAnswer,
}: {
  index: number;
  question: string;
  answer: string;
  handleUpdateQuestion: (index: number, value: string) => void;
  handleUpdateAnswer: (index: number, value: string) => void;
}) => {
  const maxQuestionLength = 200;
  const maxAnswerLength = 500;

  const handleQuestionInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.value.length <= maxQuestionLength) {
      handleUpdateQuestion(index, event.target.value);
    }
  };

  const handleAnswerInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.value.length <= maxAnswerLength) {
      handleUpdateAnswer(index, event.target.value);
    }
  };

  return (
    <div className="flex flex-col items-start justify-center w-full gap-2">
      <Input
        type="text"
        label={`Question ${index + 1}`}
        labelPlacement="outside"
        placeholder="Enter question"
        defaultValue={question}
        onChange={handleQuestionInputChange}
        value={question}
      />
      <p className="text-sm text-slate-400">{`${question.length}/${maxQuestionLength}`}</p>
      <Textarea
        label="Your answer"
        labelPlacement="outside"
        placeholder="Enter answer"
        onChange={handleAnswerInputChange}
        defaultValue={answer}
        value={answer}
      />
      <p className="text-sm text-slate-400">{`${answer.length}/${maxAnswerLength}`}</p>
    </div>
  );
};

const FAQ = () => {
  const FAQList = useSelector(
    (state: { FAQList: { question: string; answer: string }[]; [key: string]: unknown }) =>
      state.FAQList
  );

  const dispatch = useDispatch();

  const handleAddQuestion = useCallback(() => {
    dispatch(addQuestion());
  }, []);

  const handleDeleteQuestion = useCallback(() => {
    if (FAQList.length > 0) {
      dispatch(deleteQuestion());
    }
  }, []);

  const handleUpdateQuestion = useCallback((index: number, value: string) => {
    dispatch(updateQuestion({ index, value }));
  }, []);

  const handleUpdateAnswer = useCallback((index: number, value: string) => {
    dispatch(updateAnswer({ index, value }));
  }, []);

  return (
    <div className="flex flex-col items-start justify-center gap-2">
      {FAQList.map(({ question, answer }, index) => (
        <Question
          key={index}
          index={index}
          question={question}
          answer={answer}
          handleUpdateQuestion={handleUpdateQuestion}
          handleUpdateAnswer={handleUpdateAnswer}
        />
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

const TourAdditionalInfoForm = ({
  register,
  errors,
  getValues,
}: {
  register: UseFormRegister<ContributeTourFormSchemaType>;
  errors: FieldErrors<ContributeTourFormSchemaType>;
  getValues: UseFormGetValues<ContributeTourFormSchemaType>;
}) => (
  <div className="flex flex-col gap-4">
    <p className="font-semibold text-md">Tour Additional Info</p>
    <div className="flex flex-col gap-2">
      <Textarea
        label="What's included"
        labelPlacement="outside"
        placeholder="Enter what's included"
        {...register('whatsIncluded')}
        isInvalid={!!errors.whatsIncluded}
        errorMessage={errors.whatsIncluded?.message}
        defaultValue={getValues('whatsIncluded') || ''}
      />
      <Textarea
        label="What's not Included"
        labelPlacement="outside"
        placeholder="Enter what's not included"
        {...register('whatsNotIncluded')}
        isInvalid={!!errors.whatsNotIncluded}
        errorMessage={errors.whatsNotIncluded?.message}
        defaultValue={getValues('whatsNotIncluded') || ''}
      />
      <div className="flex flex-col gap-3">
        <p className="font-semibold text-md">Frequently Asked Questions (FAQ)</p>
        <FAQ />
      </div>
    </div>
  </div>
);

export default TourAdditionalInfoForm;
