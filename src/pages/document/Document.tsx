import CrudTable from "../../components/CrudTable";
import { documentColumns } from "../../constants/columns";
import { fakeDocumentDataSource } from "../../constants/fake";

const Document = ()=>{

    return <>
        <CrudTable
            columns={documentColumns}
            dataSource={fakeDocumentDataSource}
            endpoint="/api/document"
            route={"/document"}
         />
    </>
}

export default Document ;