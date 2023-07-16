import LanguageModal from '../components/modals/LanguageModal'
import LoginModal from '../components/modals/LoginModal'
import RegisterModal from '../components/modals/RegisterModal'
import RentModal from '../components/modals/RentModal'
import SearchModal from '../components/modals/SearchModal'

const ModalProvider = () => {
  return (
    <>
        <LoginModal/>
        <RegisterModal/>
        <RentModal/>
        <SearchModal/>
        <LanguageModal/>
    </>
  )
}

export default ModalProvider