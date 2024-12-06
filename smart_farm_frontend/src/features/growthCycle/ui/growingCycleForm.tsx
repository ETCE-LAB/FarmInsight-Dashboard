import React, { useState, useMemo, useEffect } from "react";
import { Button, Flex, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { createGrowingCycle } from "../useCase/createGrowingCycle";
import { GrowingCycle } from "../models/growingCycle";
import { modifyGrowingCycle } from "../useCase/modifyGrowingCycle";
import { useAppDispatch } from "../../../utils/Hooks";
import { changedGrowingCycle } from "../state/GrowingCycleSlice";

export const GrowingCycleForm: React.FC<{
    fpfId: string;
    toEditGrowingCycle: GrowingCycle | null;
    onSuccess: (message: string, color: string) => void; // Callback für Erfolgsmeldung
}> = ({ fpfId, toEditGrowingCycle, onSuccess }) => {
    const [growingCycle, setGrowingCycle] = useState<GrowingCycle>({ fpfId: fpfId } as GrowingCycle);
    const dispatch = useAppDispatch();

    const handleInputChange = (field: string, value: any) => {
        setGrowingCycle((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        try {
            if (toEditGrowingCycle) {
                await modifyGrowingCycle(growingCycle.id, growingCycle);
                onSuccess("Growing cycle edited successfully.", "green");
            } else {
                await createGrowingCycle(growingCycle);
                onSuccess("Growing cycle created successfully!", "green");
            }
            dispatch(changedGrowingCycle());
        } catch (error) {
            onSuccess("Failed to save the growing cycle.", "red");
        }
    };

    const isFormValid = useMemo(() => {
        return growingCycle.plants?.trim() && growingCycle.startDate;
    }, [growingCycle]);

    useEffect(() => {
        if (toEditGrowingCycle) {
            setGrowingCycle(toEditGrowingCycle);
        }
    }, [toEditGrowingCycle]);

    return (
        <>
            <TextInput
                label="Plant Type"
                placeholder="Plant Type"
                required
                value={growingCycle.plants || ""}
                onChange={(e) => handleInputChange("plants", e.currentTarget.value)}
                style={{ width: "100%" }}
            />
            <Flex gap="50px" style={{ marginTop: "15px" }}>
                <DateInput
                    label="Start Date"
                    placeholder="Start Date"
                    allowDeselect
                    required
                    value={growingCycle.startDate ? new Date(growingCycle.startDate) : null}
                    onChange={(date) => handleInputChange("startDate", date)}
                    style={{ flex: 1 }}
                />
                <DateInput
                    label="End Date"
                    placeholder="End Date"
                    allowDeselect
                    value={growingCycle.endDate ? new Date(growingCycle.endDate) : null}
                    onChange={(date) => handleInputChange("endDate", date)}
                    style={{ flex: 1 }}
                />
            </Flex>
            <TextInput
                label="Notes"
                placeholder="Notes about your plants"
                value={growingCycle.note || ""}
                onChange={(e) => handleInputChange("note", e.currentTarget.value)}
                style={{ width: "100%", marginTop: "15px" }}
            />
            <Flex justify="flex-end">
                <Button
                    style={{ width: "30%", marginTop: "1rem" }}
                    type="submit"
                    onClick={handleSubmit}
                    disabled={!isFormValid}
                >
                    Save
                </Button>
            </Flex>
        </>
    );
};
