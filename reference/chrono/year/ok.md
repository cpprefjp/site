# ok
* chrono[meta header]
* std::chrono[meta namespace]
* year[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr bool ok() const noexcept; // (1) C++20
```

## 概要
`year`オブジェクトが保持する年の値が`[min(), max()]`の範囲内かを判定する。


## 戻り値
コンストラクタで�定されて保持している年を表す値`y`があるとして、以下を返す：

```cpp
return min().y <= y && y <= max().y;
```
* min()[link min.md]
* max()[link max.md]


## 備考
- コンストラクタでこの範囲外の値が指定された場合、保持される値は未規定になる。そのため関数は、値の妥当性を検証することになる


## 例
```cpp example
#include <cassert>
#include <chrono>

namespace chrono = std::chrono;

int main()
{
  chrono::year y{2020};
  assert(y.ok());

  assert(chrono::year{-32767}.ok());
  assert(chrono::year{32767}.ok());
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


## 参照
- [LWG Issue 3209. Expression in `year::ok()` returns clause is ill-formed](https://wg21.cmeerw.net/lwg/issue3209)
