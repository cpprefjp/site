# ratio_multiply
* ratio[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class R1, class R2>
  using ratio_multiply = …;
}
```

## 概要
`ratio_multiply`は、左辺の[`ratio`](ratio.md)と右辺の[`ratio`](ratio.md)を乗算した[`ratio`](ratio.md)型を作るエイリアステンプレートである。


## 効果
乗算結果は、[`ratio`](ratio.md)`<R1::num * R2::num, R1::den * R2::den>`という型になる。


## 例
```cpp
#include <ratio>

int main()
{
  using r1 = std::ratio<2, 5>;
  using r2 = std::ratio<3, 5>;

  using result = std::ratio_multiply<r1, r2>;

  static_assert(result::num == 6, "result num is 6");
  static_assert(result::den == 25, "result den is 25");
}
```
* std::ratio_multiply[color ff0000]
* std::ratio[link ratio.md]

### 出力
```
```

## 乗算で大きいduration型を定義する例
```cpp
#include <iostream>
#include <ratio>
#include <chrono>

int main()
{
    // 「86400秒」という直値で「日」を定義する代わりに、
//  using days = std::chrono::duration<long, std::ratio<86400>>;

    // 「時」を24倍して「日」を定義する
    using days = std::chrono::duration<
        long,
        std::ratio_multiply<
            std::chrono::hours::period,
            std::ratio<24>
        >
    >;

    days three(3);

    std::cout << three.count() << std::endl;
}
```

### 出力
```
3
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.0
- [GCC, C++11 mode](/implementation.md#gcc): 4.6.4
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [What is the best way to form custom std::chrono::durations and std::ratios? - StackOverflow](http://stackoverflow.com/questions/27880393/what-is-the-best-way-to-form-custom-stdchronodurations-and-stdratios)

