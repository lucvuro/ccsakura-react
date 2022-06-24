import '../views/Nav.css'
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive'
const Nav = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 1223px)' })
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    })
    return (
        <>
            {isDesktopOrLaptop &&
                <nav className="navbar navbar-expand-lg bg-dark">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">CCSakura</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/">Home</Link>
                                    {/* <a className="nav-link active" aria-current="page" href="/">Home</a> */}
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/allcards">All Cards</Link>
                                    {/* <a className="nav-link" href="/">All Cards</a> */}
                                </li>
                                {/* <li className="nav-item">
                                    <Link className="nav-link" to="/user">User</Link>
                                    {/* <a className="nav-link" href="/">All Cards</a> */}
                                </li> */}

                            </ul>
                            {/* <ul class="navbar-nav navbar-right">
                                <li className="nav-item ml-3"><span className="nav-link"><i class="fa-solid fa-user-plus"></i> Sign Up</span></li>
                                <li className="nav-item"><span className="nav-link" href="#"><i class="fa-solid fa-right-to-bracket"></i> Login</span></li>
                            </ul> */}
                        </div>
                    </div>
                </nav>
            }
            {isMobile && <>
                <div class="collapse" id="navbarToggleExternalContent">
                    <div class="bg-dark p-4">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/">Home</Link>
                                {/* <a className="nav-link active" aria-current="page" href="/">Home</a> */}
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/allcards">All Cards</Link>
                                {/* <a className="nav-link" href="/">All Cards</a> */}
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/user">User</Link>
                                {/* <a className="nav-link" href="/">All Cards</a> */}
                            </li>

                        </ul>
                    </div>
                </div>
                <nav class="navbar navbar-dark bg-dark">
                    <div class="container-fluid">
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                    </div>
                </nav>
            </>}
        </>

    )
}

export default Nav;