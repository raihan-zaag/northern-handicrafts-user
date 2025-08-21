import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Typography from "@/components/Typography";
import { useSingleCartProduct } from "@/contextProviders/useSingleCartProductProvider";
import useGetPrescription from "@/hooks/prescription/useGetPrescription";
import useGetSize from "@/hooks/singleProduct/useGetSizes";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import PrescriptionBreakdown from "./PrescriptionBreakdown";
import { useUserContext } from "@/contextProviders/userContextProvider";
import useGetColorList from "@/hooks/color/useGetColorList";
import { IoIosArrowDown } from "react-icons/io";
import { Button } from "@/common/components";
import InputLabel from "@/common/components/shared/InputLabel";

// Prescription form schema
const prescriptionSchema = z.object({
  name: z.string().optional(),
  leftEyeSPH: z.string().optional(),
  leftEyeCYL: z.string().optional(),
  leftEyeAxis: z.string().optional(),
  rightEyeSPH: z.string().optional(),
  rightEyeCYL: z.string().optional(),
  rightEyeAxis: z.string().optional(),
  pdDistance: z.string().optional(),
  leftPdDistance: z.string().optional(),
  rightPdDistance: z.string().optional(),
});

const PrescriptionForm = ({
    mode, // "create", "update", or "view"
    prescriptionInfo,
    onSubmit,
    handleSkipAddPrescription,
    onDelete,
    showPriceBreakDown = false,
    showButtons = false,
    readOnly = true,
    cartInfo = {},
}) => {
    const form = useForm({
        resolver: zodResolver(prescriptionSchema),
        defaultValues: mode === "create" ? {} : prescriptionInfo || {},
    });
    const { isAuthenticated } = useUserContext();

    const { prescription, loading } = useGetPrescription();
    const { loading: sizeLoading, sizeList } = useGetSize();
    const { fetchColors, loading: getColorLoading, colors } = useGetColorList();

    const { handleSizeChange, selectedSize, selectedColor } =
        useSingleCartProduct();

    const [axisData, setAxisData] = useState([]);
    const [cylData, setCylData] = useState([]);
    const [pdData, setPdData] = useState([]);
    const [sphData, setSphData] = useState([]);

    const [is2DPd, setIs2DPd] = useState(false);
    const [lensPrice, setLensPrice] = useState({ label: "", price: 0 });
    const [colorPrice, setColorPrice] = useState({ label: "", price: 0 });

    useEffect(() => {
        if (prescriptionInfo) {
            // Set form values based on prescriptionInfo
            form.reset(prescriptionInfo);

            // Check and set 2D PD if necessary
            if (
                prescriptionInfo?.leftPdDistance ||
                prescriptionInfo?.rightPdDistance
            ) {
                setIs2DPd(true);
            }
        }

        if (!loading && prescription) {
            // Helper function to process prescription data
            const processData = (content) =>
                content?.map((data) => ({
                    label: data?.value,
                    value: data?.value,
                    price: data?.price,
                })) || [];

            // Set processed data for prescription-related fields
            setAxisData(processData(prescription?.axis?.content));
            setCylData(processData(prescription?.cyl?.content));
            setSphData(processData(prescription?.sph?.content));
            setPdData(processData(prescription?.pd?.content));
        }

        // need to check up for update for auth user.
        if (mode === "create") {
            setColorPrice({
                label: selectedColor?.color?.name,
                price: selectedColor?.price,
            });

            const res = sizeList.find((size) => size?.value === selectedSize);
            setLensPrice(res);
        } else {
            if (isAuthenticated) {
                // console.log({ prescriptionInfo });
                const res = sizeList.find(
                    (size) => size?.value === prescriptionInfo?.productSize
                );

                setLensPrice(res);
            } else {
                const res = sizeList.find(
                    (size) =>
                        size?.value === cartInfo?.prescription?.productSize
                );

                setLensPrice(res);
            }

            if (cartInfo?.productColorId) {
                fetchColors(cartInfo?.productColorId);

                setColorPrice({
                    label: colors?.color?.name,
                    price: colors?.price,
                });
            } else {
                setColorPrice({
                    label: null,
                    price: 0,
                });
            }
        }
    }, [prescriptionInfo, form, loading, prescription]);

    // useEffect(() => {
    //   if (prescriptionInfo) {
    //     form.setFieldsValue(prescriptionInfo);

    //     if (
    //       prescriptionInfo?.leftPdDistance ||
    //       prescriptionInfo?.rightPdDistance
    //     ) {
    //       setIs2DPd(true);
    //     }
    //   }
    // }, [prescriptionInfo, form]);

    // useEffect(() => {
    //   if (!loading && prescription) {
    //     const processData = (content) =>
    //       content?.map((data) => ({
    //         label: data?.value,
    //         value: data?.value,
    //         price: data?.price,
    //       })) || [];

    //     setAxisData(processData(prescription?.axis?.content));
    //     setCylData(processData(prescription?.cyl?.content));
    //     setSphData(processData(prescription?.sph?.content));
    //     setPdData(processData(prescription?.pd?.content));
    //   }
    // }, [loading]);

    const handleFormSubmit = (values) => {
        values.productSize = selectedSize;
        if (onSubmit) {
            onSubmit(values);
            form.reset();
        }
    };

    const handle2PdDistance = useCallback(
        (checked) => {
            setIs2DPd(checked);
        },
        [is2DPd]
    );

    const getPriceForValue = (allData, value) => {
        // console.log(allData, value);
        return allData.find((data) => data?.value === value);
    };

    const leftEyeSPH = form.watch("leftEyeSPH");
    const leftEyeCYL = form.watch("leftEyeCYL");
    const rightEyeSPH = form.watch("rightEyeSPH");
    const rightEyeCYL = form.watch("rightEyeCYL");
    const leftEyeAxis = form.watch("leftEyeAxis");
    const rightEyeAxis = form.watch("rightEyeAxis");
    const pdDistance = form.watch("pdDistance");
    const leftPdDistance = form.watch("leftPdDistance");
    const rightPdDistance = form.watch("rightPdDistance");

    // Get price for each form value
    const prices = {
        "Left Eye - SPH": getPriceForValue(sphData, leftEyeSPH),
        "Left Eye - CYL": getPriceForValue(cylData, leftEyeCYL),
        "Right Eye - SPH": getPriceForValue(sphData, rightEyeSPH),
        "Right Eye - CYL": getPriceForValue(cylData, rightEyeCYL),
        "Left Eye - Axis": getPriceForValue(axisData, leftEyeAxis),
        "Right Eye - Axis": getPriceForValue(axisData, rightEyeAxis),
        "PD Distance": getPriceForValue(pdData, pdDistance),
        "Left - PD Distance": getPriceForValue(pdData, leftPdDistance),
        "Right - PD Distance": getPriceForValue(pdData, rightPdDistance),
        ...(colorPrice?.label && {
            color: { label: colorPrice.label, price: colorPrice.price },
        }),
        // color: { label: colorPrice?.label, price: colorPrice?.price },
        "lens-index": { label: lensPrice?.label, price: lensPrice?.price },
    };

    // Log all prices for debugging

    return (
        <LoadingOverlay isLoading={loading || sizeLoading || getColorLoading}>
            <div className="prescription-form">
                {showPriceBreakDown && (
                    <PrescriptionBreakdown
                        priceForValue={prices}
                        cartInfo={cartInfo}
                    mode={mode}
                />
            )}

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
                        {isAuthenticated && mode !== "view" ? (
                            <div className="mt-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                <div className="flex items-center">
                                                    <InputLabel>Prescription Name</InputLabel>
                                                    <Typography.BodyText className="text-sm font-medium">
                                                        <span className="text-red-500">*</span>
                                                    </Typography.BodyText>
                                                </div>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    readOnly={readOnly}
                                                    placeholder="Please enter prescription name"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        ) : null}

                <div className="w-full my-4 flex flex-col gap-2">
                    <p className="text-primary text-base font-semibold">
                        Left Eye - OD
                    </p>
                    <div className="flex gap-2 w-full">
                        <FormField
                            control={form.control}
                            name="leftEyeSPH"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>
                                        <p className="font-semibold text-sm">SPH</p>
                                    </FormLabel>
                                    <Select
                                        disabled={readOnly}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="h-12">
                                                <SelectValue placeholder="SPH" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {sphData.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="leftEyeCYL"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>
                                        <p className="font-semibold text-sm">CYL</p>
                                    </FormLabel>
                                    <Select
                                        disabled={readOnly}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="h-12">
                                                <SelectValue placeholder="CYL" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {cylData.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="leftEyeAxis"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>
                                        <p className="font-semibold text-sm">Axis</p>
                                    </FormLabel>
                                    <Select
                                        disabled={readOnly}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="h-12">
                                                <SelectValue placeholder="Axis" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {axisData.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="w-full my-4 flex flex-col gap-2">
                    <p className="text-primary text-base font-semibold">
                        Right Eye - OD
                    </p>
                    <div className="flex gap-2 w-full">
                        <FormField
                            control={form.control}
                            name="rightEyeSPH"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>
                                        <p className="font-semibold text-sm">SPH</p>
                                    </FormLabel>
                                    <Select
                                        disabled={readOnly}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="h-12">
                                                <SelectValue placeholder="SPH" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {sphData.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="rightEyeCYL"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>
                                        <p className="font-semibold text-sm">CYL</p>
                                    </FormLabel>
                                    <Select
                                        disabled={readOnly}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="h-12">
                                                <SelectValue placeholder="CYL" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {cylData.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="rightEyeAxis"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>
                                        <p className="font-semibold text-sm">Axis</p>
                                    </FormLabel>
                                    <Select
                                        disabled={readOnly}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="h-12">
                                                <SelectValue placeholder="Axis" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {axisData.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="flex items-end justify-between pb-4">
                    <p className="text-base font-semibold">
                        Pupillary Distance (PD)
                    </p>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="2pd"
                            checked={is2DPd}
                            onCheckedChange={handle2PdDistance}
                            disabled={readOnly}
                        />
                        <label htmlFor="2pd" className="text-sm font-medium">
                            2 PD Numbers
                        </label>
                    </div>
                </div>

                {is2DPd ? (
                    <div className="flex flex-row gap-6 w-full">
                        <FormField
                            control={form.control}
                            name="leftPdDistance"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>
                                        <p className="text-primary text-sm font-semibold">
                                            Left PD
                                        </p>
                                    </FormLabel>
                                    <Select
                                        disabled={readOnly}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="h-12">
                                                <SelectValue placeholder="Left PD Distance" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {pdData.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="rightPdDistance"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>
                                        <p className="text-primary text-sm font-semibold">
                                            Right PD
                                        </p>
                                    </FormLabel>
                                    <Select
                                        disabled={readOnly}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="h-12">
                                                <SelectValue placeholder="Right PD Distance" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {pdData.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                ) : (
                    <FormField
                        control={form.control}
                        name="pdDistance"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    <p className="text-primary text-sm font-semibold">
                                        PD Distance
                                    </p>
                                </FormLabel>
                                <Select
                                    disabled={readOnly}
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="h-12">
                                            <SelectValue placeholder="PD Distance" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {pdData.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                {/* Product lens Index info */}
                {readOnly ? (
                    <div className="flex flex-col gap-y-3 mt-4">
                        <div className=" flex flex-col justify-between items-start gap-2 w-full pb-6">
                            <Typography.BodyText className="text-sm font-medium">
                                Lens Index{" "}
                                <span className="text-red-500">*</span>
                            </Typography.BodyText>
                            <div className="flex items-center justify-start gap-2 flex-wrap">
                                {sizeList?.map((size, index) => {
                                    return (
                                        <Popover key={index}>
                                            <PopoverTrigger asChild>
                                                <div
                                                    className={`p-2 cursor-pointer ${
                                                        mode === "create"
                                                            ? size?.value ===
                                                              selectedSize
                                                                ? "text-blue-500 border-2 border-blue-400"
                                                                : ""
                                                            : size?.value ===
                                                              lensPrice?.label
                                                            ? "text-blue-500 border-2 border-blue-400"
                                                            : ""
                                                    }`}
                                                >
                                                    <p>{size?.label}</p>
                                                </div>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <div className="flex flex-col items-start justify-start gap-1">
                                                    <p className="text-gray-dark text-base">
                                                        Index size :{" "}
                                                        {size?.label}
                                                    </p>
                                                    <p className="text-red-500">
                                                        $ ({size?.price})
                                                    </p>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-y-3 mt-4">
                        <div className=" flex flex-col justify-between items-start gap-2 w-full pb-6">
                            <Typography.BodyText className="text-sm font-medium">
                                Lens Index{" "}
                                <span className="text-red-500">*</span>
                            </Typography.BodyText>
                            <div className="flex items-center justify-start gap-2 flex-wrap cursor-pointer">
                                {sizeList?.map((size, index) => {
                                    return (
                                        <Popover key={index}>
                                            <PopoverTrigger asChild>
                                                <div
                                                    className={`p-2 cursor-pointer ${
                                                        size?.value ===
                                                        lensPrice?.label
                                                            ? "text-blue-500 border-2 border-blue-400"
                                                            : ""
                                                    }`}
                                                    onClick={() => {
                                                        handleSizeChange(size);
                                                        setLensPrice(size);
                                                        if (mode === "update") {
                                                            console.log("Lens size updated:", size);
                                                        }
                                                    }}
                                                >
                                                    <p>{size?.label}</p>
                                                </div>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <div className="flex flex-col items-start justify-start gap-1">
                                                    <p className="text-gray-dark text-base">
                                                        Index size :{" "}
                                                        {size?.label}
                                                    </p>
                                                    {/* <p className="text-red-500">
                                                        $ ({size?.price})
                                                    </p> */}
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex gap-2 w-full my-6">
                    {/* {mode === "create" && showButtons && (
            <Button
              type="outline"
              className="w-full text-base font-semibold"
              htmlType="button"
              onClick={handleSkipAddPrescription}
            >
              No Prescription
            </Button>
          )} */}

                    {mode === "update" && showButtons && (
                        <Button
                            type="outline"
                            htmlType="button"
                            danger
                            className="w-full text-base font-semibold"
                            onClick={onDelete}
                        >
                            Delete Prescription
                        </Button>
                    )}

                    {showButtons ? (
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full text-base font-semibold"
                        >
                            {mode === "create" || mode === "view"
                                ? "Add to Cart"
                                : "Update"}
                        </Button>
                    ) : null}
                </div>
                    </form>
                </Form>
            </div>
        </LoadingOverlay>
    );
};

export default PrescriptionForm;
