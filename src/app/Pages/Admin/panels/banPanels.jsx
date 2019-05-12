import React from 'react';
import GenericBanPanel from './GenericBanPanel';

export default [
  React.memo(() => (
    <GenericBanPanel
      title='Ban User'
      buttonText='Hammer'
      getEndpoint={() => '/ban'}
      finish={({ dropdownValue, textValue }) => (
        alert(`Successfully ${dropdownValue} banned ${textValue}`)
      )}
    />
  )),
  React.memo(() => (
    <GenericBanPanel
      title='Unban User'
      buttonText='Unhammer'
      getEndpoint={() => '/unban'}
      finish={({ dropdownValue, textValue }) => (
        alert(`Successfully ${dropdownValue} unbanned ${textValue}`)
      )}
    />
  )),
  React.memo(() => (
    <GenericBanPanel
      title='Check User Ban'
      buttonText='Check'
      options={['any']}
      getFetchParams={() => ({ method: 'GET' })}
      getEndpoint={({ dropdownValue, textValue }) => `/checkBan?type=${dropdownValue}&id=${textValue}`}
      finish={async ({ textValue }, res) => {
        const bans = await res.json();

        if (!bans[0]) {
          return alert(`${textValue} is a good boye and has no bans`);
        } else {
          alert(`${textValue} has the following bans:\n\n${bans.join('\n')}`);
        } 
      }}
    />
  ))
];
