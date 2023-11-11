# current
* source_location[meta header]
* function[meta id-type]
* std[meta namespace]
* source_location[meta class]
* cpp20[meta cpp]

```cpp
static consteval source_location current() noexcept;
```
* consteval[link /lang/cpp20/immediate_functions.md]
* source_location[link ../source_location.md]

## 概要

この関数を呼び出したソースコード上の位置を表す[`source_location`](../source_location.md)オブジェクトを返す。

## 効果

`current()`という式で呼び出された場合は、処理系定義の値を持つ[`source_location`](../source_location.md)オブジェクトを返す。

このとき、次のことが期待できる。

* `__LINE__`や`__FILE__`と同じように`#line`の影響を受ける。
* [`line()`](line.md)の値は`__LINE__`が表すような行番号であり、1オリジンだが、行番号が不明のときは0になる可能性がある。
* [`column()`](column.md)の値は行頭からのオフセットを表す処理系定義の値で、1オリジンだが、列番号が不明のときは0になる可能性がある。
* [`file_name()`](file_name.md)の値は`__FILE__`が表すような現在のファイル名である。
* [`function_name()`](function_name.md)の値は[`__func__`](/lang/cpp11/func.md)が表すような現在の関数名であり、[`__func__`](/lang/cpp11/func.md)が定義されないような状況では空文字列である。

その他の方法で呼び出されたときは、未規定の有効な値を返す。

## 戻り値

この関数を呼び出した側のソースコード上の位置を表す[`source_location`](../source_location.md)オブジェクト。

## 事後条件
[`file_name`](file_name.md)`()`、[`function_name`](function_name.md)`()`の値は有効なヌル終端バイト文字列(NTBS)である。

## 例外
投げない。

## 備考
* 波カッコまたは`=`による非静的メンバ変数初期化の中で`current()`を使う場合、`current()`の値は初期値が宣言された場所ではなく、その初期化をするに至ったコンストラクタや集成体を指す。
* 引数のデフォルト値に`current()`を使う場合、`current()`の値はデフォルト値が宣言された場所ではなく、その関数の呼び出し側を表す。

```cpp
struct Type {
  source_location loc_ = source_location::current(); // (1)

  Type(source_location loc = source_location::current()) // (2)
    : loc_(loc)
  {
  }

  Type(int) // (3)
  {
  }
};
```

- (1): 非静的メンバ変数の初期化に`current()`を使う
- (2): 引数`loc`はデフォルトで呼び出し側の位置を表す。`loc_`の値はコンストラクタを呼び出した側の位置になる
- (3): このコンストラクタには`loc_`の初期化子がないので、(1)で初期化され、`loc_`の値は(3)のコンストラクタの位置になる

```cpp
void func(source_location a = source_location::current()) {
  source_location b = source_location::current(); // (1)
}

int main() {
  func(); // (2)

  source_location c = source_location::current();
  func(c); // (3)
}
```

- (1): ローカル変数; `b`の値は(1)の行を表す
- (2): デフォルト引数を渡す; `func`の引数`a`の値は(2)の行を指す
- (3): 明示的に引数を渡す; `func`の引数`a`の値は`c`と同じ

## 例
```cpp example
#include <iostream>
#include <source_location>

int main()
{
  const std::source_location location = std::source_location::current();
  std::cout << location.line() << std::endl;
  std::cout << location.column() << std::endl;
  std::cout << location.file_name() << std::endl;
  std::cout << location.function_name() << std::endl;
}
```

### 出力例
```
6
71
prog.cc
int main()
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 11.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 関連項目
- [C++20 即時関数](/lang/cpp20/immediate_functions.md)

## 参照

- [P1208R6 Adopt source_location for C++20](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1208r6.pdf)
