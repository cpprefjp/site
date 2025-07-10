# bind_front
* functional[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class F, class... Args>
  constexpr unspecified bind_front(F&& f, Args&&... args);  // (1) C++20

  template <auto f, class... Args>
  constexpr unspecified bind_front(Args&&... args);         // (2) C++26
}
```
* unspecified[italic]

## 概要
関数の引数を先頭から順に部分適用する。

この関数は、メンバ関数とレシーバー (`*this`) を束縛して持ち運び、引数をあとで渡して呼び出す、というユースケースで使用する。そのようなケースでは、`const`性の伝播が難しいラムダ式や[`std::bind()`](bind.md)よりも容易になる。

```cpp
using namespace std::placeholders;

// 4引数をもつメンバ関数Strategy::process
struct Strategy { double process(std::string, std::string, double, double); };

// 1. ラムダ式の場合、非constメンバ関数を呼び出すためにmutableを付けなければならないため、
// シンプルなメンバ関数のラップができない。
// コーナーケースとしては、decltype(auto)の考慮もときに必要になる
auto f1 = [s = Strategy{}] (auto&&... args) mutable {
  return s.process(std::forward<decltype(args)>(args)...);
};

// 2. std::bind()の場合、引数の数をユーザーが知っており、
// プレースホルダーを適切に設定しなければならない
auto f2 = std::bind(&Strategy::process, Strategy{}, _1, _2, _3, _4);

// 3. std::bind_front()の場合、const性の伝播が自動的に行われ、
// プレースホルダーを指定する必要がない
auto f3 = bind_front(&Strategy::process, Strategy{});
```
* std::bind[link bind.md]
* std::placeholders[link placeholders.md]
* _1[link placeholders.md]
* _2[link placeholders.md]
* _3[link placeholders.md]
* _4[link placeholders.md]

ただし、この関数はメンバ関数とレシーバーを受け取る専用にはなっておらず、「引数を先頭から順に束縛する」という汎用的な機能になっているため、「メンバ関数ポインタのみを束縛」「関数と引数の一部を束縛」といった利用もできる。


## 事前条件
[`decay_t`](/reference/type_traits/decay.md)`<F>`を適用した型を`FD`、[`decay_t`](/reference/type_traits/decay.md)`<Args>...`を適用した型パラメータパックを`BoundArgs`として

- (1) : 
    - `FD`がCpp17MoveConstructible要件を満たすこと
    - `BoundArgs`のそれぞれの型`Ti`が[オブジェクト型](/reference/type_traits/is_object.md)である場合、Cpp17MoveConstructible要件を満たすこと
- (2) :
    - `BoundArgs`のそれぞれの型`Ti`がCpp17MoveConstructible要件を満たすこと


## 適格要件
- (1) :
    - [`is_constructible_v`](/reference/type_traits/is_constructible.md)`<FD, F> &&` [`is_move_constructible_v`](/reference/type_traits/is_move_constructible.md)`<FD> &&` `(`[`is_constructible_v`](/reference/type_traits/is_constructible.md)`<BoundArgs, Args> && ...) &&` `(`[`is_move_constructible_v`](/reference/type_traits/is_move_constructible.md)`<BoundArgs> && ...)`が`true`であること
- (2) : `F`を`f`の型として
    - `(`[`is_constructible_v`](/reference/type_traits/is_constructible.md)`<BoundArgs, Args> && ...)`が`true`、かつ
    - `(`[`is_move_constructible_v`](/reference/type_traits/is_move_constructible.md)`<BoundArgs> && ...)`が`true`、かつ
    - もし[`is_poinetr_v`](/reference/type_traits/is_pointer.md)`<F> ||` [`is_member_poinetr_v`](/reference/type_traits/is_member_pointer.md)`<F>`が`true`ならば、`f != nullptr`であること


## 戻り値

呼び出し可能な`f`を[`std::invoke()`](invoke.md)で呼び出した時に必要な引数列に前方一致する`f`と`args...`を完全転送して保持し、後から残りの引数リストを渡すことで`f`を呼び出せる未規定の関数オブジェクトを返す。

返される関数オブジェクトは渡された引数（`f, args...`）を参照として保持せず、適切にコピー/ムーブして保持する。


## 例外
- (1) : 関数オブジェクト`f`のムーブによって任意の例外が送出される可能性がある
- (2) : `bound_args`の初期化による任意の例外が送出される可能性がある


## 例
```cpp example
#include <iostream>
#include <functional>

struct X {
  void f(int a, int b, int c) {
    std::cout << a << ',' << b << ',' << c << std::endl;
  }
};

void g(int a, int b, int c) {
  std::cout << a << ',' << b << ',' << c << std::endl;
}

int main() {
  {
    // メンバ関数ポインタと*thisを束縛する
    X x;
    auto f = std::bind_front(&X::f, x);

    // メンバ関数の引数を渡して呼び出す
    f(1, 2, 3);
  }

  // 「メンバ関数ポインタと*thisの束縛」という機能に限定されてはおらず、
  // 先頭から順に束縛できる (関数オブジェクトの指定だけは必須)
  {
    X x;
    std::bind_front(&X::f)(x, 1, 2, 3);
    std::bind_front(&X::f, x, 1)(2, 3);

    std::bind_front(g)(1, 2, 3);
    std::bind_front(g, 1)(2, 3);
  }
}
```
* std::bind_front[color ff0000]

### 出力
```
1,2,3
1,2,3
1,2,3
1,2,3
1,2,3
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 9.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0356R5 Simplified partial function application](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0356r5.html)
- [P1651R0 `bind_front` should not unwrap `reference_wrapper`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1651r0.html)
- [P2714R1 Bind front and back to NTTP callables](https://open-std.org/jtc1/sc22/wg21/docs/papers/2023/p2714r1.html)
    - C++26でオーバーロード(2)を追加
