const generateCreateTableStatement = (table_name, columns) => {
    let createTableSQL = `CREATE TABLE ${table_name} (`;

    columns.forEach((column, index) => {
        createTableSQL += `${column.column_name} ${column.data_type}`;

        if (column.constraints && column.constraints.length > 0) {
            createTableSQL += ` ${column.constraints.join(' ')}`;
        }

        createTableSQL += index === columns.length - 1 ? ')' : ', ';
    });

    return createTableSQL;
}
