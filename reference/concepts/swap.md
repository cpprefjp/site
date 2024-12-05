# swap

* concepts[meta header]
* cpo[meta id-type]
* std::ranges[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std::ranges {
  inline namespace /*unspecified*/ {

    inline constexpr /*unspecified*/ swap = /*unspecified*/;
  }
}
```

## 概要

`ranges::swap`は2つの引数を受け取り、それらの値の交換を行う関数オブジェクトである。

## 効果

`std::ranges::swap(a, b)`のように呼び出された時、以下のいずれかと等価（上から順に考慮される）

1. 引数`a, b`の型がクラス型であるか列挙型であり、`std::ranges::swap`（本関数オブジェクト）の宣言を含まず下記の`swap`関数宣言を含むコンテキストで、`void(swap(a, b))`が呼び出し可能ならば`void(swap(a, b))`
   ```cpp
   template<class T>
   void swap(T&, T&) = delete;
   ```

2. `a, b`が共に同じ長さの配列型の左辺値であり、`ranges::swap(*a, *b)`が呼び出し可能ならば`ranges::swap_ranges(a, b)`
    - 1か3に委譲して要素毎に`swap`される

3. `a, b`が共に同じ型`T`の左辺値であり、`T`と`T&`は[`move_constructible<T>`](move_constructible.md)及び[`assignable_from<T&, T>`](assignable_from.md)のモデルとなる場合、[`std::swap()`](/reference/utility/swap.md)相当の操作によって`a, b`の値を交換する。

4. それ以外の場合、呼び出しは不適格。

## 戻り値

何も返さない。  
`std::ranges::swap(a, b)`の呼び出しが有効であるならば、常に戻り値型は`void`となる。

## 例外

上記「効果」節のそれぞれのケース毎に

1. 呼び出される`swap(a, b)`（及び、もし返されるのならば戻り値のデストラクタ）が例外を送出するかに従う
2. `noexcept(ranges::swap(*a, *b))`が指定される
3. `noexcept(is_nothrow_move_constructible_v<T> && is_nothrow_move_assignable_v<T>)`が指定される


## 定数式に評価される条件

上記「効果」節のそれぞれのケース毎に

1. 呼び出される`swap(a, b)`（及び、もし返されるのならば戻り値のデストラクタ）が定数評価可能であるかに従う。
2. `a, b`の要素型によって、1か3に従う
3. 以下の条件を全て満たす場合に定数評価可能
    - `T`はリテラル型である
    - `a = std::move(b), b = std::move(a)`は共に定数評価可能
    - 次のような初期化式が定数評価可能
        ```cpp
        T t1(std::move(a));
        T t2(std::move(b));
        ```

## カスタマイゼーションポイント

上記「効果」節1のケースでは、ユーザー定義の`swap()`を定義しておくことによって実行される交換操作をカスタマイズすることができる。

1. `a, b`のどちらかの型と同じ名前空間で、もしくは[*Hidden friends*](/article/lib/hidden_friends.md)として、`a, b`の型のペアについて呼び出し可能な`swap()`を定義しておく
2. その要素型について、1にアダプトしておく
3. --

## 備考

上記「効果」節1の場合に、呼び出された`swap()`関数が実際には交換操作を行わない場合はプログラムは不適格。ただし、その診断は要求されていない（未定義動作となりえる）。

## 例
```cpp example
#include <iostream>
#include <concepts>

namespace NS {
  struct swappable1 {
    int n = 0;
    
    swappable1(int m) : n(m) {}
    
    swappable1(swappable1&&) = delete;
  };
  
  // 非メンバ関数として定義
  void swap(swappable1& lhs, swappable1& rhs) {
    std::swap(lhs.n, rhs.n);
  }


  struct swappable2 {
    double d = 0.0;

    swappable2(double v) : d(v) {}

    swappable2(swappable2&&) = delete;

    // Hidden friendsな関数として定義
    friend void swap(swappable2& lhs, swappable2& rhs) {
      std::swap(lhs.d, rhs.d);
    }
  };
}

int main() {
  {
    int a = 5, b = 7;
    std::ranges::swap(a, b);

    std::cout << "a = " << a << ", b = " << b << std::endl;
  }
  std::cout << "\n";
  {
    NS::swappable1 a{11}, b{13};
    std::ranges::swap(a, b);

    std::cout << "a = " << a.n << ", b = " << b.n << std::endl;
  }
  std::cout << "\n";
  {
    NS::swappable2 a{3.14}, b{2.71};
    std::ranges::swap(a, b);

    std::cout << "a = " << a.d << ", b = " << b.d << std::endl;
  }
  std::cout << "\n";
  {
    int a[] = {1, 3, 5, 7}, b[] = {0, 2, 4, 6};
    std::ranges::swap(a, b);

    std::cout << "a = {";
    for (int n : a) std::cout << n << ", ";
    std::cout << "}, b = {";
    for (int n : b) std::cout << n << ", ";
    std::cout << "}";
  }
}
```
* ranges::swap[color ff0000]

### 出力
```
a = 7, b = 5

a = 13, b = 11

a = 2.71, b = 3.14

a = {0, 2, 4, 6, }, b = {1, 3, 5, 7, }
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark verified]

## 関連項目

- [C++20 コンセプト](/lang/cpp20/concepts.md)
- [`std::swap()`](/reference/utility/swap.md)

## 参照
- [P0898R3 Standard Library Concepts](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0898r3.pdf)
- [P1754R1 Rename concepts to standard_case for C++20, while we still can](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1754r1.pdf)
