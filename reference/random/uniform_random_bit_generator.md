# uniform_random_bit_generator
* random[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class G>
  concept uniform_random_bit_generator =
    invocable<G&> && unsigned_integral<invoke_result_t<G&>> &&
    requires {
      { G::min() } -> same_as<invoke_result_t<G&>>;
      { G::max() } -> same_as<invoke_result_t<G&>>;
      requires bool_constant<(G::min() < G::max())>::value;
    };
}
```
* unsigned_integral[link /reference/concepts/unsigned_integral.md]
* bool_constant[link /reference/type_traits/bool_constant.md]

## 概要

`uniform_random_bit_generator`は、任意の乱数生成器`G`が離散一様分布を示す（取り得る出力範囲における各値の出現確率が一定であり符号なし整数型を返す）関数オブジェクトであることを表すコンセプトである。

## モデル

型`G`のオブジェクト`g`について以下の条件を満たす場合に限って、型`G`は`uniform_random_bit_generator`のモデルである

- `G::min() <= g()`であること
- `g() <= G::max()`であること
- `g()`の時間/空間計算量は償却定数であること

## 例
```cpp example
#include <iostream>
#include <random>

template<std::uniform_random_bit_generator G>
void f(const char* name) {
  std::cout << name << " is uniform random bit generator" << std::endl;
}

template<typename G>
void f(const char* name) {
  std::cout << name << " is not uniform random bit generator" << std::endl;
}

int main() {
  f<std::mt19937>("std::mt19937");
  f<std::minstd_rand>("std::minstd_rand");
  f<std::ranlux48>("std::ranlux48");
  f<std::knuth_b>("std::knuth_b");
  f<std::random_device>("std::random_device");
  
  std::cout << "\n";
  f<std::uniform_real_distribution<>>("std::uniform_real_distribution<>");
  f<std::normal_distribution<>>("std::normal_distribution<>");
  f<std::exponential_distribution<>>("std::exponential_distribution<>");
}
```
* std::uniform_random_bit_generator[color ff0000]

### 出力
```
std::mt19937 is uniform random bit generator
std::minstd_rand is uniform random bit generator
std::ranlux48 is uniform random bit generator
std::knuth_b is uniform random bit generator
std::random_device is uniform random bit generator

std::uniform_real_distribution<> is not uniform random bit generator
std::normal_distribution<> is not uniform random bit generator
std::exponential_distribution<> is not uniform random bit generator
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

## 参照

- [P0898R3 Standard Library Concepts](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0898r3.pdf)
- [P1754R1 Rename concepts to standard_case for C++20, while we still can](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1754r1.pdf)
- [制約式`std::bool_constant<cond>::value` - yohhoyの日記](https://yohhoy.hatenadiary.jp/entry/20210307/p1)
