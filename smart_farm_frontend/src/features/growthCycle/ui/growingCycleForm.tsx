import React, { useState, useMemo, useEffect } from "react";
import { Button, Flex, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useTranslation } from "react-i18next";
import { createGrowingCycle } from "../useCase/createGrowingCycle";
import { GrowingCycle } from "../models/growingCycle";
import {getFpf} from "../../fpf/useCase/getFpf";
import {modifyGrowingCycle} from "../useCase/modifyGrowingCycle";
import {useAppDispatch} from "../../../utils/Hooks";
import {addGrowingCycle, changedGrowingCycle, deleteGrowingCycle, updateGrowingCycle} from "../state/GrowingCycleSlice";
import {showNotification} from "@mantine/notifications";
import {useSelector} from "react-redux";
import {RootState} from "../../../utils/store";

export const GrowingCycleForm: React.FC<{
    fpfId: string;
    toEditGrowingCycle: GrowingCycle | null;
    closeForm: () => void;
}> = ({ fpfId, toEditGrowingCycle, closeForm }) => {
    const { t } = useTranslation();
    const [dateError, setDateError] = useState<string | null>(null); // For error message
    const [growingCycle, setGrowingCycle] = useState<GrowingCycle>({ fpfId: fpfId } as GrowingCycle);
    const dispatch = useAppDispatch()

    const handleInputChange = (field: string, value: any) => {
        setGrowingCycle((prev) => ({ ...prev, [field]: value }));

        // Validate date order
        if (field === "endDate" && growingCycle.startDate && value) {
            if (new Date(value) < new Date(growingCycle.startDate)) {
                setDateError(t("header.dateError"));
            } else {
                setDateError(null);
            }
        } else if (field === "startDate" && growingCycle.endDate && value) {
            if (new Date(growingCycle.endDate) < new Date(value)) {
                setDateError(t("header.dateError"));
            } else {
                setDateError(null);
            }
        }
    };


    const handleSubmit = async () => {
        if (dateError) {
            showNotification({
                title: t("growingCycleForm.errorTitle"),
                message: dateError,
                color: "red",
            });
            return;
        }

        try {
            if(toEditGrowingCycle){
                const updatedCycle = await modifyGrowingCycle(growingCycle.id, growingCycle);
                dispatch(updateGrowingCycle(updatedCycle));
                showNotification({
                    title: t("growingCycleForm.successTitle"),
                    message: t("growingCycleForm.editSuccessMessage"),
                    color: "green",
                });
            }
            else {
                const newCycle = await createGrowingCycle(growingCycle);
                dispatch(addGrowingCycle(newCycle));
                showNotification({
                    title: 'Success',
                    message: 'Growing cycle saved successfully!',
                    color: 'green',
                })
            }
        } catch (error) {
            showNotification({
                title: t("growingCycleForm.errorTitle"),
                message: `${error}`,
                color: "red",
            });
        }
        closeForm();
    };


    const isFormValid = useMemo(() => {
        return growingCycle.plants?.trim() && growingCycle.startDate && !dateError;
    }, [growingCycle, dateError]);

    useEffect(() => {
        if (toEditGrowingCycle) {
            setGrowingCycle(toEditGrowingCycle);
        }
    }, [toEditGrowingCycle]);

    return (
        <>
            <TextInput
                label={t("growingCycleForm.plantTypeLabel")}
                placeholder={t("growingCycleForm.plantTypePlaceholder")}
                required
                value={growingCycle.plants || ""}
                onChange={(e) => handleInputChange("plants", e.currentTarget.value)}
                style={{ width: "100%" }}
            />
            <Flex gap="50px" style={{ marginTop: "15px" }}>
                <DateInput
                    label={t("growingCycleForm.startDateLabel")}
                    placeholder={t("growingCycleForm.startDatePlaceholder")}
                    allowDeselect
                    required
                    value={growingCycle.startDate ? new Date(growingCycle.startDate) : null}
                    onChange={(date) => handleInputChange("startDate", date)}
                    style={{ flex: 1 }}
                />
                <DateInput
                    label={t("growingCycleForm.endDateLabel")}
                    placeholder={t("growingCycleForm.endDatePlaceholder")}
                    clearable
                    value={growingCycle.endDate ? new Date(growingCycle.endDate) : null}
                    onChange={(date) => handleInputChange("endDate", date)}
                    style={{ flex: 1 }}
                />
            </Flex>
            {dateError && (
                <div style={{ color: "#a53737", marginTop: "10px" }}>
                    {dateError}
                </div>
            )}
            <TextInput
                label={t("growingCycleForm.notesLabel")}
                placeholder={t("growingCycleForm.notesPlaceholder")}
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
                    {t("growingCycleForm.saveButton")}
                </Button>
            </Flex>
        </>
    );
};
