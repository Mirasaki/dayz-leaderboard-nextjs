// React Bootstrap
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import React from 'react';

const MouseOverTooltip = ({ tooltip, children }) => {
  return (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip id="query-tooltip">{tooltip}</Tooltip>}
    >
      {({ ref, ...triggerHandler }) => (
        <Button
          variant="outline-light"
          {...triggerHandler}
          className="d-inline-flex align-items-center"
          style={{
            marginRight: '.2em',
            border: 'none',
            fontSize: '135%'
          }}
        >
          <div ref={ref}>
            {children}
          </div>
        </Button>
      )}
    </OverlayTrigger>
  );
};

MouseOverTooltip.propTypes = {
  tooltip: PropTypes.object,
  children: PropTypes.object
};

export default MouseOverTooltip;
