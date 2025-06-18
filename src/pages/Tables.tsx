import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

// Sample data
const initialUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', lastLogin: '2025-06-16', avatar: 'JD' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', lastLogin: '2025-06-15', avatar: 'JS' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Editor', status: 'Inactive', lastLogin: '2025-06-10', avatar: 'MJ' },
  { id: 4, name: 'Lisa Brown', email: 'lisa@example.com', role: 'User', status: 'Active', lastLogin: '2025-06-14', avatar: 'LB' },
  { id: 5, name: 'Tom Wilson', email: 'tom@example.com', role: 'Admin', status: 'Active', lastLogin: '2025-06-16', avatar: 'TW' },
  { id: 6, name: 'Emma Davis', email: 'emma@example.com', role: 'User', status: 'Active', lastLogin: '2025-06-12', avatar: 'ED' },
  { id: 7, name: 'Ryan Miller', email: 'ryan@example.com', role: 'Editor', status: 'Inactive', lastLogin: '2025-06-01', avatar: 'RM' },
  { id: 8, name: 'Sarah Jones', email: 'sarah@example.com', role: 'User', status: 'Active', lastLogin: '2025-06-14', avatar: 'SJ' },
  { id: 9, name: 'Chris Taylor', email: 'chris@example.com', role: 'Admin', status: 'Active', lastLogin: '2025-06-15', avatar: 'CT' },
  { id: 10, name: 'Olivia Martin', email: 'olivia@example.com', role: 'User', status: 'Active', lastLogin: '2025-06-13', avatar: 'OM' },
];

const initialInvoices = [
  { id: "#INV001", paymentStatus: "Paid", totalAmount: "$250.00", paymentMethod: "Credit Card" },
  { id: "#INV002", paymentStatus: "Pending", totalAmount: "$150.00", paymentMethod: "PayPal" },
  { id: "#INV003", paymentStatus: "Unpaid", totalAmount: "$350.00", paymentMethod: "Bank Transfer" },
  { id: "#INV004", paymentStatus: "Paid", totalAmount: "$450.00", paymentMethod: "Credit Card" },
  { id: "#INV005", paymentStatus: "Paid", totalAmount: "$550.00", paymentMethod: "PayPal" },
  { id: "#INV006", paymentStatus: "Pending", totalAmount: "$200.00", paymentMethod: "Bank Transfer" },
];

// Helper function for status badges with light backgrounds and dark text
const getStatusInfo = (status: string) => {
  switch (status) {
    case 'Active':
      return {
        variant: 'success' as const,
        className: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 font-medium shadow-sm border border-emerald-200 dark:border-emerald-800/50 px-2.5'
      };
    case 'Inactive':
      return {
        variant: 'destructive' as const,
        className: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 font-medium shadow-sm border border-red-200 dark:border-red-800/50 px-2.5'
      };
    case 'Paid':
      return {
        variant: 'success' as const,
        className: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 font-medium shadow-sm border border-emerald-200 dark:border-emerald-800/50 px-2.5'
      };
    case 'Pending':
      return {
        variant: 'warning' as const,
        className: 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 font-medium shadow-sm border border-amber-200 dark:border-amber-800/50 px-2.5'
      };
    case 'Unpaid':
      return {
        variant: 'destructive' as const,
        className: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 font-medium shadow-sm border border-red-200 dark:border-red-800/50 px-2.5'
      };
    default:
      return {
        variant: 'default' as const,
        className: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 font-medium shadow-sm border border-blue-200 dark:border-blue-800/50 px-2.5'
      };
  }
};

export default function Tables() {
  const [users] = useState(initialUsers);
  const [invoices] = useState(initialInvoices);

  return (
    <div className="flex-1 space-y-6 p-1">
      <Tabs defaultValue="users" className="w-full">
        <TabsList>
          <TabsTrigger value="users" >Users</TabsTrigger>
          <TabsTrigger value="invoices" >Invoices</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card className="border-border/40 dark:border-border/20 shadow-md shadow-primary/5 dark:shadow-primary/10">
            <CardHeader className="pb-4 border-b border-border/20 dark:border-border/10">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-xl font-semibold text-foreground">Users</CardTitle>
                  <CardDescription className="mt-1.5 text-muted-foreground">
                    Manage your users and their access permissions.
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" className="border-border/40 dark:border-border/20 hover:bg-muted/50 hover:text-foreground shadow-sm">Add User</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-border/30 dark:border-border/20 hover:bg-muted/20 dark:hover:bg-muted/10">
                    <TableHead className="font-semibold text-foreground">User</TableHead>
                    <TableHead className="font-semibold text-foreground">Email</TableHead>
                    <TableHead className="font-semibold text-foreground">Role</TableHead>
                    <TableHead className="font-semibold text-foreground">Status</TableHead>
                    <TableHead className="font-semibold text-foreground">Last Login</TableHead>
                    <TableHead className="text-center font-semibold text-foreground">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => {
                    const statusInfo = getStatusInfo(user.status);

                    return (
                      <TableRow key={user.id} className="border-b border-border/20 dark:border-border/10 hover:bg-muted/20 dark:hover:bg-muted/10 cursor-pointer transition-colors">
                        <TableCell className="font-medium py-3">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt={user.name} />
                              <AvatarFallback className="bg-primary text-primary-foreground">{user.avatar}</AvatarFallback>
                            </Avatar>
                            {user.name}
                          </div>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>
                          <Badge variant={statusInfo.variant} className={statusInfo.className}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.lastLogin}</TableCell>
                        <TableCell className="text-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm" className="border-border/40 dark:border-border/20 hover:bg-muted/50 hover:text-foreground shadow-sm">
                                Actions
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="center" className="border-border/40 dark:border-border/20 shadow-md">
                              <DropdownMenuLabel className="text-foreground/90">Actions</DropdownMenuLabel>
                              <DropdownMenuItem className="cursor-pointer hover:bg-muted/50 dark:hover:bg-muted/30 focus:bg-muted/50 dark:focus:bg-muted/30">View Profile</DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer hover:bg-muted/50 dark:hover:bg-muted/30 focus:bg-muted/50 dark:focus:bg-muted/30">Edit User</DropdownMenuItem>
                              <DropdownMenuSeparator className="bg-border/30 dark:bg-border/20" />
                              <DropdownMenuItem className="text-red-600 dark:text-red-400 cursor-pointer hover:bg-red-50 dark:hover:bg-red-950/30 focus:bg-red-50 dark:focus:bg-red-950/30">Delete User</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices">
          <Card className="border-border/40 dark:border-border/20 shadow-md shadow-primary/5 dark:shadow-primary/10">
            <CardHeader className="pb-4 border-b border-border/20 dark:border-border/10">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-xl font-semibold text-foreground">Invoices</CardTitle>
                  <CardDescription className="mt-1.5 text-muted-foreground">
                    Recent invoices and payment status.
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" className="border-border/40 dark:border-border/20 hover:bg-muted/50 hover:text-foreground shadow-sm">Create Invoice</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-border/30 dark:border-border/20 hover:bg-muted/20 dark:hover:bg-muted/10">
                    <TableHead className="font-semibold text-foreground">Invoice</TableHead>
                    <TableHead className="font-semibold text-foreground">Status</TableHead>
                    <TableHead className="font-semibold text-foreground">Method</TableHead>
                    <TableHead className="text-right font-semibold text-foreground">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => {
                    const statusInfo = getStatusInfo(invoice.paymentStatus);

                    return (
                      <TableRow key={invoice.id} className="border-b border-border/20 dark:border-border/10 hover:bg-muted/20 dark:hover:bg-muted/10 cursor-pointer transition-colors">
                        <TableCell className="font-semibold py-3">{invoice.id}</TableCell>
                        <TableCell>
                          <Badge variant={statusInfo.variant} className={statusInfo.className}>
                            {invoice.paymentStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>{invoice.paymentMethod}</TableCell>
                        <TableCell className="text-right font-medium">{invoice.totalAmount}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
