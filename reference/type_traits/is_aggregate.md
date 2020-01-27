# is_aggregate
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class T>
  struct is_aggregate;

  template <class T>
  inline constexpr bool is_aggregate_v = is_aggregate<T>::value;
}
```

## 概要
型`T`が集成体かを調べる。

集成体は、ユーザー定義のコンストラクタを持つことなく、初期化�リストによる初期化 (集成体初期化, aggregate initialization) ができる型である。

```cpp
struct Point {
  int x, y; // ユーザー定義のコンストラクタを持たない
};

Point x {3, 1}; // 初期化�リストによる初期化

Point ar[] = { // 配列の初期化�リストで、要素ごとの初期化�を初期化�リストで記述
  {1, 2},
  {3, 4},
  {5, 6}
};
```

型`T`が集成体であるための条件は以下である：

- ユーザー定義されたコンストラクタ、`explicit`なコンストラクタ、継承コンストラクタを持たない
- `private`／`protected`な非静的メンバ変数を持たない
- 仮想関数を持たない
- 仮想基底クラス、`private`／`protected`基底クラスを持たない


## 要件
[`remove_all_extents_t`](remove_all_extents.md)`<T>`した結果の型が、完全型であるか、`const/volatile`修飾された (あるいはされていない) `void`でなければならない。


## 効果
`is_aggregate`は、型`T`が集成体であれば[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。


## 例
```cpp example
#include <type_traits>
#include <array>

struct Point {
  int x, y;
};

int main()
{
  static_assert(std::is_aggregate<Point>{});
  static_assert(std::is_aggregate<int[3]>{});
  static_assert(std::is_aggregate<Point[3]>{});
  static_assert(std::is_aggregate<std::array<Point, 3>>{});
}
```
* std::is_aggregate[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 5.0
- [GCC](/implementation.md#gcc): 7.2
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [LWG Issue 2911. An `is_aggregate` type trait is needed](https://wg21.cmeerw.net/lwg/issue2911)
