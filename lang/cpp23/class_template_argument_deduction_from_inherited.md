# 継承コンストラクタからのクラステンプレート引数の推論 [P2582R1]
* cpp23[meta cpp]

<!-- start lang caution -->

このページはC++23に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++23では、派生クラスで定義した継承コンストラクタからでも、クラステンプレート引数を推論できるようになる。


基本的な例：

```cpp
template <typename T>
struct B {
  B(T);
};

template <typename T>
struct C : public B<T> {
  using B<T>::B;
};

template <typename T>
struct D : public B<T> {};

C c(42); // C++23:OK, C<int>に推論される
D d(42); // エラー！推論失敗。推論補助が継承されていない

B(int) -> B<char>; // 推論補助を追加定義
C c2(42); // OK。C<char>に推論される

template <typename T>
struct E : public B<int> {
  using B<int>::B;
};

E e(42); // エラー！推論失敗。Eのテンプレート引数を推論補助から推論できない
```


派生クラスもテンプレート引数をもつ場合：

```cpp
template <typename T, typename U, typename V>
struct F {
  F(T, U, V);
};

template <typename T, typename U>
struct G : F<U, T, int> {
  using G::F::F;
};

G g(true, 'a', 1); // OK。G<char, bool>に推論される
```


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++11 継承コンストラクタ](/lang/cpp11/inheriting_constructors.md)
- [C++17 クラステンプレートのテンプレート引数推論](/lang/cpp17/type_deduction_for_class_templates.md)


## 参照
- [P2582R1 Wording for class template argument deduction from inherited constructors](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2582r1.pdf)