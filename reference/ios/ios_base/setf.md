# setf
* ios[meta header]
* function[meta id-type]
* std[meta namespace]
* ios_base[meta class]

```cpp
fmtflags setf(fmtflags fmtfl);                      // (1)
fmtflags setf(fmtflags fmtfl, fmtflags mask);       // (2)
```
* fmtflags[link type-fmtflags.md]

## 概要
書式フラグを設定する。


## 効果
- (1) [`flags`](flags.md)`()` に引数 `fmtfl` を設定する。[`flags`](flags.md)`(`[`flags`](flags.md)`() | fmtfl)` と等価。
- (2) [`flags`](flags.md)`()` から引数 `mask` をクリアした後、引数 `fmtfl` を設定する。[`flags`](flags.md)`((`[`flags`](flags.md)`() & ~mask) | fmtfl)` と等価。


## 戻り値
- (1) 設定される前の書式フラグ
- (2) 設定される前の書式フラグ


## 備考
- (1) の形式は単独のビットで意味のあるフィールドに、(2) の形式は複数のビットで一つの意味を表すフィールドに用いる。（例を参照）
- 設定後に戻す必要が無いような場合には、本関数より各種マニピュレータを使用した方が便利だろう。


## 例
```cpp example
#include <iostream>

int main()
{
  // (1) の形式
  // bool をアルファベット形式で出力
  std::ios_base::fmtflags old1 = std::cout.setf(std::ios_base::boolalpha);
  std::cout << true << '\n';
  std::cout.flags(old1);

  // (2) の形式
  // 16 進数に設定して出力
  std::ios_base::fmtflags old2 = std::cout.setf(std::ios_base::hex, std::ios_base::basefield);
  std::cout << 100 << '\n';
  std::cout.flags(old2);

  // マニピュレータを使用して上記とほぼ等価の設定をした例（ただし、設定が戻っているわけでは無い）
  std::cout << std::boolalpha << true << std::noboolalpha << '\n';
  std::cout << std::hex << 100 << std::dec << '\n';
}
```
* std::hex[link ../hex.md]
* std::dec[link ../dec.md]
* std::noboolalpha[link ../noboolalpha.md]
* std::ios_base[link ../ios_base.md]
* setf[color ff0000]
* flags[link flags.md]
* fmtflags[link type-fmtflags.md]
* hex[link type-fmtflags.md]
* boolalpha[link type-fmtflags.md]

### 出力
```
true
64
true
64
```


## バージョン
## 言語
- C++98

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified], 3.1 [mark verified], 3.2 [mark verified], 3.3 [mark verified], 3.4 [mark verified], 3.5.0 [mark verified], 3.6.0 [mark verified], 3.7.0 [mark verified], 3.8.0 [mark verified]
- [GCC](/implementation.md#gcc): 4.3.6 [mark verified], 4.4.7 [mark verified], 4.5.4 [mark verified], 4.6.4 [mark verified], 4.7.3 [mark verified], 4.8.1 [mark verified], 4.8.2 [mark verified], 4.9.0 [mark verified], 4.9.1 [mark verified], 4.9.2 [mark verified], 5.1.0 [mark verified], 5.2.0 [mark verified], 6.0.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [`ios_base`](../ios_base.md)`::`[`fmtflags`](type-fmtflags.md)
- [`ios_base`](../ios_base.md)`::`[`flags`](flags.md)
- [`ios_base`](../ios_base.md)`::`[`unsetf`](unsetf.md)
