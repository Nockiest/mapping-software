import React from 'react'
import { createBoard } from '@wixc3/react-board';

export default createBoard({
    name: 'Test',
    Board: () => <div></div>,
    isSnippet: true,
});
