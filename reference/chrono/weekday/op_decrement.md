# operator--
* chrono[meta header]
* std::chrono[meta namespace]
* weekday[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr weekday& operator--() noexcept;   // (1) C++20
constexpr weekday operator--(int) noexcept; // (2) C++20
```

## 概要
`weekday`の値をデクリメントする

- (1) : 前置デクリメント
- (2) : 後置デクリメント


## 効果
- (1) : `*this -=` [`days`](/reference/chrono/duration_aliases.md)`{1}`
- (2) : `--(*this)`


## 戻り値
- (1) : `*this`
- (2) : この関数が呼ばれる前の`*this`のコピーを返す


## 例外
投げない


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  // 前置デクリメント
  {
    chrono::weekday w = chrono::Sunday;

    assert(--w == chrono::Saturday);
    assert(w == chrono::Saturday);
  }

  // 後置デクリメント
  {
    chrono::weekday w = chrono::Sunday;

    assert(w-- == chrono::Sunday);
    assert(w == chrono::Saturday);
  }
}
```
* chrono::Sunday[link /reference/chrono/weekday_constants.md]
* chrono::Saturday[link /reference/chrono/weekday_constants.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0 [mark verified]
- [GCC](/implementation.md#gcc): 9.2 [mark noimpl]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark noimpl]
