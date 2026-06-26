"use client";

import { useMemo, useEffect, useRef } from "react";
import SectionCard from "./SectionCard";
import Select from "react-select"
import collegesData from "@/data/college.json";
// import branchData from "@/data/branch.json";
import indiaData from "@/data/indiaData.json";
import { Controller } from "react-hook-form";

export default function AcademicInfo({ form }: any) {


    const {
        register,
        watch,
    } = form;

    const collegeRef = useRef<any>(null);

    const selectedCollege = watch("college");
    // const selectedDegree = watch("degree");
    const selectedState = watch("state");

    /*
      STATES + UTS MERGED
    */
    const allStates = [
        ...indiaData.states,
        ...indiaData.union_territories,
    ];

    /*
      FLATTEN ALL COLLEGES
    */
    const allColleges = useMemo(() => {

        const colleges = Object.values(
            collegesData.colleges_by_state
        ).flat();

        return [...new Set(colleges)];

    }, []);

    // .log(allColleges)console

    /*
      SEARCHABLE OPTIONS
    */
    const collegeOptions = useMemo(() => {

        return [
            ...allColleges.map((college: string) => ({
                value: college,
                label: college,
            })),

            // OTHER ALWAYS LAST
            {
                value: "Other",
                label: "Other",
            },
        ];

    }, [allColleges]);

    /*
      CURRENT STATE DISTRICTS
    */
    const currentState = allStates.find(
        (s) => s.name === selectedState
    );

    /*
      CURRENT DEGREE BRANCHES
    */
    // const currentDegree = branchData.degree_programs.find(
    //     (d) => d.degree === selectedDegree
    // );
    // console.log(currentDegree)

    useEffect(() => {
        register("college");
    }, [register]);


    return (

        <SectionCard title="Academic Information">

            <div className="grid gap-6 md:grid-cols-2">

                {/* COLLEGE */}
                <div className="space-y-4">

                    <div id="college-field">

                        <label className="cyber-label">
                            College
                        </label>

                        <div>
                            <Controller
                                control={form.control}
                                name="college"
                                rules={{
                                    required: "This field is required",
                                }}
                                render={({ field }) => (
                                    <Select
                                        instanceId="college-select"
                                        options={collegeOptions}
                                        placeholder="Search or select college"
                                        ref={collegeRef}
                                        onChange={(selectedOption) => {
                                            field.onChange(
                                                selectedOption?.value || ""
                                            );
                                        }}

                                        value={
                                            collegeOptions.find(
                                                (option) => option.value === watch("college")
                                            ) || null
                                        }
                                        /*
                  ALWAYS SHOW OTHER
                */
                                        filterOption={(option, inputValue) => {

                                            if (option.data.value === "Other") {
                                                return true;
                                            }

                                            return option.label
                                                .toLowerCase()
                                                .includes(inputValue.toLowerCase());

                                        }}
                                        className="cyber-select"
                                        styles={{
                                            control: (base, state) => ({
                                                ...base,

                                                height: "56px",
                                                minHeight: "56px",

                                                borderRadius: "16px",

                                                backgroundColor: "#FFFFFF",

                                                border: state.isFocused
                                                    ? "1px solid #D4AF37"
                                                    : "1px solid rgba(212,175,55,0.2)",

                                                boxShadow: state.isFocused
                                                    ? "0 0 0 4px rgba(212,175,55,0.12), 0 10px 25px rgba(212,175,55,0.12)"
                                                    : "none",

                                                transition: "all 0.3s ease",

                                                "&:hover": {
                                                    border: "1px solid rgba(212,175,55,0.4)",
                                                },
                                            }),

                                            /*
                                              MAIN SELECTED TEXT
                                            */
                                            singleValue: (base) => ({
                                                ...base,
                                                color: "#2D2926",
                                                fontWeight: 500,
                                            }),

                                            /*
                                              INPUT TEXT WHILE SEARCHING
                                            */
                                            input: (base) => ({
                                                ...base,
                                                color: "#2D2926",
                                            }),

                                            /*
                                              PLACEHOLDER
                                            */
                                            placeholder: (base) => ({
                                                ...base,
                                                color: "#A1887F",
                                            }),

                                            /*
                                              DROPDOWN MENU
                                            */
                                            menu: (base) => ({
                                                ...base,

                                                backgroundColor: "#FFFFFF",

                                                border: "1px solid rgba(212,175,55,0.15)",

                                                borderRadius: "16px",

                                                overflow: "hidden",

                                                boxShadow:
                                                    "0 15px 40px rgba(212,175,55,0.12)",
                                            }),

                                            /*
                                              OPTIONS
                                            */
                                            option: (base, state) => ({
                                                ...base,

                                                backgroundColor: state.isSelected
                                                    ? "#D4AF37"
                                                    : state.isFocused
                                                        ? "#FFF8E7"
                                                        : "#FFFFFF",

                                                color: state.isSelected
                                                    ? "#FFFFFF"
                                                    : "#2D2926",

                                                cursor: "pointer",

                                                transition: "all 0.2s ease",
                                            }),

                                            /*
                                              VALUE CONTAINER
                                            */
                                            valueContainer: (base) => ({
                                                ...base,
                                                background: "transparent",
                                            }),

                                            /*
                                              CONTAINER
                                            */
                                            container: (base) => ({
                                                ...base,
                                                background: "transparent",
                                            }),

                                            /*
                                              DROPDOWN ICON
                                            */
                                            dropdownIndicator: (base, state) => ({
                                                ...base,
                                                color: state.isFocused
                                                    ? "#B8860B"
                                                    : "#8D6E63",
                                            }),

                                            /*
                                              CLEAR BUTTON
                                            */
                                            clearIndicator: (base) => ({
                                                ...base,
                                                color: "#8D6E63",
                                            }),

                                            indicatorSeparator: () => ({
                                                display: "none",
                                            }),
                                        }}
                                    />
                                )}
                            />
                        </div>

                    </div>

                    {/* OTHER COLLEGE */}
                    {selectedCollege === "Other" && (

                        <div>

                            <label className="cyber-label">
                                Specify College
                            </label>

                            <input
                                {...register("otherCollege")}
                                className="cyber-input"
                                placeholder="Enter college name"
                            />

                        </div>

                    )}

                </div>

                {/* YEAR */}
                <div>

                    <label className="cyber-label">
                        Year of Study
                    </label>

                    <select
                        {...register("year", {
                            required: "This field is required",
                        })}
                        className="cyber-select-native"
                    >

                        <option disabled value="">
                            Select Year
                        </option>

                        <option value="1">
                            1st Year
                        </option>

                        <option value="2">
                            2nd Year
                        </option>

                        <option value="3">
                            3rd Year
                        </option>

                        <option value="4">
                            4th Year
                        </option>

                        <option value="5+">
                            5 or Above
                        </option>

                    </select>

                </div>


                {/* DEGREE */}
                {/* <div>

                    <label className="cyber-label">
                        Degree
                    </label>

                    <select
                        {...register("degree")}
                        className="cyber-input"
                    >

                        <option value="">
                            Select Degree
                        </option>

                        {branchData.degree_programs.map((degree) => (

                            <option
                                key={degree.degree}
                                value={degree.degree}
                            >
                                {degree.degree}
                            </option>

                        ))}

                    </select>

                </div> */}

                {/* BRANCH */}
                {/* <div className="space-y-4">

                    <div>

                        <label className="cyber-label">
                            Branch
                        </label>

                        <select
                            {...register("branch")}
                            className="cyber-input"
                        >

                            <option value="">
                                Select Branch
                            </option>

                            {currentDegree?.branches.map(
                                (branch: string) => (

                                    <option
                                        key={branch}
                                        value={branch}
                                    >
                                        {branch}
                                    </option>

                                )
                            )}

                            <option value="Other">
                                Other
                            </option>

                        </select>

                    </div>

                    {/* OTHER BRANCH */}
                {/* {watch("branch") === "Other" && (

                        <div>

                            <label className="cyber-label">
                                Specify Branch
                            </label>

                            <input
                                {...register("otherBranch")}
                                className="cyber-input"
                                placeholder="Enter branch"
                            />

                        </div>

                    )} */}

                {/* </div> */}


                {/* PINCODE */}
                <div>

                    <label className="cyber-label">
                        Pincode
                    </label>

                    <input
                        {...register("pincode", {
                            required: "This field is required",
                        })}
                        className="cyber-input"
                        placeholder="Enter pincode"
                    />

                </div>

                {/* STATE */}
                <div>

                    <label className="cyber-label">
                        State / UT
                    </label>

                    <select
                        {...register("state", {
                            required: "This field is required",
                        })}
                        className="cyber-select-native"
                    >

                        <option value="">
                            Select State
                        </option>

                        {allStates.map((state) => (

                            <option
                                key={state.name}
                                value={state.name}
                            >
                                {state.name}
                            </option>

                        ))}

                    </select>

                </div>

                {/* DISTRICT */}
                <div>

                    <label className="cyber-label">
                        District / City
                    </label>

                    <select
                        {...register("city", {
                            required: "This field is required",
                        })}
                        className="cyber-select-native"
                    >

                        <option value="">
                            Select District
                        </option>

                        {currentState?.districts.map(
                            (district: string) => (

                                <option
                                    key={district}
                                    value={district}
                                >
                                    {district}
                                </option>

                            )
                        )}

                    </select>

                </div>

            </div>

        </SectionCard>

    );
}