# [[maybe_unused]]属性
* cpp17[meta cpp]

## 概要

`[[maybe_unused]]`属性は意図的に未使用の要素を定義していることをコンパイラに伝え、警告を抑制するための属性である。

コンパイラはコンパイル時に未使用の要素（変数や関数など）を検出して警告を出力する場合がある。

プログラマが意図して未使用の要素を定義する場合、コンパイラの警告は無用である。しかし従来は警告を抑制する方法が無いか、あってもコンパイラごとに方法が異なっていた。C++17では`[[maybe_unused]]`属性により意図して未使用の要素を定義していることをコンパイラに伝え、警告を抑制することができる。

## 仕様

`[[maybe_unused]]`属性は、以下の要素に対して指定できる。

* クラスの宣言
* 型の別名宣言
* 変数の宣言
* 非静的メンバ変数の宣言
* 関数の宣言
* 列挙型の宣言
* 列挙子

### クラス宣言での指定
クラス宣言では、`class`／`struct`キーワードとクラス名の間に`[[maybe_unused]]`属性を指定する。

```cpp
class [[maybe_unused]] X;
```

### 型の別名宣言での指定
`using`キーワードによる型の別名宣言の場合は、`=`の前に`[[maybe_unused]]`属性を指定する。

```cpp
using integer [[maybe_unused]] = int;
```

`typedef`キーワードによる型の別名宣言の場合は、`typedef`キーワードの前に`[[maybe_unused]]`属性を指定する。

```cpp
[[maybe_unused]] typedef int integer;
```

### 変数宣言での指定
変数宣言では、先頭に`[[maybe_unused]]`属性を指定する。これは、型、CV修飾、記憶域指定よりも前である。

```cpp
[[maybe_unused]] int x = 0;
```

### 関数宣言での指定
関数宣言では、先頭に`[[maybe_unused]]`属性を指定する。これは、戻り値の型、リンケージ指定よりも前である。ただし、関数テンプレートの場合には、テンプレートパラメータ宣言の後ろに`[[maybe_unused]]`属性を指定する。

```cpp
[[maybe_unused]] void f();

template <class T>
[[maybe_unused]]
inline void f();
```

### 列挙型と列挙子での指定
列挙型では、クラスと同様に`enum`／`enum class`と型名の間に`[[maybe_unused]]`属性を指定する。

列挙子では、列挙子の識別子とカンマの間に`[[maybe_unused]]`属性を指定する。

```cpp
enum class [[maybe_unused]] E {
  A [[maybe_unused]],
  B
};
```


## 例
```cpp example
#define NDEBUG
#include <cassert>

//警告は発生しない
[[maybe_unused]] void f([[maybe_unused]] bool flag1,
                        [[maybe_unused]] bool flag2) {
  [[maybe_unused]] bool b = flag1 && flag2;
  assert(b);
}

//警告が発生する場合がある
void g(bool flag3, bool flag4) {
  bool b2 = flag3 && flag4;
  assert(b2);
}

int main() {
  f(true, true);
  g(true, true);
}
```

### 出力
```
```

### 警告例
clang++ 5.0.0、`-Wall -DNDEBUG` オプションでコンパイルした場合:
```
maybe_unused.cpp:12:8: warning: unused variable 'b2' [-Wunused-variable]
  bool b2 = thing3 && thing4;
       ^
1 warning generated.
```

## 検討されたほかの選択肢

P0068R0では`[[unused]]`という名前で提案されたが、いわゆる自転車置き場の議論の末の投票によって、採用された名前は`[[maybe_unused]]`になった。

## 関連項目
- [C++11 属性構文](/lang/cpp11/attributes.md)

## 参照
- [P0068R0 Proposal of &#91;&#91;unused&#93;&#93;, &#91;&#91;nodiscard&#93;&#93; and &#91;&#91;fallthrough&#93;&#93; attributes.](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0068r0.pdf)
- [P0212R1 Wording for [[maybe_unused]] attribute.](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0212r1.pdf)
