import BusinessIntelligenceForm from '@/components/dashboard/businesses/businessSettings/BusinessIntelligenceForm'
import SettingHeader from '@/components/dashboard/businesses/businessSettings/SettingHeader'
import React from 'react'

const page = () => {
  return (
    <div>
        <SettingHeader backButton saveButton />

        <BusinessIntelligenceForm  />
    </div>
  )
}

export default page
