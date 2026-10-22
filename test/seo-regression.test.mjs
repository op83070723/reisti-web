import test from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

function sourceFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) return sourceFiles(path)
    return /\.(?:vue|js)$/.test(entry.name) ? [path] : []
  })
}

test('首頁與 OEM title 保留台灣搜尋意圖', () => {
  const router = readFileSync(join(ROOT, 'src/router/index.js'), 'utf8')
  const titleFor = name => {
    // 次の route object へ越境させず、その route 自身の meta.title のみを取得する。
    const match = router.match(new RegExp(`name:\\s*'${name}'(?:(?!\\n\\s*\\{\\s*path:)[\\s\\S])*?title:\\s*'([^']*)'`))
    assert.ok(match, `${name} route の meta.title が見つかりません`)
    return match[1]
  }

  const homeTitle = titleFor('home')
  assert.ok(homeTitle.includes('台湾'), 'GSC 非ブランド主力字「台湾 工具 oem」：home title に「台湾」がありません')

  const oemTitle = titleFor('oem')
  assert.ok(oemTitle.includes('台湾'), 'GSC 非ブランド主力字「台湾 工具 oem」：oem title に「台湾」がありません')
})

test('原始碼不將產品描述為台灣製', () => {
  for (const path of sourceFiles(join(ROOT, 'src'))) {
    assert.doesNotMatch(
      readFileSync(path, 'utf8'),
      /台湾製/,
      `${path}: 自家工廠在中國，不得將產品描述為「台湾製」`,
    )
  }
})
