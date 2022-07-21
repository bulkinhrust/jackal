import React, { useRef } from 'react';

import classes from './Pirate.module.scss';
import { useIslandContext } from '../../context/IslandContext';
import { PirateType } from '../../types/Pirate';

type Props = {
  pirate: PirateType;
};

const Pirate: React.FC<Props> = (props) => {
  const { pirate } = props;
  const { activePirate, setActivePirate } = useIslandContext();
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (activePirate !== pirate.name && ref.current) {
      ref.current.focus();
    }
    setActivePirate?.(activePirate === pirate.name ? undefined : pirate.name);
  };

  const onBlur = () => {
    setActivePirate(undefined);
  };

  return (
    <div
      id={pirate.name}
      tabIndex={0}
      ref={ref}
      className={classes.component}
      onClick={handleClick}
      onBlur={onBlur}
    >
      <svg width="50" height="52" viewBox="0 0 50 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M24.0919 1.03638C21.8313 1.31863 19.959 2.19786 18.4011 3.70876C17.1605 4.91177 16.2524 6.45759 15.7931 8.14825C15.4647 9.35654 15.4646 11.7787 15.7929 12.9303C16.0952 13.9909 16.7007 15.2822 17.2782 16.0978C17.8473 16.9016 19.1005 18.1595 19.4102 18.2379C19.5927 18.284 19.6299 18.3504 19.5938 18.5657C18.9015 22.6889 18.666 23.8727 18.0212 26.4697C17.0547 30.3624 15.1545 36.0959 13.4809 40.1689L13.2471 40.7379L12.289 40.8509C10.6742 41.0413 9.40542 41.887 8.73864 43.2175C8.28618 44.1202 8.21912 44.7286 8.25416 47.6141L8.28598 50.2336L8.66643 50.6168L9.04678 51H25.0009H40.955L41.3354 50.6168L41.7159 50.2336L41.7459 47.5775C41.779 44.6625 41.7242 44.179 41.2535 43.2297C40.5815 41.8743 39.3446 41.0432 37.7128 40.8509L36.7547 40.7379L36.5209 40.1689C34.8474 36.0959 32.9471 30.3624 31.9806 26.4697C31.3358 23.8727 31.1003 22.6889 30.4081 18.5657C30.371 18.345 30.4084 18.2842 30.6131 18.2324C31.009 18.1322 32.3336 16.7908 32.925 15.8909C33.5277 14.9741 33.8769 14.1947 34.2138 13.0152C34.4085 12.3335 34.4404 11.9867 34.4358 10.5911C34.4298 8.70848 34.2661 7.92137 33.5806 6.47611C32.6191 4.44915 30.9364 2.7703 28.9617 1.86797C27.6358 1.26214 25.3754 0.876071 24.0919 1.03638Z"
          fill="black"
          stroke={activePirate === pirate.name ? '#4DC868' : '#fff'}
          strokeWidth="2"
        />
      </svg>

    </div>
  );
};

export default Pirate;
