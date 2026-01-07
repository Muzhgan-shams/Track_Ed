import { AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  ModuleRegistry,
  themeQuartz,
} from "ag-grid-community";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SearchIcon, TrashIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import GlobalApi from "@/app/_services/GlobalApi";
import { toast } from "sonner";

ModuleRegistry.registerModules([AllCommunityModule]);
const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [10, 25, 50, 100];

const StudentListTable = ({ students, refreshData }) => {
  const customButton = (props) => {
    return (
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant="destructive" size="sm">
            <TrashIcon />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              record and remove your data from servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                DeleteRecord(props?.data?.id);
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };
  const [colDef, setColDef] = useState([
    { field: "id", filter: true },
    { field: "name", filter: true },
    { field: "address", filter: true },
    { field: "contact", filter: true },
    { field: "action", cellRenderer: customButton },
  ]);
  const [rowData, setRowData] = useState();
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    students && setRowData(students);
  }, [students]);
  const DeleteRecord = (id) => {
    GlobalApi.DeleteStudent(id).then((res) => {
      if (res.data) {
        toast.success("Student Deleted Successfully");
        refreshData();
      }
    });
  };

  return (
    <div>
      <div className="mt-5" style={{ height: 500, width: "100%" }}>
        <div className="p-2 rounded-lg border shadow-sm flex gap-2 mb-4 max-w-sm">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search..."
            className="outline-none w-full"
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDef}
          pagination={pagination}
          theme={themeQuartz}
          quickFilterText={searchInput}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
        />
      </div>
    </div>
  );
};

export default StudentListTable;
