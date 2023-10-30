import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react'
import React from 'react'

function ConfirmationModal({title, question, mainFunction, data, open}) {
  return (
    <Dialog open={open} size={"xs"} >
    <DialogHeader>{title}</DialogHeader>
    <DialogBody divider>
      {question}
    </DialogBody>
    <DialogFooter>
      <Button
        variant="text"
        color="gray"
        onClick={() => open()}
        className="mr-1"
      >
        <span>Cancel</span>
      </Button>
      <Button
        variant="gradient"
        color="red"
        onClick={() => {mainFunction(data); open();}}
      >
        <span>Confirm</span>
      </Button>
    </DialogFooter>
  </Dialog>
  )
}

export default ConfirmationModal
