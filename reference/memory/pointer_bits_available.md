# pointer_bits_available
* memory[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp29[meta cpp]

```cpp
namespace std {
  constexpr unsigned int pointer_bits_available(size_t alignment); // (1) C++29
}
```

## 概要
指定したアライメントを持つオブジェクトを指すポインタにおいて、ポインタタギングに使用できるビット数を取得する。

[`pointer_tag_pair`](pointer_tag_pair.md)`<Ptr>`の`BitsRequested`のデフォルト値は、この関数に指す先の型のアライメントを渡した結果として定義される。


## 事前条件
- `alignment`が2のべき乗であること


## 戻り値
アライメント`alignment`を持つ仮想的なオブジェクトを指すポインタ内の、使用されないビット数（処理系定義）を返す。


## 定数式に評価される条件
事前条件を満たしていること。


## 備考
- `alignment`が1より大きい場合、結果は非0であることが推奨される
- 多くのプラットフォームでは、結果は[`countr_zero`](/reference/bit/countr_zero.md)`(alignment)`と[`max_pointer_bits_available`](max_pointer_bits_available.md)の小さい方となる


## 例
```cpp
#include <memory>
#include <iostream>

int main()
{
  // 8バイトアライメントのオブジェクトへのポインタで使えるタグのビット数
  std::cout << std::pointer_bits_available(8) << std::endl;
}
```
* std::pointer_bits_available[color ff0000]

### 出力例
```
3
```


## バージョン
### 言語
- C++29

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`max_pointer_bits_available`](max_pointer_bits_available.md)
- [`pointer_tag_pair`](pointer_tag_pair.md)


## 参照
- [P3125R6 constexpr pointer tagging](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3125r6.html)
