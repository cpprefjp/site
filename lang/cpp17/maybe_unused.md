# [[maybe_unused]]属性
* cpp17[meta cpp]

## 概要

`[[maybe_unused]]`属性は意図的に未使用の要素を定義していることをコンパイラに伝え、警告を抑制するための属性である。

コンパイラはコンパイル時に未使用の要素（変数や関数など）を検出して警告を出力する場合がある。

プログラマが意図して未使用の要素を定義する場合、コンパイラの警告は無用であるが、要素ごとに警告を抑制する方法が無かった。`[[maybe_unused]]`属性により意図して未使用の要素を定義していることをコンパイラに伝え、警告を抑制することができる。

## 仕様

`[[maybe_unused]]`属性は、以下の要素に対して指定できる。

* クラスの宣言
* 型の別名宣言
* 変数の宣言
* 非静的メンバ変数の宣言
* 関数の宣言
* 列挙型の宣言
* 列挙子

## 例
```cpp
#include <cassert>

[[maybe_unused]] void f([[maybe_unused]] bool thing1,
                        [[maybe_unused]] bool thing2) {
  [[maybe_unused]] bool b = thing1 && thing2;
  assert(b);
}
```

### 出力
```
(対応コンパイラがあれば、コンパイル結果を後ほど記述)
```

## 検討されたほかの選択肢

P0068R0では`[[unused]]`という名前で提案されたが、最終的に採用された名前は`[[maybe_unused]]`である。

(理由は未調査)

## 参照
- [P0068R0 Proposal of [[unused]], [[nodiscard]] and [[fallthrough]] attributes.](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0068r0.pdf)
- [P0212R1 Wording for [[maybe_unused]] attribute.](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0212r1.pdf)
