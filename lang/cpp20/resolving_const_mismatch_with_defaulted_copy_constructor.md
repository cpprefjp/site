# デフォルトのコピーコンストラクタと非constなコンストラクタが衝突する問題を修正 [P0641R2]
* cpp20[meta cpp]

<!-- start lang caution -->

このページはC++20に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++17までは以下のように、自身の型の非`const`なオブジェクトをとるコンストラクタをもつクラスを定義し、

```cpp
struct MyType {
  MyType(MyType&);  // パラメータがconstではない
};
```

そのクラスオブジェクトをメンバ変数としてもつクラスを定義し、コピーコンストラクタをデフォルト定義すると、プログラムは不適格となってしまう。

```cpp
template <typename T>
struct Wrapper {
  Wrapper(const Wrapper&) = default;
  T t;
};

Wrapper<MyType> var;  // インスタンス化に失敗する
```

しかし、`Wrapper<MyType>`をコピーしない限り、そのオブジェクトは使えるはずである。これはとくに[`std::tuple`](/reference/tuple/tuple.md)の実装で問題となる。

C++20では、このコードを適格とする。


## 仕様
- 明示的にデフォルト化された特殊メンバ関数のパラメータ型は、暗黙宣言された場合のパラメータ型と以下のように異なることを許可する：
    - 参照修飾が異なる
    - コピーコンストラクタとコピー代入演算子の場合、パラメータの型は「非`const`な`T`への参照」であってもかまわない
- それ以外の方法で型が異なる場合、以下のようになる：
    - 特殊メンバ関数が代入演算子であり、戻り値の型が異なるか、パラメータの型が参照でない場合、 プログラムは不適格となる
    - そうでない場合、その特殊メンバ関数が最初の宣言で明示的にデフォルト化されていれば、その関数は削除されたものとして定義される
    - そうでない場合、プログラムは不適格となる


## 参照
- [P0641R2 Resolving Core Issue #1331 (`const` mismatch with defaulted copy constructor)](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0641r2.html)
