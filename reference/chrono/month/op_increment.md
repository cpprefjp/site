# operator++
* chrono[meta header]
* std::chrono[meta namespace]
* month[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr month& operator++() noexcept;   // (1) C++20
constexpr month operator++(int) noexcept; // (2) C++20
```

## 概要
`month`の値をインクリメントする

- (1) : 前置インクリメント
- (2) : 後置インクリメント


## 効果
- (1) : `*this +=` [`months`](/reference/chrono/duration_aliases.md)`{1}`
- (2) : `++(*this)`


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
  // 前置インクリメント
  {
    chrono::month m = chrono::January;

    assert(++m == chrono::February);
    assert(m == chrono::February);
  }

  // 後置インクリメント
  {
    chrono::month m = chrono::January;

    assert(m++ == chrono::January);
    assert(m == chrono::February);
  }
}
```
* chrono::January[link /reference/chrono/month_constants.md]
* chrono::February[link /reference/chrono/month_constants.md]

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
