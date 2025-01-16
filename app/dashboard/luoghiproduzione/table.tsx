'use client';
import React, { useState, use } from 'react';
import { LuogoProduzione } from "@prisma/client";
import IconB from '../../../components/IconB';
import { useRouter } from 'next/navigation';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';


interface LuogoProduzioneTableProps {
  dataPromise: Promise<LuogoProduzione[]>;
}

const LuogoProduzioneTable: React.FC<LuogoProduzioneTableProps> = ({ dataPromise }) => {
  const tableData = use(dataPromise);
  const [data, setData] = useState<LuogoProduzione[]>(tableData);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  // Define columns with strict typing
  const columns: ColumnDef<LuogoProduzione>[] = [
    {
      accessorKey: 'nome',
      header: 'Nome',
    },
    {
      id: 'indirizzoCompleto',
      header: 'Indirizzo',
      cell: ({ row }) => {
        const { indirizzo, civico } = row.original;
        return `${indirizzo}, ${civico}`;
      },
    },
    {
      id: 'luogoCompleto',
      header: 'Luogo',
      cell: ({ row }) => {
        const { comune, cap, provincia, nazione } = row.original;
        return `${comune} (${provincia}), ${cap}, ${nazione}`;
      },
    },
    {
      id: 'actions',
      header: 'Azioni',
      cell: ({ row }) => <ActionsCell id={row.original.id} />,
    }
  ];

  // Initialize the React Table instance
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const router = useRouter();
  const handleNew = () => {
    router.push(`/dashboard/luoghiproduzione/new`);
  }

  return (
    <div className="mt-3">
      <table className="table table-striped table-bordered table-hover">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  style={{
                    cursor: header.column.getCanSort() ? 'pointer' : 'default',
                    width: header.column.id === 'actions' ? '1px' : 'auto'
                  }}
                  className="" // implementare qualcosa?
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {
                    header.column.getIsSorted() ?
                      (header.column.getIsSorted() === 'asc' ?
                        <IconB iconName="caret-up-fill" flipMargin /> :
                        <IconB iconName="caret-down-fill" flipMargin />
                      ) :
                      (header.column.getCanSort() ? <IconB iconName="caret-right-fill" flipMargin /> : '')
                  }
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="table-group-divider">
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center">
                Nessun dato disponibile
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="row mt-3 p-2 g-2 border row-margin-fix">
        <div className="col mt-1 mb-1">

          <div className="btn-group" role="group" aria-label="Paginazione">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="btn btn-sm btn-outline-secondary"
            >
              <IconB iconName="caret-left" />
              Indietro
            </button>

            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="btn btn-sm btn-outline-secondary"
            >
              Avanti
              <IconB iconName="caret-right" flipMargin />
            </button>
          </div>

          <span style={{ marginLeft: '12px', marginTop: '3px', display: 'inline-block' }}>
            Pagina{' '}
            <strong>
              {table.getState().pagination.pageIndex + 1} di{' '}
              {table.getPageCount()}
            </strong>
          </span>
        </div>

        <div className="col col-auto mt-1 mb-1">
          <div className="row g-2">
            <div className="col col-auto">
              <button onClick={handleNew} className="btn btn-sm btn-outline-secondary d-flex flex-row">
                <IconB iconName="plus-square" />
                Aggiungi nuovo
              </button>
            </div>
            <div className="col col-auto">
              <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
                className="form-select form-select-sm"
              >
                {[5, 10, 20].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Mostra {pageSize} elementi
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

interface ActionsCellProps {
  id: string;
}

const ActionsCell: React.FC<ActionsCellProps> = ({ id }) => {
  const router = useRouter();
  const handleEdit = () => {
    router.push(`/dashboard/luoghiproduzione/${id}`);
  };

  const handleDelete = () => {
    router.push(`/dashboard/luoghiproduzione/${id}/delete`);
  };

  return (
    <div className="d-flex flex-row gap-2">
      <button onClick={handleEdit} className="btn btn-sm btn-outline-secondary d-flex flex-row">
        <IconB iconName="pencil-square" />
        Modifica
      </button>
      <button onClick={handleDelete} className="btn btn-sm btn-outline-danger d-flex flex-row">
        <IconB iconName="trash" />
        Elimina
      </button>
    </div>
  );
};

export default LuogoProduzioneTable;
