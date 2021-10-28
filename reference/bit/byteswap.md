# byteswap
* bit[meta header]
* function template[meta id-type]
* std[meta namespace]
* cpp23[meta cpp]

```cpp
namespace std {
  template <class T>
  constexpr T byteswap(T value) noexcept;
}
```

## 概要
値`value`のオブジェクト表現に対してバイト単位で逆順並び替え（エンディアン変換）を行う。


## テンプレートパラメータ制約
型`T`が[`integral`](/reference/concepts/integral.md)のモデルであること


## 適格要件
型`T`がパディングビットを含まないこと


## 戻り値
`value`のオブジェクト表現をバイト単位で逆順に並び替えた整数型`T`の値を返す。


## 例外
投げない


## 例
```cpp example
#include <bit>
#include <format>
#include <iostream>

int main()
{
  std::uint32_t src = 0x12345678u;
  std::cout << std::format("{:x}", src) << std::endl;

  std::uint32_t dst = std::byteswap(src);
  std::cout << std::format("{:x}", dst) << std::endl;
}
```
* std::byteswap[color ff0000]
* std::format[link /reference/format/format.md]

### 出力
```
12345678
78563412
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照
- [P1272R4 Byteswapping for fun&&nuf](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p1272r4.html)
