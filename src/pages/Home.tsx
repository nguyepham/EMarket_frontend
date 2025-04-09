export default function Home() {
  const welcomeMessage = 'Chào mừng đến với EMarket, '+ localStorage.getItem('username') + '!'

  return (
    <div style={{height: '100vh'}}>
      {localStorage.getItem('username') ? welcomeMessage : 'Chào mừng đến với EMarket!'}
    </div>
  )
}
