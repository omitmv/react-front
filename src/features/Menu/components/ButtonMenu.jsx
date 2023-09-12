import { Button, Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './ButtonMenu.css'

export const ButtonMenu = ({ value, path, srcImage }) => {
  const navigate = useNavigate()

  const handleClick = e => {
    navigate(e)
  }

  return (
    <Button
      style={{ maxWidth: '7rem', fontSize: 'small' }}
      className="btnMenu m-3"
      onClick={() => handleClick(path)}
    >
      <Image fluid src={srcImage} />
      {value}
    </Button>
  )
}
