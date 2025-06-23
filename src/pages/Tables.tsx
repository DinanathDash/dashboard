import { useState, useEffect } from 'react';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
        className: 'bg-theme-soft text-theme font-medium shadow-sm border border-theme border-opacity-20 px-2.5'
      };
  }
};

// Form schema for user editing
const userFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  role: z.enum(["Admin", "User", "Editor"], { 
    required_error: "Please select a role."
  }),
  status: z.enum(["Active", "Inactive"], {
    required_error: "Please select a status."
  })
});

type UserFormValues = z.infer<typeof userFormSchema>;

// Form schema for invoice creation
const invoiceFormSchema = z.object({
  paymentStatus: z.enum(["Paid", "Pending", "Unpaid"], { 
    required_error: "Please select a payment status."
  }),
  totalAmount: z.string().min(1, { message: "Please enter an amount." }),
  paymentMethod: z.enum(["Credit Card", "PayPal", "Bank Transfer"], { 
    required_error: "Please select a payment method."
  }),
});

type InvoiceFormValues = z.infer<typeof invoiceFormSchema>;

export default function Tables() {
  const [users, setUsers] = useState<typeof initialUsers>([]);
  const [invoices, setInvoices] = useState(initialInvoices);
  const [selectedUser, setSelectedUser] = useState<(typeof initialUsers)[0] | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<(typeof initialInvoices)[0] | null>(null);
  
  // Dialog state
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [invoiceDialogOpen, setInvoiceDialogOpen] = useState(false);
  
  // User Form
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "User",
      status: "Active"
    }
  });
  
  // Invoice Form
  const invoiceForm = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: {
      paymentStatus: "Pending",
      totalAmount: "$0.00",
      paymentMethod: "Credit Card"
    }
  });

  // Load users and invoices from session storage or use initial data
  useEffect(() => {
    const storedUsers = sessionStorage.getItem('dashboard-users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      setUsers(initialUsers);
      sessionStorage.setItem('dashboard-users', JSON.stringify(initialUsers));
    }
    
    const storedInvoices = sessionStorage.getItem('dashboard-invoices');
    if (storedInvoices) {
      setInvoices(JSON.parse(storedInvoices));
    } else {
      sessionStorage.setItem('dashboard-invoices', JSON.stringify(initialInvoices));
    }
  }, []);

  // Save users to session storage whenever they change
  useEffect(() => {
    if (users.length > 0) {
      sessionStorage.setItem('dashboard-users', JSON.stringify(users));
    }
  }, [users]);
  
  // Save invoices to session storage whenever they change
  useEffect(() => {
    if (invoices.length > 0) {
      sessionStorage.setItem('dashboard-invoices', JSON.stringify(invoices));
    }
  }, [invoices]);

  const handleViewProfile = (user: (typeof initialUsers)[0]) => {
    setSelectedUser(user);
    setViewDialogOpen(true);
  };

  const handleEditUser = (user: (typeof initialUsers)[0]) => {
    setSelectedUser(user);
    form.reset({
      name: user.name,
      email: user.email,
      role: user.role as "Admin" | "User" | "Editor",
      status: user.status as "Active" | "Inactive"
    });
    setEditDialogOpen(true);
  };

  const handleDeleteUser = (user: (typeof initialUsers)[0]) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteUser = () => {
    if (selectedUser) {
      const updatedUsers = users.filter(user => user.id !== selectedUser.id);
      setUsers(updatedUsers);
      setDeleteDialogOpen(false);
    }
  };

  const onSubmitEdit = (data: UserFormValues) => {
    if (selectedUser) {
      // Generate avatar initials from the name
      const avatarInitials = data.name.split(' ').map(part => part[0]).join('').toUpperCase().slice(0, 2);

      // Check if the user is new (not already in the users array)
      const isNewUser = !users.some(user => user.id === selectedUser.id);
      
      if (isNewUser) {
        // Add new user to the top of the list
        const newUser = {
          ...selectedUser,
          ...data,
          avatar: avatarInitials
        };
        setUsers([newUser, ...users]);
      } else {
        // Update existing user
        const updatedUsers = users.map(user => {
          if (user.id === selectedUser.id) {
            return {
              ...user,
              ...data,
              avatar: avatarInitials
            };
          }
          return user;
        });
        setUsers(updatedUsers);
      }
      setEditDialogOpen(false);
    }
  };

  // Prepare new user but only add it when save changes is clicked
  const addNewUser = () => {
    const newUser = {
      id: Date.now(),
      name: 'New User',
      email: 'new@example.com',
      role: 'User',
      status: 'Active',
      lastLogin: new Date().toISOString().split('T')[0],
      avatar: 'NU'
    };
    
    // Set selected user without adding to list yet
    setSelectedUser(newUser);
    
    // Reset form with default values
    form.reset({
      name: newUser.name,
      email: newUser.email,
      role: newUser.role as "Admin" | "User" | "Editor",
      status: newUser.status as "Active" | "Inactive"
    });
    
    // Open edit dialog
    setEditDialogOpen(true);
  };
  
  // Create new invoice
  const createInvoice = () => {
    const newInvoice = {
      id: `#INV${String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}`,
      paymentStatus: "Pending", 
      totalAmount: "$0.00", 
      paymentMethod: "Credit Card"
    };
    
    // Set selected invoice
    setSelectedInvoice(newInvoice);
    
    // Reset form with default values
    invoiceForm.reset({
      paymentStatus: newInvoice.paymentStatus as "Paid" | "Pending" | "Unpaid",
      totalAmount: newInvoice.totalAmount,
      paymentMethod: newInvoice.paymentMethod as "Credit Card" | "PayPal" | "Bank Transfer"
    });
    
    // Open invoice dialog
    setInvoiceDialogOpen(true);
  };
  
  // Submit invoice form
  const onSubmitInvoice = (data: InvoiceFormValues) => {
    if (selectedInvoice) {
      // Check if this is a new invoice (not in the array)
      const isNewInvoice = !invoices.some(invoice => invoice.id === selectedInvoice.id);
      
      if (isNewInvoice) {
        // Add new invoice to the top of the list
        const newInvoice = {
          ...selectedInvoice,
          ...data
        };
        setInvoices([newInvoice, ...invoices]);
      } else {
        // Update existing invoice
        const updatedInvoices = invoices.map(invoice => {
          if (invoice.id === selectedInvoice.id) {
            return {
              ...invoice,
              ...data
            };
          }
          return invoice;
        });
        setInvoices(updatedInvoices);
      }
      setInvoiceDialogOpen(false);
    }
  };

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
                <Button variant="outline" size="sm" className="border-border/40 dark:border-border/20 hover:bg-muted/50 hover:text-foreground shadow-sm"
                  onClick={addNewUser}>Add User</Button>
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
                              <DropdownMenuItem 
                                className="cursor-pointer hover:bg-muted/50 dark:hover:bg-muted/30 focus:bg-muted/50 dark:focus:bg-muted/30"
                                onClick={() => handleViewProfile(user)}>
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="cursor-pointer hover:bg-muted/50 dark:hover:bg-muted/30 focus:bg-muted/50 dark:focus:bg-muted/30"
                                onClick={() => handleEditUser(user)}>
                                Edit User
                              </DropdownMenuItem>
                              <DropdownMenuSeparator className="bg-border/30 dark:bg-border/20" />
                              <DropdownMenuItem 
                                className="text-red-600 dark:text-red-400 cursor-pointer hover:bg-red-50 dark:hover:bg-red-950/30 focus:bg-red-50 dark:focus:bg-red-950/30"
                                onClick={() => handleDeleteUser(user)}>
                                Delete User
                              </DropdownMenuItem>
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
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-border/40 dark:border-border/20 hover:bg-muted/50 hover:text-foreground shadow-sm"
                  onClick={createInvoice}
                >
                  Create Invoice
                </Button>
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

      {/* View Profile Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">User Profile</DialogTitle>
            <DialogDescription>User details and information.</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="flex flex-col items-center pb-4">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${selectedUser.name}`} alt={selectedUser.name} />
                  <AvatarFallback className="text-xl bg-primary text-primary-foreground">{selectedUser.avatar}</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold">{selectedUser.name}</h3>
                <Badge variant={getStatusInfo(selectedUser.status).variant} className={getStatusInfo(selectedUser.status).className}>
                  {selectedUser.status}
                </Badge>
              </div>
              <div className="grid gap-4">
                <div className="grid grid-cols-[100px_1fr] gap-2">
                  <div className="font-semibold text-muted-foreground">Email:</div>
                  <div>{selectedUser.email}</div>
                </div>
                <div className="grid grid-cols-[100px_1fr] gap-2">
                  <div className="font-semibold text-muted-foreground">Role:</div>
                  <div>{selectedUser.role}</div>
                </div>
                <div className="grid grid-cols-[100px_1fr] gap-2">
                  <div className="font-semibold text-muted-foreground">Last Login:</div>
                  <div>{selectedUser.lastLogin}</div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button 
                variant="outline" 
                className="border-gray-300 dark:border-gray-600 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm font-medium">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog 
        open={editDialogOpen} 
        onOpenChange={(open) => {
          // Only update the state when closing to prevent unintended actions
          if (!open) setEditDialogOpen(false);
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {users.some(user => user.id === selectedUser?.id) ? "Edit User" : "Add New User"}
            </DialogTitle>
            <DialogDescription>Update user information and settings.</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitEdit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Admin">Admin</SelectItem>
                          <SelectItem value="User">User</SelectItem>
                          <SelectItem value="Editor">Editor</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter className="gap-2 sm:gap-0">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="border-gray-300 dark:border-gray-600 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm"
                  onClick={() => setEditDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="theme-colored shadow-sm font-medium">
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="flex items-center space-x-4 p-2 border border-red-200 dark:border-red-800/30 bg-red-50 dark:bg-red-900/10 rounded-md">
              <Avatar>
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${selectedUser.name}`} alt={selectedUser.name} />
                <AvatarFallback className="bg-primary text-primary-foreground">{selectedUser.avatar}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{selectedUser.name}</div>
                <div className="text-sm text-muted-foreground">{selectedUser.email}</div>
              </div>
            </div>
          )}
          <DialogFooter className="gap-2 sm:gap-0">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="border-gray-300 dark:border-gray-600 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm">Cancel</Button>
            </DialogClose>
            <Button 
              onClick={confirmDeleteUser} 
              variant="destructive" 
              className="bg-red-600 hover:bg-red-700 text-white shadow-sm dark:bg-red-600 dark:hover:bg-red-500 border border-red-700 dark:border-red-500 font-medium">
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create/Edit Invoice Dialog */}
      <Dialog 
        open={invoiceDialogOpen} 
        onOpenChange={(open) => {
          if (!open) setInvoiceDialogOpen(false);
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Create Invoice</DialogTitle>
            <DialogDescription>Enter invoice details below.</DialogDescription>
          </DialogHeader>
          <Form {...invoiceForm}>
            <form onSubmit={invoiceForm.handleSubmit(onSubmitInvoice)} className="space-y-4">
              <FormField
                control={invoiceForm.control}
                name="totalAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="$0.00" 
                        {...field} 
                        onChange={(e) => {
                          // Format as currency if needed
                          let value = e.target.value;
                          if (value && !value.startsWith('$')) {
                            value = '$' + value;
                          }
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={invoiceForm.control}
                  name="paymentStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Paid">Paid</SelectItem>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Unpaid">Unpaid</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={invoiceForm.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Method</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Credit Card">Credit Card</SelectItem>
                          <SelectItem value="PayPal">PayPal</SelectItem>
                          <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              {selectedInvoice && (
                <div className="bg-theme-soft p-3 rounded-md border border-theme border-opacity-20">
                  <p className="text-sm text-theme font-medium">Invoice ID: {selectedInvoice.id}</p>
                </div>
              )}
              
              <DialogFooter className="gap-2 sm:gap-0">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="border-gray-300 dark:border-gray-600 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 shadow-sm"
                  onClick={() => setInvoiceDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="theme-colored shadow-sm font-medium">
                  Save Invoice
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
