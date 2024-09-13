# 関数宣言を削除する理由を指定できるようにする [P2573R2]
* cpp26[meta cpp]

<!-- start lang caution -->

このページはC++26に採用される見込みの言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++26では、関数をdelete宣言する際に、その理由をコンパイル時文字列で指定できるようになる。

```cpp
// 別名の新たなAPIを用意する場合に、そちらに誘導する
void newapi();
void oldapi() = delete("This old API is outdated and already been removed. Please use newapi() instead.");

template <typename T>
struct A {/* … */};

// 一部のオーバーロードが危険であるために禁止する場合
template<typename T>
A<T> factory(const T&) {/* process lvalue */}
template<typename T>
A<T> factory(const T&&) = delete("Using rvalue to construct A may result in dangling reference");

// 一部の自動定義される特殊メンバ関数が
// 低パフォーマンスを引き起こすために禁止する場合
struct MoveOnly {
  // … (with move members defaulted or defined)
  MoveOnly(const MoveOnly&) = delete("Copy-construction is expensive; please use move construction instead.");
  MoveOnly& operator=(const MoveOnly&) = delete("Copy-assignment is expensive; please use move assignment instead.");
};
```

これまでは削除理由を指定できなかったために、ユーザーが誤って削除済み関数にアクセスした際に「エラー！：削除された関数を呼び出そうとした」という情報しか得られなかった。削除理由が指定できるようになることで、その設計意図をユーザーに伝えられるようになる。



## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++11 関数のdefault／delete宣言](/lang/cpp11/defaulted_and_deleted_functions.md)


## 参照
- [P2573R2 `= delete("should have a reason");`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2573r2.html)
