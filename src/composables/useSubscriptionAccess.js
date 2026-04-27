import { computed } from 'vue'

import { useSubscriptionStore } from '@/stores/subscriptions'

export function useSubscriptionAccess() {
  const subscriptionStore = useSubscriptionStore()

  const activeSubscriptions = computed(() =>
    subscriptionStore.list.filter((subscription) => subscription.status === 'active'),
  )

  const canAccessProfessor = (professorId) =>
    activeSubscriptions.value.some((subscription) => {
      const ownerId =
        subscription.professorId ||
        subscription.professor?.id ||
        subscription.plan?.professorId ||
        subscription.plan?.professor?.id
      return Number(ownerId) === Number(professorId)
    })

  const canAccessFeature = (professorId, feature) =>
    activeSubscriptions.value.some((subscription) => {
      const ownerId =
        subscription.professorId ||
        subscription.professor?.id ||
        subscription.plan?.professorId ||
        subscription.plan?.professor?.id
      const features = subscription.plan?.features || subscription.features || []
      return Number(ownerId) === Number(professorId) && features.some((item) => item === feature)
    })

  return {
    activeSubscriptions,
    canAccessProfessor,
    canAccessFeature,
  }
}
