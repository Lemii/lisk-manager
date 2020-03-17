import React, { useEffect } from 'react';

export default function Settings(): JSX.Element {
  useEffect(() => {
    document.title = 'Settings | Lisk Manager';
  }, []);

  return (
    <div className="container">
      <h5 className="text-muted text-center mt-5">Placeholder</h5>
    </div>
  );
}
