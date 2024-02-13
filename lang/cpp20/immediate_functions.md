# 即時関数

* cpp20[meta cpp]

## 概要

C++20では、関数またはメンバ関数に対して、`consteval`キーワードで常に定数式評価されるよう指定できる。そのような関数を**即時関数**(immediate function)という。

`constexpr`と似ているが、`constexpr`を付けた関数はコンパイル時にも実行時にも評価できるのに対し、`consteval`の場合は必ずコンパイル時に評価される点が異なる。

## 仕様

`consteval`指定子の付いた関数(即時関数)は、定数式評価されない場合はエラーとなる。

```cpp
// P1073R3より引用
consteval int sqr(int n) {
  return n*n;
}
constexpr int r = sqr(100);  // OK
int x = 100;
int r2 = sqr(x);  // エラー: 定数式評価されない
```
* P1073R3[link http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1073r3.html]

ただし、他の即時関数の中では、即時関数が定数式評価されなくてもエラーとはならない。これは、呼び出し元が即時関数であれば、結局はコンパイル時に評価されるからである。

```cpp
// P1073R3より引用
consteval int sqrsqr(int n) {
  return sqr(sqr(n)); // ここでは定数式ではないがOK
}

constexpr int dblsqr(int n) {
  return 2*sqr(n); // エラー: 定数式評価されず、呼び出し元が即時関数ではない
}
```
* P1073R3[link http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1073r3.html]

即時関数のポインタを取得することはできない。

```cpp
// P1073R3より引用
using Int2Int = int(int);
Int2Int *pf = sqr; // エラー
```
* P1073R3[link http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1073r3.html]

定数式として評価できない部分があっても、評価しようとしなければエラーとならない。

```cpp example
consteval void f(int n) {
  if(n < 0) {
    throw "n should not be negative"; // throwは定数式として評価できないが、ここを通らなければOK
  }
}

int main() {
  f(10); // OK
  f(-1); // エラー
}
```

この性質は様々なチェックをコンパイル時に行うために活用できる。たとえば、[`std::format`](/reference/format/format.md)におけるコンパイル時の書式文字列チェックで使用されている。

## 例
```cpp example
// P1073R3より引用
consteval int sqr(int n) {
  return n*n;
}
constexpr int r = sqr(100);  // OK

int main(){
  static_assert(r == 10000, "100 * 100 == 10000");
  // int x = 100;
  // int r2 = sqr(x);  // エラー: 定数式評価されない
}
```
* P1073R3[link http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1073r3.html]

### 出力
```
```

## この機能が必要になった背景・経緯

C++11で導入された`constexpr`指定子によって、関数を定数式評価できることを表明できるようになった。しかし、`constexpr`関数は定数式評価しないで実行時に評価することもできる。

それに対して、関数形式のマクロを置き換えたいであるとか、単に定数式以外では用途がない関数であるなどの理由で、必ず定数式評価される関数を作りたいという要求があり、即時関数が導入されることになった。

即時関数は実行時に評価できず、アドレスを取ることもできないので、処理系は即時関数の実体を完全に消すことができる。

また、即時関数はコンパイル時にしか取得できない情報へアクセスするコンパイラマジックな関数を表現するのにも使用できる。C++20では、ソースコード上の位置を返す[`std::source_location::current()`関数](/reference/source_location/source_location/current.md)が即時関数になっている。

## 検討されたほかの選択肢

当初は `constexpr!`というキーワードが提案されていたが、最終的に`consteval`になった。

## 関連項目

* [C++11 `constexpr`](/lang/cpp11/constexpr.md)
* [C++20 コンパイル時初期化を強制する`constinit`キーワードを追加](constinit.md)
* [C++23 `if consteval`](/lang/cpp23/if_consteval.md)

## 参照

* [P1073R3 Immediate functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1073r3.html)
