import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../Context/ChatContext";
import { db } from "../firebase";
import Massage from "./Massage";
import { Box } from "@mui/material";

const Massages = () => {
	const [messages, setMessages] = useState([]);
	const { data } = useContext(ChatContext);

	useEffect(() => {
		const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
			doc.exists() && setMessages(doc.data().messages);
		});

		return () => {
			unSub();
		};
	}, [data.chatId]);

	return (
		<Box
			sx={{
				overflowY: "scroll",
				backgroundColor: "#ede7f6",
				height: "80vh"
			}}
		>
			{messages.map((m) => (
				<Massage message={m} key={m.id} />
			))}
		</Box>
	);
};

export default Massages;
