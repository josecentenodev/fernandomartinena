import { Stack, Text, Title, Button, Center } from "@mantine/core";
import { IconInbox } from "@tabler/icons-react";

interface EmptyStateProps {
 title: string;
 description: string;
 action?: () => void;
 actionLabel?: string;
}

const EmptyState = ({ title, description, action, actionLabel }: EmptyStateProps) => {
 return (
   <Center h="50vh">
     <Stack align="center" gap="xs">
       <IconInbox size={50} color="#CED4DA" stroke={1.5} />
       <Title order={3}>{title}</Title>
       <Text c="dimmed" size="sm" ta="center" maw={400}>
         {description}
       </Text>
       {action && actionLabel && (
         <Button onClick={action} variant="light" mt="md" color="dark">
           {actionLabel}
         </Button>
       )}
     </Stack>
   </Center>
 );
};

export default EmptyState;