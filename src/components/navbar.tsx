"use client"

import useUser from "@/hooks/userHooks"

const NavBar = () => {
    const { user, logout } = useUser();

    function GoTo(link: string): void {
        window.location.href = link;
    }

    return (
        <>
            <div className='flex mb-12 justify-end'>
                <div className="flex gap-3">
                    <span className="text-white my-auto ">{user?.balance} Kz</span>
                    {
                        user?.userType == 'provider' ?
                            <button onClick={() => GoTo('/my-services')} className="border-white px-1 text-white md:border-2 md:px-4 md:py-2  rounded-sm">
                                Meus Serviços
                            </button>
                            :
                            <>
                                <span className="text-white my-auto">
                                    Preste serviço
                                </span>
                                <a href="/transactions" className="text-white my-auto">
                                    Historico
                                </a>
                            </>
                    }
                    <div className="bg-white text-black md:px-4 md:py-2 border-2 px-1 rounded-sm">
                        {user?.fullName.split(' ')[0]}
                    </div>
                    <button onClick={() => logout()} className="bg-white cursor-pointer border-2 px-1 text-black md:px-4 md:py-2  rounded-sm">
                        Sair
                    </button>
                </div>
            </div>
            {
                user?.userType == 'provider' &&
                <button onClick={() => GoTo('/services/create')} className="border-white px-1 text-white md:border-2 md:px-4 md:py-2  rounded-sm">
                    Criar Serviço
                </button>
            }

            <br />
            <br />

        </>
    );
}

export default NavBar;
