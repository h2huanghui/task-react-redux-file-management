import React from 'react';
import DialogCreateFolder from './CreateFolder';
import DialogRename from './Rename';

function Dialogs(props) {
    return (
        <div className="Dialogs">
            <DialogCreateFolder />
            <DialogRename />
        </div>
    );
}

export default Dialogs;
