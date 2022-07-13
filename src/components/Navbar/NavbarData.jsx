import React from 'react';
import { MdListAlt, MdOutlineAssignment, MdOutlineModeEditOutline,
    MdAddCircleOutline, MdEditOff, MdHome, MdAssignmentInd, MdClose,
    MdAdb, MdPeople, MdArrowDropDown, MdArrowDropUp, MdLocalHospital, MdAnalytics} from 'react-icons/md';

    import {FaSchool} from 'react-icons/fa';
    import {CgListTree} from 'react-icons/cg';


export const SidebarDataAdmin = [
    {
        title: 'Home',
        path: '/dashboardAdmin',
        icon: <MdHome/>
    },
    {
        title: 'Add Admin',
        path: '/addAdmin',
        icon: <MdPeople />,
        // iconClosed: <MdArrowDropDown />,
        // iconOpened: <MdArrowDropUp />,

        // subNav: [
        //     {
        //         title: 'Transaction',
        //         path: '/searchemployeetransaction',
        //         icon: <MdAssignmentInd />
        //     },
        //     {
        //         title: 'Add New Employee',
        //         path: '/addemployee',
        //         icon: <MdAddCircleOutline />
        //     },
        //     {
        //         title: 'Edit Employee',
        //         path: '/searcheditemployee',
        //         icon: <MdOutlineModeEditOutline />
        //     },
        //     {
        //         title: 'Edit Entitlement',
        //         path: '/selectgrade',
        //         icon: <MdOutlineModeEditOutline />
        //     },
        // ]
    },
    {
        title: 'Admin List',
        path: '/adminList',
        icon: <MdAssignmentInd />,
        // iconClosed: <MdArrowDropDown />,
        // iconOpened: <MdArrowDropUp />,

        // subNav: [
        //     {
        //         title: 'Add New Admin',
        //         path: '/addadmin',
        //         icon: <MdAddCircleOutline />
        //     },
        //     {
        //         title: 'List of Admin',
        //         path: '/AdminList',
        //         icon: <MdListAlt />
        //     },
        // ]
    },
    {
    title: 'Add Jury',
    path: '/addJury',
    icon: <MdLocalHospital />,
    // iconClosed: <MdArrowDropDown />,
    // iconOpened: <MdArrowDropUp />,

    // subNav: [
    //     {
    //         title: 'Add New Clinic',
    //         path: '/addclinic',
    //         icon: <MdAddCircleOutline />
    //     },
    //     {
    //         title: 'List of Clinic',
    //         path: '/ClinicList',
    //         icon: <MdListAlt />
    //     },
    // ]
    },
    {
        title: 'Jury List',
        path: '/juryList',
        icon: <MdListAlt />,
        // iconClosed: <MdArrowDropDown />,
        // iconOpened: <MdArrowDropUp />,

        // subNav: [
        //     {
        //         title: 'Report by Department',
        //         path: '/ReportByDepartment',
        //         icon: <MdOutlineAssignment />
        //     },
        //     {
        //         title: 'Report by Medical',
        //         path: '/ReportByMedical',
        //         icon: <MdOutlineAssignment />
        //     },
        //     {
        //         title: 'Report by Clinic',
        //         path: '/ReportByClinic',
        //         icon: <MdOutlineAssignment />
        //     },
        // ]
    },
    {
        title: 'School List',
        path: '/schoolList',
        icon: <FaSchool />
    },
    {
        title: 'Add Exhibition',
        path: '/addExhibition',
        icon: <MdEditOff />
    },
    {
        title: 'Exhibition List',
        path: '/exhibitionList',
        icon: <CgListTree />
    },
    // {
    //     title: 'Edit School',
    //     path: '/schoolEdit',
    //     icon: <MdClose />
    // },
    // {
    //     title: 'Rubric',
    //     path: '/rubric',
    //     icon: <MdClose />
    // },
    // {
    //     title: 'Exhbition Reg',
    //     path: '/exhibitionRegister',
    //     icon: <MdClose />
    // },
    // {
    //     title: 'Player',
    //     path: '/player',
    //     icon: <MdClose />
    // },
    // {
    //     title: 'Add Criteria',
    //     path: '/addCriteria',
    //     icon: <MdClose />
    // },
    // {
    //     title: 'Insert Mark',
    //     path: '/insertMark',
    //     icon: <MdClose />
    // },

];

export const SidebarDataJury = [
    {
        title: 'Home',
        path: '/dashboardJury',
        icon: <MdHome />
    },
    // {
    //     title: 'New Transaction',
    //     path: 'clinicSearchEmp',
    //     icon: <MdAssignmentInd />
    // },
    // {
    //     title: 'Report',
    //     path: '/clinicReport',
    //     icon: <MdEditOff />
    // },

];

export const SidebarDataSchool = [
    {
        title: 'Home',
        path: '/dashboardSchool',
        icon: <MdHome />
    },
    // {
    //     title: 'Add Admin',
    //     path: '/addAdmin',
    //     icon: <MdPeople />,
    // },

    //     title: 'New Transaction',
    //     path: 'clinicSearchEmp',
    //     icon: <MdAssignmentInd />
    // },
    // {
    //     title: 'Report',
    //     path: '/clinicReport',
    //     icon: <MdEditOff />
    // },

];
