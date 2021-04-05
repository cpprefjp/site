# コンパイル時初期化を強制する`constinit`キーワードを追加
* cpp20[meta cpp]

## 概要

変数に対する`constinit`指定は、定数初期化（*constant initialization*）が可能な変数に対して、その初期化がコンパイル時に完了することを保証する。

```cpp
#include <mutex>
#include <memory>

// OK
constinit int n = 10;
constinit double pi = 3.14;
constinit std::mutex m{};
constinit std::unique_ptr<int> p = nullptr;

// NG
constinit std::unique_ptr<int> p2 = &n;
constinit double pi2 = pi * 2.0; 

int main() {
  // OK
  constinit static int m1 = 20;

  // NG
  constinit int m2 = 30;
}
```
* constinit[color ff0000]

このように定数初期化ができない変数に対してはコンパイルエラーとなるため、静的/スレッドローカル変数のうち定数初期化が期待できるものに付加しておくことで、いつ初期化がされているのかが明確になる。

## 仕様

(執筆中)

## 例
```cpp
#include <mutex>
#include <memory>
#include <random>

constinit const int N = 1;      // OK
constinit unsigned int M = N;   // OK、constな整数型は定数式で利用可能
constinit constexpr int L = 1;  // NG、constinitとconstexprを同時に指定できない

constinit thread_local static int Counter = 0; // OK

constinit const double PI = 3.1415; // OK
constinit double PI2 = PI + PI;     // NG、変数PIは定数式で利用不可

constinit static int N2;  // OK、ゼロ初期化される
constinit int Array[3];   // OK、ゼロ初期化される

constinit std::mutex m{};           // OK、定数初期化コンストラクタ呼び出し
constinit std::unique_ptr<int> p1;  // OK、定数初期化コンストラクタ呼び出し

constinit extern int def = 10;  // OK
constinit extern int ext;       // NG、おそらくエラーにはならないが未定義動作

struct C {
  constexpr C() = default;

  C(int n) : m(n) {}

  int m;
};

constinit C c1{};    // OK、定数初期化コンストラクタ呼び出し
constinit C c2{10};  // NG、普通のコンストラクタ呼び出し

struct S {
  constinit static const int x;
  static const int y;
  static constexpr int z = 56;

  constinit int m;  // NG、非静的メンバ変数
};

const int S::x = 12;            // OK、constinit変数なので定数初期化される
constinit const int S::y = 34;  // OK、constinit変数なので定数初期化される
constinit constexpr int S::z;   // NG、インライン変数に対する多重定義
                                // constexpr静的メンバ変数に対するクラス外定義はC++17以降非推奨

int main() {
  constinit static std::unique_ptr<int> ptr = nullptr;                // OK、静的ローカル変数
  constinit thread_local std::mt19937 eNGine(std::random_device{}()); // NG、定数式で初期化できない

  constinit int local = 0;  // NG、ローカル変数
}
```
* constinit[color ff0000]

## この機能が必要になった背景・経緯

(執筆中)

## 検討されたほかの選択肢

(執筆中)

## 関連項目

(執筆中)

## 参照

- [P1143R2 AddiNG the `constinit` keyword](https://wg21.link/P1143)
- [Constant initialization - Andrzej's C++ blog](https://akrzemi1.wordpress.com/2012/05/27/constant-initialization/)
- [`mutex`のconstexprコンストラクタ - yohhoyの日記](https://yohhoy.hatenadiary.jp/entry/20120621/p1)