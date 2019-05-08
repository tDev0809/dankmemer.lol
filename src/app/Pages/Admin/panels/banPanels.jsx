import React from 'react';
import GenericBanPanel from './GenericBanPanel';

export default [
  React.memo(() => (
    <GenericBanPanel
      title='Ban User'
      buttonText='Hammer'
      getEndpoint={() => '/ban'}
      finish={({ type, id }) => (
        alert(`Successfully ${type} banned ${id}`)
      )}
    />
  )),
  React.memo(() => (
    <GenericBanPanel
      title='Unban User'
      buttonText='Unhammer'
      getEndpoint={() => '/unban'}
      finish={({ type, id }) => (
        alert(`Successfully ${type} unbanned ${id}`)
      )}
    />
  )),
  React.memo(() => (
    <GenericBanPanel
      title='Check User Ban'
      buttonText='Check'
      options={['any']}
      getFetchParams={() => ({ method: 'GET' })}
      getEndpoint={({ type, id }) => `/checkBan?type=${type}&id=${id}`}
      finish={async ({ id }, res) => {
        const bans = await res.json();

        if (!bans[0]) {
          return alert(`${id} is a good boye and has no bans`);
        } else {
          alert(`${id} has the following bans:\n\n${bans.join('\n')}`);
        } 
      }}
    />
  ))
];
