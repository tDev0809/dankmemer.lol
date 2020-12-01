import React from 'react';
import GenericBanPanel from './GenericBanPanel';

export default [
  React.memo(() => (
    <GenericBanPanel
      title='Ban User'
      buttonText='Hammer'
      getEndpoint={() => '/ban'}
      finish={({ dropdownVal, textVal }) => (
        alert(`Successfully ${dropdownVal} banned ${textVal}`)
      )}
    />
  )),
  React.memo(() => (
    <GenericBanPanel
      title='Unban User'
      buttonText='Unhammer'
      getEndpoint={() => '/unban'}
      finish={({ dropdownVal, textVal }) => (
        alert(`Successfully ${dropdownVal} unbanned ${textVal}`)
      )}
    />
  )),
  React.memo(() => (
    <GenericBanPanel
      title='Check User Ban'
      buttonText='Check'
      options={['any']}
      getFetchParams={() => ({ method: 'GET' })}
      getEndpoint={({ dropdownVal, textVal }) => `/checkBan?type=${dropdownVal}&id=${textVal}`}
      finish={async ({ textVal }, res) => {
        const bans = await res.json();

        if (!bans[0]) {
          return alert(`${textVal} is a good boye and has no bans`);
        } else {
          alert(`${textVal} has the following bans:\n\n${bans.join('\n')}`);
        } 
      }}
    />
  ))
];
