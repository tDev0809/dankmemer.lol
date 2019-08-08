navigator.serviceWorker.getRegistrations()
  .then(registrations =>
    registrations.map(registration =>
      registration.unregister()
    )
  );
