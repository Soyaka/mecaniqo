import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/Components/ui/sheet"
import AddCarForm from "./AddCarForm"
export default function CreateCarSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="hover:bg-green-900 border-none hover:outline-none outline-none  hover:text-white" variant="outline">Add a new vehicle</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Add a new vehicle</SheetTitle>
          <SheetDescription>
            Fill in your vehicle information
          </SheetDescription>
        </SheetHeader>
        <AddCarForm />
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
