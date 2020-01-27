# 初期化式をともなう範囲for文
* cpp20[meta cpp]

## 概要
if文、switch文、for文と同様に、範囲for文でもそのスコープで使用する変数の初期化ができるよう構文を追加する。

これにより、範囲for文で使用するための変数を、範囲for文のスコープ外 (前) で宣言しなくてもよくなり、範囲for文用の変数のスコープを限定できるようになる。

従来の範囲for文で記述していた以下のようなプ�グラムは、

```cpp
{
  T thing = f();
  for (auto& x : thing.items()) {
    // 注: "for (auto& x : f().items())" のように書いてはならない
    mutate(&x);
    log(x);
  }
}
```

C++20では、初期化式をともなう範囲for文を使用して、以下のように記述できる：

```cpp
for (T thing = f(); auto& x : thing.items()) {
  mutate(&x);
  log(x);
}
```
* T thing = f();[color ff0000]

また同様に、範囲for文にインデックスを持たせる以下のようなプ�グラムは、

```cpp
{
  std::size_t i = 0;
  for (const auto& x : foo()) {
    bar(x, i);
    ++i;
  }
}
```

C++20では以下のように記述できる：

```cpp
for (std::size_t i = 0; const auto& x : foo()) {
  bar(x, i);
  ++i;
}
```
* std::size_t i = 0;[color ff0000]


## 仕様
新たな範囲for文の構文は、以下の通り：

```cpp
init-statement:
  expression-statement
  simple-declaration

iteration-statement:
  for ( init-statement opt for-range-declaration : for-range-initializer ) statement
```

この改定では、範囲for文に初期化式であるinit-statement (セミコ�ン含む) が省略可能として追加になる。

範囲for文のfor文への展開は以下のようになる：

```cpp
{
  init-statement opt
  auto &&__range = for-range-initializer ;
  auto __begin = begin-expr ;
  auto __end = end-expr ;
  for ( ; __begin != __end; ++__begin ) {
    for-range-declaration = *__begin;
    statement
  }
}
```

## 例
```cpp example
#include <iostream>
#include <vector>

class X {
  std::vector<int> data_ = {1, 2, 3};
public:
  std::vector<int>& items() { return data_; }
};

X foo() { return X{}; }

int main()
{
  for (auto thing = foo(); auto& x : thing.items()) {
    // 要素を書き換えた結果を使ってなにかする
    ++x;
    std::cout << x << std::endl;
  }
}
```
* auto thing = foo();[color ff0000]

### 出力
```
2
3
4
```


## 関連項目
- [C++17 if文とswitch文の条件式と初期化を分離](/lang/cpp17/selection_statements_with_initializer.md)


## 参照
- [P0614R1 Range-based for statements with initializer](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0614r1.html)
