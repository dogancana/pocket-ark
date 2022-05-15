import React from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
export type FC<P = {}> = React.FC<P & { children?: React.ReactNode }>;
