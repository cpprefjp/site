# saturate_cast
* numeric[meta header]
* function template[meta id-type]
* std[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std {
  template<class R, class T>
    constexpr R saturate_cast(T x) noexcept;
}
```

## 概要
値`x`を変換先の型`R`で表現可能な値へ丸める。


## テンプレートパラメータ制約
`T`は符号付き整数型または符号無し整数型であること。


## 戻り値
- 値`x`が型`T`で表現可能ならば、`x`を返す
- そうでないとき、型`T`で表現可能な最大値または最小値のうち`x`に近い方の値を返す


## 例外
投げない


## 例
```cpp example
#include <cstdint>
#include <numeric>
#include <print>

int main()
{
  std::println("{}", std::saturate_cast<std::int8_t>( 100));
  std::println("{}", std::saturate_cast<std::int8_t>( 200));
  std::println("{}", std::saturate_cast<std::int8_t>(-200));
}
```
* std::saturate_cast[color ff0000]

### 出力
```
100
127
-128
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0543R3 Saturation arithmetic](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p0543r3.html)
