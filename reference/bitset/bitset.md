# bitset
* bitset[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <size_t N>
  class bitset;
}
```

## 概要
`<bitset>`ヘッダでは、ビットの固定サイズ配列を計算するための`std::bitset`クラスを定義する。

`std::bitset`は、`N`ビットのビット集合を表すクラスである。添�演算�で任意の位置のビット状態を確認でき、文�列と整数値との相互変換が可能であることを特徴とする。


テンプレートパラメータは、以下を意味する：

- `N` : ビット集合のビット数


### メンバ関数
### 構築・破棄

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------|----------------|-------|
| [`(constructor)`](bitset/op_constructor.md)        | コンストラクタ | |
| `~bitset() = default`                        | デストラクタ   | |
| `bitset& operator=(const bitset&) = default` | 代入演算�     | |


### 集合演算

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------------------|------------------------------|-------|
| [`operator&=`](bitset/op_and_assign.md)                | 論理積の複合演算             | |
| [<code>operator&#x7C;=</code>](bitset/op_or_assign.md) | 論理和の複合演算             | |
| [`operator^=`](bitset/op_xor_assign.md)                | 排他的論理和の複合演算       | |
| [`operator<<=`](bitset/op_left_shift_assign.md)        | 左シフトの複合演算           | |
| [`operator>>=`](bitset/op_right_shift_assign.md)       | 右シフトの複合演算           | |
| [`set`](bitset/set.md)                                 | 任意の位置のビットを�定する | |
| [`reset`](bitset/reset.md)                             | 任意の位置のビットを0にする  | |
| [`operator~`](bitset/op_flip.md)                       | ビットを反転させる           | |
| [`flip`](bitset/flip.md)                               | ビットを反転させる           | |


### 要素アクセス

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------|-----------------------------------------------|-------|
| [`operator[]`](bitset/op_at.md)          | 任意の位置のビットにアクセスする              | |
| [`count`](bitset/count.md)               | 1になっているビットの数を取得する             | |
| [`size`](bitset/size.md)                 | ビット数を取得する                            | |
| [`test`](bitset/test.md)                 | 任意の位置のビットが1になっているかを判定する | |
| [`all`](bitset/all.md)                   | 全てのビットが1になっているかを判定する       | C++11 |
| [`any`](bitset/any.md)                   | いずれかのビットが1になっているかを判定する   | |
| [`none`](bitset/none.md)                 | 全てのビットが0になっているかを判定する       | |
| [`to_ulong`](bitset/to_ulong.md)         | `unsigned long`型に変換する                   | |
| [`to_ullong`](bitset/to_ullong.md)       | `unsigned long long`型に変換する              | C++11 |
| [`to_string`](bitset/to_string.md)       | 文�列に変換する                              | |
| [`operator==`](bitset/op_equal.md)       | �値比較                                      | |
| [`operator!=`](bitset/op_not_equal.md)   | 非�値比較                                    | |
| [`operator<<`](bitset/op_left_shift.md)  | 左シフト                                      | |
| [`operator>>`](bitset/op_right_shift.md) | 右シフト                                      | |


## メンバ型

| 名前 | 説明 | 対応バージョン |
|--------------------------------------|----------------------------------------------|-------|
| [`reference`](bitset/reference.md) | 任意の位置のビットを参照するためのプ��シ型 | |


## 非メンバ関数

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------------|--------------------|-------|
| [`operator&`](bitset/op_and.md)                | 論理積             | |
| [<code>operator&#x7C;</code>](bitset/op_or.md) | 論理和             | |
| [`operator^`](bitset/op_xor.md)                | 排他的論理和       | |
| [`operator>>`](bitset/op_istream.md)           | ストリームから入力 | |
| [`operator<<`](bitset/op_ostream.md)           | ストリームに出力   | |


## ハッシュサポート

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------------|--------------------------------------|-------|
| `template <class T> struct hash;`             | `hash`クラスの先行宣言               | C++11 |
| `template <size_t N> struct hash<bitset<N>>;` | `hash`クラスの`bitset`に対する特殊化 | C++11 |


## 例
```cpp example
#include <iostream>
#include <bitset>

int main()
{
  // 整数から8ビットのビット集合を構築
  std::bitset<8> bs1(131uL); // 10000011

  // 文�列から8ビットのビット集合を構築
  std::bitset<8> bs2("10000011");

  // 1ビット目が1かを判定
  if (bs1[1]) {
    std::cout << "1st bit is 1" << std::endl;
  }

  // 2ビット目を1にする
  bs1.set(2);
  std::cout << "2nd bit to 1 : " << bs1 << std::endl;

  // 2ビット目を0に戻す
  bs1.reset(2);

  // いずれかのビットが1かを判定
  if (bs1.any()) {
    std::cout << "some bits are 1" << std::endl;
  }

  // 論理演算
  std::bitset<8> and_bits = bs1 & std::bitset<8>("10000001"); // 論理積
  std::bitset<8> or_bits  = bs1 | std::bitset<8>("00010100"); // 論理和
  std::bitset<8> xor_bits = bs1 ^ std::bitset<8>("00100011"); // 排他的論理和

  std::cout << "and : " << and_bits << std::endl;
  std::cout << "or  : " << or_bits << std::endl;
  std::cout << "xor : " << xor_bits << std::endl;
}
```
* [1][link bitset/op_at.md]
* set[link bitset/set.md]
* reset[link bitset/reset.md]
* any()[link bitset/any.md]

### 出力
```
1st bit is 1
2nd bit to 1 : 10000111
some bits are 1
and : 10000001
or  : 10010111
xor : 10100000
```

### 参照
- [N0075 Proposal for a Bitset Class](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/1991/WG21%201991/X3J16_91-0142%20WG21_N0075.pdf)
- [N0220R2 A Proposal for Two Bitset Classes](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/1993/N0220R2.asc)
