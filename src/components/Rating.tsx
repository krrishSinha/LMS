import React, { FC } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { BsStarHalf } from 'react-icons/bs';

type Props = {
  rating: number; // example: 3.5
};

const Ratings: FC<Props> = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<AiFillStar key={i} size={20} color="#f6b100" />);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(<BsStarHalf key={i} size={20} color="#f6b100" />);
    } else {
      stars.push(<AiOutlineStar key={i} size={20} color="#f6b100" />);
    }
  }

  return <div className="flex space-x-1">{stars}</div>;
};

export default Ratings;
