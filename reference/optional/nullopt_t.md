# nullopt_t
* optional[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  struct nullopt_t {以下参照};
  inline constexpr nullopt_t nullopt {unspecified};
}
```
* unspecified[italic]

## 概要
`nullopt_t`は、実装を持たない空のクラスである。この型は、[`std::optional`](/reference/optional/optional.md)クラスにおいて、有効な値を保持していない状態を表すために使用される。

この型の値を持つ`nullopt`定数を[`std::optional`](/reference/optional/optional.md)クラスのオブジェクトに代入することで、有効な値を保持していない状態にできる。

`nullopt_t`クラスは、デフォルトコンストラクタおよび初期化�リストコンストラクタを持たない。これは、`nullopt`変数を`nullopt_t`型の唯一の値とするためである。また、`nullopt_t`は[集成体](/reference/type_traits/is_aggregate.md)ではない。これは`optional<T> opt = {};`を曖昧にしないためである。


## 例
```cpp example
#include <cassert>
#include <optional>

int main()
{
  std::optional<int> p;
  assert(!p); // デフォルトでは有効な値を持たない (nullopt状態)

  p = 3; // 有効値を代入
  assert(p); // 有効な値を持つ

  p = std::nullopt; // 無効値を代入
  assert(!p); // 有効な値を持たない
}
```
* std::nullopt[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0.1
- [GCC](/implementation.md#gcc): 7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`std::optional`](/reference/optional/optional.md)クラス


## 参照
- [LWG Issue 2736. `nullopt_t` insufficiently constrained](https://wg21.cmeerw.net/lwg/issue2736)
