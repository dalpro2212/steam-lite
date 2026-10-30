import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Lock } from 'lucide-react'

const isNotExpired = (value) => {
  if (!value || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) return false
  const [mm, yy] = value.split('/').map(Number)
  const now = new Date()
  const curYY = now.getFullYear() % 100
  const curMM = now.getMonth() + 1
  return yy > curYY || (yy === curYY && mm >= curMM)
}

const validationSchema = Yup.object({
  fullName: Yup.string()
    .trim()
    .min(3, 'Escribe al menos 3 caracteres')
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, 'Solo se permiten letras')
    .required('El nombre es obligatorio'),
  email: Yup.string().email('Correo electrónico inválido').required('El correo es obligatorio'),
  cardNumber: Yup.string()
    .test('len', 'La tarjeta debe tener 16 dígitos', (v) => (v || '').replace(/\s/g, '').length === 16)
    .required('El número de tarjeta es obligatorio'),
  expiry: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Formato MM/AA')
    .test('not-expired', 'La tarjeta está vencida', isNotExpired)
    .required('La fecha es obligatoria'),
  cvv: Yup.string()
    .matches(/^\d{3,4}$/, 'El CVV debe tener 3 o 4 dígitos')
    .required('El CVV es obligatorio'),
  acceptTerms: Yup.boolean().oneOf([true], 'Debes aceptar los términos para continuar'),
})

const inputClass = (hasError) =>
  `w-full bg-slate-950 text-white placeholder-slate-500 px-4 py-2 rounded-lg border focus:outline-none transition-colors ${
    hasError ? 'border-red-500 focus:border-red-500' : 'border-slate-700 focus:border-cyan-500'
  }`

const Field = ({ label, error, touched, children }) => (
  <div>
    <label className="block text-sm font-medium text-slate-300 mb-1">{label}</label>
    {children}
    {touched && error && <p className="text-red-400 text-xs mt-1">{error}</p>}
  </div>
)

export const CheckoutForm = ({ total, onSuccess }) => {
  const formik = useFormik({
    initialValues: { fullName: '', email: '', cardNumber: '', expiry: '', cvv: '', acceptTerms: false },
    validationSchema,
    onSubmit: async () => {
      // Simula el procesamiento del pago
      await new Promise((resolve) => setTimeout(resolve, 1500))
      onSuccess()
    },
  })

  const { values, errors, touched, handleBlur, handleChange, setFieldValue, isSubmitting } = formik
  const bad = (name) => touched[name] && Boolean(errors[name])

  const onCardChange = (e) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 16)
    setFieldValue('cardNumber', digits.replace(/(.{4})/g, '$1 ').trim())
  }

  const onExpiryChange = (e) => {
    let digits = e.target.value.replace(/\D/g, '').slice(0, 4)
    if (digits.length > 2) digits = `${digits.slice(0, 2)}/${digits.slice(2)}`
    setFieldValue('expiry', digits)
  }

  const onCvvChange = (e) => setFieldValue('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))

  return (
    <form onSubmit={formik.handleSubmit} noValidate className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
      <h2 className="text-lg font-bold text-white flex items-center gap-2">
        <Lock size={18} className="text-cyan-400" /> Datos de pago (simulación)
      </h2>

      <Field label="Nombre completo" error={errors.fullName} touched={touched.fullName}>
        <input name="fullName" placeholder="Juan Pérez" value={values.fullName} onChange={handleChange} onBlur={handleBlur} className={inputClass(bad('fullName'))} />
      </Field>

      <Field label="Correo electrónico" error={errors.email} touched={touched.email}>
        <input name="email" type="email" placeholder="correo@ejemplo.com" value={values.email} onChange={handleChange} onBlur={handleBlur} className={inputClass(bad('email'))} />
      </Field>

      <Field label="Número de tarjeta" error={errors.cardNumber} touched={touched.cardNumber}>
        <input name="cardNumber" inputMode="numeric" placeholder="1234 5678 9012 3456" value={values.cardNumber} onChange={onCardChange} onBlur={handleBlur} className={inputClass(bad('cardNumber'))} />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Vencimiento" error={errors.expiry} touched={touched.expiry}>
          <input name="expiry" inputMode="numeric" placeholder="MM/AA" value={values.expiry} onChange={onExpiryChange} onBlur={handleBlur} className={inputClass(bad('expiry'))} />
        </Field>
        <Field label="CVV" error={errors.cvv} touched={touched.cvv}>
          <input name="cvv" inputMode="numeric" placeholder="123" value={values.cvv} onChange={onCvvChange} onBlur={handleBlur} className={inputClass(bad('cvv'))} />
        </Field>
      </div>

      <div>
        <label className="flex items-start gap-2 text-sm text-slate-300 cursor-pointer">
          <input type="checkbox" name="acceptTerms" checked={values.acceptTerms} onChange={handleChange} onBlur={handleBlur} className="mt-1 accent-cyan-500" />
          Acepto los términos y condiciones (compra simulada, no se realiza ningún cobro real).
        </label>
        {touched.acceptTerms && errors.acceptTerms && <p className="text-red-400 text-xs mt-1">{errors.acceptTerms}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 rounded-lg font-bold bg-cyan-500 text-black hover:bg-cyan-400 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? 'Procesando pago...' : `Pagar $${total.toFixed(2)}`}
      </button>
    </form>
  )
}
