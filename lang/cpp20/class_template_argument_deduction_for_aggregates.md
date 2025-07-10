# 集成体クラステンプレートのテンプレート引数推論 [P1816R0]
* cpp20[meta cpp]

<!-- start lang caution -->

このページはC++20に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++17で導入されたクラステンプレートのテンプレート引数推論は、コンストラクタ引数からテンプレート引数を推論するものであった。

C++20では、ユーザー定義のコンストラクタをもたない集成体クラステンプレートの初期化からクラステンプレート引数を推論できるようにする。

```cpp
template <class T>
struct Point {
  T x;
  T y;
};

Point p1{3.0, 4.0}; // C++17:NG C++20:OK
```


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++17 クラステンプレートのテンプレート引数推論](/lang/cpp17/type_deduction_for_class_templates.md)


## 参照
- [P1021R4 Filling holes in Class Template Argument Deduction](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1021r4.html)
    - 提案の元になった文書
- [P1816R0 Wording for class template argument deduction for aggregates](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1816r0.pdf)
    - C++20に採択された提案文書
