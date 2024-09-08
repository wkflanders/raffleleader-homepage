import React, { useState, useRef } from 'react';

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export default function FAQ({ faqs }: { faqs: FAQ[] }) {
  const [answerVisible, setAnswerVisible] = useState(Array(faqs.length).fill(false));
  const answersRef = useRef(new Array(faqs.length));

  const toggleAnswer = (index: number): void => {
    setAnswerVisible(current => {
      const newVisibility = [...current];
      newVisibility[index] = !newVisibility[index];
      return newVisibility;
    });
  };

  return (
    <div className='flex justify-center items-center'>
      <div className='mt-32 mb-32 mx-auto max-w-2xl divide-y divide-gray-900/10 dark:divide-gray-200/10 px-6 pb-8 sm:pb-24 sm:pt-12 lg:max-w-7xl lg:px-8 lg:py-32'>
        <div className='mx-auto max-w-2xl text-center'>
          <p className='mt-2 text-3xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white'>
            FAQ
          </p>
        </div>
        <dl className='mt-10 space-y-8 divide-y divide-gray-900/10 mt-20 lg:mt-24'>
          {faqs.map((faq, index) => (
            <div key={faq.id} className='pt-8'>
              <dt className='text-base text-gray-700 font-semibold leading-7 dark:text-white'>
                <button
                  type="button"
                  className="flex items-end text-2xl w-full text-left"
                  onClick={() => toggleAnswer(index)}
                >
                  <span
                    className={`transform transition-transform duration-300 text-3xl mr-4 ${
                      answerVisible[index] ? 'rotate-45' : 'rotate-0'
                    }`}
                  >
                    +
                  </span>
                  <span className=''>{faq.question}</span>
                </button>
              </dt>
              <dd
                className={`mt-2 overflow-hidden text-center transition-height duration-500 ease-in-out`}
                ref={el => answersRef.current[index] = el}
                style={{ height: answerVisible[index] ? `${answersRef.current[index]?.scrollHeight}px` : '0px' }}
              >
                <p className='text-base leading-7 text-gray-600 dark:text-white text-left'>
                  {faq.answer}
                  {index === 6 && (
                    <span>
                      {' '}
                      <a href='mailto:stephen@raffleleader.com' className='text-blue-500 underline'>
                        here
                      </a>.
                    </span>
                  )}
                </p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}