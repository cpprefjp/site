# info
* meta[meta header]
* std::meta[meta namespace]
* type-alias[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  using info = decltype(^^::);
}
```

## 概要
`info`は、リフレクションを表す型である。[リフレクション演算子`^^`](/lang/cpp26/reflection.md)によって生成される値の型であり、プログラム要素（型、名前空間、変数、関数、メンバなど）の情報を保持する。

型の定義において`^^::`はグローバル名前空間のリフレクションを生成する式であり、`decltype(^^::)`はその式の型を取得している。`^^`で生成されるリフレクションはすべて同じ`info`型を持つ。

- スカラ型であり、クラス型ではない
- `==`と`!=`をサポートするが、順序比較（`<`, `>`, `<=>`）はサポートしない
- 構造的型であり、定数テンプレートパラメータとして使用できる
- consteval-only型であり、実行時には存在できない

2つのリフレクションは、同じエンティティを反映している場合に等値となる。

### ヌルリフレクション
`info`型にはヌルリフレクション (null reflection) と呼ばれる特別な値が存在する。ヌルリフレクション以外の各リフレクションは、型、名前空間、変数、関数などのプログラム構成要素を表す。ヌルリフレクションは`info{}`で生成できる。


## 例
```cpp example
#include <meta>
#include <print>

// 定数テンプレートパラメータとして使用
template <std::meta::info R>
using type_of_reflection = typename[:R:];

int main() {
  // 同じエンティティを反映するリフレクションは等値
  static_assert(^^int == ^^int);
  static_assert(^^int != ^^double);

  // グローバル名前空間のリフレクション
  constexpr auto global_ns = ^^::;
  static_assert(std::meta::is_namespace(global_ns));

  // ヌルリフレクション
  constexpr auto null = std::meta::info{};
  static_assert(null == std::meta::info{});
  static_assert(null != ^^int);

  // テンプレート引数として使用
  static_assert(std::is_same_v<type_of_reflection<^^int>, int>);
}
```
* std::meta::is_namespace[link is_namespace.md]

### 出力
```
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 16 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
