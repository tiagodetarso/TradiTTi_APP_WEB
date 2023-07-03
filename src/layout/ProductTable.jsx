import React from 'react'
import DataTable from 'react-data-table-component'

const customStyles = {
    table: {
        style: {
            width: '1000px',
            justifyContent: 'center',
        }
    },
    cells: {
        style: {
            justifyContent: 'center',
        }
    },
    headRow: {
    style: {
        border: 'none',
        fontWeight: 'bold',
        backgroundColor: '#E5E059',
        },
    },
    headCells: {
        style: {
            color: '#000000',
            fontWeight: 'bold',
            fontSize: '17px',
            justifyContent: 'center',
            alignItems: 'center',
        },
    },
    rows: {
        style: {
            fontSize: '13px',
        },
        highlightOnHoverStyle: {
            backgroundColor: '#E5625E',
            borderBottomColor: '#ffffff',
            borderRadius: '15px',
            outline: '1px solid #FFFFFF',
            fontSize: '15px',
            fontWeight: 'bold',
        },
    },
    expanderRow: {
        style: {
            backgroundColor: '#999799',
            color: "#000000",
            textAlign: 'center',
            justifyText: 'center',
            fontWeight: 'bold',
            height: '3em'
        },
    },
}

export default function ProductTable({ 
    tableData,
    tableColumns,
    tableTitle,
    selectable,
    clearRows,
    expandable,
    expandableComponent,
    pending,
    prgssComponent,
    hoverHighlight,
    hoverPointer,
    tableTheme,
    actions,
    RowsChange
}) {

    const handleRowsChange = (selectedRows) => {
        RowsChange(selectedRows)
    }
    
    // Render
    return (
        <div>
            <DataTable
                title={tableTitle}
                columns={tableColumns}
                data={tableData}
                selectableRows={selectable}
                onSelectedRowsChange={handleRowsChange}
                clearSelectedRows={clearRows}
                expandableRows={expandable}
                expandableRowsComponent={expandableComponent}
                fixedHeader='true'
                fixedHeaderScrollHeight='440px'
                progressPending={pending}
                progressComponent={prgssComponent}
                highlightOnHover={hoverHighlight}
                pointerOnHover={hoverPointer}
                theme={tableTheme}
                customStyles={customStyles}
                contextActions={actions}
                RowsChange={RowsChange}
            />
        </div>
    )
}


