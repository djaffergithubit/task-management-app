import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

const Sidebar = ({ state, setState }) => {
    const currentPath = window.location.pathname

    useEffect(() => {
        console.log("currentPath", currentPath);
        
    }, [currentPath])

    const navigation = [
        {
            href: '/',
            name: 'All Tasks',
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
            </svg>
            ,
        },
        {
            href: '/add-task',
            name: 'Add Task',
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
            </svg>
            ,
        },
        {
            href: '/profile',
            name: 'Profile',
            icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
            </svg>,
        }
    ]

    return (
        <>
            <nav
                className={`h-screen lg:sticky fixed top-0 z-10 w-full lg:space-y-8 lg:w-80 flex items-start justify-start space-y-0 ${state ? 'block' : 'hidden'}`}>
                <div className="flex flex-col h-full sm:w-full min-w-80 max-w-[340px] w-full bg-white ">
                    <div className='h-20 flex items-center px-8 justify-between'>
                        <a href='javascript:void(0)' className='flex-none'>
                            <img src="https://floatui.com/logo.svg" width={140} className="mx-auto" />
                        </a>
                        <IoCloseSharp className=" text-red-400 text-3xl lg:hidden block cursor-pointer" onClick={() => setState(false)} />
                    </div>
                    <div className="flex-1 flex flex-col h-full overflow-auto">
                        <ul className="p-4 text-md font-medium tracking-wider flex-1 space-y-3">
                            {
                                navigation.map((item, idx) => (
                                    <li key={idx}>
                                        <a href={item.href} className={`flex items-center gap-x-2 text-gray-500 p-2 rounded-lg  hover:bg-gray-100 focus:bg-gray-100 duration-150 ${((currentPath.includes('-') && ((currentPath?.toLowerCase()).replace('-', ' ')).includes((item.name).toLowerCase())) || ((currentPath?.toLowerCase())).includes((item.name).toLowerCase()) || currentPath === '/' && item.name === 'All Tasks') && 'bg-gray-100'}`}>
                                            <div className="text-gray-700 text-lg">{item.icon}</div>
                                            {item.name}
                                        </a>
                                    </li>
                                ))
                            }
                        </ul>
                    </div >
                </div>
                <div className="w-full lg:hidden block h-full cursor-pointer bg-black  bg-opacity-40" onClick={() => setState(false)}></div>
            </nav>
        </>
    );
};

export default Sidebar;