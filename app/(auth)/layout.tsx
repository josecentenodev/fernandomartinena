const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="flex justify-center items-center py-10 w-full">
        {children}
      </div>
    )
  }
  
  export default Layout