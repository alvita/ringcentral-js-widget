import React, { PropTypes } from 'react';
import 'core-js/fn/array/find';
import Header from '../Header';
import Panel from '../Panel';
import SpinnerOverlay from '../SpinnerOverlay';
import CallList from '../CallList';

import styles from './styles.scss';


export default function CallsPanel({
  currentLocale,
  calls,
  areaCode,
  countryCode,
  onViewContact,
  onLogCall,
  isLoggedContact,
  disableLinks,
  dateTimeFormatter,
  showSpinner,
  title,
  active,
  loggingMap,
}) {
  const content = showSpinner ?
    <SpinnerOverlay /> :
    (
      <CallList
        currentLocale={currentLocale}
        calls={calls}
        areaCode={areaCode}
        countryCode={countryCode}
        onViewContact={onViewContact}
        onLogCall={onLogCall}
        isLoggedContact={isLoggedContact}
        disableLinks={disableLinks}
        dateTimeFormatter={dateTimeFormatter}
        active={active}
        loggingMap={loggingMap}
      />
    );
  return (
    <div className={styles.root}>
      <Header>
        {title}
      </Header>
      <Panel className={styles.content}>
        {content}
      </Panel>
    </div>
  );
}

CallsPanel.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  calls: PropTypes.arrayOf(PropTypes.any).isRequired,
  areaCode: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  onViewContact: PropTypes.func,
  onLogCall: PropTypes.func,
  isLoggedContact: PropTypes.func,
  disableLinks: PropTypes.bool.isRequired,
  dateTimeFormatter: PropTypes.func.isRequired,
  showSpinner: PropTypes.bool,
  title: PropTypes.string,
  active: PropTypes.bool,
  loggingMap: PropTypes.object,
};

CallsPanel.defaultProps = {
  onViewContact: undefined,
  onLogCall: undefined,
  showSpinner: false,
  title: '',
  active: false,
  loggingMap: {},
};
