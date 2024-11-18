import {Button, Card, Modal} from "@mantine/core";
import React, {useState} from "react";
import {GrowingCycleForm} from "./growingCycleForm";

const GrowingCycleList: React.FC<{fpfId:string}> = ({fpfId}) => {

    const [showGrowingCycleForm, setShowGrowingCycleForm] = useState(false);


    return (
        <>
        <Modal opened={showGrowingCycleForm} onClose={() => setShowGrowingCycleForm(false)} title={"Add Growing Cycle"}>
            <>
                <GrowingCycleForm  fpfId={fpfId}/>
            </>
        </Modal>
                {/* Create GrowingCycle*/}
                <Button
                    style={{width: '100%'}}
                    variant="light"
                    onClick={() => {
                        setShowGrowingCycleForm(true);
                    }}
                >
                    Add Growing Cycle
                </Button>
        </>
    );
}

export default GrowingCycleList;