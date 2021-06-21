import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <div>
      <Menu pointing secondary>
        <Menu.Item as={Link} to='/images' name='images' />
        <Menu.Item as={Link} to='/jots' name='jots' />
        <Menu.Item as={Link} to='/' name='home' />
      </Menu>
    </div>

  )
}
