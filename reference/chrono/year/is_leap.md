# is_leap
* chrono[meta header]
* std::chrono[meta namespace]
* year[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr bool is_leap() const noexcept; // (1) C++20
```

## 概要
うるう年かを判定する。


## 戻り値
コンストラクタで�定されて保持している年を表す値`y`があるとして、以下を返す：

```cpp
return y % 4 == 0 && (y % 100 != 0 || y % 400 == 0);
```


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  // 4年周期のうるう年
  assert(chrono::year{2004}.is_leap());
  assert(chrono::year{2008}.is_leap());
  assert(chrono::year{2012}.is_leap());
  assert(chrono::year{2016}.is_leap());
  assert(chrono::year{2020}.is_leap());

  // 400年周期のうるう年
  assert(chrono::year{1600}.is_leap());
  assert(chrono::year{2000}.is_leap());
  assert(chrono::year{2400}.is_leap());

  // 100年周期は、400年周期でない限り非うるう年
  assert(!chrono::year{1900}.is_leap());
  assert(!chrono::year{2100}.is_leap());
  assert(!chrono::year{2200}.is_leap());
  assert(!chrono::year{2300}.is_leap());
}
```
* is_leap()[color ff0000]

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
