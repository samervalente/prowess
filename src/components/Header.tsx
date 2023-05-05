import { LoggedUser } from "@/protocols/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { CaretDown } from "@phosphor-icons/react";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function Header() {
  const { asPath } = useRouter()
  const [currentUser, setCurrentUser] = useState<LoggedUser | null>()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openBackdrop, setOpenBackdrop] = useState(false);
  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };
  const handleOpenBackdrop = () => {
    setOpenBackdrop(true);
  };

  useEffect(() => {
    const user = localStorage.getItem("currentUser")
    if (user) {
      setCurrentUser(JSON.parse(user))
    }
  }, [])

  function logout() {
    localStorage.removeItem("currentUser")
    handleOpenBackdrop()
    setTimeout(() => {
      setCurrentUser(null)
      handleCloseBackdrop()
    }, 2000)
  }

  return (
    <header className="flex flex-col md:flex-row justify-between md:items-center p-4 sticky">
      <Link href="/" className='flex items-center text-[24px] text-blue-main font-bold'>
        <img src="/logo.png" width={60} height={50} alt="logo" />
        {currentUser ? `Olá ${currentUser.name.split(" ")[0]}` : 'Prowess'}

      </Link>

      <div className="flex flex-col md:items-center  md:flex-row gap-y-3 gap-x-10 mt-3 w-max text-sm">
        <Link className={`${asPath === '/faqs' && 'border-b-2 border-blue-main'}`} href="/faqs">FAQS</Link>
        {currentUser?.token ?
          <>
            <Link className={`${asPath === '/' && 'border-b-2 border-blue-main'}`} href="/">Procurar estudantes</Link>
            <Link className={`${asPath === '/posts/new' && 'border-b-2 border-blue-main'}`} href="/faqs">Criar publicação</Link>

            <div className="flex items-center gap-x-2 gap-y-3 cursor-pointer" onClick={handleClick}>
              <img className="w-8 h-8 rounded-full" src={currentUser.imageUrl} />
              <CaretDown size={20} color="#fafafa" weight="fill" />
            </div>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose}>
                <Link onClick={logout} href={"/"}>Logout</Link>
              </MenuItem>
            </Menu>

          </> :
          <>
            <Link className={`${asPath === '/auth/signin' && 'border-b-2 border-blue-main'}`} href="/auth/signin">Entrar</Link>

            <Link className={`${asPath === '/auth/signup' && 'border-b-2 border-blue-main'}`} href="/auth/signup">Cadastrar-se</Link>
          </>
        }
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openBackdrop}
          onClick={handleCloseBackdrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </header>
  )
}