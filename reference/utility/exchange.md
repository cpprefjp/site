# exchange
* utility[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp14[meta cpp]

```cpp
namespace std {
  template <class T, class U=T>
  T exchange(T& obj, U&& new_val);           // (1) C++14

  template <class T, class U=T>
  constexpr T exchange(T& obj, U&& new_val); // (1) C++20

  template <class T, class U=T>
  constexpr T exchange(T& obj, U&& new_val)
    noexcept(see below);                     // (1) C++23
}
```
* see below[italic]

## 概要
値を書き換え、書き換え前の値を返す。


## 効果
第1パラメータ`obj`で受け取った変数への参照に、第2パラメータ`new_val`の値をコピー代入または可能ならムーブ代入し、代入前の`obj`の状態を返す。

以下と等価の効果を持つ：

```cpp
T old_val = std::move(obj);
obj = std::forward<U>(new_val);
return old_val;
```
* std::move[link move.md]


## 戻り値
この関数を呼び出す前の、第1パラメータ`obj`の状態を返す。


## 例外
C++23から : 例外指定の式は次と等価 : [`is_nothrow_move_constructible_v`](/reference/type_traits/is_nothrow_move_constructible.md)`<T> &&` [`is_nothrow_assignable_v`](/reference/type_traits/is_nothrow_assignable.md)`<T&, U>`


## 備考
この関数は、[`std::atomic_exchange()`](/reference/atomic/atomic_exchange.md)関数の経験から導入された。


## 例
### 基本的な使い方
```cpp example
#include <iostream>
#include <utility>

int main()
{
  int state = 1;
  int before = std::exchange(state, 2);

  std::cout << "state : " << state << std::endl;
  std::cout << "before : " << before << std::endl;
}
```
* std::exchange[color ff0000]

#### 出力
```
state : 2
before : 1
```


### コンテナを出力する例
```cpp example
#include <iostream>
#include <utility>
#include <vector>

template <class T>
void print_1(const std::vector<T>& v)
{
  // カンマ区切りでvectorを出力する。
  // 区切り文字は、各要素の後ではなく、前に置くと考える。
  // 最初の要素のみ区切り文字を出力しない。

  bool first = true;

  std::cout << '{';
  for (const T& x : v) {
    if (!std::exchange(first, false)) {
      std::cout << ',';
    }
    std::cout << x;
  }
  std::cout << '}' << std::endl;
}

// 別な書き方
template <class T>
void print_2(const std::vector<T>& v)
{
  const char* delimiter = "";

  std::cout << '{';
  for (const T& x : v) {
    std::cout << std::exchange(delimiter, ",") << x;
  }
  std::cout << '}' << std::endl;
}


int main()
{
  const std::vector<int> v = {1, 2, 3};
  print_1(v);
  print_2(v);
}
```
* std::exchange[color ff0000]

#### 出力
```
{1,2,3}
{1,2,3}
```


### ムーブ後オブジェクトの状態をリセットする
```cpp
#include <iostream>
#include <string>
#include <utility>

struct A {};

struct X {
  std::string str;
  int* p = nullptr;

  X() = default;

  // ムーブ構築しつつ、ムーブされたオブジェクトは空にする。
  // ムーブ構築しただけでは、標準範囲のオブジェクトは「有効だが未規定の状態」になる
  X(X&& other)
    : str(std::exchange(other.str, {})),
      p(std::exchange(other.p, nullptr))
  {}
  // 以下と等価:
  // str{std::move(other.str)};
  // other.str = {};
  //
  // p = other.p;
  // other.p = nullptr;

  // ムーブ代入も同様
  X& operator=(X&& other) {
    str = std::exchange(other.str, {});
    p = std::exchange(other.p, nullptr);
    return *this;
  }
};

int main()
{
  int value = 3;

  X a;
  a.str = "Hello";
  a.p = &value;

  X b = std::move(a);

  // ムーブされたaが空になり、bとcへとデータが移動していくことを確認
  std::cout << a.str << " " << a.p << std::endl;
  std::cout << b.str << " " << b.p << std::endl;

  X c;
  c = std::move(b);
  std::cout << c.str << " " << c.p << std::endl;
}
```
* std::exchange[color ff0000]
* std::move[link move.md]


#### 出力例
```
 (nil)
Hello 0x7ffc560ca4cc
Hello 0x7ffc560ca4cc
```


## バージョン
### 言語
- C++14

### 処理系
- [GCC](/implementation.md#gcc): 4.9.0 [mark verified]
- [Clang](/implementation.md#clang): 3.4 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2015 [mark verified]

## 関連項目

- [非推奨だった bool 型に対するインクリメント演算子を削除](/lang/cpp17/remove_deprecated_increment_of_bool.md)

## 参照
- [N3511 exchange() utility function](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3511.html)
- [N3608 exchange() utility function, revision 2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3608.html)
- [N3668 exchange() utility function, revision 3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3668.html)
- [P0202R3 Add Constexpr Modifiers to Functions in `<algorithm>` and `<utility>` Headers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0202r3.html)
- [`std::exchange` Patterns: Fast, Safe, Expressive, and Probably Underused](https://www.fluentcpp.com/2020/09/25/stdexchange-patterns-fast-safe-expressive-and-probably-underused/)
- [`std::exchange`によるmoveしてリセットするイディオムの御紹介](https://onihusube.hatenablog.com/entry/2020/10/31/163244)
- [P2401R0 Add a conditional noexcept specification to std::exchange](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2401r0.html)
