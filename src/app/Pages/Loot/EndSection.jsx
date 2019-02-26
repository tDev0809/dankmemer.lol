import React from 'react';

export default React.memo(({ success, data }) => (
  <main className="content loot">
    <div className={`fancy-header absolute-unit${success ? '' : ' red'}`}>
      {success ? 'Success!' : 'Fucky wucky.'}
    </div>
    <div style={{ fontSize: '22px' }}>
      {
        success
          ? <>
              Your payment has successfully been made. Your boxes should be deposited directly into your inventory within 5 minutes of completing the purchase.<br />
              If they do not show up after 24 hours, join <a href="https://discord.gg/FnP8m6q">the support server</a> and mention a mod or a developer for assistance.<div className="divider" />
              Additionally, can find your Payment ID below.<br />You should store this ID somewhere and make sure you don't lose it - it is necessary if you are experiencing any problems.<br />
              <code style={{ fontSize: '32px' }}>{data.paymentID}</code>
            </ >
          : <>
              Something went wrong while trying to {data ? 'process' : 'create'} your payment.<br />
              Please join <a href="https://discord.gg/FnP8m6q">the support server</a> for help{data ? ' and contact an administrator with your Payment ID:' : '.'}<br />
              {
                data &&
                <code style={{ fontSize: '32px' }}>{data.paymentID}</code>
              }
            </>
      }
    </div>
  </main>
));
