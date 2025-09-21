import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface Client {
  user_id: string;
  email: string;
  full_name: string;
}

interface ClientMessageFormProps {
  client: Client;
}

const ClientMessageForm: React.FC<ClientMessageFormProps> = ({ client }) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('general');
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const messageTemplates = {
    general: {
      subject: 'Update from Math in Motion',
      message: `Hi ${client.full_name || 'there'},\n\nI hope this message finds you well.\n\nBest regards,\nMath in Motion Team`
    },
    project_update: {
      subject: 'Project Update',
      message: `Hi ${client.full_name || 'there'},\n\nWe have an update regarding your animation project.\n\nBest regards,\nMath in Motion Team`
    },
    payment_reminder: {
      subject: 'Payment Reminder',
      message: `Hi ${client.full_name || 'there'},\n\nThis is a friendly reminder about your pending payment.\n\nBest regards,\nMath in Motion Team`
    },
    project_completion: {
      subject: 'Project Completed',
      message: `Hi ${client.full_name || 'there'},\n\nGreat news! Your animation project has been completed.\n\nBest regards,\nMath in Motion Team`
    }
  };

  const handleTemplateChange = (template: string) => {
    setMessageType(template);
    const templateData = messageTemplates[template as keyof typeof messageTemplates];
    setSubject(templateData.subject);
    setMessage(templateData.message);
  };

  const handleSendMessage = async () => {
    if (!subject.trim() || !message.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in both subject and message",
        variant: "destructive",
      });
      return;
    }

    setSending(true);
    try {
      // In a real app, this would send an email via an API
      // For now, we'll simulate sending and show success
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message Sent",
        description: `Message sent successfully to ${client.email}`,
      });

      // Reset form
      setSubject('');
      setMessage('');
      setMessageType('general');
    } catch (error) {
      toast({
        title: "Send Failed",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="template">Message Template</Label>
        <Select value={messageType} onValueChange={handleTemplateChange}>
          <SelectTrigger>
            <SelectValue placeholder="Choose a template" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="general">General Message</SelectItem>
            <SelectItem value="project_update">Project Update</SelectItem>
            <SelectItem value="payment_reminder">Payment Reminder</SelectItem>
            <SelectItem value="project_completion">Project Completion</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Enter subject"
        />
      </div>

      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
          rows={6}
        />
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Sending to: {client.email}
        </p>
        <Button onClick={handleSendMessage} disabled={sending}>
          {sending ? 'Sending...' : 'Send Message'}
        </Button>
      </div>
    </div>
  );
};

export default ClientMessageForm;