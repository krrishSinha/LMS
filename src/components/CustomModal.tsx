import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'


export default function CustomModal({ open, setOpen, route,setRoute, component: Component, activeItem }: any) {

    return (
        <Modal
            open={open}
            onClose={()=>setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >

            <Box className='absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[400px] bg-white dark:bg-slate-900 rounded-lg shadow p-4 outline-none ' >
                <Component setOpen={setOpen} setRoute={setRoute} />
            </Box>
             

        </Modal>
    )

}