import React, { useEffect } from 'react';

export default function NotFound(): JSX.Element {
  useEffect(() => {
    document.title = '404 | Lisk Manager';
  }, []);

  return (
    <div className="container">
      <h5 className="text-muted text-center mt-5">404 Not Found</h5>
    </div>
  );
}
