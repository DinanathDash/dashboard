import { useState } from 'react';
import { format } from "date-fns";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { AddEventDialog } from '@/components/dashboard/AddEventDialog';
import { Badge } from '@/components/ui/badge';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface Event {
  id: string;
  title: string;
  date: Date;
  type: 'meeting' | 'deadline' | 'reminder';
}

// Update initial events to use current date instead of hardcoded dates
const today = new Date();
const initialEvents: Event[] = [
  { id: '1', title: 'Team Meeting', date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3), type: 'meeting' },
  { id: '2', title: 'Project Deadline', date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2), type: 'deadline' },
  { id: '3', title: 'Client Call', date: today, type: 'meeting' },
  { id: '4', title: 'Review Progress', date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7), type: 'reminder' },
  { id: '5', title: 'Team Lunch', date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4), type: 'meeting' },
];

// Helper function to determine event type variant and gradient for badge
const getEventTypeInfo = (type: string) => {
  switch (type) {
    case 'meeting':
      return {
        variant: 'default' as const,
        gradient: 'from-blue-500 to-indigo-500 dark:from-blue-600 dark:to-indigo-700'
      };
    case 'deadline':
      return {
        variant: 'destructive' as const,
        gradient: 'from-red-500 to-rose-500 dark:from-red-600 dark:to-rose-700'
      };
    case 'reminder':
      return {
        variant: 'secondary' as const,
        gradient: 'from-purple-500 to-violet-500 dark:from-purple-600 dark:to-violet-700'
      };
    default:
      return {
        variant: 'outline' as const,
        gradient: 'from-gray-400 to-gray-500 dark:from-gray-500 dark:to-gray-600'
      };
  }
};

export default function Calendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<Event[]>(initialEvents);
  
  const eventsForSelectedDate = events.filter(
    (event) => date && event.date.toDateString() === date.toDateString()
  );

  // Function to add a new event
  const addEvent = (newEvent: Event) => {
    setEvents([...events, newEvent]);
  };

  // Function to delete an event
  const deleteEvent = (id: string) => {
    setEvents(events.filter(e => e.id !== id));
  };

  return (
    <div className="flex-1 space-y-6 p-4">
      <div className="flex items-end justify-end mb-6">
        <AddEventDialog onAddEvent={addEvent} selectedDate={date} />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Calendar */}
        <Card className="border-border shadow-sm dark:shadow-none dark:bg-card/95">
          <CardHeader className="pb-3 border-b border-border/10 space-y-1.5">
            <CardTitle className="text-xl font-semibold text-foreground">Calendar</CardTitle>
            <CardDescription className="text-muted-foreground">Plan your schedule and view upcoming events</CardDescription>
          </CardHeader>
          <CardContent className='items-center justify-center'>
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border border-border/20 p-3 shadow-sm bg-gradient-to-br from-background to-background/95 dark:from-background/95 dark:to-background/90"
              modifiers={{
                today: (day: Date) => 
                  day.toDateString() === new Date().toDateString(),
                hasEvent: (day: Date) => 
                  events.some(event => event.date.toDateString() === day.toDateString())
              }}
              modifiersStyles={{
                selected: {
                  backgroundColor: '#2573eb', // Blue-600 for consistent color
                  color: 'white',
                  fontWeight: '500',
                  borderRadius: '6px'
                },
                today: {
                  border: '1px solid #d4d4d8', // Zinc-300
                  borderRadius: '6px'
                },
                hasEvent: {
                  position: 'relative'
                }
              }}
            />
          </CardContent>
        </Card>
        
        {/* Events for Selected Date */}
        <Card className="border-border shadow-sm dark:shadow-none dark:bg-card/95">
          <CardHeader className="pb-3 border-b border-border/10 space-y-1.5 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold text-foreground">
                Events for {date ? format(date, "MMMM d, yyyy") : "Selected Date"}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {eventsForSelectedDate.length === 0 
                  ? "No events scheduled" 
                  : `${eventsForSelectedDate.length} event${eventsForSelectedDate.length === 1 ? '' : 's'} scheduled`
                }
              </CardDescription>
            </div>
            <AddEventDialog onAddEvent={addEvent} selectedDate={date} />
          </CardHeader>
          <CardContent className="pt-4">
            {eventsForSelectedDate.length > 0 ? (
              <ul className="space-y-3">
                {eventsForSelectedDate.map(event => {
                  const typeInfo = getEventTypeInfo(event.type);
                  
                  return (
                    <li key={event.id}>
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <div className="flex items-center justify-between p-3 border border-border/30 rounded-md cursor-pointer hover:shadow-sm transition-all duration-200 hover:border-primary/40 group bg-background/50 dark:bg-card/90">
                            <div className="flex items-center gap-3">
                              <Badge variant={typeInfo.variant} className={`bg-gradient-to-r ${typeInfo.gradient} text-white`}>
                                {event.type}
                              </Badge>
                              <span className="font-medium group-hover:text-primary/90 transition-colors">{event.title}</span>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="h-8 text-xs px-2.5 hover:bg-muted/70">Edit</Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 text-xs px-2.5 hover:bg-destructive/10 hover:text-destructive dark:hover:bg-destructive/20" 
                                onClick={() => deleteEvent(event.id)}
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80 border-border/30 shadow-lg dark:shadow-none p-4 bg-card/95 dark:bg-card/90">
                          <div className="flex flex-col gap-3">
                            <h4 className="text-base font-semibold text-foreground">{event.title}</h4>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">Type:</span>
                              <Badge variant={typeInfo.variant} className={`bg-gradient-to-r ${typeInfo.gradient} text-white`}>
                                {event.type}
                              </Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">Date:</span>
                              <span className="text-sm text-foreground">{format(event.date, "MMMM d, yyyy")}</span>
                            </div>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center h-52 text-center rounded-md bg-muted/20 dark:bg-muted/10">
                <p className="text-muted-foreground mb-4">No events scheduled for this date</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
