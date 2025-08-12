import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

type FormData = {
  name: string
  email: string
  phone: string
  address?: string
  message?: string
  language?: 'en' | 'es' | 'pl'
}

const Contact = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>()
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const { t } = useLanguage()

  const onSubmit = async (data: FormData) => {
    setStatus('loading')
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
      reset()
    } catch (e) {
      console.error(e)
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-24 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold">{t('contact.title')}</h2>
        <p className="text-gray-400 mt-4 max-w-2xl">
          {t('contact.subtitle')}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-10 grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-400">{t('contact.nameLabel')}</label>
            <input className="mt-1 w-full bg-noir-800 border border-gray-700 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-primary" 
              {...register('name', { required: true })} />
            {errors.name && <p className="text-red-400 text-sm mt-1">{t('contact.required')}</p>}
          </div>

          <div>
            <label className="block text-sm text-gray-400">{t('contact.emailLabel')}</label>
            <input type="email" className="mt-1 w-full bg-noir-800 border border-gray-700 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-primary" 
              {...register('email', { required: true })} />
            {errors.email && <p className="text-red-400 text-sm mt-1">{t('contact.required')}</p>}
          </div>

          <div>
            <label className="block text-sm text-gray-400">{t('contact.phoneLabel')}</label>
            <input className="mt-1 w-full bg-noir-800 border border-gray-700 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-primary" 
              {...register('phone', { required: true })} />
            {errors.phone && <p className="text-red-400 text-sm mt-1">{t('contact.required')}</p>}
          </div>

          <div>
            <label className="block text-sm text-gray-400">{t('contact.addressLabel')}</label>
            <input className="mt-1 w-full bg-noir-800 border border-gray-700 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-primary" 
              {...register('address')} />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm text-gray-400">{t('contact.messageLabel')}</label>
            <textarea className="mt-1 w-full bg-noir-800 border border-gray-700 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-primary" rows={5}
              {...register('message')} />
          </div>

          <div>
            <label className="block text-sm text-gray-400">{t('contact.languageLabel')}</label>
            <select className="mt-1 w-full bg-noir-800 border border-gray-700 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-primary" 
              {...register('language')}
            >
              <option value="en">{t('contact.languageEn')}</option>
              <option value="es">{t('contact.languageEs')}</option>
              <option value="pl">{t('contact.languagePl')}</option>
            </select>
          </div>

          <div className="md:col-span-2 flex items-center gap-4">
            <button type="submit" className="bg-gradient-to-r from-accent-primary to-accent-secondary text-white px-8 py-3 rounded-lg font-semibold shadow-glow">
              {t('contact.submitButton')}
            </button>
            {status === 'loading' && <p className="text-gray-400">{t('contact.sending')}</p>}
            {status === 'success' && <p className="text-green-400">{t('contact.success')}</p>}
            {status === 'error' && <p className="text-red-400">{t('contact.error')}</p>}
          </div>
        </form>
      </div>
    </section>
  )
}

export default Contact