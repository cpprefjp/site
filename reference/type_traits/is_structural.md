# is_structural
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  template <class T>
  struct is_structural;

  template <class T>
  inline constexpr bool is_structural_v = is_structural<T>::value;
}
```

## 概要
型`T`が構造的型 (structural type) であるかを判定する。

構造的型は、定数テンプレートパラメータとして使用できる型である。具体的には以下のいずれかである：

- スカラ型
- 左辺値参照型
- 直接基底クラスとメンバ変数がすべて`public`かつ`mutable`でなく、それらの型がすべて構造的型（または構造的型の配列）であるリテラルクラス型
- キャプチャを持たないラムダ式のクロージャ型

なお、右辺値参照型は構造的型ではない。


## 要件
[`remove_all_extents_t`](remove_all_extents.md)`<T>`が完全型であるか、CV修飾された`void`であること。


## 効果
`is_structural`は、型`T`が構造的型であれば[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。


## 例
```cpp example
#include <type_traits>

struct Structural {
  int x;
  double y;
};

struct NotStructural {
private:
  int x;  // privateメンバがあるため構造的型ではない
};

int main() {
  static_assert(std::is_structural_v<int>);
  static_assert(std::is_structural_v<int&>);
  static_assert(std::is_structural_v<Structural>);
  static_assert(!std::is_structural_v<NotStructural>);
  static_assert(!std::is_structural_v<int&&>);  // 右辺値参照は構造的型ではない
}
```

### 出力
```
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 16 (`-freflection` オプション指定) [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [C++26 静的リフレクション](/lang/cpp26/reflection.md)
- [`std::meta::is_structural_type`](/reference/meta/is_structural_type.md)


## 参照
- [P3856R8 New reflection metafunction - is_structural_type (US NB comment 49)](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3856r8.html)
