# dangling
* ranges[meta header]
* std::ranges[meta namespace]
* class[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  struct dangling {
    constexpr dangling() noexcept = default;

    template<class... Args>
    constexpr dangling(Args&&...) noexcept { }
  };
}
```

## 概要

`dangling`は、イテレータまたはRangeがダングリングであることを示す型である。

この型のオブジェクトは、イテレータまたはRangeを返す関数において、それらがダングリングとなることがコンパイル時にわかる場合に、代わりに返されることがある。

`dangling`自身はイテレータでもRangeでもないため、呼び出し側でそれらを期待したコードを書いていればコンパイルエラーとなる。その結果、ダングリングイテレータ/Rangeにアクセスするというエラーをコンパイル時に発見することができる。

## メンバ関数
### 構築・破棄

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| `(constructor)` | コンストラクタ | C++20          |

## 例

```cpp example
#include <ranges>
#include <vector>

using namespace std;

vector<int> f(){ return {}; }

int main()
{
  // borrowed_rangeではないRangeのrvalueが渡された場合、danglingが返る
  auto result1 = ranges::find(f(), 42);
  static_assert(same_as<decltype(result1), ranges::dangling>);

  // lvalueが渡された場合、danglingにはならない
  auto vec = f();
  auto result2 = ranges::find(vec, 42);
  static_assert(same_as<decltype(result2), vector<int>::iterator>);

  // borrowed_rangeのrvalueが渡された場合、danglingにはならない
  auto result3 = ranges::find(ranges::subrange{vec}, 42);
  static_assert(same_as<decltype(result3), vector<int>::iterator>);
}
```
* ranges::dangling[color ff0000]
* ranges::find[link /reference/algorithm/ranges_find.md]
* ranges::subrange[link subrange.md]
* borrowed_range[link borrowed_range.md]

### 出力
```
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]

## 参照
- [N4861 24 Ranges library](https://timsong-cpp.github.io/cppwp/n4861/ranges)
- [C++20 ranges](https://techbookfest.org/product/5134506308665344)
