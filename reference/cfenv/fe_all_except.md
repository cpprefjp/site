# FE_ALL_EXCEPT
* cfenv[meta header]
* macro[meta id-type]
* cpp11[meta cpp]

```cpp
#define FE_ALL_EXCEPT implementation-defined
```

## 概要
全ての浮動小数点例外マクロをビットORでつなぐことによって実装で定義されるマクロ。

このマクロは、全ての浮動小数点例外をクリアしたり、全ての浮動小数点例外の状態を取得するような状況で使用する。

## 例
```cpp example
#include <iostream>
#include <cfenv>

int main()
{
  // ゼロ割りを発生させる
  float result = 1.0f / 0.0f;

  // 全ての浮動小数点例外の状態を取得
  int excepts = std::fetestexcept(FE_ALL_EXCEPT);
  if (excepts & FE_DIVBYZERO) { // 個別の例外送出状態を判定
    std::cout << "zero divided" << std::endl;
  }

  // 全ての浮動小数点例外の状態をクリア
  std::feclearexcept(FE_ALL_EXCEPT);
}
```
* FE_ALL_EXCEPT[color ff0000]
* std::fetestexcept[link fetestexcept.md]
* FE_DIVBYZERO[link fe_divbyzero.md]
* std::feclearexcept[link feclearexcept.md]

### 出力例
```
zero divided
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [GCC](/implementation.md#gcc): 4.3.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2013 [mark verified], 2015 [mark verified]
	- コンパイルオプション`/fp:strict`または`#pragma fenv_access (on)`が必要。さもなくば、正しく動作しないおそれがある。
