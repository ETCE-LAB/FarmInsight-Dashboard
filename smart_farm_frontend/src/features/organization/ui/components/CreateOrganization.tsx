import {useAppDispatch} from "../../../../Hooks";
import {createdOrganization} from "../../state/OrganizationSlice";


export const CreateOrganization = () => {
    const dispatch = useAppDispatch()
    function createOrganization (){
        // create organizations use case
        dispatch(createdOrganization())
        //dispatch new organization event.
    }
}