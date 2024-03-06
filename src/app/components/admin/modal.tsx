import React from 'react'
import ReactModal from 'react-modal'

interface IModal {
    open: boolean
    onRequestClose?: VoidFunction
    children: React.ReactNode
}

const Modal: React.FC<IModal> = ({ open, onRequestClose, children }) => {
    return (
        <ReactModal isOpen={open} onRequestClose={onRequestClose} style={{
            overlay: { backgroundColor: '#00000052', display: 'flex', justifyContent: 'center', alignItems: 'center' },
            content: { backgroundColor: '#FFFFFF', padding: 24, borderRadius: 10, boxShadow: '0px 12px 30px #1973FA14', width: 384, position: 'relative', display: 'flex', flexDirection: 'column', gap:16, color:'#000000DE', inset:0 }
        }}>
            {children}
        </ReactModal>
    )
}

export default Modal