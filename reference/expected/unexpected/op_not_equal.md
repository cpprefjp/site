# operator!=
* expected[meta header]
* function template[meta id-type]
* std[meta namespace]
* unexpected[meta class]
* cpp23[meta cpp]

```cpp
// operator==により、下記オーバーロードが使用可能になる
template<class E2>
friend constexpr bool operator!=(const unexpected& x, const unexpected<E2>& y);
```
* operator==[link op_equal.md]
* unexpected[link ../unexpected.md]

## 概要
`unexpected`オブジェクト同士の非等値比較を行う。


## 適格要件
式`x.`[`error()`](error.md) `== y.`[`error()`](error.md)が適格であり、その結果を`bool`へ変換可能であること。


## 戻り値
`!`[`(x == y)`](op_equal.md)


## 例
```cpp example
#include <cassert>
#include <expected>

int main()
{
  std::unexpected<long>  x{1};
  std::unexpected<short> y{2};
  assert(x != y);
}
```
* !=[color ff0000]
* std::unexpected[link ../unexpected.md]

### 出力
```
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 16.0 [mark verified]
- [GCC](/implementation.md#gcc): 12.1 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0323R12 std::expected](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0323r12.html)
