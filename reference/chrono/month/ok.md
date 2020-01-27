# ok
* chrono[meta header]
* std::chrono[meta namespace]
* month[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr bool ok() const noexcept; // (1) C++20
```

## 概要
`month`オブジェクトが保持する月の値が`[1, 12]`の範囲内かを判定する。


## 戻り値
コンストラクタで�定されて保持している月を表す値`m`があるとして、以下を返す：

```cpp
return 1 <= m && m <= 12;
```


## 備考
- この関数は、値の妥当性を検証するのではなく、カレンダー範囲の値をもっているかの判定をする


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  chrono::month m{1};
  assert(m.ok());

  assert(!chrono::month{0}.ok());
  assert(!chrono::month{13}.ok());
}
```
* ok()[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0
- [GCC](/implementation.md#gcc): (9.2時点で実装なし)
- [Visual C++](/implementation.md#visual_cpp): (2019 Update 3時点で実装なし)
