// субъективную оценку сложности 3/10
// предварительную оценку трудозатрат 50 мин
// фактические трудозатраты - 45 мин
// оценка сложности - O(1+K) где K - количество isins (isins.join(',') в коде). Такая сложность чисто из-за ограничения maxCacheSize. В противном случае были бы проблемы памяти.
// P.S. - не уточняется место хранение кеша, для простоты использую объект. Не уточняется как реализовать, сделал просто по прошлым запросам. (посложнее если запоминаем комбинацию date и isins и запрашиваем только недостающие isins) добавил ограничение размера кеша в функцию

const getBondsData = async ({ date, isins }) => {
  // Все эти данные, лучше вынести во вне. Но в ТЗ изминать код функции =)
  if (getBondsData.cache === undefined) {
    getBondsData.cache = {} // Кэш для хранения результатов
    getBondsData.keys = [] // Массив для отслеживания порядка ключей
    getBondsData.maxCacheSize = 10 // Максимальный размер кэша
  }
  // Ключ для хранения в кэше
  const cacheKey = `${date}-${isins.join(',')}`
  // Попытка получить данные из кэша
  if (getBondsData.cache[cacheKey]) return getBondsData.cache[cacheKey]

  // Если данных в кэше нет, делаем запрос
  const result = await http.post({
    url: `/bonds/${date}`,
    body: isins,
  })

  // Добавляем результат в кэш
  getBondsData.cache[cacheKey] = result
  getBondsData.keys.push(cacheKey)

  // Проверяем размер кэша
  if (getBondsData.keys.length > getBondsData.maxCacheSize) {
    // Удаляем самый старый ключ и данные из кэша
    const oldestKey = getBondsData.keys.shift()
    delete getBondsData.cache[oldestKey]
  }

  return result
}

// Пример вызова функции:
getBondsData({
  date: '20180120',
  isins: ['XS0971721963', 'RU000A0JU4L3'],
})
