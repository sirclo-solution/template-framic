import { FC, ReactNode } from 'react'
import { GTMProvider } from '@elgorditosalsero/react-gtm-hook'

type GoogleTagManagerPropType = {
  containerID: string
  children: ReactNode
};

const GoogleTagManager: FC<GoogleTagManagerPropType> = ({
  containerID,
  children,
}) => {

  return containerID ? (
    <GTMProvider state={{ id: containerID }}>{children}</GTMProvider>
  ) : (
    <>{children}</>
  )
}

export default GoogleTagManager