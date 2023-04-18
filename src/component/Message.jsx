import React from "react";
import { HStack, Text, Avatar } from "@chakra-ui/react";

const Message = ({ text, uri, user = "other" }) => {
    return (
        <HStack
            alignSelf={user === "me" ? "flex-end" : "flex-start"}
            borderRadius={"3"}
            bg={"gray"}
            padding={"2"}
            paddingY={"2"}
        >
            <Text>{text}</Text>
            <Avatar href={uri} />
        </HStack>
    );
};

export default Message;
