# [[nodiscard]]属性 [P0189R1]
* cpp17[meta cpp]

<!-- start lang caution -->

このページはC++17に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要

`[[nodiscard]]`属性は関数の戻り値を破棄してはならないことをコンパイラに伝え、破棄した場合に警告するための属性である。

例えばエラーを無視して処理を続行してはならない関数があったとき、プログラマが間違えてエラーを無視してしまった場合に、コンパイル時に警告を発生させることができる。

従来は戻り値の破棄に対して警告を発生させる方法がコンパイラごとに異なり、標準的な方法はなかった。C++17では`[[nodiscard]]`属性により戻り値を破棄してはならないことをコンパイラに伝え、警告を発生させられる。

## 仕様

`[[nodiscard]]`属性は、以下の要素に対して指定できる。

* 関数宣言
* クラスもしくは列挙型の宣言

## 例
```cpp example
//無視してはいけないデータ型
struct [[nodiscard]] error_info {};

error_info f() { return error_info{}; }

//関数の戻り値を必ず使用すること
[[nodiscard]] int g() { return 0; }

int main() {
  f(); //無視してはいけない型を無視したため、警告が発生するだろう
  g(); //戻り値を無視したため、警告が発生するだろう
}
```

### 出力
```
```

### 警告例
clang++ 5.0.0 でコンパイルした場合:
```
nodiscard.cpp:10:3: warning: ignoring return value of function declared with 'nodiscard' attribute [-Wunused-result]
  f(); //無視してはいけない型を無視したため、警告が発生するだろう
  ^
nodiscard.cpp:11:3: warning: ignoring return value of function declared with 'nodiscard' attribute [-Wunused-result]
  g(); //戻り値を無視しているため、警告が発生するだろう
  ^
2 warnings generated.
```

## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++11 属性構文](/lang/cpp11/attributes.md)
- [C++20 `[[nodiscard]]`をコンストラクタのオーバーロードごとに付加できるようにする](/lang/cpp20/nodiscard_for_constructors.md)
    - C++17対応のコンパイラでも使用できる可能性がある
- [C++20 `[[nodiscard]]`属性に理由となる文字列を付加できるようにする](/lang/cpp20/nodiscard_should_have_a_reason.md)
- [C++23 ラムダ式に対する属性](/lang/cpp23/attributes_on_lambda_expressions.md)


## 参照
- [P0068R0 Proposal of &#91;&#91;unused&#93;&#93;, &#91;&#91;nodiscard&#93;&#93; and &#91;&#91;fallthrough&#93;&#93; attributes.](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0068r0.pdf)
- [P0189R1 Wording for [[nodiscard]] attribute.](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0189r1.pdf)
