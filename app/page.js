"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { firestore } from "@/firebase";
import styles from "./page.module.css";
import { Box, Typography, Modal, Stack, TextField, Button } from "@mui/material"
import { collection, deleteDoc, getDoc, getDocs, query, setDoc, doc } from "firebase/firestore";

export default function Home() {
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState('')

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data()})
    })
    setInventory(inventoryList)
  }

  useEffect(() => {
    updateInventory()
  }, [])

  const removeItems = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists())
    {
      const {quantity} = docSnap.data()
      if (quantity === 1)
      {
        await deleteDoc(docRef)
      }
      else {
        await setDoc(docRef, {quantity: quantity - 1})
      }
    }

    await updateInventory()
  }

  const addItems = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists())
    {
      const {quantity} = docSnap.data()
      await setDoc(docRef, {quantity: quantity + 1})
    }
    else {
      await setDoc(docRef, {quantity: 1})
    }

    await updateInventory()
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Box
    width="100vw"
    height= "100vh"
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    gap={2}
    >
      <Modal
      open={open}
      onClose={handleClose}
      >
        <Box
        position="absolute"
        top="50%"
        left="50%"
        width={400}
        bgcolor="white"
        border="2px solid black"
        boxShadow={24}
        p={4}
        display="flex"
        flexDirection="column"
        gap={3}
        sx={{
          transform: 'translate(-50%, -50%)'
        }}
        >
          <Typography variant="h6">Add Item</Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField
            variant="outlined"
            fullWidth
            value={itemName}
            onChange={(e) => {
              setItemName(e.target.value)
            }}
            />
            <Button variant="outlined" onClick={() => {
              addItems(itemName)
              setItemName('')
            }}

            >Add</Button>
          </Stack>
        </Box>

      </Modal>
      <Button variant="contained" onClick={() => {
        handleOpen()
      }}
      >
        Add New Item
      </Button>
      <Box
      width="50vw" height="100px" 
      bgcolor="#ADD8E6" 
      justifyContent="center"
      alignItems="center" 
      display="flex"
      borderRadius="50px">
        <Typography variant="h2">Inventory Items</Typography>
      </Box>
      <Stack 
      width="50vw" 
      direction="column" 
      height="450px" 
      border="2px solid black" 
      overflow="auto">
        {
          inventory.map(({name, quantity}) => (
            <Box key={name} width="100%" height="150px" display="flex"
            alignItems="center" justifyContent="space-between" bgcolor="#f0f0f0"
            p={5}>
              <Typography variant="h3" 
              color='#333' 
              textAlign="center"
              >{name.charAt(0).toUpperCase() + name.slice(1)}</Typography>
              <Typography variant="h4">{quantity}</Typography>
              <Stack display="flex" direction="row" spacing={2}>
              <Button variant="contained" onClick={()=> {
                addItems(name)
              }} > Add </Button>
              <Button variant="contained" onClick={() => {
                removeItems(name)
              }}>Remove</Button>
              </Stack>
            </Box>
          ))}
      </Stack>
    </Box>
  );
}
